import { func, string, shape } from "prop-types";
import { Plans, PlansBillingInterval, BoldText } from "components";
import { Flex, Box } from "@rebass/grid";
import moment from "moment";
import { Wrapper } from "../styled";
import { parsePlan } from "./utils";

const PlansSection = ({
  t,
  lng,
  billingInterval,
  handleChangeBillngPeriod,
  choosePlan,
  currentPlan
}) => {
  const { name, nextPaymentDate, interval } = parsePlan(currentPlan);
  return (
    <Wrapper>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Box mb={3}>
          {`${t("yourCurrentPlan")}: `}
          <BoldText>{t(`plans:${name}.name`)}.</BoldText>
          {nextPaymentDate && (
            <>
              {` ${t("nextPayment")}: `}
              <BoldText>{moment(nextPaymentDate).format("Do MMMM")}</BoldText>.
            </>
          )}
        </Box>
        <PlansBillingInterval
          {...{ t, billingInterval, handleChangeBillngPeriod }}
        />
      </Flex>
      <Flex mx={-2}>
        <Plans
          {...{
            t,
            lng,
            billingInterval,
            choosePlan,
            currentPlanName: name,
            currentPlanInterval: interval
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
  currentPlan: shape()
};

PlansSection.defaultProps = {
  currentPlan: null
};

export default PlansSection;
