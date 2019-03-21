import { Draggable } from "react-beautiful-dnd";
import { shape, number, string, func } from "prop-types";
import { Button } from "components";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  OrderWrapper,
  OrderHeader,
  OrderPrice,
  // OrderTime,
  OrderDetails,
  OrderDetail,
  PaymentConfirmed
} from "./styled";
import { columns } from "../utils";

const Order = ({
  order,
  columnId,
  index,
  t,
  currency,
  updateOrder,
  setRejectModalVisibility,
  toggleOrderDetails
}) => (
  <Draggable draggableId={order.id} index={index}>
    {provided => (
      <OrderWrapper
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        rejected={columnId === columns.rejected}
        onClick={() => toggleOrderDetails(order.id)}
      >
        <OrderHeader>
          <OrderPrice>
            {(order.totalCostCents / 100).toFixed(2)} {currency}
          </OrderPrice>
          {/* <OrderTime>{TODO: display order time when ready on backend side}</OrderTime> */}
        </OrderHeader>
        <OrderDetails>
          {order.state === "paid" && (
            <PaymentConfirmed>
              <FontAwesomeIcon icon={["fa", "check"]} />
              <Box ml={2}>{t("paymentConfimed")}</Box>
            </PaymentConfirmed>
          )}
          {order.elements &&
            order.elements.map(element => (
              <OrderDetail key={element.id}>
                {element.units}x {element.dishName}
              </OrderDetail>
            ))}
          {order.rejectReason && (
            <Flex mt={3}>
              <Box width={1}>
                <Button fluid styleName="reject" onClick={() => null}>
                  {t(order.rejectReason)}
                </Button>
              </Box>
            </Flex>
          )}
          {order.state === "waiting_for_approval" && (
            <Flex mx={-1} mt={3}>
              <Box width={1 / 2} px={1}>
                <Button
                  fluid
                  styleName="reject"
                  onClick={e => {
                    e.stopPropagation();
                    setRejectModalVisibility(order.id);
                  }}
                >
                  {t("reject")}
                </Button>
              </Box>
              <Box width={1 / 2} px={1}>
                <Button
                  fluid
                  styleName="accept"
                  onClick={e => {
                    e.stopPropagation();
                    updateOrder("waiting_for_payment", order.id);
                  }}
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
  currency: string.isRequired,
  updateOrder: func.isRequired,
  toggleOrderDetails: func.isRequired,
  setRejectModalVisibility: func.isRequired
};

export default Order;
