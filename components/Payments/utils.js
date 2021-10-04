import moment from "moment";

import { parseCentsPriceToDottedFormat } from "utils/price";

const DATE_FORMAT = "DD/MM/YYYY";

export const getPaymentDetails = payment => {
  const id = payment.getIn(["id"]);
  const date = moment(payment.getIn(["attributes", "createdAt"])).format(
    DATE_FORMAT
  );
  const client = payment.getIn(["attributes", "userName"]);
  const currency = payment.getIn(["attributes", "currency"]);
  const totalCostCents = payment.getIn(["attributes", "amountCents"]);
  const amount = parseCentsPriceToDottedFormat(totalCostCents, currency);

  console.log(payment.getIn(["attributes", "state"]));

  return {
    id,
    date,
    client,
    currency,
    amount
  };
};
