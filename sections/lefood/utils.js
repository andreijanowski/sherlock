export const ORDER_DELIVERY_TYPE = {
  DELIVERY: "delivery",
  PICKUP: "pickupAtRestaurant"
};

export const HUBRISE_PICKUP_TYPE = "collection";

export const columns = {
  newOrders: "newOrders",
  inProgress: "inProgress",
  inDelivery: "inDelivery",
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
  inDelivery: {
    id: columns.inDelivery,
    title: t("in_delivery"),
    orderIds: orders
      ? orders
          .filter(o => o.getIn(["attributes", "state"]) === "in_delivery")
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

export const setIsDropDisabled = (
  draggedState,
  droppableId,
  isConnectedWithOrkestro,
  allowPickup
) => {
  if (
    (droppableId === columns.done || droppableId === columns.inDelivery) &&
    isConnectedWithOrkestro &&
    !allowPickup
  ) {
    return true;
  }
  if (
    (draggedState === "waiting_for_approval" &&
      (droppableId === columns.rejected ||
        droppableId === columns.newOrders)) ||
    (draggedState === "paid" && droppableId === columns.inProgress) ||
    (draggedState === "in_preparation" && droppableId === columns.inDelivery) ||
    (draggedState === "in_delivery" && droppableId === columns.done) ||
    droppableId === columns.inDelivery ||
    draggedState === droppableId ||
    !draggedState
  ) {
    return false;
  }
  return true;
};

export const mergeOrdersData = (
  orders,
  elements,
  addresses,
  elementOptions
) => {
  if (!orders) return undefined;

  return orders.map(order => {
    const orderElements = order.getIn(["relationships", "elements", "data"]);
    const orderAddress = order.getIn(["relationships", "addresses", "data"]);

    let updatedOrder = order;

    if (orderElements) {
      updatedOrder = updatedOrder.setIn(
        ["relationships", "elements", "data"],
        orderElements.map(e =>
          elements.get(e.get("id")).update(element => {
            const options = element.getIn([
              "relationships",
              "elementOptions",
              "data"
            ]);
            if (options && elementOptions) {
              return element.setIn(
                ["relationships", "elementOptions", "data"],
                options.map(o => elementOptions.get(o.get("id")))
              );
            }
            return element;
          })
        )
      );
    }
    if (orderAddress) {
      updatedOrder = updatedOrder.setIn(
        ["relationships", "addresses", "data"],
        orderAddress.map(a => addresses.get(a.get("id")))
      );
    }

    return updatedOrder;
  });
};

export const mergeDishesData = (dishes, pictures) =>
  dishes
    ? dishes.map(dish => {
        const dishPictures = dish.getIn(["relationships", "pictures", "data"]);
        if (dishPictures && pictures) {
          return dish.setIn(
            ["relationships", "pictures", "data"],
            dishPictures.map(e => (e ? pictures.get(e.get("id")) : e))
          );
        }
        return dish;
      })
    : dishes;

export const getOrderDeliveryStatus = order => {
  const isHubriseOrder = Boolean(order.getIn(["attributes", "hubriseSource"]));

  if (!isHubriseOrder) {
    const isPickup = Boolean(order.getIn(["attributes", "pickupAtBusiness"]));
    return isPickup ? ORDER_DELIVERY_TYPE.PICKUP : ORDER_DELIVERY_TYPE.DELIVERY;
  }

  const hubriseServiceType = order.getIn(["attributes", "hubriseServiceType"]);

  return hubriseServiceType === HUBRISE_PICKUP_TYPE
    ? ORDER_DELIVERY_TYPE.PICKUP
    : ORDER_DELIVERY_TYPE.DELIVERY;
};

export const isPickupOrder = order =>
  getOrderDeliveryStatus(order) === ORDER_DELIVERY_TYPE.PICKUP;
