import React, { useMemo } from "react";
import { shape, string, func } from "prop-types";

import { SUBSCRIPTION_PLANS } from "consts";
import { matchPlanBySlug } from "utils/plans";
import { Container } from "./styled";
import TablePlansRow from "../TablePlansRow";
import TableIntroductoryRow from "../TableIntroductoryRow";
import TablePerfectForRow from "../TablePerfectForRow";

const TableHead = ({ plans, period, currency, onPlanChooseClick }) => {
  const matchingPlans = useMemo(
    () =>
      Object.values(SUBSCRIPTION_PLANS)
        .map(name => matchPlanBySlug({ plans, name, period, currency }))
        .filter(Boolean),
    [currency, period, plans]
  );

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
