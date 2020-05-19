import { func, shape, bool, string } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { LoadingIndicator } from "components";
import Form from "./Form";
import List from "./List";
import { Wrapper } from "./styled";
import { getInitialValues, prepareCategories } from "./utils";

const Menu = ({
  dishes,
  removeDish,
  addDish,
  setEditedDishId,
  setEditedCategoryId,
  editedDishId,
  addPicture,
  removePicture,
  t,
  loading,
  categories
}) => {
  const { initialValues, initialPicture } = getInitialValues({
    editedDishId,
    dishes
  });
  const preparedCategories = categories ? prepareCategories(categories) : [];

  return (
    <Wrapper>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Flex mx={-3}>
          <Box width={1 / 2} px={3}>
            <Form
              addDish={addDish}
              initialValues={initialValues}
              initialPicture={initialPicture}
              addPicture={addPicture}
              removePicture={removePicture}
              setEditedDishId={setEditedDishId}
              setEditedCategoryId={setEditedCategoryId}
              t={t}
              categories={preparedCategories}
            />
          </Box>
          <Box width={1 / 2} px={3}>
            <List
              dishes={dishes}
              categories={preparedCategories}
              removeDish={removeDish}
              loading={loading}
              setEditedDishId={setEditedDishId}
            />
          </Box>
        </Flex>
      )}
    </Wrapper>
  );
};

Menu.propTypes = {
  t: func.isRequired,
  dishes: shape(),
  categories: shape(),
  setEditedDishId: func.isRequired,
  setEditedCategoryId: func.isRequired,
  removeDish: func.isRequired,
  addDish: func.isRequired,
  addPicture: func.isRequired,
  removePicture: func.isRequired,
  loading: bool.isRequired,
  editedDishId: string
};

Menu.defaultProps = {
  dishes: null,
  categories: null,
  editedDishId: null
};

export default Menu;
