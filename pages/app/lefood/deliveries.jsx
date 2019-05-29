import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, bool, number } from "prop-types";
import LefoodLayout from "sections/lefood/Layout";
import Delivery from "sections/lefood/delivery";
import { connect } from "react-redux";
import { postDelivery, deleteDelivery } from "actions/deliveries";
import { patchBusiness } from "actions/businesses";
import { setCurrentBusiness } from "actions/app";
import { calcPendingOrders } from "sections/lefood/utils";
import { convertToCents } from "utils/price";

const namespaces = ["lefood", "app", "forms"];

class DeliveriesPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  addDelivery = values => {
    const { addDelivery, business, businessId } = this.props;
    return addDelivery(
      {
        ...values,
        code: `${business.get("countryCode")}-${values.code}`,
        priceCents: convertToCents(values.priceCents),
        freeFromCents: convertToCents(values.freeFromCents)
      },
      businessId
    );
  };

  removeDelivery = id => {
    const { removeDelivery } = this.props;
    removeDelivery(id);
  };

  render() {
    const {
      t,
      lng,
      deliveries,
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
          page: "deliveryArea",
          pendingOrdersLength: calcPendingOrders(orders),
          updateBusiness,
          currentBusinessId: businessId,
          dishesLength,
          deliveriesLength,
          orderPeriodsLength: businessOrderPeriodsLength,
          business,
          businesses,
          changeCurrentBusiness
        }}
      >
        <Delivery
          {...{
            t,
            deliveries,
            loading,
            addDelivery: this.addDelivery,
            removeDelivery: this.removeDelivery
          }}
        />
      </LefoodLayout>
    );
  }
}

DeliveriesPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  deliveries: shape(),
  business: shape(),
  addDelivery: func.isRequired,
  removeDelivery: func.isRequired,
  loading: bool.isRequired,
  updateBusiness: func.isRequired,
  orders: shape(),
  businesses: shape(),
  changeCurrentBusiness: func.isRequired,
  businessId: string,
  dishesLength: number,
  deliveriesLength: number,
  businessOrderPeriodsLength: number
};

DeliveriesPage.defaultProps = {
  business: {},
  businesses: null,
  deliveries: null,
  orders: null,
  businessId: "",
  dishesLength: 0,
  deliveriesLength: 0,
  businessOrderPeriodsLength: 0
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
        const dishes = state.getIn(["dishes", "data", "dishes"]);
        const deliveries = state.getIn(["deliveries", "data", "deliveries"]);
        return {
          loading:
            (!state.getIn(["deliveries", "isFailed"]) &&
              !state.getIn(["deliveries", "isSucceeded"])) ||
            state.getIn(["deliveries", "isFetching"]),
          deliveries,
          deliveriesLength: deliveries && deliveries.size,
          dishesLength: dishes && dishes.size,
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
          orders: state.getIn(["orders", "data", "orders"])
        };
      },
      {
        addDelivery: postDelivery,
        removeDelivery: deleteDelivery,
        updateBusiness: patchBusiness,
        changeCurrentBusiness: setCurrentBusiness
      }
    )(DeliveriesPage)
  )
);
