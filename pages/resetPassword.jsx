import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string } from "prop-types";
import { SingleActionView } from "components";
import ResetPasswordForm from "sections/resetPassword/ResetPasswordForm";

const namespaces = ["resetPassword", "forms"];

class ResetPassword extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  render() {
    const { t, lng } = this.props;
    return (
      <SingleActionView
        {...{
          lng,
          actionTitle: t("title"),
          actionDescription: t("description")
        }}
      >
        <ResetPasswordForm {...{ t }} />
      </SingleActionView>
    );
  }
}

ResetPassword.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default requireAuth(false)(withNamespaces(namespaces)(ResetPassword));
