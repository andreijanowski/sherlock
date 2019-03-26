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
              o.state === "waiting_for_approval" ||
              o.state === "waiting_for_payment" ||
              o.state === "paid"
          )
          .map(o => o.id)
      : []
  },
  inProgress: {
    id: columns.inProgress,
    title: t("in_preparation"),
    orderIds: orders
      ? orders.filter(o => o.state === "in_preparation").map(o => o.id)
      : []
  },
  done: {
    id: columns.done,
    title: t("completed"),
    orderIds: orders
      ? orders.filter(o => o.state === "completed").map(o => o.id)
      : []
  },
  rejected: {
    id: columns.rejected,
    title: t("rejected"),
    orderIds: orders
      ? orders
          .filter(o => o.state === "rejected" || o.state === "canceled")
          .map(o => o.id)
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
    ? orders.filter(o => o.state !== "completed" && o.state !== "rejected")
        .length
    : 0;
