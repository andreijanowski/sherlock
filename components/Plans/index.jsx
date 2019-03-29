import { func, string } from "prop-types";
import { Box } from "@rebass/grid";
import { Router } from "routes";
import Plan from "./plan";

const Plans = ({ t, lng, billingPeriod }) => (
  <>
    <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
      <Plan
        {...{
          t,
          billingPeriod,
          color: "limeade",
          name: "essential",
          onClickActionButton: () => Router.pushRoute(`/${lng}/register/`)
        }}
      />
    </Box>
    <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
      <Plan
        {...{
          t,
          billingPeriod,
          color: "deepSkyBlue",
          name: "basic",
          onClickActionButton: () => Router.pushRoute(`/${lng}/register/`)
        }}
      />
    </Box>
    <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
      <Plan
        {...{
          t,
          billingPeriod,
          color: "navyBlue",
          name: "premium",
          onClickActionButton: () => Router.pushRoute(`/${lng}/register/`)
        }}
      />
    </Box>
    <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
      <Plan
        {...{
          t,
          billingPeriod,
          color: "hanPurple",
          name: "professional",
          onClickActionButton: () => {}
        }}
      />
    </Box>
  </>
);

Plans.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  billingPeriod: string.isRequired
};

export default Plans;
export { default as PlansBillingPeriod } from "./BillingPeriod";
