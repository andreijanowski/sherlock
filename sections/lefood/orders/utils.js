export const columns = {
  newOrders: "newOrders",
  inProgress: "inProgress",
  done: "done",
  canceled: "canceled"
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
  canceled: {
    id: columns.canceled,
    title: "Canceled",
    orderIds:
      orders
        .filter(o => o.state === "rejected" || o.state === "canceled")
        .map(o => o.id) || []
  }
});
