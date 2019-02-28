export const columns = {
  newOrders: "newOrders",
  inProgress: "inProgress",
  delivery: "delivery",
  delivered: "delivered",
  canceled: "canceled"
};

export const mockData = {
  orders: {
    order1: {
      id: "order1",
      price: "$13.99",
      time: "11:30PM",
      details: ["1x tea", "1x cola 0.5l"]
    },
    order2: {
      id: "order2",
      price: "$34.30",
      time: "9:23PM",
      details: ["2x pizza"]
    },
    order3: {
      id: "order3",
      price: "$12.44",
      time: "12:32AM",
      details: ["2x cola 0.5l"]
    },
    order4: {
      id: "order4",
      price: "$54.21",
      time: "4:21PM",
      details: ["4x pizza"]
    },
    order5: {
      id: "order5",
      price: "$4.10",
      time: "3:12AM",
      details: ["1x cola 0.5l"]
    },
    order6: {
      id: "order6",
      price: "$65.23",
      time: "2:20AM",
      details: ["2x pizza", "4x cola 0.5l", "4x tea"]
    },
    order7: {
      id: "order7",
      price: "$1.30",
      time: "12:03PM",
      details: ["2x pizza", "4x cola 0.5l", "6x tea"]
    },
    order8: {
      id: "order8",
      price: "$98.22",
      time: "6:04AM",
      details: ["10x tea", "10x pizza", "4x cola 0.5l"]
    },
    order9: {
      id: "order9",
      price: "$34.66",
      time: "3:30AM",
      details: ["3x pizza"]
    },
    order10: {
      id: "order10",
      price: "$43.23",
      time: "4:54PM",
      details: ["1x pizza", "4x cola 0.5l"]
    },
    order11: {
      id: "order11",
      price: "$22.00",
      time: "3:43AM",
      details: ["4x cola 0.5l", "2x pizza"]
    },
    order12: {
      id: "order12",
      price: "$55.11",
      time: "8:44PM",
      details: ["2x hot dog", "2x cola 0.5l"]
    },
    order13: {
      id: "order13",
      price: "$23.43",
      time: "3:32PM",
      details: ["1x hot dog", "2x pizza", "4x cola 0.5l"]
    },
    order14: {
      id: "order14",
      price: "$17.50",
      time: "11:39PM",
      details: ["5x cheese"]
    },
    order15: {
      id: "order15",
      price: "$22.12",
      time: "9:43AM",
      details: ["2x water", "4x cola 0.5l"]
    },
    order16: {
      id: "order16",
      price: "$41.33",
      time: "5:38PM",
      details: ["2x watermelon", "4x fish"]
    },
    order17: {
      id: "order17",
      price: "$87.37",
      time: "4:47PM",
      details: ["4x cola 0.5l"]
    },
    order18: {
      id: "order18",
      price: "$23.43",
      time: "11:19PM",
      details: ["5x pizza"]
    },
    order19: {
      id: "order19",
      price: "$12.76",
      time: "3:54AM",
      details: ["1x pizza", "1x cola 0.5l"]
    },
    order20: {
      id: "order20",
      price: "$324.00",
      time: "4:22PM",
      details: ["12x pizza", "20x cola 0.5l,", "3x tea"]
    }
  },
  columns: {
    newOrders: {
      id: columns.newOrders,
      title: "New orders",
      orderIds: [
        "order1",
        "order2",
        "order3",
        "order4",
        "order5",
        "order6",
        "order7",
        "order8"
      ]
    },
    inProgress: {
      id: columns.inProgress,
      title: "In Progress",
      orderIds: ["order9", "order10"]
    },
    delivery: {
      id: columns.delivery,
      title: "Delivery",
      orderIds: ["order11", "order12", "order13"]
    },
    delivered: {
      id: columns.delivered,
      title: "Delivered",
      orderIds: ["order14", "order15", "order16", "order17"]
    },
    canceled: {
      id: columns.canceled,
      title: "Canceled",
      orderIds: ["order18", "order19", "order20"]
    }
  }
};
