import { PureComponent } from "react";
import UserLayout from "sections/settings/Layout";
import ChangePasswordForm from "sections/settings/password";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import { func, shape, string } from "prop-types";
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
    const { t, lng, profile, changePasswordHandler } = this.props;
    return (
      <UserLayout {...{ t, lng, currentPage: "password" }}>
        <ChangePasswordForm
          {...{ t, profile, changePassword: changePasswordHandler }}
        />
      </UserLayout>
    );
  }
}

Password.propTypes = {
  t: func.isRequired,
  changePasswordHandler: func.isRequired,
  profile: shape().isRequired,
  lng: string.isRequired
};

const mapStateToProps = state => ({
  profile: state.users.profile.data
});

const mapDispatchToProps = { changePasswordHandler: changePassword };

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Password)
  )
);
