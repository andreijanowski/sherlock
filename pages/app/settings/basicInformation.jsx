import UserLayout from "sections/settings/Layout";
import Form from "sections/settings/basicInformation";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import { func, shape } from "prop-types";
import { connect } from "react-redux";
import { updateProfile } from "actions/users";

const namespaces = ["settingsBasicInfo", "app", "forms"];

const BasicInformation = ({ t, profile, updateProfileHandler }) => (
  <UserLayout {...{ t, currentPage: "basicInformation" }}>
    <Form {...{ t, profile, updateProfile: updateProfileHandler }} />
  </UserLayout>
);

BasicInformation.propTypes = {
  t: func.isRequired,
  updateProfileHandler: func.isRequired,
  profile: shape().isRequired
};

const mapStateToProps = state => ({
  profile: state.users.profile.data
});

const mapDispatchToProps = { updateProfileHandler: updateProfile };

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(BasicInformation)
  )
);
