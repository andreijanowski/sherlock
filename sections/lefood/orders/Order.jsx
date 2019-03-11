import { Draggable } from "react-beautiful-dnd";
import { shape, number, string, func } from "prop-types";
import { Button } from "components";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  OrderWrapper,
  OrderHeader,
  OrderPrice,
  OrderTime,
  OrderDetails,
  OrderDetail,
  PaymentConfirmed
} from "./styled";
import { columns } from "./utils";

const Order = ({ order, columnId, index, t, onClick }) => (
  <Draggable draggableId={order.id} index={index}>
    {provided => (
      <OrderWrapper
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        canceled={columnId === columns.canceled}
      >
        <OrderHeader>
          <OrderPrice>{order.totalCostCents}</OrderPrice>
          <OrderTime>{order.estimatedDeliveryIn}</OrderTime>
        </OrderHeader>
        <OrderDetails>
          {order.status === "paid" && (
            <PaymentConfirmed>
              <FontAwesomeIcon icon={["fa", "check"]} />

              <Box ml={2}>{t("paymentConfimed")}</Box>
            </PaymentConfirmed>
          )}
          {order.elements &&
            order.elements.map(element => (
              <OrderDetail key={element.id}>{element.id}</OrderDetail>
            ))}
          {columnId === columns.canceled && (
            <Flex mt={3}>
              <Box width={1}>
                <Button fluid styleName="reject" onClick={() => null}>
                  reject reason here
                </Button>
              </Box>
            </Flex>
          )}
          {columnId === columns.newOrders && (
            <Flex mx={-1} mt={3}>
              <Box width={1 / 2} px={1}>
                <Button
                  fluid
                  styleName="reject"
                  onClick={() =>
                    onClick({
                      destination: {
                        droppableId: columns.canceled,
                        index: 0
                      },
                      source: {
                        droppableId: columns.newOrders,
                        index
                      },
                      draggableId: order.id
                    })
                  }
                >
                  {t("reject")}
                </Button>
              </Box>
              <Box width={1 / 2} px={1}>
                <Button
                  fluid
                  styleName="accept"
                  onClick={() =>
                    onClick({
                      destination: {
                        droppableId: columns.inProgress,
                        index: 0
                      },
                      source: {
                        droppableId: columns.newOrders,
                        index
                      },
                      draggableId: order.id
                    })
                  }
                >
                  {t("accept")}
                </Button>
              </Box>
            </Flex>
          )}
        </OrderDetails>
      </OrderWrapper>
    )}
  </Draggable>
);

Order.propTypes = {
  order: shape().isRequired,
  columnId: string.isRequired,
  index: number.isRequired,
  t: func.isRequired,
  onClick: func.isRequired
};

export default Order;
