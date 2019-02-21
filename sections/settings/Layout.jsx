import AppLayout from "layout/App";
import { func, node, string } from "prop-types";
import { logout as logoutAction } from "actions/auth";
import { connect } from "react-redux";
import { generateMenuItems } from "./utils";

const SettingsLayout = ({ t, lng, children, currentPage, logout }) => (
  <AppLayout
    {...{
      mainIcon: "settings",
      header: "Settings",
      t,
      lng,
      withMenu: true,
      menuItems: generateMenuItems(t, currentPage, logout)
    }}
  >
    {children}
  </AppLayout>
);

SettingsLayout.propTypes = {
  t: func.isRequired,
  logout: func.isRequired,
  children: node.isRequired,
  currentPage: string.isRequired,
  lng: string.isRequired
};

export default connect(
  null,
  { logout: logoutAction }
)(SettingsLayout);

// export default SettingsLayout;
