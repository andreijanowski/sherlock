import React, { useMemo } from "react";
import { shape, string, func } from "prop-types";

import { SUBSCRIPTION_PLANS } from "consts";
import { matchPlanBySlug } from "utils/plans";
import { Container } from "./styled";
import TablePlansRow from "../TablePlansRow";

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

  if (!plans || !plans.size) return null;

  return (
    <Container>
      <TablePlansRow
        period={period}
        matchingPlans={matchingPlans}
        onPlanChooseClick={onPlanChooseClick}
      />
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
