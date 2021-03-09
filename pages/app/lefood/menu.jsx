import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, bool, number } from "prop-types";
import LefoodLayout from "sections/lefood/Layout";
import Menu from "sections/lefood/menu";
import { connect } from "react-redux";
import { postDish, patchDish, deleteDish } from "actions/dishes";
import { postPicture, deletePicture } from "actions/pictures";
import {
  uploadMenuToUberEats,
  downloadMenuFromUberEats
} from "actions/integrations";
import { patchBusiness } from "actions/businesses";
import { setCurrentBusiness } from "actions/app";
import { mergeDishesData } from "sections/lefood/utils";
import { convertToCents } from "utils/price";

const namespaces = ["lefood", "app", "forms"];

class MenuPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  constructor() {
    super();
    this.state = {
      editedDishId: null
    };
  }

  setEditedDishId = editedDishId => this.setState({ editedDishId });

  addDish = values => {
    const { addDish, updateDish, businessId } = this.props;
    const { editedDishId } = this.state;
    const { available, name, description, category, onUberEats } = values;
    const dish = {
      name,
      description,
      onUberEats,
      unavailable: !available,
      pricePerItemCents: convertToCents(values.pricePerItemCents)
    };
    if (editedDishId) {
      return updateDish(dish, editedDishId, category);
    }
    return addDish(dish, businessId, category);
  };

  uploadMenu = id => {
    const { uploadMenu } = this.props;
    return uploadMenu(id);
  };

  downloadMenu = id => {
    const { downloadMenu } = this.props;
    return downloadMenu(id);
  };

  removeDish = id => {
    const { removeDish } = this.props;
    const { editedDishId } = this.state;
    if (id === editedDishId) {
      this.setEditedDishId(null);
    }
    removeDish(id);
  };

  addPicture = (picture, id) => {
    const { addPicture } = this.props;
    return addPicture("dish", id, picture);
  };

  removePicture = id => {
    const { removePicture } = this.props;
    const { editedDishId } = this.state;
    removePicture(id, "dish", editedDishId);
  };

  render() {
    const {
      t,
      lng,
      dishes,
      loading,
      updateBusiness,
      business,
      businessId,
      dishesLength,
      deliveriesLength,
      businessOrderPeriodsLength,
      businesses,
      changeCurrentBusiness,
      categories,
      isUberAvailable
    } = this.props;
    const { editedDishId } = this.state;

    return (
      <LefoodLayout
        {...{
          t,
          lng,
          page: "menu",
          updateBusiness,
          currentBusinessId: businessId,
          dishesLength,
          deliveriesLength,
          orderPeriodsLength: businessOrderPeriodsLength,
          business,
          businesses,
          changeCurrentBusiness,
          addToUber: this.uploadMenu,
          donwloadFromUber: this.downloadMenu,
          isUberAvailable
        }}
      >
        <Menu
          {...{
            t,
            dishes,
            categories,
            loading,
            editedDishId,
            addDish: this.addDish,
            businessId,
            setEditedDishId: this.setEditedDishId,
            removeDish: this.removeDish,
            addPicture: this.addPicture,
            removePicture: this.removePicture,
            addToUber: this.uploadMenu,
            donwloadFromUber: this.downloadMenu,
            isUberAvailable
          }}
        />
      </LefoodLayout>
    );
  }
}

MenuPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  dishes: shape(),
  business: shape(),
  categories: shape(),
  addDish: func.isRequired,
  addToUber: func.isRequired,
  updateDish: func.isRequired,
  removeDish: func.isRequired,
  addPicture: func.isRequired,
  removePicture: func.isRequired,
  loading: bool.isRequired,
  updateBusiness: func.isRequired,
  businesses: shape(),
  businessId: string,
  changeCurrentBusiness: func.isRequired,
  dishesLength: number,
  deliveriesLength: number,
  businessOrderPeriodsLength: number,
  uploadMenu: func.isRequired,
  downloadMenu: func.isRequired,
  isUberAvailable: bool
};

MenuPage.defaultProps = {
  business: {},
  categories: {},
  businessId: "",
  businesses: null,
  dishesLength: 0,
  deliveriesLength: 0,
  businessOrderPeriodsLength: 0,
  dishes: null,
  isUberAvailable: false
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => {
        const isUberConnected = state.getIn(["uberIntegrations"]);
        const isUberAvailable =
          isUberConnected && isUberConnected.get("isConnectedToUberEats");
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business =
          businessData &&
          businessData.get("businesses") &&
          businessData.get("businesses").first();
        const dishes = state.getIn(["dishes", "data", "dishes"]);
        const pictures = state.getIn(["dishes", "data", "pictures"]);
        const deliveries = state.getIn(["deliveries", "data", "deliveries"]);
        const categories = state.getIn(["categories", "data", "categories"]);
        const loadingDishes =
          (!state.getIn(["dishes", "isFailed"]) &&
            !state.getIn(["dishes", "isSucceeded"])) ||
          state.getIn(["dishes", "isFetching"]);
        const loadingCategories =
          (!state.getIn(["categories", "isFailed"]) &&
            !state.getIn(["categories", "isSucceeded"])) ||
          state.getIn(["categories", "isFetching"]);

        return {
          isUberAvailable,
          loading: loadingDishes || loadingCategories,
          dishes: mergeDishesData(dishes, pictures),
          categories,
          dishesLength: dishes && dishes.size,
          deliveriesLength: deliveries && deliveries.size,
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          businessOrderPeriodsLength:
            businessData &&
            businessData.get("orderPeriods") &&
            businessData.get("orderPeriods").size,
          businesses: state.getIn([
            "users",
            "profileBusinesses",
            "data",
            "businesses"
          ]),
          lng: (i18n && i18n.language) || "en"
        };
      },
      {
        addDish: postDish,
        updateDish: patchDish,
        removeDish: deleteDish,
        addPicture: postPicture,
        removePicture: deletePicture,
        updateBusiness: patchBusiness,
        changeCurrentBusiness: setCurrentBusiness,
        uploadMenu: uploadMenuToUberEats,
        downloadMenu: downloadMenuFromUberEats
      }
    )(MenuPage)
  )
);
