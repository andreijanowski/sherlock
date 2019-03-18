export const columns = {
  newOrders: "newOrders",
  inProgress: "inProgress",
  done: "done",
  rejected: "rejected"
};

export const parseOrders = orders => ({
  newOrders: {
    id: columns.newOrders,
    title: "New orders",
    orderIds:
      orders
        .filter(
          o =>
            o.state === "waiting_for_approval" ||
            o.state === "waiting_for_payment" ||
            o.state === "paid"
        )
        .map(o => o.id) || []
  },
  inProgress: {
    id: columns.inProgress,
    title: "In Progress",
    orderIds:
      orders.filter(o => o.state === "in_preparation").map(o => o.id) || []
  },
  done: {
    id: columns.done,
    title: "Done",
    orderIds: orders.filter(o => o.state === "completed").map(o => o.id) || []
  },
  rejected: {
    id: columns.rejected,
    title: "Rejected",
    orderIds:
      orders
        .filter(o => o.state === "rejected" || o.state === "canceled")
        .map(o => o.id) || []
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
  (orders || []).filter(o => o.state !== "completed" && o.state !== "rejected")
    .length;
