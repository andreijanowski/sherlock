import { Flex } from "@rebass/grid";
import { Button, ButtonWithImageIconWrapper } from "components";
import { func, shape } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Widget, Domain, ApiKey } from "./styled";

const ListItem = ({ item, removeWidget, setEditedWidgetId }) => (
  <Widget onClick={() => setEditedWidgetId(item.get("id"))}>
    <Flex alignItems="center" width="calc(100% - 50px)">
      <Flex flexDirection="column" width={1}>
        <Domain>
          {item.getIn(["attributes", "domains"]) &&
            item.getIn(["attributes", "domains"]).toArray().toString()}
        </Domain>
        <ApiKey>API_KEY: {item.getIn(["attributes", "apiKey"])}</ApiKey>
      </Flex>
    </Flex>
    <Button
      styleName="withImage"
      red
      onClick={() => removeWidget(item.get("id"))}
    >
      <ButtonWithImageIconWrapper>
        <FontAwesomeIcon icon={["fa", "times"]} />
      </ButtonWithImageIconWrapper>
    </Button>
  </Widget>
);

ListItem.propTypes = {
  item: shape().isRequired,
  setEditedWidgetId: func.isRequired,
  removeWidget: func.isRequired
};

export default ListItem;
