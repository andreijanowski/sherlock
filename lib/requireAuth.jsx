import { connect } from "react-redux";
import { Router } from "routes";
import isServer from "utils/isServer";
import { bool, shape, string } from "prop-types";

export default requireAuth => ComposedComponent => {
  const Extended = ({ isAuthenticated, query, ...rest }) => {
    const { lng } = query;
    if (!isServer) {
      try {
        const credentials = JSON.parse(
          window.localStorage.getItem("credentials")
        );
        if (credentials.accessToken && !requireAuth) {
          Router.pushRoute(`/${lng}/app/`);
          return null;
        }
      } catch (e) {
        if (requireAuth) {
          Router.pushRoute(`/${lng}/login/`);
          return null;
        }
      }
    }
    return <ComposedComponent {...{ isAuthenticated, query, ...rest }} />;
  };

  Extended.propTypes = {
    isAuthenticated: bool.isRequired,
    query: shape({
      lng: string.isRequired
    }).isRequired
  };

  return connect(state => ({
    isAuthenticated: state.getIn(["auth", "isAuthenticated"])
  }))(Extended);
};
