import { Fragment } from "react";
import { Flex } from "@rebass/grid";
import { H3 } from "components";
import { func, shape, arrayOf } from "prop-types";
import ListItem from "./ListItem";

const List = ({ items, removeDish, setEditedDishId }) =>
  items.map(
    ({ dishes, label }) =>
      dishes.size > 0 && (
        <Fragment key={label}>
          <H3>{label}</H3>
          <Flex flexDirection="column">
            {dishes.valueSeq().map(i => (
              <ListItem
                item={i}
                removeDish={removeDish}
                key={i.get("id")}
                setEditedDishId={setEditedDishId}
              />
            ))}
          </Flex>
        </Fragment>
      )
  );

List.propTypes = {
  items: arrayOf(shape()),
  removeDish: func.isRequired,
  setEditedDishId: func.isRequired
};

List.defaultProps = {
  item: null
};

export default List;
