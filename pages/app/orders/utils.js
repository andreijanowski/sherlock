export const mergeOrdersData = (orders, elements, products) => {
  if (!orders) return undefined;

  return orders.map(order => {
    const orderElements = order.getIn([
      "relationships",
      "supplierElements",
      "data"
    ]);
    const orderProducts = order.getIn([
      "relationships",
      "supplierProducts",
      "data"
    ]);

    let updatedOrder = order;

    if (orderElements) {
      updatedOrder = updatedOrder.setIn(
        ["relationships", "supplierElements", "data"],
        orderElements.map(e => elements.get(e.get("id")))
      );
    }

    if (orderProducts) {
      updatedOrder = updatedOrder.setIn(
        ["relationships", "supplierProducts", "data"],
        orderProducts.map(e => products.get(e.get("id")))
      );
    }
    return updatedOrder;
  });
};
