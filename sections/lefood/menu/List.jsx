import { Fragment } from "react";
import { Flex } from "@rebass/grid";
import { H3 } from "components";
import { func, shape } from "prop-types";
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

const List = ({ dishes, removeDish, t, setEditedDishId }) =>
  categories.map(c => {
    const items =
      dishes && dishes.filter(i => i.getIn(["attributes", "category"]) === c);
    return items && items.size ? (
      <Fragment key={c}>
        <H3>{t(c)}</H3>
        <Flex flexDirection="column">
          {items.valueSeq().map(item => (
            <ListItem
              {...{ item, removeDish, key: item.get("id"), setEditedDishId }}
            />
          ))}
        </Flex>
      </Fragment>
    ) : null;
  });

List.propTypes = {
  dishes: shape(),
  removeDish: func.isRequired,
  setEditedDishId: func.isRequired,
  t: func.isRequired
};

List.defaultProps = {
  dishes: null
};

export default List;
