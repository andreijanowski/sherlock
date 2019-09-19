import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { SingleActionView } from "components";
import ResetPasswordForm from "sections/resetPassword/ResetPasswordForm";

const namespaces = ["resetPassword", "forms"];

const ResetPassword = ({ t, i18n }) => (
  <SingleActionView
    {...{
      lng: (i18n && i18n.language) || "en",
      actionTitle: t("title"),
      actionDescription: t("description")
    }}
  >
    <ResetPasswordForm {...{ t }} />
  </SingleActionView>
);

ResetPassword.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

ResetPassword.propTypes = {
  t: func.isRequired,
  i18n: shape({ lng: string.isRequired }).isRequired
};

export default requireAuth(false)(withTranslation(namespaces)(ResetPassword));
