import { PureComponent } from "react";
import SettingsLayout from "sections/settings/Layout";
import ChangePasswordForm from "sections/settings/password";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string } from "prop-types";
import { connect } from "react-redux";
import { changePassword } from "actions/auth";

const namespaces = ["passwordSettings", "app", "forms"];

class Password extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
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
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => ({ lng: (i18n && i18n.language) || "en" }),
      mapDispatchToProps
    )(Password)
  )
);
