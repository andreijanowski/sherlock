import { Flex, Box } from "@rebass/grid";
import { Button, ButtonWithImageIconWrapper } from "components";
import { func, shape } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dish, Name, Description } from "./styled";

const ListItem = ({ item, removeWidget, setEditedWidgetId }) => (
  <Dish>
    <Flex alignItems="center" width="calc(100% - 200px)">
      <Flex flexDirection="column" width="calc(100% - 80px)">
        <Name>{item.getIn(["attributes", "domains"])}</Name>
        <Description>{item.getIn(["attributes", "settings"])}</Description>
      </Flex>
    </Flex>
    <Flex alignItems="center">
      <Button
        styleName="withImage"
        blue
        onClick={() => setEditedWidgetId(item.get("id"))}
      >
        <ButtonWithImageIconWrapper>
          <FontAwesomeIcon icon={["fa", "pen"]} />
        </ButtonWithImageIconWrapper>
      </Button>
      <Box ml={1}>
        <Button
          styleName="withImage"
          red
          onClick={() => removeWidget(item.get("id"))}
        >
          <ButtonWithImageIconWrapper>
            <FontAwesomeIcon icon={["fa", "times"]} />
          </ButtonWithImageIconWrapper>
        </Button>
      </Box>
    </Flex>
  </Dish>
);

ListItem.propTypes = {
  item: shape().isRequired,
  setEditedWidgetId: func.isRequired,
  removeWidget: func.isRequired
};

export default ListItem;
