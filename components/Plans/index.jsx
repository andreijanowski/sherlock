import { func, string } from "prop-types";
import { Box } from "@rebass/grid";
import { Router } from "routes";
import Plan from "./plan";

const Plans = ({
  t,
  lng,
  billingInterval,
  choosePlan,
  currentPlanName,
  currentPlanInterval
}) => (
  <>
    <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
      <Plan
        {...{
          t,
          billingInterval,
          currentPlanName,
          currentPlanInterval,
          color: "limeade",
          name: "essential",
          onClickActionButton: () =>
            choosePlan
              ? choosePlan("essential")
              : Router.pushRoute(`/${lng}/register/`)
        }}
      />
    </Box>
    <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
      <Plan
        {...{
          t,
          billingInterval,
          currentPlanName,
          currentPlanInterval,
          color: "deepSkyBlue",
          name: "basic",
          onClickActionButton: () =>
            choosePlan
              ? choosePlan("basic")
              : Router.pushRoute(`/${lng}/register/`)
        }}
      />
    </Box>
    <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
      <Plan
        {...{
          t,
          billingInterval,
          currentPlanName,
          currentPlanInterval,
          color: "navyBlue",
          name: "premium",
          onClickActionButton: () =>
            choosePlan
              ? choosePlan("premium")
              : Router.pushRoute(`/${lng}/register/`)
        }}
      />
    </Box>
    <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
      <Plan
        {...{
          t,
          billingInterval,
          currentPlanName,
          currentPlanInterval,
          color: "hanPurple",
          name: "professional",
          onClickActionButton: () => {
            window.location.href = "mailto:hello@foodetective.co";
          }
        }}
      />
    </Box>
  </>
);

Plans.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  billingInterval: string.isRequired,
  choosePlan: func,
  currentPlanName: string,
  currentPlanInterval: string
};

Plans.defaultProps = {
  choosePlan: null,
  currentPlanName: null,
  currentPlanInterval: null
};

export default Plans;
export { default as PlansBillingInterval } from "./BillingInterval";
