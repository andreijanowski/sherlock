import { connect } from "react-redux";
import { Router } from "routes";
import isServer from "utils/isServer";
import { bool, shape, string } from "prop-types";

export default requireAuth => ComposedComponent => {
  const Extended = ({ isAuthenticated, query, ...rest }) => {
    const { lng } = query;
    if (!isServer && isAuthenticated && !requireAuth) {
      Router.pushRoute(`/${lng}/app/`);
      return null;
    }
    if (!isServer && !isAuthenticated && requireAuth) {
      Router.pushRoute(`/${lng}/login/`);
      return null;
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
