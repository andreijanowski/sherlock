import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, number } from "prop-types";
import LefoodLayout from "sections/lefood/Layout";
import OrdersHistory from "sections/lefood/ordersHistory";
import { mergeOrdersData } from "sections/lefood/utils";
import { connect } from "react-redux";
import { patchBusiness, fetchBusinessOrdersHistory } from "actions/businesses";
import { setCurrentBusiness } from "actions/app";
import OrderDetails from "sections/lefood/orders/OrderDetails";
import { SliderStyles } from "components";
import { action as toggleMenu } from "redux-burger-menu/immutable";
import { fromJS } from "immutable";

const namespaces = ["lefood", "app", "forms"];

const parseFilter = filter => {
  if (filter.states) {
    return {
      ...filter,
      states: filter.states.map(s => s.value).toString()
    };
  }
  return filter;
};

class OrdersPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = {
    orderDetailsId: undefined,
    orders: null,
    loading: false,
    totalPages: 1,
    currentPage: 1,
    filter: {}
  };

  componentDidMount() {
    const { businessId } = this.props;
    if (businessId) {
      this.getOrdersHistory();
    }
  }

  componentDidUpdate(prevProps) {
    const { businessId: prevBusinessId } = prevProps;
    const { businessId } = this.props;
    if (businessId && businessId !== prevBusinessId) {
      this.getOrdersHistory();
    }
  }

  getOrdersHistory = async (page = 1) => {
    const { getBusinessOrdersHistory, businessId } = this.props;
    const { filter } = this.state;
    this.setState({
      isNextPageLoading: true,
      loading: page === 1
    });
    try {
      const res = await getBusinessOrdersHistory(
        businessId,
        page,
        parseFilter(filter)
      );
      const { orders, elements, addresses } = res.data;
      const { totalPages } = res.rawData.meta;
      const newOrders = mergeOrdersData(
        fromJS(orders),
        fromJS(elements),
        fromJS(addresses)
      );
      this.setState(state => ({
        orders: page !== 1 ? state.orders.mergeDeep(newOrders) : newOrders,
        totalPages,
        currentPage: page,
        isNextPageLoading: false,
        loading: false
      }));
    } catch (e) {
      console.log(e);
      this.setState({
        isNextPageLoading: false,
        loading: false
      });
    }
  };

  onFilterSubmit = filter => {
    this.setState({ filter }, () => this.getOrdersHistory());
  };

  toggleOrderDetails = orderId => {
    const { toggleOrderDetails } = this.props;
    this.setState({
      orderDetailsId: orderId
    });
    toggleOrderDetails(!!orderId);
  };

  render() {
    const {
      t,
      lng,
      updateBusiness,
      dishesLength,
      deliveriesLength,
      business,
      businessId,
      businessOrderPeriodsLength,
      businesses,
      changeCurrentBusiness
    } = this.props;
    const {
      orderDetailsId,
      orders,
      loading,
      totalPages,
      currentPage,
      isNextPageLoading,
      filter
    } = this.state;

    const orderDetails =
      orderDetailsId && orders ? orders.get(orderDetailsId) : null;

    return (
      <>
        <LefoodLayout
          {...{
            t,
            lng,
            page: "orders",
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
          <OrdersHistory
            {...{
              toggleOrderDetails: this.toggleOrderDetails,
              orders,
              loading,
              hasNextPage: totalPages > currentPage,
              isNextPageLoading,
              loadNextPage: () => this.getOrdersHistory(currentPage + 1),
              onFilterSubmit: this.onFilterSubmit,
              filter,
              t
            }}
          />
        </LefoodLayout>
        <SliderStyles />
        <div style={{ position: "absolute", left: 0 }}>
          <OrderDetails
            {...{
              orderDetails,
              t
            }}
          />
        </div>
      </>
    );
  }
}

OrdersPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  updateBusiness: func.isRequired,
  toggleOrderDetails: func.isRequired,
  dishesLength: number,
  deliveriesLength: number,
  businesses: shape(),
  businessId: string,
  businessOrderPeriodsLength: number,
  changeCurrentBusiness: func.isRequired,
  getBusinessOrdersHistory: func.isRequired
};

OrdersPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  businessOrderPeriodsLength: 0,
  dishesLength: 0,
  deliveriesLength: 0
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
        return {
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
        updateBusiness: patchBusiness,
        toggleOrderDetails: toggleMenu,
        changeCurrentBusiness: setCurrentBusiness,
        getBusinessOrdersHistory: fetchBusinessOrdersHistory
      }
    )(OrdersPage)
  )
);
