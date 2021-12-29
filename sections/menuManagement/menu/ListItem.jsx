import { Flex, Box } from "@rebass/grid";
import { Button, ButtonWithImageIconWrapper } from "components";
import { func, shape } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Actions,
  Description,
  Dish,
  Image,
  Info,
  InfoText,
  Name,
  Price
} from "./styled";

const ListItem = ({ item, removeDish, setEditedDishId }) => {
  const pictures = item.getIn(["relationships", "pictures", "data"]);
  const picture = pictures && pictures.first();
  const imageUrl =
    picture &&
    (picture.getIn(["attributes", "photo", "tablet", "url"]) ||
      picture.getIn(["attributes", "photo", "url"]));
  return (
    <Dish>
      <Info alignItems="center" width="50%">
        <Image src={imageUrl} />
        <InfoText flexDirection="column">
          <Name>{item.getIn(["attributes", "name"])}</Name>
          <Description>{item.getIn(["attributes", "description"])}</Description>
        </InfoText>
      </Info>
      <Actions
        flexWrap="wrap"
        alignItems="center"
        justifyContent="flex-end"
        width="50%"
      >
        <Price>
          {(item.getIn(["attributes", "pricePerItemCents"]) / 100).toFixed(2)}
          {item.getIn(["attributes", "currency"])}
        </Price>
        <Flex alignItems="center" ml={3}>
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
      </Actions>
    </Dish>
  );
};

ListItem.propTypes = {
  item: shape().isRequired,
  setEditedDishId: func.isRequired,
  removeDish: func.isRequired
};

export default ListItem;
