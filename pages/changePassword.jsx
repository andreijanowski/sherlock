import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape } from "prop-types";
import { SingleActionView } from "components";
import ChangePasswordForm from "sections/changePassword/ChangePasswordForm";

const namespaces = ["changePassword", "forms"];

class ChangePassword extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
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
        <ChangePasswordForm {...{ t, token }} />
      </SingleActionView>
    );
  }
}

ChangePassword.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  query: shape().isRequired
};

export default requireAuth(false)(withI18next(namespaces)(ChangePassword));
