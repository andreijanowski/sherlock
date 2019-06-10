import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { SingleActionView } from "components";
import ChangePasswordForm from "sections/changePassword/ChangePasswordForm";

const namespaces = ["changePassword", "forms"];

class ChangePassword extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  render() {
    const {
      t,
      lng,
      query: { token }
    } = this.props;
    return (
      <SingleActionView
        {...{
          lng,
          actionTitle: t("title")
        }}
      >
        <ChangePasswordForm {...{ t, lng, token }} />
      </SingleActionView>
    );
  }
}

ChangePassword.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  query: shape().isRequired
};

export default requireAuth(false)(withNamespaces(namespaces)(ChangePassword));
