import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, arrayOf } from "prop-types";
import Form from "sections/profile/basicInformation";
import {
  getInitialValues,
  getGroupsValues
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
    if (groups.length) {
      this.loadGroups();
    }
  }

  componentDidUpdate(prevProps) {
    const { groups } = this.props;
    const { groups: prevGroups } = prevProps;
    if (!prevGroups.length && groups.length) {
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
    { types, cuisines, foodsAndDrinks, quirks, diets }
  ) => {
    const {
      updateBusiness,
      business: { id }
    } = this.props;
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
      countryCode: country ? country.value : undefined,
      regionCode: region ? region.value : undefined,
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
    return updateBusiness(id, requestValues);
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
      getProfileBusiness,
      query
    } = this.props;
    const { types, cuisines, foodsAndDrinks, quirks, diets } = this.state;
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
  groups: arrayOf(shape()).isRequired,
  updateBusiness: func.isRequired,
  changeCurrentBusiness: func.isRequired,
  getProfileBusiness: func.isRequired,
  addBusiness: func.isRequired,
  businesses: arrayOf(shape()),
  query: shape()
};

BasicInformation.defaultProps = {
  business: null,
  businesses: null,
  query: {}
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data,
        groups: state.groups.groups.data || [],
        businesses: state.users.profileBusinesses.data
      }),
      {
        updateBusiness: patchBusiness,
        changeCurrentBusiness: setCurrentBusiness,
        addBusiness: postBusiness,
        getProfileBusiness: fetchProfileBusiness
      }
    )(BasicInformation)
  )
);
