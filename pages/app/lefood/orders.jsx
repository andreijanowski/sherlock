import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, arrayOf, shape, bool, number } from "prop-types";
import LefoodLayout from "sections/lefood/Layout";
import Orders from "sections/lefood/orders";
import {
  calcPendingOrders,
  parseOrders,
  columns as columnsNames
} from "sections/lefood/utils";
import { connect } from "react-redux";
import { patchOrder, patchOrderReject } from "actions/orders";
import { patchBusiness } from "actions/businesses";
import { setCurrentBusiness } from "actions/app";
import OrderDetails from "sections/lefood/orders/OrderDetails";
import { SliderStyles } from "sections/lefood/orders/styled";
import { action as toggleMenu } from "redux-burger-menu";

const namespaces = ["lefood", "app", "forms"];

class OrdersPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      columns: parseOrders(props.orders, props.t),
      draggedOrderState: null,
      pendingRejectionOrderId: undefined,
      orderDetailsId: undefined
    };
  }

  componentDidUpdate(prevProps) {
    const { loading, orders } = this.props;
    const { loading: wasLoading, orders: prevOrders } = prevProps;
    if ((wasLoading && !loading) || orders !== prevOrders) {
      this.refreshColumnsContent();
    }
  }

  refreshColumnsContent = () => {
    const { orders, t } = this.props;
    this.setState({
      columns: parseOrders(orders, t)
    });
  };

  handleDragEnd = ({ destination, source, draggableId }) => {
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      this.setState({ draggedOrderState: null });
      return;
    }

    const { updateOrder } = this.props;
    if (destination.droppableId === columnsNames.inProgress) {
      updateOrder({ state: "in_preparation" }, draggableId);
    } else if (destination.droppableId === columnsNames.done) {
      updateOrder({ state: "completed" }, draggableId);
    } else if (destination.droppableId === columnsNames.rejected) {
      this.setRejectModalVisibility(draggableId);
      return;
    }

    this.setState(state => {
      const sourceColumn = state.columns[source.droppableId];
      const newSourceOrderIds = Array.from(sourceColumn.orderIds);
      newSourceOrderIds.splice(source.index, 1);
      if (source.droppableId === destination.droppableId) {
        newSourceOrderIds.splice(destination.index, 0, draggableId);
        return {
          ...state,
          draggedOrderState: null,
          columns: {
            ...state.columns,
            [sourceColumn.id]: {
              ...sourceColumn,
              orderIds: newSourceOrderIds
            }
          }
        };
      }
      const destinationColumn = state.columns[destination.droppableId];
      const newDestinationOrderIds = Array.from(destinationColumn.orderIds);
      newDestinationOrderIds.splice(destination.index, 0, draggableId);
      return {
        ...state,
        draggedOrderState: null,
        columns: {
          ...state.columns,
          [sourceColumn.id]: {
            ...sourceColumn,
            orderIds: newSourceOrderIds
          },
          [destinationColumn.id]: {
            ...destinationColumn,
            orderIds: newDestinationOrderIds
          }
        }
      };
    });
  };

  updateOrder = (state, draggableId) => {
    const { updateOrder } = this.props;
    updateOrder({ state }, draggableId);
  };

  handleDragStart = ({ draggableId }) => {
    const { orders } = this.props;
    const order = orders && orders.find(o => o.id === draggableId);
    this.setState({ draggedOrderState: order ? order.state : null });
  };

  setRejectModalVisibility = orderId => {
    const { toggleOrderDetails } = this.props;
    toggleOrderDetails(false);
    this.setState({
      pendingRejectionOrderId: orderId,
      orderDetailsId: undefined
    });
  };

  handleRejectionSubmit = ({
    rejectReason,
    unavailableElements,
    otherRejectionReason
  }) => {
    const { rejectOrder, orders } = this.props;
    const { pendingRejectionOrderId } = this.state;
    const order = orders.find(o => o.id === pendingRejectionOrderId);
    const unavailableElementsIds = unavailableElements
      .map((unavailable, index) => {
        if (unavailable) {
          return order.elements[index].id;
        }
        return null;
      })
      .filter(e => !!e)
      .toString();
    rejectOrder(
      {
        rejectReason,
        unavailableElements:
          rejectReason === "dishes_unavailable"
            ? unavailableElementsIds || undefined
            : undefined,
        otherRejectionReason:
          rejectReason === "other" ? otherRejectionReason : undefined
      },
      pendingRejectionOrderId
    ).then(() => this.refreshColumnsContent());
    this.setRejectModalVisibility(undefined);
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
      orders,
      loading,
      updateBusiness,
      dishesLength,
      deliveriesLength,
      business,
      businesses,
      changeCurrentBusiness
    } = this.props;
    const {
      columns,
      draggedOrderState,
      pendingRejectionOrderId,
      orderDetailsId
    } = this.state;
    const {
      stripeCurrency,
      visibleInLefood,
      id,
      averageDeliveryTime,
      minAmountForDeliveryCents,
      orderPeriods,
      stripeUserId
    } = business || {};
    const orderDetails = orders
      ? orders.find(o => o.id === orderDetailsId)
      : null;
    return (
      <>
        <LefoodLayout
          {...{
            t,
            lng,
            page: "orders",
            pendingOrdersLength: calcPendingOrders(orders),
            visibleInLefood,
            updateBusiness,
            currentBusinessId: id,
            dishesLength,
            deliveriesLength,
            orderPeriodsLength: orderPeriods && orderPeriods.length,
            averageDeliveryTime,
            minAmountForDeliveryCents,
            currency: stripeCurrency,
            stripeUserId,
            business,
            businesses,
            changeCurrentBusiness
          }}
        >
          <Orders
            {...{
              onDragEnd: this.handleDragEnd,
              onDragStart: this.handleDragStart,
              updateOrder: this.updateOrder,
              toggleOrderDetails: this.toggleOrderDetails,
              handleRejectionSubmit: this.handleRejectionSubmit,
              setRejectModalVisibility: this.setRejectModalVisibility,
              pendingRejectionOrderId,
              draggedOrderState,
              orders,
              columns,
              loading,
              currency: stripeCurrency,
              t
            }}
          />
        </LefoodLayout>
        <SliderStyles />
        <div style={{ position: "absolute", left: 0 }}>
          <OrderDetails
            {...{
              orderDetails,
              t,
              updateOrder: this.updateOrder,
              setRejectModalVisibility: this.setRejectModalVisibility
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
  orders: arrayOf(shape()),
  business: shape(),
  loading: bool.isRequired,
  updateOrder: func.isRequired,
  rejectOrder: func.isRequired,
  updateBusiness: func.isRequired,
  toggleOrderDetails: func.isRequired,
  dishesLength: number.isRequired,
  deliveriesLength: number.isRequired,
  businesses: arrayOf(shape()),
  changeCurrentBusiness: func.isRequired
};

OrdersPage.defaultProps = {
  business: {},
  businesses: null,
  orders: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        loading:
          (!state.orders.isFailed && !state.orders.isSucceeded) ||
          state.orders.isFetching,
        orders: state.orders.data,
        dishesLength: state.dishes.data && state.dishes.data.length,
        deliveriesLength: state.deliveries.data && state.deliveries.data.length,
        business: state.users.currentBusiness.data,
        businesses: state.users.profileBusinesses.data
      }),
      {
        updateOrder: patchOrder,
        rejectOrder: patchOrderReject,
        updateBusiness: patchBusiness,
        toggleOrderDetails: toggleMenu,
        changeCurrentBusiness: setCurrentBusiness
      }
    )(OrdersPage)
  )
);
