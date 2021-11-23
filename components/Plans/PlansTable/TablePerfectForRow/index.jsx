import React from "react";

import { SUBSCRIPTION_PLANS } from "consts";
import { useTranslation } from "i18n";
import { Row } from "../styled";
import { TableHeadColumnCell, TableHeadPrimaryCell } from "../TableHead/styled";

const TablePerfectForRow = () => {
  const { t } = useTranslation();
  return (
    <Row>
      <TableHeadPrimaryCell>{t("plans:perfectFor.title")}</TableHeadPrimaryCell>
      {Object.values(SUBSCRIPTION_PLANS).map(plan => (
        <TableHeadColumnCell key={plan}>
          {t(`plans:perfectFor.${plan}`)}
        </TableHeadColumnCell>
      ))}
    </Row>
  );
};
export default TablePerfectForRow;
