export const mergeOrdersData = (orders, elements, products, suppliers) => {
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
    const orderSupplier = order.getIn(["relationships", "supplier", "data"]);

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

    if (orderSupplier) {
      updatedOrder = updatedOrder.setIn(
        ["relationships", "supplier", "data"],
        suppliers.get(orderSupplier.get("id"))
      );
    }
    return updatedOrder;
  });
};
