import { func, string, bool } from "prop-types";
import { Box, Flex } from "@rebass/grid";
import { API_URL, APP_URL } from "consts";
import Plan from "./plan";

const PlansLandingPage = ({
  t,
  lng,
  billingInterval,
  choosePlan,
  nextPlanName,
  currentPlanInterval,
  isSubscriptionView,
  isCanceled
}) => (
  <Flex
    justifyContent="space-between"
    width={1}
    flexDirection={["column", "row"]}
  >
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
          isCanceled,
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
          color: "limeade",
          name: "premium",
          onClickActionButton: () => {
            if (choosePlan) {
              choosePlan("premium");
            } else {
              window.location.href = `${API_URL}/users/sign_up?locale=${lng}&redirect_url=${APP_URL}/instant-login?plan=premium`;
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
          color: "limeade",
          name: "special",
          onClickActionButton: () => {
            window.location.href = `https://share.hsforms.com/1UW67s4YOTTKvC2NIum5X0w3cpmu`;
          }
        }}
      />
    </Box>
  </Flex>
);

PlansLandingPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  billingInterval: string.isRequired,
  choosePlan: func,
  nextPlanName: string,
  currentPlanInterval: string,
  isSubscriptionView: bool.isRequired,
  isCanceled: bool
};

PlansLandingPage.defaultProps = {
  choosePlan: null,
  nextPlanName: null,
  currentPlanInterval: null,
  isCanceled: false
};

export default PlansLandingPage;
export { default as PlansBillingInterval } from "./BillingInterval";