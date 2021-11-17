import React, { useMemo, Fragment } from "react";
import { string, shape, func } from "prop-types";

import { useTranslation } from "i18n";
import { getTableConfig } from "./config";
import TableSectionHeadingRow from "./TableSectionHeadingRow";
import { Table, TableContainer } from "./styled";
import TableSectionLink from "./TableSectionLink";
import TableSectionRow from "./TableSectionRow";
import TableHead from "./TableHead";

const PlansTable = ({ plans, currency, period, onPlanChooseClick }) => {
  const { t } = useTranslation("plans");
  const config = useMemo(() => getTableConfig(t), [t]);

  return (
    <TableContainer>
      <Table>
        <TableHead
          plans={plans}
          currency={currency}
          period={period}
          onPlanChooseClick={onPlanChooseClick}
        />
        <tbody>
          {config.map(tablePart => (
            <Fragment key={tablePart.heading}>
              <TableSectionHeadingRow tablePart={tablePart} />
              {tablePart.sections.map(({ id, link, rows }) => (
                <Fragment key={id}>
                  {link && <TableSectionLink link={link} />}
                  {rows.map(row => (
                    <TableSectionRow key={row.label} row={row} />
                  ))}
                </Fragment>
              ))}
            </Fragment>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

PlansTable.propTypes = {
  currency: string.isRequired,
  period: string.isRequired,
  plans: shape().isRequired,
  onPlanChooseClick: func.isRequired
};

export default PlansTable;
