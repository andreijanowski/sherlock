import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { SingleActionView } from "components";
import CreateAccount from "sections/register/CreateAccount";

const namespaces = ["register", "forms"];

const Register = ({ t, i18n, query }) => (
  <SingleActionView
    {...{
      lng: (i18n && i18n.language) || "en",
      actionTitle: t("title"),
      actionDescription: t("description")
    }}
  >
    <CreateAccount {...{ t, lng: (i18n && i18n.language) || "en", query }} />
  </SingleActionView>
);

Register.getInitialProps = async () => ({ namespacesRequired: namespaces });

Register.propTypes = {
  t: func.isRequired,
  i18n: shape({ lng: string.isRequired }).isRequired,
  query: shape().isRequired
};

export default requireAuth(false)(withTranslation(namespaces)(Register));
