import { func, string } from "prop-types";
import { Box } from "@rebass/grid";
import { Router } from "routes";
import Plan from "./plan";

const Plans = ({
  t,
  lng,
  billingInterval,
  choosePlan,
  nextPlanName,
  currentPlanInterval
}) => (
  <>
    <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
      <Plan
        {...{
          t,
          billingInterval,
          nextPlanName,
          currentPlanInterval,
          color: "limeade",
          name: "essential",
          onClickActionButton: () =>
            choosePlan
              ? choosePlan("essential")
              : Router.pushRoute(`/${lng}/register/?plan=essential`)
        }}
      />
    </Box>
    <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
      <Plan
        {...{
          t,
          billingInterval,
          nextPlanName,
          currentPlanInterval,
          color: "deepSkyBlue",
          name: "basic",
          onClickActionButton: () =>
            choosePlan
              ? choosePlan("basic")
              : Router.pushRoute(`/${lng}/register/?plan=basic`)
        }}
      />
    </Box>
    <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
      <Plan
        {...{
          t,
          billingInterval,
          nextPlanName,
          currentPlanInterval,
          color: "navyBlue",
          name: "premium",
          onClickActionButton: () =>
            choosePlan
              ? choosePlan("premium")
              : Router.pushRoute(`/${lng}/register/?plan=premium`)
        }}
      />
    </Box>
    <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
      <Plan
        {...{
          t,
          billingInterval,
          nextPlanName,
          currentPlanInterval,
          color: "hanPurple",
          name: "professional",
          onClickActionButton: () => {
            window.open("mailto:hello@foodetective.co", "_blank");
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
  nextPlanName: string,
  currentPlanInterval: string
};

Plans.defaultProps = {
  choosePlan: null,
  nextPlanName: null,
  currentPlanInterval: null
};

export default Plans;
export { default as PlansBillingInterval } from "./BillingInterval";
