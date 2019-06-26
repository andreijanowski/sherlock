import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import Form from "sections/profile/basicInformation";
import {
  getInitialValues,
  getGroupsValues,
  isSelectValueChanged
} from "sections/profile/basicInformation/utils";
import { countries } from "utils/iso-3166-2";
import { getGroupsData } from "sections/profile/utils";
import ProfileLayout from "sections/profile/Layout";
import { connect } from "react-redux";
import { postBusiness, patchBusiness } from "actions/businesses";
import { fetchProfileBusiness } from "actions/users";
import { setCurrentBusiness } from "actions/app";

const namespaces = ["basicInformation", "app", "publishModal", "forms"];

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
    diets: []
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
    if (!(prevGroups && prevGroups.size) && (groups && groups.size)) {
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
      bio
    },
    {
      types,
      cuisines,
      foodsAndDrinks,
      quirks,
      diets,
      country: countryValue,
      region: regionValue
    }
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
            ...diets
          ])
        : undefined,
      ownerRole,
      bio
    };
    return updateBusiness(businessId, requestValues);
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
    const { types, cuisines, foodsAndDrinks, quirks, diets } = this.state;
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
          ]),
          groups: state.getIn(["groups", "data", "groups"])
        };
      },
      {
        updateBusiness: patchBusiness,
        changeCurrentBusiness: setCurrentBusiness,
        addBusiness: postBusiness,
        getProfileBusiness: fetchProfileBusiness
      }
    )(BasicInformation)
  )
);
