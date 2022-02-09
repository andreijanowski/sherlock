import { Box } from "@rebass/grid";
import { string, number, bool, shape } from "prop-types";

import { BoldText } from "components";
import { OrderDetailWrapper } from "./styled";

const OrderDetail = ({ name, price, currency, isBold, options }) => {
  const priceWithCurrency = `${(price / 100).toFixed(2)} ${currency}`;

  return (
    <>
      <OrderDetailWrapper {...{ isBold }}>
        <Box>{name}</Box>
        <Box>
          {isBold && <BoldText>{priceWithCurrency}</BoldText>}
          {!isBold && <>{priceWithCurrency}</>}
        </Box>
      </OrderDetailWrapper>
      {options &&
        options.map(option => {
          const units = option.getIn(["attributes", "units"]);
          const optionName = option.getIn(["attributes", "dishOptionName"]);
          const optionPrice = option.getIn(["attributes", "subsumCents"]);
          const formattedOptionPrice = `${(optionPrice / 100).toFixed(
            2
          )} ${currency}`;

          return (
            <OrderDetailWrapper key={option.get("id")} pl={3}>
              <Box>
                {units} x {optionName}
              </Box>
              <Box>{formattedOptionPrice}</Box>
            </OrderDetailWrapper>
          );
        })}
    </>
  );
};

OrderDetail.propTypes = {
  name: string.isRequired,
  price: number.isRequired,
  currency: string.isRequired,
  isBold: bool,
  options: shape()
};

OrderDetail.defaultProps = {
  isBold: false,
  options: undefined
};

export default OrderDetail;
