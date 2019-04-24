import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, arrayOf, shape, bool } from "prop-types";
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
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  addDelivery = values => {
    const {
      addDelivery,
      business: { id, countryCode }
    } = this.props;
    return addDelivery(
      {
        ...values,
        code: `${countryCode}-${values.code}`,
        priceCents: convertToCents(values.priceCents),
        freeFromCents: convertToCents(values.freeFromCents)
      },
      id
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
    return (
      <LefoodLayout
        {...{
          t,
          lng,
          page: "deliveryArea",
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
  deliveries: arrayOf(shape()).isRequired,
  business: shape(),
  addDelivery: func.isRequired,
  removeDelivery: func.isRequired,
  loading: bool.isRequired,
  updateBusiness: func.isRequired,
  orders: arrayOf(shape()).isRequired,
  businesses: arrayOf(shape()),
  changeCurrentBusiness: func.isRequired
};

DeliveriesPage.defaultProps = {
  business: {},
  businesses: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        loading:
          (!state.deliveries.isFailed && !state.deliveries.isSucceeded) ||
          state.deliveries.isFetching,
        deliveries: state.deliveries.data,
        business: state.users.currentBusiness.data,
        businesses: state.users.profileBusinesses.data,
        orders: state.orders.data
      }),
      {
        addDelivery: postDelivery,
        removeDelivery: deleteDelivery,
        updateBusiness: patchBusiness,
        changeCurrentBusiness: setCurrentBusiness
      }
    )(DeliveriesPage)
  )
);
