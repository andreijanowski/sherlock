import { Flex } from "@rebass/grid";
import { H3 } from "components";
import { func, arrayOf, shape } from "prop-types";
import ListItem from "./ListItem";

const categories = [
  "other",
  "mains",
  "desserts",
  "softs",
  "formulas",
  "starters",
  "sides",
  "pastries",
  "coffee",
  "beer",
  "wine",
  "cocktails"
];

const List = ({ dishes, removeDish, t }) =>
  categories.map(c => (
    <>
      <H3>{t(c)}</H3>
      <Flex flexDirection="column">
        {dishes &&
          dishes
            .filter(i => i.category === c)
            .map(item => <ListItem {...{ item, removeDish, key: item.id }} />)}
      </Flex>
    </>
  ));

List.propTypes = {
  dishes: arrayOf(shape()).isRequired,
  removeDish: func.isRequired,
  t: func.isRequired
};

export default List;
