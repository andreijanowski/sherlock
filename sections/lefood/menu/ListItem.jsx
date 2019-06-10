import { Flex, Box } from "@rebass/grid";
import { Button, ButtonWithImageIconWrapper } from "components";
import { func, shape } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dish, Name, Description, Price, Image } from "./styled";

const ListItem = ({ item, removeDish, setEditedDishId }) => {
  const pictures = item.getIn(["relationships", "pictures", "data"]);
  const picture = pictures && pictures.first();
  const imageUrl =
    picture &&
    (picture.getIn(["attributes", "photo", "tablet", "url"]) ||
      picture.getIn(["attributes", "photo", "url"]));
  return (
    <Dish>
      <Flex alignItems="center" width="calc(100% - 200px)">
        <Image src={imageUrl} />
        <Flex flexDirection="column" width="calc(100% - 80px)">
          <Name>{item.getIn(["attributes", "name"])}</Name>
          <Description>{item.getIn(["attributes", "description"])}</Description>
        </Flex>
      </Flex>
      <Flex alignItems="center">
        <Price>
          {(item.getIn(["attributes", "pricePerItemCents"]) / 100).toFixed(2)}
          {item.getIn(["attributes", "currency"])}
        </Price>
        <Button
          styleName="withImage"
          blue
          onClick={() => setEditedDishId(item.get("id"))}
        >
          <ButtonWithImageIconWrapper>
            <FontAwesomeIcon icon={["fa", "pen"]} />
          </ButtonWithImageIconWrapper>
        </Button>
        <Box ml={1}>
          <Button
            styleName="withImage"
            red
            onClick={() => removeDish(item.get("id"))}
          >
            <ButtonWithImageIconWrapper>
              <FontAwesomeIcon icon={["fa", "times"]} />
            </ButtonWithImageIconWrapper>
          </Button>
        </Box>
      </Flex>
    </Dish>
  );
};

ListItem.propTypes = {
  item: shape().isRequired,
  setEditedDishId: func.isRequired,
  removeDish: func.isRequired
};

export default ListItem;
