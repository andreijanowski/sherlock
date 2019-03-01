import { Flex } from "@rebass/grid";
import { H3 } from "components";
import { func, arrayOf, shape } from "prop-types";
import ListItem from "./ListItem";

const List = ({ dishes, removeDish, t }) => (
  <>
    <H3>{t("trays")}</H3>
    <Flex flexDirection="column">
      {dishes &&
        dishes
          .filter(i => i.category === "trays")
          .map(item => <ListItem {...{ item, removeDish, key: item.id }} />)}
    </Flex>
    <H3 mt={4}>{t("desserts")}</H3>
    <Flex flexDirection="column">
      {dishes &&
        dishes
          .filter(i => i.category === "desserts")
          .map(item => <ListItem {...{ item, removeDish, key: item.id }} />)}
    </Flex>
    <H3 mt={4}>{t("softDrinks")}</H3>
    <Flex flexDirection="column">
      {dishes &&
        dishes
          .filter(i => i.category === "soft_drinks")
          .map(item => <ListItem {...{ item, removeDish, key: item.id }} />)}
    </Flex>
  </>
);

List.propTypes = {
  dishes: arrayOf(shape()).isRequired,
  removeDish: func.isRequired,
  t: func.isRequired
};

export default List;
