import { Flex } from "@rebass/grid";
import { H3 } from "components";
import { func, shape } from "prop-types";
import ListItem from "./ListItem";

const List = ({ widgets, removeWidget, t, setEditedWidgetId }) =>
  widgets ? (
    <>
      <H3>{t("widgetsList")}</H3>
      <Flex flexDirection="column">
        {widgets.valueSeq().map(item => (
          <ListItem
            {...{
              item,
              removeWidget,
              key: item.get("id"),
              setEditedWidgetId
            }}
          />
        ))}
      </Flex>
    </>
  ) : null;

List.propTypes = {
  widgets: shape(),
  removeWidget: func.isRequired,
  setEditedWidgetId: func.isRequired,
  t: func.isRequired
};

List.defaultProps = {
  widgets: null
};

export default List;
