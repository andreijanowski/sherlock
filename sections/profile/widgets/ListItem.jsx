import { Flex, Box } from "@rebass/grid";
import { Button, ButtonWithImageIconWrapper } from "components";
import { func, shape } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Widget, Domain, ApiKey } from "./styled";

const ListItem = ({ item, removeWidget, setEditedWidgetId }) => (
  <Widget>
    <Flex alignItems="center" width="calc(100% - 90px)">
      <Flex flexDirection="column" width={1}>
        <Domain>{item.getIn(["attributes", "domains"])}</Domain>
        <ApiKey>{item.getIn(["attributes", "apiKey"])}</ApiKey>
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
  </Widget>
);

ListItem.propTypes = {
  item: shape().isRequired,
  setEditedWidgetId: func.isRequired,
  removeWidget: func.isRequired
};

export default ListItem;
