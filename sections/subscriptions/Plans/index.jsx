import { func, string } from "prop-types";
import { Plans, PlansBillingPeriod, BoldText } from "components";
import { Flex, Box } from "@rebass/grid";
import { Wrapper } from "../styled";

const PlansSection = ({ t, lng, billingPeriod, handleChangeBillngPeriod }) => (
  <Wrapper>
    <Flex justifyContent="space-between" alignItems="center" mb={4}>
      <Box mb={3}>
        {t("yourCurrentPlan")}: <BoldText>planNameHere</BoldText>.{" "}
        {t("nextPayment")}:<BoldText>nexPaymentDateHere</BoldText>.
      </Box>
      <PlansBillingPeriod {...{ t, billingPeriod, handleChangeBillngPeriod }} />
    </Flex>
    <Flex mx={-2}>
      <Plans
        {...{
          t,
          lng,
          billingPeriod
        }}
      />
    </Flex>
  </Wrapper>
);

PlansSection.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  billingPeriod: string.isRequired,
  handleChangeBillngPeriod: func.isRequired
};

export default PlansSection;
