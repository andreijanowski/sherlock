import React, { useCallback, useMemo, useState } from "react";
import { bool, func, shape, string } from "prop-types";
import { Box } from "@rebass/grid";
import { Form as FinalForm } from "react-final-form";
import arrayMutators from "final-form-arrays";

import { LoadingIndicator } from "components";
import DishForm from "./DishForm";
import List from "./List";
import { FloatingColumn, InnerWrapper, Wrapper } from "./styled";
import { getInitialValues, prepareCategories } from "./utils";
import DishOptionsForm from "./DishOptionsForm";

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
  isUberAvailable,
  onShowImportModalClick,
  hasPosIntegration
}) => {
  const [pictureUrl, setPictureUrl] = useState("");

  const initialValues = getInitialValues({
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

  const onFormSubmit = useCallback(
    async (values, formApi) => {
      const {
        rawData: {
          data: { id: dishId }
        }
      } = await addDish(values);

      if (pictureUrl) {
        await addPicture(pictureUrl, dishId);
      }
      setPictureUrl("");
      setEditedDishId(null);
      formApi.reset();
    },
    [addDish, addPicture, pictureUrl, setEditedDishId]
  );

  return (
    <Wrapper>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FinalForm
          initialValues={initialValues}
          mutators={{
            ...arrayMutators
          }}
          subscription={{
            initialValues: true,
            submitting: true
          }}
          onSubmit={onFormSubmit}
          render={({ submitting }) => {
            if (submitting)
              return (
                <InnerWrapper>
                  <LoadingIndicator />
                </InnerWrapper>
              );

            return (
              <InnerWrapper
                flexDirection={["column", null, null, "row"]}
                flexWrap="wrap"
              >
                <Box
                  as={FloatingColumn}
                  width={[1, null, null, null, 1 / 2]}
                  px={[0, null, null, null, 3]}
                >
                  <DishForm
                    t={t}
                    pictureUrl={pictureUrl}
                    setPictureUrl={setPictureUrl}
                    removePicture={removePicture}
                    categories={preparedCategories}
                    isUberAvailable={isUberAvailable}
                    onShowImportModalClick={onShowImportModalClick}
                    hasPosIntegration={hasPosIntegration}
                  />
                </Box>
                <Box
                  width={[1, null, null, null, 1 / 2]}
                  px={[0, null, null, null, 3]}
                >
                  {editedDishId ? (
                    <DishOptionsForm hasPosIntegration={hasPosIntegration} />
                  ) : (
                    <List
                      items={preparedList}
                      removeDish={removeDish}
                      loading={loading}
                      setEditedDishId={setEditedDishId}
                    />
                  )}
                </Box>
              </InnerWrapper>
            );
          }}
        />
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
  isUberAvailable: bool.isRequired,
  onShowImportModalClick: func.isRequired,
  hasPosIntegration: bool.isRequired
};

Menu.defaultProps = {
  dishes: null,
  categories: null,
  editedDishId: null
};

export default Menu;
