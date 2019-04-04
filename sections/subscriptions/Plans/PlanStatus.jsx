import { BoldText } from "components";
import { string, func } from "prop-types";
import moment from "moment";

const PlanStatus = ({ nextPaymentAt, cancelAt, trialEndsAt, t }) => {
  if (new Date(trialEndsAt).getTime() > new Date().getTime()) {
    return (
      <>
        {` ${t("trialEndsAt")}: `}
        <BoldText>{moment(trialEndsAt).format("Do MMMM YYYY")}</BoldText>.
      </>
    );
  }
  if (cancelAt) {
    if (new Date(cancelAt).getTime() > new Date().getTime()) {
      return (
        <>
          {` ${t("cancelAt")}: `}
          <BoldText>{moment(cancelAt).format("Do MMMM YYYY")}</BoldText>.
        </>
      );
    }
    return null;
  }
  if (nextPaymentAt) {
    return (
      <>
        {` ${t("nextPaymentAt")}: `}
        <BoldText>{moment(nextPaymentAt).format("Do MMMM YYYY")}</BoldText>.
      </>
    );
  }
  return null;
};

PlanStatus.propTypes = {
  nextPaymentAt: string,
  cancelAt: string,
  trialEndsAt: string,
  t: func.isRequired
};

PlanStatus.defaultProps = {
  nextPaymentAt: null,
  cancelAt: null,
  trialEndsAt: null
};

export default PlanStatus;
