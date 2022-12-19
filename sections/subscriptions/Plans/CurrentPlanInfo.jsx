import React, { useState, useCallback } from "react";
import { Box } from "@rebass/grid";
import { func, shape } from "prop-types";

import { BoldText, StyledButton, H3 } from "components";
import Confirm from "components/modals/Confirm";
import { getPlanData } from "utils/plans";
import PlanStatus from "./PlanStatus";

const CurrentPlanInfo = ({ t, currentPlan, handleCancelSubscription }) => {
  const [showModal, setShowModal] = useState(false);

  const onCancelConfirm = useCallback(() => {
    handleCancelSubscription(currentPlan.get("id"));
  }, [currentPlan, handleCancelSubscription]);

  const onCancelSubscriptionClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const hideModal = useCallback(() => {
    setShowModal(false);
  }, []);

  if (!currentPlan) return null;

  const { fullName } = getPlanData({ plan: currentPlan, t });
  const planWillBeCanceled = !!currentPlan.getIn(["attributes", "cancelAt"]);

  return (
    <Box mb={3}>
      {`${t("yourCurrentPlan")}: `}
      <BoldText>{fullName}.</BoldText>
      <PlanStatus
        {...{
          nextPaymentAt:
            currentPlan && currentPlan.getIn(["attributes", "nextPaymentAt"]),
          cancelAt:
            currentPlan && currentPlan.getIn(["attributes", "cancelAt"]),
          trialEndsAt:
            currentPlan && currentPlan.getIn(["attributes", "trialEndsAt"]),
          t
        }}
      />
      {!planWillBeCanceled && (
        <Box mt={3}>
          <StyledButton
            onClick={onCancelSubscriptionClick}
            styleName="becomePartner"
          >
            {t("plans:cancelSubscription")}
          </StyledButton>
        </Box>
      )}
      {showModal && (
        <Confirm
          open
          restyled
          inverseColors
          btnOkText={t("forms:yes")}
          btnCancelText={t("forms:no")}
          onConfirm={onCancelConfirm}
          onClose={hideModal}
        >
          <H3>{t("plans:cancelSubscriptionPrompt")}</H3>
        </Confirm>
      )}
    </Box>
  );
};

CurrentPlanInfo.propTypes = {
  t: func.isRequired,
  handleCancelSubscription: func.isRequired,
  currentPlan: shape()
};

CurrentPlanInfo.defaultProps = {
  currentPlan: null
};

export default CurrentPlanInfo;
