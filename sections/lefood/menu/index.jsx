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
  editedDishId,
  addPicture,
  removePicture,
  t,
  loading,
  categories,
  addToUber,
  donwloadFromUber,
  businessId,
  isUberAvailable
}) => {
  const { initialValues, initialPicture } = getInitialValues({
    editedDishId,
    dishes
  });
  const preparedCategories = categories ? prepareCategories(categories) : [];
  const preparedList = preparedCategories.map(c => {
    const items =
      dishes &&
      dishes.filter(
        i => i.getIn(["relationships", "category", "data", "id"]) === c.value
      );

    return {
      dishes: items,
      label: c.label
    };
  });

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
              t={t}
              categories={preparedCategories}
              addToUber={addToUber}
              donwloadFromUber={donwloadFromUber}
              businessId={businessId}
              isUberAvailable={isUberAvailable}
            />
          </Box>
          <Box width={1 / 2} px={3}>
            <List
              items={preparedList}
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
  removeDish: func.isRequired,
  addDish: func.isRequired,
  addPicture: func.isRequired,
  removePicture: func.isRequired,
  loading: bool.isRequired,
  editedDishId: string,
  addToUber: func.isRequired,
  donwloadFromUber: func.isRequired,
  businessId: string.isRequired,
  isUberAvailable: bool.isRequired
};

Menu.defaultProps = {
  dishes: null,
  categories: null,
  editedDishId: null
};

export default Menu;
