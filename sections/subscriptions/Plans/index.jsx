import { func, string, shape } from "prop-types";
import { Plans, PlansBillingInterval, BoldText, Button } from "components";
import { Flex, Box } from "@rebass/grid";
import { Wrapper } from "../styled";
import { getPlanName } from "./utils";
import Card from "../Payments/Card";
import PlanStatus from "./PlanStatus";

const PlansSection = ({
  t,
  lng,
  billingInterval,
  handleChangeBillngPeriod,
  choosePlan,
  currentPlan,
  cards,
  goToPayments
}) => {
  const { currentPlanName, nextPlanName } = getPlanName(currentPlan);
  const { interval, nextPaymentAt, cancelAt, trialEndsAt } = currentPlan || {};
  const currentCard =
    cards && currentPlan
      ? cards.find(c => c.stripeSourceId === currentPlan.stripeSourceId)
      : null;

  return (
    <Wrapper>
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Box mb={3}>
          {`${t("yourCurrentPlan")}: `}
          <BoldText>{t(`plans:${currentPlanName}.name`)}.</BoldText>
          <PlanStatus {...{ nextPaymentAt, cancelAt, trialEndsAt, t }} />
        </Box>
        <PlansBillingInterval
          {...{ t, billingInterval, handleChangeBillngPeriod }}
        />
      </Flex>
      {currentCard && (
        <Flex flexDirection="column" mb={4}>
          <Box mr={2} mb={3}>{`${t("paymentInfo")}: `}</Box>
          <Flex>
            <Box mb={-2} mr={2}>
              <Card {...currentCard} disabled />
            </Box>
            <Box>
              <Button styleName="smallBlue" onClick={goToPayments}>
                {currentCard ? t("changeCard") : t("setCard")}
              </Button>
            </Box>
          </Flex>
        </Flex>
      )}
      <Flex mx={-2}>
        <Plans
          {...{
            t,
            lng,
            billingInterval,
            choosePlan,
            nextPlanName,
            currentPlanInterval: interval,
            isSubscriptionView: true
          }}
        />
      </Flex>
    </Wrapper>
  );
};

PlansSection.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  billingInterval: string.isRequired,
  handleChangeBillngPeriod: func.isRequired,
  choosePlan: func.isRequired,
  goToPayments: func.isRequired,
  currentPlan: shape(),
  cards: shape()
};

PlansSection.defaultProps = {
  currentPlan: null,
  cards: null
};

export default PlansSection;
