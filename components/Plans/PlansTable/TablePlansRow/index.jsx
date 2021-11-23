import React from "react";
import { shape, func, string, arrayOf } from "prop-types";

import { useTranslation } from "i18n";
import { Row } from "../styled";
import { TableHeadPrimaryCell } from "../TableHead/styled";
import TablePlan from "../TablePlan";

const TablePlansRow = ({ period, matchingPlans, onPlanChooseClick }) => {
  const { t } = useTranslation();
  return (
    <Row>
      <TableHeadPrimaryCell>{t("plans:ourPlans")}</TableHeadPrimaryCell>
      {matchingPlans.map(plan => (
        <TablePlan
          key={plan.get("id")}
          period={period}
          plan={plan}
          onPlanChooseClick={onPlanChooseClick}
        />
      ))}
    </Row>
  );
};

TablePlansRow.propTypes = {
  period: string.isRequired,
  matchingPlans: arrayOf(shape()).isRequired,
  onPlanChooseClick: func.isRequired
};
export default TablePlansRow;
