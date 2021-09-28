import React, { useMemo } from "react";
import { shape } from "prop-types";

import { TableDataCell, TableDataRow } from "components/Table";
import { getPaymentDetails } from "./utils";

const PaymentsTableRow = ({ payment }) => {
  const { id, date, client, amount, currency } = useMemo(
    () => getPaymentDetails(payment),
    [payment]
  );

  return (
    <TableDataRow>
      <TableDataCell>{id}</TableDataCell>
      <TableDataCell>{date}</TableDataCell>
      <TableDataCell>{client}</TableDataCell>
      <TableDataCell>{amount}</TableDataCell>
      <TableDataCell>{currency}</TableDataCell>
    </TableDataRow>
  );
};

PaymentsTableRow.propTypes = {
  payment: shape().isRequired
};

export default PaymentsTableRow;
