import React, { useMemo } from "react";
import { shape, string, func } from "prop-types";

import { SUBSCRIPTION_PLANS } from "consts";
import { matchPlanBySlug } from "utils/plans";
import { Container } from "./styled";
import TablePlansRow from "../TablePlansRow";
import TableIntroductoryRow from "../TableIntroductoryRow";
import TablePerfectForRow from "../TablePerfectForRow";

const TableHead = ({ plans, period, currency, onPlanChooseClick }) => {
  const matchingPlans = useMemo(() => {
    const res = [];

    Object.values(SUBSCRIPTION_PLANS).forEach(name => {
      const plan = matchPlanBySlug({ plans, name, period, currency });
      if (plan) {
        res.push(plan);
      }
    });

    return res;
  }, [currency, period, plans]);

  return (
    <Container>
      <TablePlansRow
        period={period}
        matchingPlans={matchingPlans}
        onPlanChooseClick={onPlanChooseClick}
      />
      <TableIntroductoryRow matchingPlans={matchingPlans} />
      <TablePerfectForRow />
    </Container>
  );
};

TableHead.propTypes = {
  period: string.isRequired,
  currency: string.isRequired,
  plans: shape().isRequired,
  onPlanChooseClick: func.isRequired
};

export default TableHead;
