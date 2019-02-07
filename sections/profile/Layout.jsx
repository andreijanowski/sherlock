import { func, string, arrayOf, shape, node } from "prop-types";
import AppLayout from "layout/App";
import {
  generateMenuItems,
  prepareBusinessesList
} from "sections/profile/utils";

const ProfileLayout = ({
  t,
  lng,
  business,
  businesses,
  changeCurrentBusiness,
  addBusiness,
  currentPage,
  children
}) => (
  <AppLayout
    {...{
      mainIcon: "profile",
      header: t("header"),
      t,
      lng,
      withMenu: true,
      menuItems: generateMenuItems(t, currentPage),
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
  </AppLayout>
);

ProfileLayout.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape().isRequired,
  businesses: arrayOf(shape()).isRequired,
  changeCurrentBusiness: func.isRequired,
  addBusiness: func.isRequired,
  currentPage: string.isRequired,
  children: node.isRequired
};

export default ProfileLayout;
