import React from "react";
import { shape } from "prop-types";

import { useTranslation } from "i18n";
import { formatPlanPrice } from "utils/plans";
import { TableHeadColumnCell, TableHeadPrimaryCell } from "../TableHead/styled";
import { Row } from "../styled";

const TableIntroductoryRow = ({ matchingPlans }) => {
  const { t } = useTranslation();
  return (
    <Row>
      <TableHeadPrimaryCell>
        {t("plans:introductoryOffer.title")}
      </TableHeadPrimaryCell>
      {matchingPlans.map((plan, index) => {
        const threeMonthPromoPrice = plan.getIn([
          "attributes",
          "threeMonthPromoPrice"
        ]);

        const currency = plan.getIn(["attributes", "currency"]);

        const price = threeMonthPromoPrice
          ? t("plans:introductoryOffer.offer", {
              price: formatPlanPrice({
                cents: threeMonthPromoPrice,
                currency,
                t
              })
            })
          : null;
        return (
          <TableHeadColumnCell key={plan.get("id")} isBlue={index % 2 !== 0}>
            {price}
          </TableHeadColumnCell>
        );
      })}
    </Row>
  );
};

TableIntroductoryRow.propTypes = {
  matchingPlans: shape().isRequired
};

export default TableIntroductoryRow;
