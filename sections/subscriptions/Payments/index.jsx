import React from "react";
import { arrayOf, func, shape } from "prop-types";
import { Box, Flex } from "@rebass/grid";
import { Elements } from "react-stripe-elements";

import { Button } from "components";
import { Wrapper } from "../styled";
import { Line } from "./styled";
import CardForm from "./CardForm";
import PlanToPayInfo from "./PlanToPayInfo";

const PaymentsSection = ({
  t,
  planToPay,
  goToPlans,
  updateSubscription,
  notificationError,
  getBusinessSetupIntent
}) => (
  <Wrapper>
    <Flex mb={4} justifyContent="space-between" alignItems="center">
      <Box>{t("finishPoweringYouUp")}</Box>
      <Box>
        <Button styleName="smallBlue" onClick={goToPlans}>
          {t("goBackToPlans")}
        </Button>
      </Box>
    </Flex>
    <Line />
    {planToPay && <PlanToPayInfo t={t} plan={planToPay} />}
    <Elements>
      <CardForm
        {...{
          t,
          updateSubscription,
          notificationError,
          getBusinessSetupIntent
        }}
      />
    </Elements>
  </Wrapper>
);

PaymentsSection.propTypes = {
  t: func.isRequired,
  cards: arrayOf(shape()),
  goToPlans: func.isRequired,
  updateSubscription: func.isRequired,
  notificationError: func.isRequired,
  getBusinessSetupIntent: func.isRequired,
  planToPay: shape()
};

PaymentsSection.defaultProps = {
  cards: null,
  planToPay: null
};

export default PaymentsSection;
