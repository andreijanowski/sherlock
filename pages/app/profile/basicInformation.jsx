import { PureComponent } from "react";
import { withTranslation } from "i18n";
import { func, string, shape } from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import requireAuth from "lib/requireAuth";
import Form from "sections/profile/basicInformation";
import {
  getInitialValues,
  getGroupsValues,
  isSelectValueChanged
} from "sections/profile/basicInformation/utils";
import { countries } from "utils/iso-3166-2";
import { getGroupsData } from "sections/profile/utils";
import ProfileLayout from "sections/profile/Layout";
import { postBusiness, patchBusiness } from "actions/businesses";
import { fetchProfileBusiness } from "actions/users";
import { setCurrentBusiness } from "actions/app";
import { addProtocol } from "utils/urls";

const namespaces = [
  "basicInformation",
  "contactInformation",
  "app",
  "publishModal",
  "forms"
];

class BasicInformation extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = {
    types: [],
    cuisines: [],
    foodsAndDrinks: [],
    quirks: [],
    diets: [],
    michelinStars: []
  };

  componentDidMount() {
    const { groups } = this.props;
    if (groups && groups.size) {
      this.loadGroups();
    }
  }

  componentDidUpdate(prevProps) {
    const { groups } = this.props;
    const { groups: prevGroups } = prevProps;
    if (
      (!(prevGroups && prevGroups.size) && groups && groups.size) ||
      (prevGroups && groups && prevGroups.size !== groups.size)
    ) {
      this.loadGroups();
    }
  }

  loadGroups = () => {
    const { groups } = this.props;
    this.setState(getGroupsData(groups));
  };

  handleSubmit = (
    {
      name,
      tagline,
      country,
      region,
      street,
      streetNumber,
      city,
      postCode,
      ownerRole,
      bio,
      email,
      phone,
      phoneCountry,
      website,
      facebook,
      instagram,
      youtube
    },
    { types, cuisines, foodsAndDrinks, quirks, diets, michelinStars },
    { country: countryValue, region: regionValue }
  ) => {
    const { updateBusiness, businessId } = this.props;
    const sendGroupsList =
      !name &&
      !tagline &&
      !(country && country.value) &&
      !(region && region.value) &&
      !street &&
      !streetNumber &&
      !city &&
      !postCode &&
      !ownerRole &&
      !bio;

    const requestValues = {
      name,
      tagline,
      countryCode: isSelectValueChanged(country, countryValue)
        ? country.value
        : undefined,
      regionCode: isSelectValueChanged(region, regionValue)
        ? region.value
        : undefined,
      street,
      streetNumber,
      city,
      postCode,
      groupsList: sendGroupsList
        ? getGroupsValues([
            ...types.slice(0, 3),
            ...cuisines.slice(0, 5),
            ...foodsAndDrinks.slice(0, 6),
            ...quirks.slice(0, 10),
            ...diets,
            ...michelinStars.slice(0, 1)
          ])
        : undefined,
      ownerRole,
      bio,
      email,
      phone,
      phoneCountryPrefix:
        phoneCountry && phoneCountry.value
          ? phoneCountry.value.prefix
          : undefined,
      phoneCountryCode:
        phoneCountry && phoneCountry.value
          ? phoneCountry.value.code
          : undefined,
      website: addProtocol(website),
      facebook: addProtocol(facebook),
      instagram: addProtocol(instagram),
      youtube: addProtocol(youtube)
    };
    if (Object.values(requestValues).some(v => !!v)) {
      return updateBusiness(businessId, requestValues);
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
      getProfileBusiness,
      query
    } = this.props;
    const { types, cuisines, foodsAndDrinks, quirks, diets, michelinStars } =
      this.state;
    const initialValues = getInitialValues({ business, businessGroups });
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
          currentPage: "basicInformation"
        }}
      >
        <Form
          {...{
            t,
            initialValues,
            countries,
            types,
            cuisines,
            foodsAndDrinks,
            quirks,
            diets,
            michelinStars,
            isErrorVisibilityRequired: !!query.isErrorVisibilityRequired,
            handleSubmit: this.handleSubmit
          }}
        />
      </ProfileLayout>
    );
  }
}

BasicInformation.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  businessId: string,
  businessGroups: shape(),
  businessMenus: shape(),
  businessPictures: shape(),
  businessProducts: shape(),
  businessOpenPeriods: shape(),
  groups: shape(),
  updateBusiness: func.isRequired,
  changeCurrentBusiness: func.isRequired,
  getProfileBusiness: func.isRequired,
  addBusiness: func.isRequired,
  businesses: shape(),
  query: shape()
};

BasicInformation.defaultProps = {
  business: null,
  businessId: "",
  businessGroups: null,
  businessMenus: null,
  businessPictures: null,
  businessProducts: null,
  businessOpenPeriods: null,
  businesses: null,
  groups: null,
  query: {}
};

export default compose(
  requireAuth(true),
  withTranslation(namespaces),
  connect(
    (state, { i18n }) => {
      const businessData = state.getIn(["users", "currentBusiness", "data"]);
      const business =
        businessData &&
        businessData.get("businesses") &&
        businessData.get("businesses").first();
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
        ]),
        groups: state.getIn(["groups", "data", "groups"]),
        lng: (i18n && i18n.language) || "en"
      };
    },
    {
      updateBusiness: patchBusiness,
      changeCurrentBusiness: setCurrentBusiness,
      addBusiness: postBusiness,
      getProfileBusiness: fetchProfileBusiness
    }
  )
)(BasicInformation);
