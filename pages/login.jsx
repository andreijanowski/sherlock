import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string } from "prop-types";
import { SingleActionView } from "components";
import SignInForm from "sections/login/SignInForm";

const namespaces = ["login", "forms"];

class Login extends PureComponent {
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
        <SignInForm {...{ t, lng }} />
      </SingleActionView>
    );
  }
}

Login.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default requireAuth(false)(withNamespaces(namespaces)(Login));
