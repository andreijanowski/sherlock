import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, arrayOf, shape, bool } from "prop-types";
import LefoodLayout from "sections/lefood/Layout";
import { Periods, parsePeriods, parsePeriod } from "components";
import { connect } from "react-redux";
import {
  postOrderPeriod,
  patchOrderPeriod,
  deleteOrderPeriod
} from "actions/orderPeriods";
import { calcPendingOrders } from "sections/lefood/utils";
import { patchBusiness } from "actions/businesses";

const namespaces = ["lefood", "app", "forms"];

class OrderingHoursPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  state = {
    copied: undefined
  };

  addOrderPeriod = orderPeriod => {
    const {
      addOrderPeriod,
      currentBusiness: { id }
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
    const { t, lng, currentBusiness, updateBusiness, orders } = this.props;
    const {
      visibleInLefood,
      id,
      averageDeliveryTime,
      minAmountForDeliveryCents
    } = currentBusiness || {};
    const initialValues = currentBusiness
      ? parsePeriods(currentBusiness.orderPeriods)
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
          currentBusinessId: id
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
  currentBusiness: shape(),
  loading: bool.isRequired,
  orderingHours: arrayOf(shape()).isRequired,
  orders: arrayOf(shape()).isRequired,
  addOrderPeriod: func.isRequired,
  updateOrderPeriod: func.isRequired,
  removeOrderPeriod: func.isRequired,
  updateBusiness: func.isRequired
};

OrderingHoursPage.defaultProps = {
  currentBusiness: {}
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        currentBusiness: state.users.currentBusiness.data,
        orders: state.orders.data
      }),
      {
        addOrderPeriod: postOrderPeriod,
        updateOrderPeriod: patchOrderPeriod,
        removeOrderPeriod: deleteOrderPeriod,
        updateBusiness: patchBusiness
      }
    )(OrderingHoursPage)
  )
);
