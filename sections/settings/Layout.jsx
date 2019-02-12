import AppLayout from "layout/App";
import { func, node, string } from "prop-types";
import { generateMenuItems } from "./utils";

const UserLayout = ({ t, lng, children, currentPage }) => (
  <AppLayout
    {...{
      mainIcon: "settings",
      header: "Settings",
      t,
      lng,
      withMenu: true,
      menuItems: generateMenuItems(t, currentPage)
    }}
  >
    {children}
  </AppLayout>
);

UserLayout.propTypes = {
  t: func.isRequired,
  children: node.isRequired,
  currentPage: string.isRequired,
  lng: string.isRequired
};

export default UserLayout;
