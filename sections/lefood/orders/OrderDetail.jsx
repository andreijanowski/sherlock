import { Box } from "@rebass/grid";
import { BoldText } from "components";
import { string, number, bool } from "prop-types";
import { OrderDetailWrapper } from "./styled";

const OrderDetail = ({ name, price, currency, isBold }) => {
  const priceWithCurrency = `${(price / 100).toFixed(2)} ${currency}`;
  return (
    <OrderDetailWrapper {...{ isBold }}>
      <Box>{name}</Box>
      <Box>
        {isBold && <BoldText>{priceWithCurrency}</BoldText>}
        {!isBold && <>{priceWithCurrency}</>}
      </Box>
    </OrderDetailWrapper>
  );
};

OrderDetail.propTypes = {
  name: string.isRequired,
  price: number.isRequired,
  currency: string.isRequired,
  isBold: bool
};

OrderDetail.defaultProps = {
  isBold: false
};

export default OrderDetail;
