import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import ProfileLayout from "sections/profile/Layout";
import { Periods, parsePeriods, parsePeriod } from "components";
import { connect } from "react-redux";
import {
  postOpenPeriod,
  patchOpenPeriod,
  deleteOpenPeriod
} from "actions/openPeriods";
import { setCurrentBusiness, fetchProfileBusiness } from "actions/users";
import { postBusiness, patchBusiness } from "actions/businesses";

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
    return addOpenPeriod(id, parsePeriod(openPeriod));
  };

  updateOpenPeriod = openPeriod => {
    const { updateOpenPeriod } = this.props;
    return updateOpenPeriod(openPeriod.id, parsePeriod(openPeriod));
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
      addBusiness,
      updateBusiness,
      getProfileBusiness
    } = this.props;

    const initialValues = business
      ? parsePeriods(business.openPeriods)
      : undefined;

    return (
      <ProfileLayout
        {...{
          t,
          lng,
          business,
          businesses,
          changeCurrentBusiness,
          addBusiness,
          updateBusiness,
          getProfileBusiness,
          currentPage: "openingHours"
        }}
      >
        <Periods
          {...{
            t,
            initialValues,
            addPeriod: this.addOpenPeriod,
            updatePeriod: this.updateOpenPeriod,
            removePeriod: this.removeOpenPeriod,
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
  updateBusiness: func.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  getProfileBusiness: func.isRequired,
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
        updateBusiness: patchBusiness,
        addOpenPeriod: postOpenPeriod,
        updateOpenPeriod: patchOpenPeriod,
        removeOpenPeriod: deleteOpenPeriod,
        changeCurrentBusiness: setCurrentBusiness,
        getProfileBusiness: fetchProfileBusiness
      }
    )(OpeningHours)
  )
);
