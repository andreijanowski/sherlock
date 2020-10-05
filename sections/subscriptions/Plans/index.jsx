import { func, string, shape, arrayOf, bool } from "prop-types";
import {
  PlansBillingInterval,
  BoldText,
  Button,
  PlansLandingPage
} from "components";
import { Flex, Box } from "@rebass/grid";
import { Wrapper } from "../styled";
import { getPlanName } from "../utils";
import Card from "../Payments/Card";
import PlanStatus from "./PlanStatus";
import { PlansWrapper } from "./styled";

const PlansSection = ({
  t,
  lng,
  billingInterval,
  handleChangeBillngPeriod,
  choosePlan,
  currentPlan,
  cards,
  goToPayments,
  isCanceled
}) => {
  const { currentPlanName, nextPlanName } = getPlanName(currentPlan);
  const currentCard =
    cards && currentPlan
      ? cards.find(
          c =>
            c.getIn(["attributes", "stripeSourceId"]) ===
            currentPlan.getIn(["attributes", "stripeSourceId"])
        )
      : null;

  return (
    <Wrapper>
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Box mb={3}>
          {`${t("yourCurrentPlan")}: `}
          <BoldText>{t(`plans:${currentPlanName}.name`)}.</BoldText>
          <PlanStatus
            {...{
              nextPaymentAt:
                currentPlan &&
                currentPlan.getIn(["attributes", "nextPaymentAt"]),
              cancelAt:
                currentPlan && currentPlan.getIn(["attributes", "cancelAt"]),
              trialEndsAt:
                currentPlan && currentPlan.getIn(["attributes", "trialEndsAt"]),
              t
            }}
          />
        </Box>
        <PlansBillingInterval
          {...{ t, billingInterval, handleChangeBillngPeriod }}
        />
      </Flex>
      {nextPlanName !== "basic" && (
        <Flex flexDirection="column" mb={4}>
          <Box mr={2} mb={3}>{`${t("paymentInfo")}: `}</Box>
          <Flex>
            {currentCard && (
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
            )}
            <Box>
              <Button styleName="smallBlue" onClick={goToPayments}>
                {currentCard ? t("changeCard") : t("setCard")}
              </Button>
            </Box>
          </Flex>
        </Flex>
      )}
      <PlansWrapper>
        <PlansLandingPage
          {...{
            t,
            lng,
            billingInterval,
            choosePlan,
            nextPlanName,
            currentPlanInterval:
              currentPlan && currentPlan.getIn(["attributes", "interval"]),
            isAuthenticated: false,
            isSubscriptionView: true,
            isCanceled
          }}
        />
      </PlansWrapper>
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
  cards: arrayOf(shape()),
  isCanceled: bool
};

PlansSection.defaultProps = {
  currentPlan: null,
  cards: null,
  isCanceled: false
};

export default PlansSection;
