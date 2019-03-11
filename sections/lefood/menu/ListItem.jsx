import { Flex } from "@rebass/grid";
import { Button, ButtonWithImageIconWrapper } from "components";
import { func, shape } from "prop-types";
import { Dish, Name, Description, Price, Remove, Image } from "./styled";

const ListItem = ({ item, removeDish }) => (
  <Dish>
    <Flex alignItems="center" width="calc(100% - 150px)">
      <Image
        src={
          item.pictures &&
          item.pictures.length &&
          (item.pictures[0].photo.tablet.url || item.pictures[0].photo.url)
        }
      />
      <Flex flexDirection="column" width="calc(100% - 80px)">
        <Name>{item.name}</Name>
        <Description>{item.description}</Description>
      </Flex>
    </Flex>
    <Flex alignItems="center">
      <Price>
        {(item.pricePerItemCents / 100).toFixed(2)}
        {item.currency}
      </Price>
      <Button styleName="withImage" red onClick={() => removeDish(item.id)}>
        <ButtonWithImageIconWrapper>
          <Remove />
        </ButtonWithImageIconWrapper>
      </Button>
    </Flex>
  </Dish>
);

ListItem.propTypes = {
  item: shape().isRequired,
  removeDish: func.isRequired
};

export default ListItem;
