import { func, string, arrayOf, shape } from "prop-types";
import { PlansBillingInterval } from "components";
import { Flex, Box } from "@rebass/grid";
import { Elements } from "react-stripe-elements";
import { Wrapper } from "../styled";
import { Price } from "./styled";
import CardsModal from "./CardsModal";
import CardForm from "./CardForm";

const PaymentsSection = ({
  t,
  billingInterval,
  handleChangeBillngPeriod,
  cards,
  choosedPlan,
  updateSubscription
}) => (
  <Wrapper>
    <Box mb={3}>{t("finishPoweringYouUp")}</Box>
    <Flex justifyContent="space-between" alignItems="center" mb={3}>
      <PlansBillingInterval
        {...{ t, billingInterval, handleChangeBillngPeriod }}
      />
      <Price>
        {t(`plans:${choosedPlan}.price.${billingInterval}`)}
        <small>/{t(`plans:${choosedPlan}.${billingInterval}`)}</small>
      </Price>
    </Flex>
    {cards && <CardsModal {...{ cards, isOpen: false, t }} />}
    <Elements>
      <CardForm {...{ t, updateSubscription }} />
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
  updateSubscription: func.isRequired
};

PaymentsSection.defaultProps = {
  cards: null
};

export default PaymentsSection;
