import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { SingleActionView } from "components";
import ChangePasswordForm from "sections/changePassword/ChangePasswordForm";

const namespaces = ["changePassword", "forms"];

const ChangePassword = ({ t, i18n, query: { token } }) => (
  <SingleActionView
    {...{
      lng: (i18n && i18n.language) || "en",
      actionTitle: t("title")
    }}
  >
    <ChangePasswordForm
      {...{ t, lng: (i18n && i18n.language) || "en", token }}
    />
  </SingleActionView>
);

ChangePassword.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

ChangePassword.propTypes = {
  t: func.isRequired,
  i18n: shape({ lng: string.isRequired }).isRequired,
  query: shape().isRequired
};

export default requireAuth(false)(withTranslation(namespaces)(ChangePassword));
