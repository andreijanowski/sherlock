import Notifications from "react-notification-system-redux";
import { connect } from "react-redux";
import { arrayOf, shape } from "prop-types";
import { withNamespaces } from "i18n";

const namespaces = ["notifications", "forms"];

const NotificationCenter = ({ notifications }) => (
  <Notifications
    notifications={notifications}
    style={{
      NotificationItem: {
        DefaultStyle: {
          paddingTop: "16px"
        }
      }
    }}
  />
);

NotificationCenter.propTypes = {
  notifications: arrayOf(shape({})).isRequired
};

export default withNamespaces(namespaces)(
  connect((state, { t }) => ({
    notifications: state.notifications.map(n => ({
      ...n,
      message: t(n.message, n.meta),
      position: "tl"
    }))
  }))(NotificationCenter)
);
