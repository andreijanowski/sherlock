import React, { Fragment } from "react";
import { shape, string, func } from "prop-types";
import { StyledButton } from "components";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { OrderDetail, PaymentConfirmed, WaitingForPayment } from "./styled";
import { getElementLabel } from "./utils";

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
      order.getIn(["relationships", "elements", "data"]).map(element => {
        const elementOptions = element.getIn([
          "relationships",
          "elementOptions",
          "data"
        ]);

        return (
          <Fragment key={element.get("id")}>
            <OrderDetail>
              {getElementLabel({ element, nameAttribute: "dishName" })}
            </OrderDetail>
            {elementOptions &&
              elementOptions.map(option => (
                <OrderDetail key={option.get("id")} pl={3}>
                  {getElementLabel({
                    element: option,
                    nameAttribute: "dishOptionName"
                  })}
                </OrderDetail>
              ))}
          </Fragment>
        );
      })}
    {order.getIn(["attributes", "rejectReason"]) && (
      <Flex mt={3}>
        <Box width={1}>
          <StyledButton fluid styleName="reject" onClick={() => null}>
            {t(order.getIn(["attributes", "rejectReason"]))}
          </StyledButton>
        </Box>
      </Flex>
    )}
    {order.getIn(["attributes", "state"]) === "waiting_for_approval" && (
      <Flex mx={-1} mt={3}>
        <Box width={1 / 2} px={1}>
          <StyledButton
            fluid
            styleName="reject"
            onClick={e => {
              e.stopPropagation();
              setRejectModalVisibility(id);
            }}
          >
            {t("reject")}
          </StyledButton>
        </Box>
        <Box width={1 / 2} px={1}>
          <StyledButton
            fluid
            styleName="accept"
            onClick={e => {
              e.stopPropagation();
              updateOrder("waiting_for_payment", id);
            }}
          >
            {t("accept")}
          </StyledButton>
        </Box>
      </Flex>
    )}
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
