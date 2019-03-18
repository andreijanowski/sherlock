import { PureComponent } from "react";
import SettingsLayout from "sections/settings/Layout";
import Form from "sections/settings/basicInformation";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import { func, shape, string } from "prop-types";
import { connect } from "react-redux";
import { updateProfile } from "actions/users";
import loadTranslations from "utils/loadTranslations";

const namespaces = ["settingsBasicInfo", "app", "forms"];

class BasicInformation extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
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
