import { PureComponent } from "react";
import SettingsLayout from "sections/settings/Layout";
import Form from "sections/settings/basicInformation";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, shape, string } from "prop-types";
import { connect } from "react-redux";
import { updateProfile } from "actions/users";

const namespaces = ["settingsBasicInfo", "app", "forms"];

class BasicInformation extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  render() {
    const { t, lng, profile, updateProfileHandler } = this.props;
    return (
      <SettingsLayout {...{ t, lng, currentPage: "basicInformation" }}>
        <Form {...{ t, profile, updateProfile: updateProfileHandler }} />
      </SettingsLayout>
    );
  }
}

BasicInformation.propTypes = {
  t: func.isRequired,
  updateProfileHandler: func.isRequired,
  profile: shape(),
  lng: string.isRequired
};

BasicInformation.defaultProps = {
  profile: null
};

const mapStateToProps = state => {
  const profile = state.getIn(["users", "profile", "data", "users"]);
  return {
    profile: profile ? profile.first() : profile
  };
};

const mapDispatchToProps = { updateProfileHandler: updateProfile };

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(BasicInformation)
  )
);
