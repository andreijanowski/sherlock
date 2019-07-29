import { Flex, Box } from "@rebass/grid";
import { func, shape } from "prop-types";
import { H3 } from "components";
import ListItem from "./ListItem";

const List = ({ tables, t, removeTable, setEditedTableId }) => (
  <>
    <H3>{t("tablesList")}</H3>
    <Flex flexWrap="wrap" mx={-2}>
      {tables &&
        tables.valueSeq().map(item => (
          <Box px={2} width={[1, 1 / 2, 1 / 3]}>
            <ListItem
              {...{
                item,
                removeTable,
                t,
                key: item.get("id"),
                setEditedTableId
              }}
            />
          </Box>
        ))}
    </Flex>
  </>
);

List.propTypes = {
  tables: shape(),
  removeTable: func.isRequired,
  setEditedTableId: func.isRequired,
  t: func.isRequired
};

List.defaultProps = {
  tables: null
};

export default List;
