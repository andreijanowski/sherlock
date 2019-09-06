import { func, shape, string } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import Form from "./Form";
import List from "./List";
import { Wrapper } from "./styled";
import { getInitialValues } from "./utils";

const Tables = ({
  tables,
  removeTable,
  addTable,
  setEditedTableId,
  editedTableId,
  t
}) => {
  const initialValues = getInitialValues({
    editedTableId,
    tables
  });
  return (
    <Wrapper>
      <Flex mx={-3} flexDirection="column">
        <Box width={1} px={3}>
          <Form
            {...{
              addTable,
              initialValues,
              setEditedTableId,
              t
            }}
          />
        </Box>
        <Box width={1} px={3}>
          <List {...{ tables, t, removeTable, setEditedTableId }} />
        </Box>
      </Flex>
    </Wrapper>
  );
};

Tables.propTypes = {
  t: func.isRequired,
  tables: shape(),
  setEditedTableId: func.isRequired,
  removeTable: func.isRequired,
  addTable: func.isRequired,
  editedTableId: string
};

Tables.defaultProps = {
  tables: null,
  editedTableId: null
};

export default Tables;
