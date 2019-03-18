import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, arrayOf, shape, bool } from "prop-types";
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

const namespaces = ["lefood", "app"];

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
      columns: parseOrders(props.orders),
      draggedOrderState: null,
      pendingRejectionOrderId: undefined
    };
  }

  componentDidUpdate(prevProps) {
    const { loading, orders } = this.props;
    const { loading: wasloading, orders: prevOrders } = prevProps;
    if ((wasloading && !loading) || orders !== prevOrders) {
      this.refreshColumnsContent();
    }
  }

  refreshColumnsContent = () => {
    const { orders } = this.props;
    this.setState({
      columns: parseOrders(orders)
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
    const order = orders.find(o => o.id === draggableId);
    this.setState({ draggedOrderState: order.state });
  };

  setRejectModalVisibility = orderId =>
    this.setState({
      pendingRejectionOrderId: orderId
    });

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

  render() {
    const {
      t,
      lng,
      orders,
      loading,
      currentBusiness,
      updateBusiness
    } = this.props;
    const { columns, draggedOrderState, pendingRejectionOrderId } = this.state;
    const { currency, visibleInLefood, id } = currentBusiness || {};
    return (
      <LefoodLayout
        {...{
          t,
          lng,
          page: "orders",
          pendingOrdersLength: calcPendingOrders(orders),
          visibleInLefood,
          updateBusiness,
          currentBusinessId: id
        }}
      >
        <Orders
          {...{
            onDragEnd: this.handleDragEnd,
            onDragStart: this.handleDragStart,
            updateOrder: this.updateOrder,
            handleRejectionSubmit: this.handleRejectionSubmit,
            setRejectModalVisibility: this.setRejectModalVisibility,
            pendingRejectionOrderId,
            draggedOrderState,
            orders,
            columns,
            loading,
            currency,
            t
          }}
        />
      </LefoodLayout>
    );
  }
}

OrdersPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  orders: arrayOf(shape()).isRequired,
  currentBusiness: shape(),
  loading: bool.isRequired,
  updateOrder: func.isRequired,
  rejectOrder: func.isRequired,
  updateBusiness: func.isRequired
};

OrdersPage.defaultProps = {
  currentBusiness: {}
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        loading:
          (!state.orders.isFailed && !state.orders.isSucceeded) ||
          state.orders.isFetching,
        orders: state.orders.data,
        currentBusiness: state.users.currentBusiness.data
      }),
      {
        updateOrder: patchOrder,
        rejectOrder: patchOrderReject,
        updateBusiness: patchBusiness
      }
    )(OrdersPage)
  )
);
