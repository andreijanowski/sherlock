import { Flex } from "@rebass/grid";
import { H3 } from "components";
import { func, arrayOf, shape } from "prop-types";
import ListItem from "./ListItem";

const categories = [
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
  "cocktails",
  "other"
];

const List = ({ dishes, removeDish, t }) =>
  categories.map(c => {
    const items = dishes && dishes.filter(i => i.category === c);
    return items && items.length ? (
      <>
        <H3>{t(c)}</H3>
        <Flex flexDirection="column">
          {items.map(item => (
            <ListItem {...{ item, removeDish, key: item.id }} />
          ))}
        </Flex>
      </>
    ) : null;
  });

List.propTypes = {
  dishes: arrayOf(shape()).isRequired,
  removeDish: func.isRequired,
  t: func.isRequired
};

export default List;
