import { Router } from "routes";
import isServer from "utils/isServer";
import { shape, string } from "prop-types";

export default requireAuth => ComposedComponent => {
  const Extended = ({ query, ...rest }) => {
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
    return <ComposedComponent {...{ query, ...rest }} />;
  };

  Extended.propTypes = {
    query: shape({
      lng: string.isRequired
    }).isRequired
  };

  return Extended;
};
