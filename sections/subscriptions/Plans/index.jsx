import React, { useState } from "react";
import { Box, Flex } from "@rebass/grid";
import { arrayOf, func, shape } from "prop-types";

import PlansTable from "components/Plans/PlansTable";
import { SUBSCRIPTION_CURRENCY, SUBSCRIPTION_PERIOD } from "consts";
import PlansPeriodSelector from "components/Plans/PlansPeriodSelector";
import PlansCurrencySelector from "components/Plans/PlansCurrencySelector";
import { Wrapper } from "../styled";
import CurrentPlanInfo from "./CurrentPlanInfo";
import CurrentCardInfo from "./CurrentCardInfo";

const PlansSection = ({
  t,
  currentPlan,
  cards,
  goToPayments,
  plans,
  handlePlanChoose,
  handleCancelSubscription
}) => {
  const [period, setPeriod] = useState(SUBSCRIPTION_PERIOD.MONTHLY);
  const [currency, setCurrency] = useState(SUBSCRIPTION_CURRENCY.EUR);

  if (!plans || !plans.size) return null;

  return (
    <Wrapper>
      <Flex
        flexWrap="wrap"
        flexDirection={["column", "column", "column", "row"]}
        justifyContent={["center", "center", "center", "space-between"]}
      >
        <Box width={[1, 1, 1, 2 / 5]} mb={[30, 30, 30, 0]}>
          <CurrentPlanInfo
            t={t}
            currentPlan={currentPlan}
            handleCancelSubscription={handleCancelSubscription}
          />
        </Box>
        <Box width={[1, 1, 1, 2 / 5]} mb={30}>
          <Box mb={20}>
            <PlansPeriodSelector period={period} setPeriod={setPeriod} />
          </Box>
          <PlansCurrencySelector
            currency={currency}
            setCurrency={setCurrency}
          />
        </Box>
      </Flex>
      <CurrentCardInfo
        goToPayments={goToPayments}
        t={t}
        currentPlan={currentPlan}
        cards={cards}
        plans={plans}
      />
      <PlansTable
        plans={plans}
        period={period}
        currency={currency}
        onPlanChooseClick={handlePlanChoose}
      />
    </Wrapper>
  );
};

PlansSection.propTypes = {
  t: func.isRequired,
  goToPayments: func.isRequired,
  currentPlan: shape(),
  cards: arrayOf(shape()),
  plans: shape(),
  handlePlanChoose: func.isRequired,
  handleCancelSubscription: func.isRequired
};

PlansSection.defaultProps = {
  currentPlan: null,
  cards: null,
  plans: null
};

export default PlansSection;
