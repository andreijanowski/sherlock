export const columns = {
  newOrders: "newOrders",
  inProgress: "inProgress",
  done: "done",
  rejected: "rejected"
};

export const parseOrders = (orders, t) => ({
  newOrders: {
    id: columns.newOrders,
    title: t("newOrders"),
    orderIds: orders
      ? orders
          .filter(
            o =>
              o.getIn(["attributes", "state"]) === "waiting_for_approval" ||
              o.getIn(["attributes", "state"]) === "waiting_for_payment" ||
              o.getIn(["attributes", "state"]) === "paid"
          )
          .map(o => o.get("id"))
          .toList()
          .toArray()
      : []
  },
  inProgress: {
    id: columns.inProgress,
    title: t("in_preparation"),
    orderIds: orders
      ? orders
          .filter(o => o.getIn(["attributes", "state"]) === "in_preparation")
          .map(o => o.get("id"))
          .toList()
          .toArray()
      : []
  },
  done: {
    id: columns.done,
    title: t("completed"),
    orderIds: orders
      ? orders
          .filter(o => o.getIn(["attributes", "state"]) === "completed")
          .map(o => o.get("id"))
          .toList()
          .toArray()
      : []
  },
  rejected: {
    id: columns.rejected,
    title: t("rejected"),
    orderIds: orders
      ? orders
          .filter(
            o =>
              o.getIn(["attributes", "state"]) === "rejected" ||
              o.getIn(["attributes", "state"]) === "canceled"
          )
          .map(o => o.get("id"))
          .toList()
          .toArray()
      : []
  }
});

export const setIsDropDisabled = (draggedState, droppableId) => {
  if (
    (draggedState === "waiting_for_approval" &&
      (droppableId === columns.rejected ||
        droppableId === columns.newOrders)) ||
    (draggedState === "paid" && droppableId === columns.inProgress) ||
    (draggedState === "in_preparation" && droppableId === columns.done) ||
    draggedState === droppableId ||
    !draggedState
  ) {
    return false;
  }
  return true;
};

export const calcPendingOrders = orders =>
  orders
    ? orders.filter(
        o =>
          o.getIn(["attributes", "state"]) !== "completed" &&
          o.getIn(["attributes", "state"]) !== "rejected"
      ).size
    : 0;

export const mergeOrderData = (id, orders, elements) => {
  const order = orders.find(o => o.get("id") === id);
  if (order && order.getIn(["relationships", "elements", "data"]) && elements) {
    const orderElements = order
      .getIn(["relationships", "elements", "data"])
      .map(e => elements.get(e.get("id")));
    return order.setIn(["relationships", "elements", "data"], orderElements);
  }
  return order;
};
