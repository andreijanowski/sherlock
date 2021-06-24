import React, { useState, useCallback } from "react";
import { func, string, shape, node } from "prop-types";

import AppLayout from "layout/App";
import { generateMenuItems } from "sections/profile/utils";
import { Modal, ActionIcon, H3, H4 } from "components";
import PublishModal from "sections/profile/publishModal";
import { Router } from "routes";
import { Confirm } from "components/modals";
import { PublishMobileIconWrapper, PublishHeader } from "./styled";

const MODALS = {
  PUBLISH_MODAL: "PUBLISH_MODAL",
  UNPUBLISH_MODAL: "UNPUBLISH_MODAL"
};

const ProfileLayout = ({
  t,
  lng,
  business,
  businessGroups,
  businessMenus,
  businessPictures,
  businessProducts,
  businessOpenPeriods,
  currentPage,
  children,
  updateBusiness,
  businessId,
  getProfileBusiness
}) => {
  const [modal, setModal] = useState(null);

  const showPublishModal = useCallback(() => {
    getProfileBusiness(businessId);
    setModal(MODALS.PUBLISH_MODAL);
  }, [businessId, getProfileBusiness]);

  const showUnpublishModal = useCallback(() => {
    setModal(MODALS.UNPUBLISH_MODAL);
  }, []);

  const hideModal = useCallback(() => {
    setModal(null);
  }, []);

  const publish = useCallback(() => {
    const state = business.get("approvedForLefood")
      ? "published"
      : "waiting_for_approval";
    updateBusiness(businessId, { state }).catch(() =>
      Router.pushRoute(
        `/${lng}/app/profile/my-business/?isErrorVisibilityRequired=true`
      )
    );
  }, [business, businessId, lng, updateBusiness]);

  const unpublishBusiness = useCallback(async () => {
    await updateBusiness(businessId, { state: "draft" });
    hideModal();
  }, [businessId, hideModal, updateBusiness]);

  return (
    <AppLayout
      {...{
        mainIcon: "profile",
        header: t("header"),
        t,
        lng,
        withMenu: true,
        menuItems: generateMenuItems(
          t,
          currentPage,
          showPublishModal,
          business && business.get("state"),
          showUnpublishModal
        )
      }}
    >
      {business && business.get("state") !== "published" && (
        <PublishMobileIconWrapper>
          <ActionIcon
            size="sm"
            icon={["fa", "check"]}
            onClick={showPublishModal}
          />
          <PublishHeader>{`${t("app:manageProfile.publish")}: ${business.get(
            "name"
          ) || t("app:manageProfile.unnamedBusiness")}`}</PublishHeader>
        </PublishMobileIconWrapper>
      )}
      {children}
      {modal === MODALS.PUBLISH_MODAL && (
        <Modal {...{ open: true, onClose: hideModal }}>
          <PublishModal
            {...{
              t,
              lng,
              close: hideModal,
              publish,
              business,
              businessGroups,
              businessMenus,
              businessPictures,
              businessProducts,
              businessOpenPeriods
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
    </AppLayout>
  );
};

ProfileLayout.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  businessId: string,
  businessGroups: shape(),
  businessMenus: shape(),
  businessPictures: shape(),
  businessProducts: shape(),
  businessOpenPeriods: shape(),
  businesses: shape(),
  changeCurrentBusiness: func.isRequired,
  addBusiness: func.isRequired,
  currentPage: string.isRequired,
  children: node.isRequired,
  updateBusiness: func.isRequired,
  getProfileBusiness: func.isRequired
};

ProfileLayout.defaultProps = {
  business: null,
  businessId: "",
  businessGroups: null,
  businessMenus: null,
  businessPictures: null,
  businessProducts: null,
  businessOpenPeriods: null,
  businesses: null
};

export default ProfileLayout;
