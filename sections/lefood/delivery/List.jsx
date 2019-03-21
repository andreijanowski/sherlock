import { Flex, Box } from "@rebass/grid";
import { H3 } from "components";
import { func, arrayOf, shape } from "prop-types";
import { Delivery, Code, Price, Remove } from "./styled";

const List = ({ deliveries, removeDelivery, t }) => (
  <>
    <H3 mt={3}>{t("addedZipCodes")}</H3>
    <Flex flexWrap="wrap" m={-2}>
      {deliveries &&
        deliveries.map(d => (
          <Box p={2} key={d.id}>
            <Delivery>
              <Code>{d.code}</Code>
              <Price>
                {(d.priceCents / 100).toFixed(2)}
                {d.currency}
              </Price>
              <Remove onClick={() => removeDelivery(d.id)} />
            </Delivery>
          </Box>
        ))}
    </Flex>
  </>
);

List.propTypes = {
  deliveries: arrayOf(shape()).isRequired,
  removeDelivery: func.isRequired,
  t: func.isRequired
};

export default List;
