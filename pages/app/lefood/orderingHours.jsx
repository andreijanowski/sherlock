import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, arrayOf, shape } from "prop-types";
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
    const {
      addOrderPeriod,
      business: { id }
    } = this.props;
    return addOrderPeriod(id, parsePeriod(orderPeriod));
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
      businesses,
      changeCurrentBusiness
    } = this.props;
    const {
      visibleInLefood,
      id,
      averageDeliveryTime,
      minAmountForDeliveryCents,
      stripeCurrency,
      stripeUserId
    } = business || {};
    const initialValues = business
      ? parsePeriods(business.orderPeriods)
      : undefined;

    return (
      <LefoodLayout
        {...{
          t,
          lng,
          page: "orderingHours",
          pendingOrdersLength: calcPendingOrders(orders),
          visibleInLefood,
          updateBusiness,
          averageDeliveryTime,
          minAmountForDeliveryCents,
          currentBusinessId: id,
          currency: stripeCurrency,
          stripeUserId,
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
  changeCurrentBusiness: func.isRequired
};

OrderingHoursPage.defaultProps = {
  business: {},
  businesses: null,
  orderingHours: null,
  orders: null
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data,
        businesses: state.users.profileBusinesses.data,
        orders: state.orders.data
      }),
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
