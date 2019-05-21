import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, arrayOf, shape, number } from "prop-types";
import LefoodLayout from "sections/lefood/Layout";
import { Periods, parsePeriods, parsePeriod } from "components";
import { connect } from "react-redux";
import {
  postOrderPeriod,
  patchOrderPeriod,
  deleteOrderPeriod
} from "actions/orderPeriods";
import { setCurrentBusiness } from "actions/app";
import { calcPendingOrders } from "sections/lefood/utils";
import { patchBusiness } from "actions/businesses";

const namespaces = ["lefood", "app", "forms"];

class OrderingHoursPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = {
    copied: undefined
  };

  addOrderPeriod = orderPeriod => {
    const { addOrderPeriod, businessId } = this.props;
    return addOrderPeriod(businessId, parsePeriod(orderPeriod));
  };

  updateOrderPeriod = orderPeriod => {
    const { updateOrderPeriod } = this.props;
    return updateOrderPeriod(orderPeriod.id, parsePeriod(orderPeriod));
  };

  removeOrderPeriod = id => {
    const { removeOrderPeriod } = this.props;
    return removeOrderPeriod(id);
  };

  copy = fields => this.setState({ copied: fields });

  paste = weekday => {
    const { copied } = this.state;
    if (copied && copied.length) {
      copied.forEach(async c => {
        this.addOrderPeriod({ ...c, weekday });
      });
    }
    return null;
  };

  render() {
    const {
      t,
      lng,
      updateBusiness,
      orders,
      business,
      businessId,
      dishesLength,
      deliveriesLength,
      businessOrderPeriods,
      businessOrderPeriodsLength,
      businesses,
      changeCurrentBusiness
    } = this.props;

    const initialValues = businessOrderPeriods
      ? parsePeriods(businessOrderPeriods)
      : undefined;

    return (
      <LefoodLayout
        {...{
          t,
          lng,
          page: "orderingHours",
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
        <Periods
          {...{
            t,
            initialValues,
            addPeriod: this.addOrderPeriod,
            updatePeriod: this.updateOrderPeriod,
            removePeriod: this.removeOrderPeriod,
            copy: this.copy,
            paste: this.paste
          }}
        />
      </LefoodLayout>
    );
  }
}

OrderingHoursPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  orderingHours: arrayOf(shape()),
  orders: arrayOf(shape()),
  addOrderPeriod: func.isRequired,
  updateOrderPeriod: func.isRequired,
  removeOrderPeriod: func.isRequired,
  updateBusiness: func.isRequired,
  businesses: arrayOf(shape()),
  changeCurrentBusiness: func.isRequired,
  businessId: string,
  dishesLength: number,
  deliveriesLength: number,
  businessOrderPeriodsLength: number,
  businessOrderPeriods: shape()
};

OrderingHoursPage.defaultProps = {
  business: {},
  businesses: null,
  orderingHours: null,
  orders: null,
  businessId: "",
  dishesLength: 0,
  deliveriesLength: 0,
  businessOrderPeriodsLength: 0,
  businessOrderPeriods: {}
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
        const businessOrderPeriods =
          businessData && businessData.get("orderPeriods");
        const dishes = state.getIn(["dishes", "data", "dishes"]);
        const deliveries = state.getIn(["deliveries", "data", "deliveries"]);
        return {
          loading:
            (!state.getIn(["deliveries", "isFailed"]) &&
              !state.getIn(["deliveries", "isSucceeded"])) ||
            state.getIn(["deliveries", "isFetching"]),
          deliveriesLength: deliveries && deliveries.size,
          dishesLength: dishes && dishes.size,
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          businessOrderPeriods,
          businessOrderPeriodsLength:
            businessOrderPeriods && businessOrderPeriods.size,
          businesses: state.getIn(["users", "profileBusinesses", "data"]),
          orders: state.getIn(["orders", "data", "orders"])
        };
      },
      {
        addOrderPeriod: postOrderPeriod,
        updateOrderPeriod: patchOrderPeriod,
        removeOrderPeriod: deleteOrderPeriod,
        updateBusiness: patchBusiness,
        changeCurrentBusiness: setCurrentBusiness
      }
    )(OrderingHoursPage)
  )
);
