import { PureComponent } from "react";
import SettingsLayout from "sections/settings/Layout";
import ChangePasswordForm from "sections/settings/password";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import { func, string } from "prop-types";
import { connect } from "react-redux";
import { changePassword } from "actions/auth";
import loadTranslations from "utils/loadTranslations";

const namespaces = ["passwordSettings", "app", "forms"];

class Password extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  render() {
    const { t, lng, changePasswordHandler } = this.props;
    return (
      <SettingsLayout {...{ t, lng, currentPage: "password" }}>
        <ChangePasswordForm {...{ t, changePassword: changePasswordHandler }} />
      </SettingsLayout>
    );
  }
}

Password.propTypes = {
  t: func.isRequired,
  changePasswordHandler: func.isRequired,
  lng: string.isRequired
};

const mapDispatchToProps = { changePasswordHandler: changePassword };

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      null,
      mapDispatchToProps
    )(Password)
  )
);
