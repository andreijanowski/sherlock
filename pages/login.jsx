import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { SingleActionView } from "components";
import SignInForm from "sections/login/SignInForm";

const namespaces = ["login", "forms"];

const Login = ({ t, i18n }) => (
  <SingleActionView
    {...{
      lng: (i18n && i18n.language) || "en",
      actionTitle: t("title"),
      actionDescription: t("description")
    }}
  >
    <SignInForm {...{ t, lng: (i18n && i18n.language) || "en" }} />
  </SingleActionView>
);

Login.getInitialProps = async () => ({ namespacesRequired: namespaces });

Login.propTypes = {
  t: func.isRequired,
  i18n: shape({ lng: string.isRequired }).isRequired
};

export default requireAuth(false)(withTranslation(namespaces)(Login));
