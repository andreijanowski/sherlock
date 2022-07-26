import { Router } from "routes";
import isServer from "utils/isServer";
import { shape, string } from "prop-types";
import Cookies from "js-cookie";

const namespaces = ["app"];

export default requireAuth => ComposedComponent => {
  const Extended = ({ query, ...rest }) => {
    const { lng } = query;
    if (!isServer) {
      const isAuthenticated = !!Cookies.get("isAuthenticated");
      if (isAuthenticated && !requireAuth) {
        Router.pushRoute(`/${lng}/app/`);
        return null;
      }
      if (!isAuthenticated && requireAuth) {
        Router.pushRoute(`/${lng}/`);
        return null;
      }
    }
    return <ComposedComponent {...{ query, ...rest }} />;
  };

  Extended.getInitialProps = async () => ({
    namespacesRequired: namespaces
  });

  Extended.propTypes = {
    query: shape({
      lng: string.isRequired
    }).isRequired
  };

  return Extended;
};
