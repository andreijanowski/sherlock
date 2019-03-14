import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, arrayOf, shape, bool } from "prop-types";
import LefoodLayout from "sections/lefood/Layout";
import Orders from "sections/lefood/orders";
import {
  parseOrders,
  columns as columnsNames
} from "sections/lefood/orders/utils";
import { connect } from "react-redux";
import { patchOrder, patchOrderReject } from "actions/orders";

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
      draggedOrderState: null
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

    const { updateOrder, rejectOrder } = this.props;
    if (destination.droppableId === columnsNames.inProgress) {
      updateOrder({ state: "in_preparation" }, draggableId);
    } else if (destination.droppableId === columnsNames.done) {
      updateOrder({ state: "completed" }, draggableId);
    } else if (destination.droppableId === columnsNames.rejected) {
      rejectOrder({}, draggableId);
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

  render() {
    const { t, lng, orders, loading, currentBusiness } = this.props;
    const { columns, draggedOrderState } = this.state;
    const currency = currentBusiness ? currentBusiness.currency : "";
    return (
      <LefoodLayout
        {...{
          t,
          lng,
          page: "orders"
        }}
      >
        <Orders
          {...{
            onDragEnd: this.handleDragEnd,
            onDragStart: this.handleDragStart,
            updateOrder: this.updateOrder,
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
  rejectOrder: func.isRequired
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
        rejectOrder: patchOrderReject
      }
    )(OrdersPage)
  )
);
