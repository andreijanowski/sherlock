import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, arrayOf, shape, bool } from "prop-types";
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
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  addDish = values => {
    const {
      addDish,
      business: { id }
    } = this.props;
    const { available, ...rest } = values;
    return addDish(
      {
        ...rest,
        unavailable: !values.available,
        pricePerItemCents: convertToCents(values.pricePerItemCents)
      },
      id
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
          page: "menu",
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
  dishes: arrayOf(shape()).isRequired,
  orders: arrayOf(shape()).isRequired,
  business: shape(),
  addDish: func.isRequired,
  removeDish: func.isRequired,
  addPicture: func.isRequired,
  loading: bool.isRequired,
  updateBusiness: func.isRequired,
  businesses: arrayOf(shape()),
  changeCurrentBusiness: func.isRequired
};

MenuPage.defaultProps = {
  business: {},
  businesses: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        loading:
          (!state.dishes.isFailed && !state.dishes.isSucceeded) ||
          state.dishes.isFetching,
        dishes: state.dishes.data,
        business: state.users.currentBusiness.data,
        businesses: state.users.profileBusinesses.data,
        orders: state.orders.data
      }),
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
