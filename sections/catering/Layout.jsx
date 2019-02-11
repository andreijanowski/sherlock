import { func, string, node } from "prop-types";
import AppLayout from "layout/App";

const CateringLayout = ({ t, lng, children }) => (
  <AppLayout
    {...{
      mainIcon: "catering",
      header: t("header"),
      t,
      lng
    }}
  >
    {children}
  </AppLayout>
);

CateringLayout.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  children: node.isRequired
};

export default CateringLayout;
