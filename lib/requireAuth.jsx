import { connect } from "react-redux";
import { Router } from "routes";
import isServer from "utils/isServer";
import { bool } from "prop-types";

export default requireAuth => ComposedComponent => {
  const Extended = ({ isAuthenticated, ...rest }) => {
    console.log({ isAuthenticated });
    if (!isServer && isAuthenticated && !requireAuth) {
      Router.pushRoute("/app/");
      return null;
    }
    if (!isServer && !isAuthenticated && requireAuth) {
      Router.pushRoute("/login/");
      return null;
    }
    return <ComposedComponent {...{ isAuthenticated, ...rest }} />;
  };

  Extended.propTypes = {
    isAuthenticated: bool.isRequired
  };

  return connect(state => ({
    isAuthenticated: state.auth.isAuthenticated
  }))(Extended);
};
