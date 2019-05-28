import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import ProfileLayout from "sections/profile/Layout";
import {
  Periods,
  parsePeriods,
  parsePeriod,
  isMovableBusiness
} from "components";
import { connect } from "react-redux";
import {
  postOpenPeriod,
  patchOpenPeriod,
  deleteOpenPeriod
} from "actions/openPeriods";
import { fetchProfileBusiness } from "actions/users";
import { setCurrentBusiness } from "actions/app";
import { postBusiness, patchBusiness } from "actions/businesses";

const namespaces = ["openingHours", "app", "publishModal", "forms"];

class OpeningHours extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = {
    copied: undefined
  };

  addOpenPeriod = openPeriod => {
    const { addOpenPeriod, businessId } = this.props;
    return addOpenPeriod(businessId, parsePeriod(openPeriod));
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
      businessId,
      businessGroups,
      businessMenus,
      businessPictures,
      businessProducts,
      businessOpenPeriods,
      businesses,
      changeCurrentBusiness,
      addBusiness,
      updateBusiness,
      getProfileBusiness
    } = this.props;

    const initialValues = parsePeriods(businessOpenPeriods);

    const isLocationVisible = businessGroups
      ? isMovableBusiness(businessGroups)
      : false;

    return (
      <ProfileLayout
        {...{
          t,
          lng,
          business,
          businessId,
          businessGroups,
          businessMenus,
          businessPictures,
          businessProducts,
          businessOpenPeriods,
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
            isLocationVisible,
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
  businessId: string,
  businessGroups: shape(),
  businessMenus: shape(),
  businessPictures: shape(),
  businessProducts: shape(),
  businessOpenPeriods: shape(),
  changeCurrentBusiness: func.isRequired,
  getProfileBusiness: func.isRequired,
  businesses: shape()
};

OpeningHours.defaultProps = {
  business: null,
  businessId: "",
  businessGroups: null,
  businessMenus: null,
  businessPictures: null,
  businessProducts: null,
  businessOpenPeriods: null,
  businesses: null
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
        return {
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          businessGroups: businessData && businessData.get("groups"),
          businessMenus: businessData && businessData.get("menus"),
          businessPictures: businessData && businessData.get("pictures"),
          businessProducts: businessData && businessData.get("products"),
          businessOpenPeriods: businessData && businessData.get("openPeriods"),
          businesses: state.getIn([
            "users",
            "profileBusinesses",
            "data",
            "businesses"
          ])
        };
      },
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
