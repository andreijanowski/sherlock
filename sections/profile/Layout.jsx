import { PureComponent } from "react";
import { func, string, arrayOf, shape, node } from "prop-types";
import AppLayout from "layout/App";
import { generateMenuItems } from "sections/profile/utils";
import prepareBusinessesList from "utils/prepareBusinessesList";
import { Modal, ActionIcon } from "components";
import PublishModal from "sections/profile/publishModal";
import { PublishMobileIconWrapper, PublishHeader } from "./styled";

class ProfileLayout extends PureComponent {
  state = {
    isPublishModalVisible: false
  };

  showPublishModal = () => {
    const {
      getProfileBusiness,
      business: { id }
    } = this.props;
    getProfileBusiness(id);
    this.setState({ isPublishModalVisible: true });
  };

  hidePublishModal = () => this.setState({ isPublishModalVisible: false });

  publish = () => {
    const {
      updateBusiness,
      business: { id }
    } = this.props;
    updateBusiness(id, { state: "waiting_for_approval" });
  };

  render() {
    const {
      t,
      lng,
      business,
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
            business && business.state
          ),
          select: {
            value: {
              value: business && business.id,
              label:
                (business && business.name) ||
                t("app:manageProfile.unnamedBusiness"),
              src: business && business.logo.url
            },
            items: prepareBusinessesList(t, businesses),
            handleChange: b => changeCurrentBusiness(b.value),
            bottomAction: {
              text: t("app:manageProfile.addNewBusiness"),
              handleClick: () => addBusiness()
            }
          }
        }}
      >
        {business && business.state !== "published" && (
          <PublishMobileIconWrapper>
            <ActionIcon
              size="sm"
              icon={["fa", "check"]}
              onClick={() => this.showPublishModal()}
            />
            <PublishHeader>{`${t("app:manageProfile.publish")}: ${
              business.name
                ? business.name
                : t("app:manageProfile.unnamedBusiness")
            }`}</PublishHeader>
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
                business
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
  businesses: arrayOf(shape()),
  changeCurrentBusiness: func.isRequired,
  addBusiness: func.isRequired,
  currentPage: string.isRequired,
  children: node.isRequired,
  updateBusiness: func.isRequired,
  getProfileBusiness: func.isRequired
};

ProfileLayout.defaultProps = {
  business: null,
  businesses: null
};

export default ProfileLayout;
