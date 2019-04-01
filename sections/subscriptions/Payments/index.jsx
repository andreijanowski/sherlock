import { func, string, arrayOf, shape } from "prop-types";
import { PlansBillingPeriod } from "components";
import { Flex, Box } from "@rebass/grid";
import { Elements } from "react-stripe-elements";
import { Wrapper } from "../styled";
import CardsModal from "./CardsModal";
import CardForm from "./CardForm";

const PaymentsSection = ({
  t,
  billingPeriod,
  handleChangeBillngPeriod,
  cards
}) => (
  <Wrapper>
    <Box mb={3}>{t("finishPoweringYouUp")}</Box>
    <Flex justifyContent="space-between" alignItems="center" mb={4}>
      <PlansBillingPeriod {...{ t, billingPeriod, handleChangeBillngPeriod }} />
    </Flex>
    {cards && <CardsModal {...{ cards, isOpen: true }} />}
    <Elements>
      <CardForm {...{ t }} />
    </Elements>
  </Wrapper>
);

PaymentsSection.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  billingPeriod: string.isRequired,
  handleChangeBillngPeriod: func.isRequired,
  cards: arrayOf(shape())
};

PaymentsSection.defaultProps = {
  cards: null
};

export default PaymentsSection;
