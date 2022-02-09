import { PureComponent } from "react";
import { func, string, shape, bool, number } from "prop-types";
import { action as toggleMenu } from "redux-burger-menu/immutable";
import { connect } from "react-redux";

import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import LefoodLayout from "sections/lefood/Layout";
import Orders from "sections/lefood/orders";
import {
  parseOrders,
  columns as columnsNames,
  mergeOrdersData
} from "sections/lefood/utils";
import { patchOrder, patchOrderReject } from "actions/orders";
import { patchBusiness } from "actions/businesses";
import { setCurrentBusiness } from "actions/app";
import OrderDetails from "sections/lefood/orders/OrderDetails";
import { selectIsConnectedWithOrkestro } from "selectors/integrations";
import { getRejectOrderPayload } from "utils/orderUtils";
import {
  selectIsOrkestroDeliveryConfirmationEnabled,
  selectBusinessSettingsObject
} from "selectors/business";
import { BUSINESS_SETTINGS_KEYS } from "utils/businessUtils";
import ConfirmOrkestroDeliveryModal from "./ConfirmOrkestroDeliveryModal";

const namespaces = ["lefood", "app", "forms"];

class OrdersPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      columns: parseOrders(props.orders, props.t),
      draggedOrderState: null,
      pendingRejectionOrderId: undefined,
      orderDetailsId: undefined,
      orkestroDeliveryConfirmationModalOpen: false,
      draggableId: undefined,
      destination: undefined,
      source: undefined
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
    const { updateOrder } = this.props;

    if (destination.droppableId === columnsNames.inProgress) {
      updateOrder({ state: "in_preparation" }, draggableId);
    } else if (destination.droppableId === columnsNames.inDelivery) {
      updateOrder({ state: "in_delivery" }, draggableId);
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

  handleOrkestroDeliveryAccept = dontShowAgain => {
    const { draggableId, destination, source } = this.state;
    const { settings, businessId, updateBusiness } = this.props;

    this.setState({
      orkestroDeliveryConfirmationModalOpen: false
    });
    this.handleDragEnd({ destination, source, draggableId });

    if (dontShowAgain) {
      updateBusiness(
        businessId,
        // we need to keep settings object with rest attributes
        // because we use setIn in reducer
        {
          settings: {
            ...settings,
            [BUSINESS_SETTINGS_KEYS.ORKESTRO_DELIVERY_CONFIRMATION]: false
          }
        },
        true
      );
    }
  };

  handleOrkestroDeliveryReject = () => {
    this.setState({
      orkestroDeliveryConfirmationModalOpen: false
    });
  };

  handleDragEndAndOrkestro = ({ destination, source, draggableId }) => {
    const {
      connectedWithOrkestro,
      orders,
      isOrkestroDeliveryConfirmationEnabled
    } = this.props;
    const orderDetails = draggableId && orders ? orders.get(draggableId) : null;
    const state = orderDetails && orderDetails.getIn(["attributes", "state"]);
    const pickupAtBusiness =
      orderDetails && orderDetails.getIn(["attributes", "pickupAtBusiness"]);

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      this.setState({ draggedOrderState: null });
      return;
    }

    if (
      (destination.droppableId === columnsNames.newOrders &&
        source.droppableId === columnsNames.inProgress &&
        connectedWithOrkestro &&
        !pickupAtBusiness) ||
      (destination.droppableId === columnsNames.inDelivery &&
        source.droppableId === columnsNames.inProgress &&
        connectedWithOrkestro &&
        !pickupAtBusiness) ||
      (destination.droppableId === columnsNames.done &&
        source.droppableId === columnsNames.inDelivery &&
        connectedWithOrkestro &&
        !pickupAtBusiness) ||
      state === "waiting_for_approval"
    ) {
      return;
    }

    if (
      destination.droppableId === columnsNames.inProgress &&
      source.droppableId === columnsNames.newOrders &&
      connectedWithOrkestro &&
      !pickupAtBusiness &&
      isOrkestroDeliveryConfirmationEnabled
    ) {
      this.setState({
        orkestroDeliveryConfirmationModalOpen: true,
        draggableId,
        destination,
        source
      });
    } else {
      this.handleDragEnd({ destination, source, draggableId });
    }
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
    this.setRejectModalVisibility(undefined);
    const order = orders.find(o => o.get("id") === pendingRejectionOrderId);

    rejectOrder(
      getRejectOrderPayload({
        rejectReason,
        unavailableElements,
        otherRejectionReason,
        orderDetails: order
      }),
      pendingRejectionOrderId
    ).then(() => this.refreshColumnsContent());
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
      businessId,
      businessOrderPeriodsLength,
      businesses,
      changeCurrentBusiness
    } = this.props;
    const {
      columns,
      draggedOrderState,
      pendingRejectionOrderId,
      orderDetailsId,
      orkestroDeliveryConfirmationModalOpen
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
          <Orders
            {...{
              onDragEnd: this.handleDragEndAndOrkestro,
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
              currency: business && business.get("stripeCurrency"),
              t
            }}
          />
        </LefoodLayout>
        <div style={{ position: "absolute", left: 0 }}>
          <OrderDetails
            {...{
              orderDetails,
              updateOrder: this.updateOrder,
              setRejectModalVisibility: this.setRejectModalVisibility
            }}
          />
        </div>
        <ConfirmOrkestroDeliveryModal
          {...{
            isOpen: orkestroDeliveryConfirmationModalOpen,
            onClose: this.handleOrkestroDeliveryReject,
            onConfirm: this.handleOrkestroDeliveryAccept,
            t
          }}
        />
      </>
    );
  }
}

OrdersPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  orders: shape(),
  business: shape(),
  settings: shape(),
  loading: bool.isRequired,
  connectedWithOrkestro: bool.isRequired,
  draggableId: string.isRequired,
  destination: shape().isRequired,
  source: shape().isRequired,
  updateOrder: func.isRequired,
  rejectOrder: func.isRequired,
  updateBusiness: func.isRequired,
  toggleOrderDetails: func.isRequired,
  dishesLength: number,
  deliveriesLength: number,
  businesses: shape(),
  businessId: string,
  businessOrderPeriodsLength: number,
  changeCurrentBusiness: func.isRequired,
  isOrkestroDeliveryConfirmationEnabled: bool
};

OrdersPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  businessOrderPeriodsLength: 0,
  dishesLength: 0,
  deliveriesLength: 0,
  orders: null,
  isOrkestroDeliveryConfirmationEnabled: false,
  settings: null
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business =
          businessData &&
          businessData.get("businesses") &&
          businessData.get("businesses").first();
        const orders = state.getIn(["orders", "data", "orders"]);
        const elements = state.getIn(["orders", "data", "elements"]);
        const addresses = state.getIn(["orders", "data", "addresses"]);
        const elementOptions = state.getIn([
          "orders",
          "data",
          "elementOptions"
        ]);

        return {
          loading:
            (!state.getIn(["orders", "isFailed"]) &&
              !state.getIn(["orders", "isSucceeded"])) ||
            state.getIn(["orders", "isFetching"]),
          orders: mergeOrdersData(orders, elements, addresses, elementOptions),
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
          connectedWithOrkestro: selectIsConnectedWithOrkestro(state),
          lng: (i18n && i18n.language) || "en",
          isOrkestroDeliveryConfirmationEnabled: selectIsOrkestroDeliveryConfirmationEnabled(
            state
          ),
          settings: selectBusinessSettingsObject(state)
        };
      },
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
