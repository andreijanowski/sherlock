import React, { useState, useCallback } from "react";
import { string, shape, func } from "prop-types";
import { Box } from "@rebass/grid";
import { connect } from "react-redux";

import { Button, Modal, H3, H4 } from "components";
import {
  selectBusinessGroups,
  selectBusinessProducts,
  selectBusinessMenus,
  selectBusinessPictures,
  selectBusinessOpenPeriods,
  selectCurrentBusinessAttributes,
  selectCurrentBusinessId
} from "selectors/business";
import PublishModal from "sections/profile/publishModal";
import { Router } from "routes";
import { Confirm } from "components/modals";
import { patchBusiness as patchBusinessAction } from "actions/businesses";
import { fetchProfileBusiness as fetchProfileBusinessAction } from "actions/users";
import { Item } from "./styled";
import { MODALS, getButtonsProps } from "./utils";

const PublishBusinessButton = ({
  t,
  lng,
  businessAttributes,
  fetchProfileBusiness,
  updateBusiness,
  businessId,
  businessGroups,
  businessMenus,
  businessPictures,
  businessProducts,
  businessOpenPeriods
}) => {
  const [modal, setModal] = useState(null);

  const showPublishModal = useCallback(() => {
    fetchProfileBusiness(businessId);
    setModal(MODALS.PUBLISH_MODAL);
  }, [fetchProfileBusiness, businessId]);

  const showUnpublishModal = useCallback(() => {
    setModal(MODALS.UNPUBLISH_MODAL);
  }, []);

  const hideModal = useCallback(() => {
    setModal(null);
  }, []);

  const showBasicInfoErrors = useCallback(() => {
    Router.pushRoute(
      `/${lng}/app/profile/basic-information/?isErrorVisibilityRequired=true`
    );
  }, [lng]);

  const publishBusiness = useCallback(() => {
    const state = businessAttributes.get("approvedForLefood")
      ? "published"
      : "waiting_for_approval";
    updateBusiness(businessId, { state }).catch(showBasicInfoErrors);
  }, [businessAttributes, businessId, showBasicInfoErrors, updateBusiness]);

  const unpublishBusiness = useCallback(async () => {
    await updateBusiness(businessId, { state: "draft" });
    hideModal();
  }, [businessId, hideModal, updateBusiness]);

  if (!businessAttributes) return null;

  const businessState = businessAttributes.get("state");

  const { isButton, onClick, label, color } = getButtonsProps({
    businessState,
    showPublishModal,
    showUnpublishModal
  });

  return (
    <>
      {isButton ? (
        <Box p={1}>
          <Button
            styleName="accept"
            type="submit"
            width="100%"
            onClick={onClick}
          >
            {t(label)}
          </Button>
        </Box>
      ) : (
        <Item onClick={onClick} color={color}>
          <span>{t(label)}</span>
        </Item>
      )}
      {modal === MODALS.PUBLISH_MODAL && (
        <Modal {...{ open: true, onClose: hideModal }}>
          <PublishModal
            {...{
              t,
              lng,
              close: hideModal,
              publish: publishBusiness,
              business: businessAttributes,
              businessGroups,
              businessMenus,
              businessPictures,
              businessProducts,
              businessOpenPeriods,
              showBasicInfoErrors
            }}
          />
        </Modal>
      )}
      {modal === MODALS.UNPUBLISH_MODAL && (
        <Confirm
          open
          onClose={hideModal}
          btnOkText={t("forms:unpublish")}
          btnCancelText={t("forms:cancel")}
          restyled
          inverseColors
          onConfirm={unpublishBusiness}
        >
          <H3>{t("app:manageProfile.unPublish")}</H3>
          <H4>{t("app:manageProfile.unPublish_prompt")}</H4>
        </Confirm>
      )}
    </>
  );
};

PublishBusinessButton.propTypes = {
  t: func.isRequired,
  updateBusiness: func.isRequired,
  fetchProfileBusiness: func.isRequired,
  lng: string.isRequired,
  businessAttributes: shape(),
  businessGroups: shape(),
  businessMenus: shape(),
  businessPictures: shape(),
  businessProducts: shape(),
  businessOpenPeriods: shape(),
  businessId: string
};

PublishBusinessButton.defaultProps = {
  businessAttributes: null,
  businessId: null,
  businessGroups: null,
  businessMenus: null,
  businessPictures: null,
  businessProducts: null,
  businessOpenPeriods: null
};

const mapState = state => ({
  businessAttributes: selectCurrentBusinessAttributes(state),
  businessId: selectCurrentBusinessId(state),
  businessGroups: selectBusinessGroups(state),
  businessMenus: selectBusinessMenus(state),
  businessPictures: selectBusinessPictures(state),
  businessProducts: selectBusinessProducts(state),
  businessOpenPeriods: selectBusinessOpenPeriods(state)
});

const mapDispatch = {
  updateBusiness: patchBusinessAction,
  fetchProfileBusiness: fetchProfileBusinessAction
};

export default connect(mapState, mapDispatch)(PublishBusinessButton);
