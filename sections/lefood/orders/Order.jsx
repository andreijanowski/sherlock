import { shape, string, func } from "prop-types";
import { Button } from "components";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OrderDetail, PaymentConfirmed, WaitingForPayment } from "./styled";

const Order = ({ order, id, t, setRejectModalVisibility, updateOrder }) => (
  <>
    {order.getIn(["attributes", "state"]) === "paid" && (
      <PaymentConfirmed>
        <FontAwesomeIcon icon={["fa", "check"]} />
        <Box ml={2}>{t("paymentConfimed")}</Box>
      </PaymentConfirmed>
    )}
    {order.getIn(["attributes", "state"]) === "waiting_for_payment" && (
      <WaitingForPayment>
        <FontAwesomeIcon icon={["fa", "hourglass-start"]} />
        <Box ml={2}>{t("waitingForPayment")}</Box>
      </WaitingForPayment>
    )}
    {order.getIn(["relationships", "elements", "data"]) &&
      order
        .getIn(["relationships", "elements", "data"])
        .map(element => (
          <OrderDetail key={element.get("id")}>
            {`${element.getIn(["attributes", "units"])}x ${element.getIn([
              "attributes",
              "dishName"
            ])}`}
          </OrderDetail>
        ))}
    {order.getIn(["attributes", "rejectReason"]) && (
      <Flex mt={3}>
        <Box width={1}>
          <Button fluid styleName="reject" onClick={() => null}>
            {t(order.getIn(["attributes", "rejectReason"]))}
          </Button>
        </Box>
      </Flex>
    )}
    {order.getIn(["attributes", "state"]) === "waiting_for_approval" && (
      <Flex mx={-1} mt={3}>
        <Box width={1 / 2} px={1}>
          <Button
            fluid
            styleName="reject"
            onClick={e => {
              e.stopPropagation();
              setRejectModalVisibility(id);
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
              updateOrder("waiting_for_payment", id);
            }}
          >
            {t("accept")}
          </Button>
        </Box>
      </Flex>
    )}
    <Box />
  </>
);

Order.propTypes = {
  order: shape().isRequired,
  id: string.isRequired,
  t: func.isRequired,
  updateOrder: func.isRequired,
  setRejectModalVisibility: func.isRequired
};

export default Order;
