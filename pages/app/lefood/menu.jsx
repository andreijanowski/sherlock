import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, arrayOf, shape, bool, number } from "prop-types";
import LefoodLayout from "sections/lefood/Layout";
import Menu from "sections/lefood/menu";
import { connect } from "react-redux";
import { postDish, deleteDish } from "actions/dishes";
import { postPicture } from "actions/pictures";
import { patchBusiness } from "actions/businesses";
import { setCurrentBusiness } from "actions/app";
import { calcPendingOrders } from "sections/lefood/utils";
import { convertToCents } from "utils/price";

const namespaces = ["lefood", "app", "forms"];

class MenuPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  addDish = values => {
    const { addDish, businessId } = this.props;
    const { available, ...rest } = values;
    return addDish(
      {
        ...rest,
        unavailable: !values.available,
        pricePerItemCents: convertToCents(values.pricePerItemCents)
      },
      businessId
    );
  };

  removeDish = id => {
    const { removeDish } = this.props;
    removeDish(id);
  };

  addPicture = (picture, id) => {
    const { addPicture } = this.props;
    addPicture("dish", id, picture);
  };

  render() {
    const {
      t,
      lng,
      dishes,
      loading,
      updateBusiness,
      orders,
      business,
      businessId,
      dishesLength,
      deliveriesLength,
      businessOrderPeriodsLength,
      businesses,
      changeCurrentBusiness
    } = this.props;
    return (
      <LefoodLayout
        {...{
          t,
          lng,
          page: "menu",
          pendingOrdersLength: calcPendingOrders(orders),
          visibleInLefood: business && business.get("visibleInLefood"),
          updateBusiness,
          currentBusinessId: businessId,
          dishesLength,
          deliveriesLength,
          orderPeriodsLength: businessOrderPeriodsLength,
          averageDeliveryTime: business && business.get("averageDeliveryTime"),
          minAmountForDeliveryCents:
            business && business.get("minAmountForDeliveryCents"),
          currency: business && business.get("stripeCurrency"),
          stripeUserId: business && business.get("stripeUserId"),
          business,
          businesses,
          changeCurrentBusiness
        }}
      >
        <Menu
          {...{
            t,
            dishes,
            loading,
            addDish: this.addDish,
            removeDish: this.removeDish,
            addPicture: this.addPicture
          }}
        />
      </LefoodLayout>
    );
  }
}

MenuPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  dishes: arrayOf(shape()),
  orders: arrayOf(shape()),
  business: shape(),
  addDish: func.isRequired,
  removeDish: func.isRequired,
  addPicture: func.isRequired,
  loading: bool.isRequired,
  updateBusiness: func.isRequired,
  businesses: arrayOf(shape()),
  businessId: string,
  changeCurrentBusiness: func.isRequired,
  dishesLength: number,
  deliveriesLength: number,
  businessOrderPeriodsLength: number
};

MenuPage.defaultProps = {
  business: {},
  businessId: "",
  businesses: null,
  dishesLength: 0,
  deliveriesLength: 0,
  businessOrderPeriodsLength: 0,
  orders: null,
  dishes: null
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
        return {
          loading:
            (!state.getIn(["dishes", "isFailed"]) &&
              !state.getIn(["dishes", "isSucceeded"])) ||
            state.getIn(["dishes", "isFetching"]),
          dishes: state.getIn(["dishes", "data", "dishes"]),
          dishesLength:
            state.getIn(["dishes", "data", "dishes"]) &&
            state.getIn(["dishes", "data", "dishes"]).size,
          deliveriesLength:
            state.getIn(["deliveries", "data", "deliveries"]) &&
            state.getIn(["deliveries", "data", "deliveries"]).size,
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          businessOrderPeriodsLength:
            businessData &&
            businessData.get("orderPeriods") &&
            businessData.get("orderPeriods").size,
          businesses: state.getIn(["users", "profileBusinesses", "data"]),
          orders: state.getIn(["orders", "data", "orders"])
        };
      },
      {
        addDish: postDish,
        removeDish: deleteDish,
        addPicture: postPicture,
        updateBusiness: patchBusiness,
        changeCurrentBusiness: setCurrentBusiness
      }
    )(MenuPage)
  )
);
