import UserLayout from "sections/settings/Layout";
import ChangePasswordForm from "sections/settings/password";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import { func, shape } from "prop-types";
import { connect } from "react-redux";
import { changePassword } from "actions/auth";

const namespaces = ["passwordSettings", "app", "forms"];

const Password = ({ t, profile, changePasswordHandler }) => (
  <UserLayout {...{ t, currentPage: "password" }}>
    <ChangePasswordForm
      {...{ t, profile, changePassword: changePasswordHandler }}
    />
  </UserLayout>
);

Password.propTypes = {
  t: func.isRequired,
  changePasswordHandler: func.isRequired,
  profile: shape().isRequired
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
