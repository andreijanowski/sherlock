import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import loadTranslations from "utils/loadTranslations";
import { func, string } from "prop-types";
import { SingleActionView } from "components";
import SignInForm from "sections/login/SignInForm";

const namespaces = ["login", "forms"];

class Login extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
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
        <SignInForm {...{ t }} />
      </SingleActionView>
    );
  }
}

Login.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default withI18next(namespaces)(Login);
