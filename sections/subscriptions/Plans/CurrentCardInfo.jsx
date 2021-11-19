import React from "react";
import { Box, Flex } from "@rebass/grid";
import { arrayOf, func, shape } from "prop-types";

import { Button } from "components";
import Card from "../Payments/Card";

const CurrentCardInfo = ({ t, currentPlan, cards, goToPayments }) => {
  const currentCard =
    cards && currentPlan
      ? cards.find(
          c =>
            c.getIn(["attributes", "stripeSourceId"]) ===
            currentPlan.getIn(["attributes", "stripeSourceId"])
        )
      : null;

  if (!currentCard) return null;

  return (
    <Flex flexDirection="column" mb={4}>
      <Box mr={2} mb={3}>{`${t("paymentInfo")}: `}</Box>
      <Flex>
        <Box mb={-2} mr={2}>
          <Card
            {...{
              id: currentCard.get("id"),
              last4: currentCard.getIn(["attributes", "last4"]),
              brand: currentCard.getIn(["attributes", "brand"]),
              disabled: currentCard.getIn(["attributes", "disabled"])
            }}
            disabled
          />
        </Box>
        <Box>
          <Button styleName="smallBlue" onClick={goToPayments}>
            {t("changeCard")}
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

CurrentCardInfo.propTypes = {
  t: func.isRequired,
  goToPayments: func.isRequired,
  currentPlan: shape(),
  cards: arrayOf(shape()),
  plans: shape()
};

CurrentCardInfo.defaultProps = {
  currentPlan: null,
  cards: null,
  plans: null
};

export default CurrentCardInfo;
