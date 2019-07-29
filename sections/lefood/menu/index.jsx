import { func, shape, bool, string } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { LoadingIndicator } from "components";
import Form from "./Form";
import List from "./List";
import { Wrapper } from "./styled";
import { getInitialValues } from "./utils";

const Menu = ({
  dishes,
  removeDish,
  addDish,
  setEditedDishId,
  editedDishId,
  addPicture,
  removePicture,
  t,
  loading
}) => {
  const { initialValues, initialPicture } = getInitialValues({
    editedDishId,
    dishes
  });
  return (
    <Wrapper>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Flex mx={-3}>
          <Box width={1 / 2} px={3}>
            <Form
              {...{
                addDish,
                initialValues,
                initialPicture,
                addPicture,
                removePicture,
                setEditedDishId,
                t
              }}
            />
          </Box>
          <Box width={1 / 2} px={3}>
            <List {...{ dishes, removeDish, t, loading, setEditedDishId }} />
          </Box>
        </Flex>
      )}
    </Wrapper>
  );
};

Menu.propTypes = {
  t: func.isRequired,
  dishes: shape(),
  setEditedDishId: func.isRequired,
  removeDish: func.isRequired,
  addDish: func.isRequired,
  addPicture: func.isRequired,
  removePicture: func.isRequired,
  loading: bool.isRequired,
  editedDishId: string
};

Menu.defaultProps = {
  dishes: null,
  editedDishId: null
};

export default Menu;
