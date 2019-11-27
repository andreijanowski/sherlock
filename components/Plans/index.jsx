import { func, string, bool } from "prop-types";
import { Box } from "@rebass/grid";
import { API_URL, APP_URL } from "consts";
import Plan from "./plan";

const Plans = ({
  t,
  lng,
  billingInterval,
  choosePlan,
  nextPlanName,
  currentPlanInterval,
  isSubscriptionView
}) => (
  <>
    <Box mb={[40, 0]} width={[1, 1 / 2]}>
      <Plan
        {...{
          t,
          billingInterval,
          nextPlanName,
          currentPlanInterval,
          isSubscriptionView,
          color: "limeade",
          name: "essential",
          onClickActionButton: () => {
            if (choosePlan) {
              choosePlan("essential");
            } else {
              window.location.href = `${API_URL}/users/sign_up?locale=${lng}&redirect_url=${APP_URL}/instant-login?plan=essential`;
            }
          }
        }}
      />
    </Box>
    <Box mb={[40, 0]} width={[1, 1 / 2]}>
      <Plan
        {...{
          t,
          billingInterval,
          nextPlanName,
          currentPlanInterval,
          isSubscriptionView,
          color: "deepSkyBlue",
          name: "basic",
          onClickActionButton: () => {
            if (choosePlan) {
              choosePlan("basic");
            } else {
              window.location.href = `${API_URL}/users/sign_up?locale=${lng}&redirect_url=${APP_URL}/instant-login?plan=basic`;
            }
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
  currentPlanInterval: string,
  isSubscriptionView: bool.isRequired
};

Plans.defaultProps = {
  choosePlan: null,
  nextPlanName: null,
  currentPlanInterval: null
};

export default Plans;
export { default as PlansBillingInterval } from "./BillingInterval";
