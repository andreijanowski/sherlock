import { Component } from "react";
import { shape, string, arrayOf, func } from "prop-types";
import Order from "./Order";

class Orders extends Component {
  shouldComponentUpdate(nextProps) {
    const { orders } = this.props;
    const { orders: nextOrders } = nextProps;
    if (orders === nextOrders) {
      return false;
    }
    return true;
  }

  render() {
    const {
      id,
      orders,
      t,
      currency,
      updateOrder,
      setRejectModalVisibility,
      toggleOrderDetails
    } = this.props;
    if (orders && orders.length !== 0) {
      return (
        <>
          {orders.map((order, index) => (
            <Order
              {...{
                order,
                t,
                currency,
                updateOrder,
                columnId: id,
                index,
                toggleOrderDetails,
                setRejectModalVisibility,
                key: order.id
              }}
            />
          ))}
        </>
      );
    }
    return null;
  }
}

Orders.propTypes = {
  t: func.isRequired,
  id: string.isRequired,
  orders: arrayOf(shape()).isRequired,
  currency: string.isRequired,
  updateOrder: func.isRequired,
  setRejectModalVisibility: func.isRequired,
  toggleOrderDetails: func.isRequired
};

export default Orders;
