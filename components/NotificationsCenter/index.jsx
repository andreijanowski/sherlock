import Notifications from "react-notification-system-redux";
import { connect } from "react-redux";
import { instanceOf } from "prop-types";
import { withTranslation } from "i18n";
import { List } from "immutable";

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
  notifications: instanceOf(List).isRequired
};

export default withTranslation(namespaces)(
  connect((state, { t }) => ({
    notifications: state.get("notifications").map(n => ({
      ...n,
      message: t(n.message, n.meta),
      position: "tl"
    }))
  }))(NotificationCenter)
);
