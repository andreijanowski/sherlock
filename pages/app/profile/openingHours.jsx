import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import ProfileLayout from "sections/profile/Layout";
import Form from "sections/profile/openingHours";
import {
  getInitialValues,
  parseOpenPeriod
} from "sections/profile/openingHours/utils";
import { connect } from "react-redux";
import {
  postOpenPeriod,
  patchOpenPeriod,
  deleteOpenPeriod
} from "actions/openPeriods";
import { setCurrentBusiness } from "actions/users";
import { postBusiness } from "actions/businesses";

const namespaces = ["openingHours", "app", "publishModal", "forms"];

class OpeningHours extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  state = {
    copied: undefined
  };

  addOpenPeriod = openPeriod => {
    const {
      addOpenPeriod,
      business: { id }
    } = this.props;
    return addOpenPeriod(id, parseOpenPeriod(openPeriod));
  };

  updateOpenPeriod = openPeriod => {
    const { updateOpenPeriod } = this.props;
    return updateOpenPeriod(openPeriod.id, parseOpenPeriod(openPeriod));
  };

  removeOpenPeriod = id => {
    const { removeOpenPeriod } = this.props;
    return removeOpenPeriod(id);
  };

  copy = fields => this.setState({ copied: fields });

  paste = weekday => {
    const { copied } = this.state;
    if (copied && copied.length) {
      copied.forEach(async c => {
        this.addOpenPeriod({ ...c, weekday });
      });
    }
    return null;
  };

  render() {
    const {
      t,
      lng,
      business,
      businesses,
      changeCurrentBusiness,
      addBusiness
    } = this.props;
    const initialValues = getInitialValues(business);

    return (
      <ProfileLayout
        {...{
          t,
          lng,
          business,
          businesses,
          changeCurrentBusiness,
          addBusiness,
          currentPage: "openingHours"
        }}
      >
        <Form
          {...{
            t,
            initialValues,
            addOpenPeriod: this.addOpenPeriod,
            updateOpenPeriod: this.updateOpenPeriod,
            removeOpenPeriod: this.removeOpenPeriod,
            copy: this.copy,
            paste: this.paste
          }}
        />
      </ProfileLayout>
    );
  }
}

OpeningHours.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  addOpenPeriod: func.isRequired,
  updateOpenPeriod: func.isRequired,
  removeOpenPeriod: func.isRequired,
  addBusiness: func.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape())
};

OpeningHours.defaultProps = {
  business: null,
  businesses: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data,
        businesses: state.users.profileBusinesses.data
      }),
      {
        addBusiness: postBusiness,
        addOpenPeriod: postOpenPeriod,
        updateOpenPeriod: patchOpenPeriod,
        removeOpenPeriod: deleteOpenPeriod,
        changeCurrentBusiness: setCurrentBusiness
      }
    )(OpeningHours)
  )
);
