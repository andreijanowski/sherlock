import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import loadTranslations from "utils/loadTranslations";
import requireAuth from "lib/requireAuth";
import { func, string } from "prop-types";
import { SingleActionView } from "components";
import ResetPasswordForm from "sections/resetPassword/ResetPasswordForm";

const namespaces = ["resetPassword", "forms"];

class ResetPassword extends PureComponent {
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
        <ResetPasswordForm {...{ t }} />
      </SingleActionView>
    );
  }
}

ResetPassword.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default requireAuth(false)(withI18next(namespaces)(ResetPassword));
