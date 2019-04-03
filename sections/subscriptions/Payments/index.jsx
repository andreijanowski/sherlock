import { func, string, arrayOf, shape } from "prop-types";
import { PlansBillingInterval, Button } from "components";
import { Flex, Box } from "@rebass/grid";
import { Elements } from "react-stripe-elements";
import { Wrapper } from "../styled";
import { Price, Container, Line } from "./styled";
// import CardsModal from "./CardsModal";
import CardForm from "./CardForm";

const PaymentsSection = ({
  t,
  billingInterval,
  handleChangeBillngPeriod,
  // cards,
  choosedPlan,
  goToPlans,
  updateSubscription,
  notificationError
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
    {choosedPlan && (
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
              {t(`plans:${choosedPlan}.price.${billingInterval}`)}
              <small>/{t(`plans:${choosedPlan}.${billingInterval}`)}</small>
            </Price>
          </Flex>
        </Container>
        <Line />
      </>
    )}
    {/* {cards && <CardsModal {...{ cards, isOpen: false, t }} />} */}
    <Elements>
      <CardForm {...{ t, updateSubscription, notificationError }} />
    </Elements>
  </Wrapper>
);

PaymentsSection.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  billingInterval: string.isRequired,
  handleChangeBillngPeriod: func.isRequired,
  cards: arrayOf(shape()),
  choosedPlan: string.isRequired,
  goToPlans: func.isRequired,
  updateSubscription: func.isRequired,
  notificationError: func.isRequired
};

PaymentsSection.defaultProps = {
  cards: null
};

export default PaymentsSection;
