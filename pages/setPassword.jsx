import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import { func, string, shape } from "prop-types";
import { SingleActionView } from "components";
import ChangePasswordForm from "sections/changePassword/ChangePasswordForm";

const namespaces = ["setPassword", "forms"];

class SetPassword extends PureComponent {
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

SetPassword.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  query: shape().isRequired
};

export default withNamespaces(namespaces)(SetPassword);
