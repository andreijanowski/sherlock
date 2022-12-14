import Notifications from "react-notification-system-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withTranslation } from "i18n";
import Immutable from "immutable";
import { compose } from "redux";

const namespaces = ["notifications", "forms"];

const DEFAULT_POSITION = "tl";

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
  notifications: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Immutable.List)
  ]).isRequired
};

const mapState = (state, { t }) => ({
  notifications: state.get("notifications").map(n => ({
    ...n,
    message: t(n.message, n.meta),
    position: n.position || DEFAULT_POSITION
  }))
});

export default compose(
  withTranslation(namespaces),
  connect(mapState)
)(NotificationCenter);
