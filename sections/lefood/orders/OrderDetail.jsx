import { Box } from "@rebass/grid";
import { BoldText } from "components";
import { string, number, bool } from "prop-types";
import { OrderDetailWrapper } from "./styled";

const OrderDetail = ({ name, price, currency, bold }) => {
  const priceWithCurrency = `${(price / 100).toFixed(2)} ${currency}`;
  return (
    <OrderDetailWrapper {...{ bold }}>
      <Box>{name}</Box>
      <Box>
        {bold && <BoldText>{priceWithCurrency}</BoldText>}
        {!bold && <>{priceWithCurrency}</>}
      </Box>
    </OrderDetailWrapper>
  );
};

OrderDetail.propTypes = {
  name: string.isRequired,
  price: number.isRequired,
  currency: string.isRequired,
  bold: bool.isRequired
};

export default OrderDetail;
