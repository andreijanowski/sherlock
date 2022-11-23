import React, { useState, useCallback } from "react";
import { func, string, shape, node } from "prop-types";

import AppLayout from "layout/App";
import { Modal, ActionIcon } from "components";
import PublishModal from "sections/profile/publishModal";
import { Router } from "routes";
import { PublishMobileIconWrapper, PublishHeader } from "./styled";

const ProfileLayout = ({
  t,
  lng,
  business,
  businessGroups,
  businessMenus,
  businessPictures,
  businessProducts,
  businessOpenPeriods,
  children,
  updateBusiness,
  businessId,
  getProfileBusiness
}) => {
  const [showModal, setShowModal] = useState(false);

  const showPublishModal = useCallback(() => {
    getProfileBusiness(businessId);
    setShowModal(true);
  }, [businessId, getProfileBusiness]);

  const hideModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const showBasicInfoErrors = useCallback(() => {
    Router.pushRoute(
      `/${lng}/app/profile/basic-information/?isErrorVisibilityRequired=true`
    );
  }, [lng]);

  const publish = useCallback(() => {
    const state = business.get("approvedForLefood")
      ? "published"
      : "waiting_for_approval";
    updateBusiness(businessId, { state }).catch(showBasicInfoErrors);
  }, [business, businessId, showBasicInfoErrors, updateBusiness]);

  return (
    <AppLayout
      {...{
        mainIcon: "profile",
        header: t("header"),
        t,
        lng
      }}
      businessId={businessId}
      hasBidCheck
    >
      {business && business.get("state") !== "published" && (
        <PublishMobileIconWrapper>
          <ActionIcon
            size="sm"
            icon={["fa", "check"]}
            onClick={showPublishModal}
          />
          <PublishHeader>{`${t("app:manageProfile.publish")}: ${
            business.get("name") || t("app:manageProfile.unnamedBusiness")
          }`}</PublishHeader>
        </PublishMobileIconWrapper>
      )}
      {children}
      {showModal && (
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
              businessOpenPeriods,
              showBasicInfoErrors
            }}
          />
        </Modal>
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
