import { func, string, arrayOf, shape } from "prop-types";
import { PlansBillingInterval, Button } from "components";
import { Flex, Box } from "@rebass/grid";
import { Elements } from "react-stripe-elements";
import { BASIC_PLAN_NAME } from "consts";
import { getPlanPrice } from "utils/plans";
import { Wrapper } from "../styled";
import { Price, Container, Line } from "./styled";
// TODO: After MVP use CardsModal for allowing user to choose from saved cards
// import CardsModal from "./CardsModal";
import { getPlanName } from "../utils";
import CardForm from "./CardForm";

const PaymentsSection = ({
  t,
  plans,
  billingInterval,
  handleChangeBillngPeriod,
  // TODO: After MVP use CardsModal for allowing user to choose from saved cards
  // cards,
  currentPlan,
  chosenPlan,
  goToPlans,
  updateSubscription,
  notificationError,
  getBusinessSetupIntent
}) => {
  // eslint-disable-next-line prefer-const
  let { currentPlanName, nextPlanName } = getPlanName(currentPlan);
  if (chosenPlan) {
    currentPlanName = chosenPlan;
  }

  const price =
    getPlanPrice({
      plans,
      planName: currentPlanName,
      billingInterval
    }) || t(`plans:${currentPlanName}.price.${billingInterval}`);

  const translatedBillingInterval = t(
    `plans:${currentPlanName}.${billingInterval}`
  );

  return (
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
      {currentPlanName && (
        <>
          <Container>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              mb={3}
              mt={4}
            >
              <PlansBillingInterval
                {...{ t, billingInterval, handleChangeBillngPeriod }}
              />
              <Price>
                {currentPlanName === BASIC_PLAN_NAME
                  ? price
                  : `€${price}/${translatedBillingInterval}`}
              </Price>
            </Flex>
          </Container>
          <Line />
        </>
      )}
      {/* TODO: After MVP use CardsModal for allowing user to choose from saved cards */}
      {/* {cards && <CardsModal {...{ cards, isOpen: false, t }} />} */}
      <Elements>
        <CardForm
          {...{
            t,
            nextPlanName,
            updateSubscription,
            notificationError,
            getBusinessSetupIntent
          }}
        />
      </Elements>
    </Wrapper>
  );
};

PaymentsSection.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  billingInterval: string.isRequired,
  handleChangeBillngPeriod: func.isRequired,
  cards: arrayOf(shape()),
  currentPlan: shape(),
  goToPlans: func.isRequired,
  updateSubscription: func.isRequired,
  notificationError: func.isRequired,
  getBusinessSetupIntent: func.isRequired,
  chosenPlan: string,
  plans: shape().isRequired
};

PaymentsSection.defaultProps = {
  cards: null,
  currentPlan: null,
  chosenPlan: null
};

export default PaymentsSection;
