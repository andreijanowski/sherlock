import AppLayout from "layout/App";
import { func, node } from "prop-types";
import { generateMenuItems } from "./utils";

const UserLayout = ({ t, children }) => (
  <AppLayout
    {...{
      mainIcon: "settings",
      header: "Settings",
      t,
      withMenu: true,
      menuItems: generateMenuItems(t, "basicInformation")
    }}
  >
    {children}
  </AppLayout>
);

UserLayout.propTypes = {
  t: func.isRequired,
  children: node.isRequired
};

export default UserLayout;
