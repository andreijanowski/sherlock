import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import AppLayout from "layout/App";
import Form from "sections/profile/basicInformation";
import {
  countries,
  getGroupsByParentGroups,
  getInitialValues,
  getGroupsValues
} from "sections/profile/basicInformation/utils";
import { connect } from "react-redux";
import { patchBusiness } from "actions/businesses";

const namespaces = ["basicInformation", "app"];

class BasicInformation extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
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
    const types = getGroupsByParentGroups(groups, ["types"]);
    const cuisines = getGroupsByParentGroups(groups, ["cuisines"]);
    const foodsAndDrinks = getGroupsByParentGroups(groups, ["foods", "drinks"]);
    const quirks = getGroupsByParentGroups(groups, ["quirks"]);
    const diets = getGroupsByParentGroups(groups, ["diets"]);
    this.setState({
      types,
      cuisines,
      foodsAndDrinks,
      quirks,
      diets
    });
  };

  handleSubmit = async (
    {
      name,
      tagline,
      country,
      region,
      street,
      streetNumber,
      postCode,
      ownerRole,
      bio
    },
    { types, cuisines, foodsAndDrinks, quirks, diets }
  ) => {
    try {
      const { updateBusiness, slug } = this.props;
      const requestValues = {
        name,
        tagline,
        countryCode: country ? country.value : undefined,
        regionCode: region ? region.value : undefined,
        street,
        streetNumber,
        postCode,
        groupsList: getGroupsValues([
          ...types,
          ...cuisines,
          ...foodsAndDrinks,
          ...quirks,
          ...diets
        ]),
        ownerRole,
        bio
      };
      return updateBusiness(slug, requestValues);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  render() {
    const { t, lng, slug, business } = this.props;
    const { types, cuisines, foodsAndDrinks, quirks, diets } = this.state;
    const initialValues = getInitialValues(business);

    return (
      <AppLayout
        {...{
          mainIcon: "profile",
          header: t("header"),
          t,
          lng,
          slug
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
            handleSubmit: this.handleSubmit
          }}
        />
      </AppLayout>
    );
  }
}

BasicInformation.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  slug: string.isRequired,
  business: shape(),
  groups: arrayOf(shape()).isRequired,
  updateBusiness: func.isRequired
};

BasicInformation.defaultProps = {
  business: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data,
        groups: state.groups.groups.data || []
      }),
      { updateBusiness: patchBusiness }
    )(BasicInformation)
  )
);
