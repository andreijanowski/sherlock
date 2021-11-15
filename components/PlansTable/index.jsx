import React, { useMemo, Fragment } from "react";

import { useTranslation } from "i18n";
import { getTableConfig } from "./config";
import TableSectionHeadingRow from "./TableSectionHeadingRow";
import { Table, TableContainer } from "./styled";
import TableSectionLink from "./TableSectionLink";
import TableSectionRow from "./TableSectionRow";

const PlansTable = () => {
  const { t } = useTranslation("plans");
  const config = useMemo(() => getTableConfig(t), [t]);

  return (
    <TableContainer>
      <Table>
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

export default PlansTable;
