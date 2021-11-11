import AppLayout from "layout/App";
import { func, node, string } from "prop-types";

const SettingsLayout = ({ t, lng, children }) => (
  <AppLayout
    {...{
      mainIcon: "settings",
      header: "Settings",
      t,
      lng
    }}
  >
    {children}
  </AppLayout>
);

SettingsLayout.propTypes = {
  t: func.isRequired,
  children: node.isRequired,
  lng: string.isRequired
};

export default SettingsLayout;
