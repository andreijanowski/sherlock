import { withTranslation } from "i18n";
import { func, string, shape } from "prop-types";
import { SingleActionView } from "components";
import ChangePasswordForm from "sections/changePassword/ChangePasswordForm";

const namespaces = ["setPassword", "forms"];

const SetPassword = ({ t, i18n, query: { token } }) => (
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

SetPassword.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

SetPassword.propTypes = {
  t: func.isRequired,
  i18n: shape({ lng: string.isRequired }).isRequired,
  query: shape().isRequired
};

export default withTranslation(namespaces)(SetPassword);
