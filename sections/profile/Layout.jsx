import { PureComponent } from "react";
import { func, string, arrayOf, shape, node } from "prop-types";
import AppLayout from "layout/App";
import { Modal } from "components";
import {
  generateMenuItems,
  prepareBusinessesList
} from "sections/profile/utils";

class ProfileLayout extends PureComponent {
  state = {
    isPublishModalVisible: false
  };

  showPublishModal = () => this.setState({ isPublishModalVisible: true });

  hidePublishModal = () => this.setState({ isPublishModalVisible: false });

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
          menuItems: generateMenuItems(t, currentPage, this.showPublishModal),
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
        {children}
        <Modal
          {...{ open: isPublishModalVisible, onClose: this.hidePublishModal }}
        >
          Hello this is modal
        </Modal>
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
  children: node.isRequired
};

ProfileLayout.defaultProps = {
  business: null,
  businesses: null
};

export default ProfileLayout;
