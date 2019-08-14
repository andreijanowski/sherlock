import { Flex, Box } from "@rebass/grid";
import { Button, ButtonWithImageIconWrapper } from "components";
import { func, shape } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Name, Price } from "./styled";

const ListItem = ({ item, t, removeTable, setEditedTableId }) => (
  <Table>
    <Flex alignItems="center" width="calc(100% - 200px)">
      <Name>{`${t("tableNo")} ${item.getIn(["attributes", "number"])}`}</Name>
    </Flex>
    <Flex alignItems="center">
      <Price>{`${item.getIn(["attributes", "numberOfSeats"])} ${t(
        "seats"
      )} `}</Price>
      <Button
        styleName="withImage"
        blue
        onClick={() => setEditedTableId(item.get("id"))}
      >
        <ButtonWithImageIconWrapper>
          <FontAwesomeIcon icon={["fa", "pen"]} />
        </ButtonWithImageIconWrapper>
      </Button>
      <Box ml={1}>
        <Button
          styleName="withImage"
          red
          onClick={() => removeTable(item.get("id"))}
        >
          <ButtonWithImageIconWrapper>
            <FontAwesomeIcon icon={["fa", "times"]} />
          </ButtonWithImageIconWrapper>
        </Button>
      </Box>
    </Flex>
  </Table>
);

ListItem.propTypes = {
  item: shape().isRequired,
  setEditedTableId: func.isRequired,
  removeTable: func.isRequired,
  t: func.isRequired
};

export default ListItem;
