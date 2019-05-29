import { Flex, Box } from "@rebass/grid";
import { H3 } from "components";
import { func, arrayOf, shape } from "prop-types";
import { Delivery, Code, Price, Remove } from "./styled";

const List = ({ deliveries, removeDelivery, t }) => (
  <>
    <H3 mt={3}>{t("addedZipCodes")}</H3>
    <Flex flexWrap="wrap" m={-2}>
      {deliveries &&
        deliveries.valueSeq().map(d => (
          <Box p={2} key={d.get("id")}>
            <Delivery>
              <Code>{d.getIn(["attributes", "code"])}</Code>
              <Price>
                {(d.getIn(["attributes", "priceCents"]) / 100).toFixed(2)}
                {d.getIn(["attributes", "currency"])}
              </Price>
              <Remove onClick={() => removeDelivery(d.get("id"))} />
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
