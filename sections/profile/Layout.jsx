import { PureComponent } from "react";
import { func, string, shape, node } from "prop-types";
import AppLayout from "layout/App";
import { generateMenuItems } from "sections/profile/utils";
import prepareBusinessesList from "utils/prepareBusinessesList";
import { Modal, ActionIcon } from "components";
import PublishModal from "sections/profile/publishModal";
import { Router } from "routes";
import { PublishMobileIconWrapper, PublishHeader } from "./styled";

class ProfileLayout extends PureComponent {
  state = {
    isPublishModalVisible: false
  };

  showPublishModal = () => {
    const { getProfileBusiness, businessId } = this.props;
    getProfileBusiness(businessId);
    this.setState({ isPublishModalVisible: true });
  };

  hidePublishModal = () => this.setState({ isPublishModalVisible: false });

  publish = () => {
    const { lng, updateBusiness, businessId } = this.props;
    updateBusiness(businessId, { state: "waiting_for_approval" }).catch(() =>
      Router.pushRoute(
        `/${lng}/app/profile/basic-information/?isErrorVisibilityRequired=true`
      )
    );
  };

  render() {
    const {
      t,
      lng,
      business,
      businessId,
      businessGroups,
      businessMenus,
      businessPictures,
      businessProducts,
      businessOpenPeriods,
      businesses,
      changeCurrentBusiness,
      addBusiness,
      currentPage,
      children
    } = this.props;

    const { isPublishModalVisible } = this.state;

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
            this.showPublishModal,
            business && business.get("state")
          ),
          select: {
            value: {
              value: businessId,
              label:
                (business && business.get("name")) ||
                t("app:manageProfile.unnamedBusiness"),
              src: business && business.getIn(["logo", "url"])
            },
            items: prepareBusinessesList(t, businesses),
            handleChange: b => changeCurrentBusiness(b.value),
            bottomAction: {
              text: t("app:manageProfile.addNewBusiness"),
              handleClick: () => addBusiness()
            },
            withImage: true
          }
        }}
      >
        {business && business.get("state") !== "published" && (
          <PublishMobileIconWrapper>
            <ActionIcon
              size="sm"
              icon={["fa", "check"]}
              onClick={() => this.showPublishModal()}
            />
            <PublishHeader>{`${t("app:manageProfile.publish")}: ${business.get(
              "name"
            ) || t("app:manageProfile.unnamedBusiness")}`}</PublishHeader>
          </PublishMobileIconWrapper>
        )}
        {children}
        {isPublishModalVisible && (
          <Modal
            {...{ open: isPublishModalVisible, onClose: this.hidePublishModal }}
          >
            <PublishModal
              {...{
                t,
                lng,
                close: this.hidePublishModal,
                publish: this.publish,
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
      </AppLayout>
    );
  }
}

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
