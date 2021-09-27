import React, { useMemo } from "react";
import { func, shape, bool, string } from "prop-types";
import { Box } from "@rebass/grid";
import { LoadingIndicator } from "components";
import Form from "./Form";
import List from "./List";
import { InnerWrapper, Wrapper, FloatingColumn } from "./styled";
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
  businessId,
  isUberAvailable,
  onShowImportModalClick
}) => {
  const { initialValues, initialPicture } = getInitialValues({
    editedDishId,
    dishes
  });
  const preparedCategories = useMemo(
    () => (categories ? prepareCategories(categories) : []),
    [categories]
  );
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
        <InnerWrapper flexWrap="wrap">
          <Box as={FloatingColumn} width={[1, 1 / 2]} px={3}>
            <Form
              addDish={addDish}
              initialValues={initialValues}
              initialPicture={initialPicture}
              addPicture={addPicture}
              removePicture={removePicture}
              setEditedDishId={setEditedDishId}
              t={t}
              categories={preparedCategories}
              businessId={businessId}
              isUberAvailable={isUberAvailable}
              onShowImportModalClick={onShowImportModalClick}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={3}>
            <List
              items={preparedList}
              removeDish={removeDish}
              loading={loading}
              setEditedDishId={setEditedDishId}
            />
          </Box>
        </InnerWrapper>
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
  businessId: string.isRequired,
  isUberAvailable: bool.isRequired,
  onShowImportModalClick: func.isRequired
};

Menu.defaultProps = {
  dishes: null,
  categories: null,
  editedDishId: null
};

export default Menu;
