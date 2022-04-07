import React from "react";
import { Box, Flex } from "@rebass/grid";
import { FieldArray } from "react-final-form-arrays";
import { bool } from "prop-types";

import { useT } from "utils/hooks";
import {
  composeValidators,
  isNotNegativeInt,
  required
} from "utils/validators";
import { FormInput } from "components";
import { CloseIcon } from "components/Icons";
import { DeleteListItemBtn } from "components/styleguide/common";
import CategoryOptionsList from "./CategoryOptionsList";
import AddEntityButton from "./AddEntityButton";

const emptyCategoryTemplate = {
  dishOptions: []
};

const DishOptionsForm = ({ hasPosIntegration }) => {
  const t = useT(["lefood", "forms"]);

  return (
    <FieldArray name="dishOptionCategories">
      {({ fields: categoriesFields }) => (
        <div>
          <AddEntityButton
            onClick={() => {
              categoriesFields.push(emptyCategoryTemplate);
            }}
          >
            {t("dishOptions.addCategory")}
          </AddEntityButton>
          {categoriesFields.map((name, index) => {
            const onDeleteCategoryClick = () => {
              categoriesFields.remove(index);
            };
            return (
              <Box key={name}>
                <Flex width={1} flexWrap="nowrap">
                  <Box flex="auto" width={["100%", null, "auto"]} mr={3}>
                    <FormInput
                      name={`${name}.name`}
                      validate={required(t)}
                      label={t("dishOptions.category.nameLabel")}
                      placeholder={t("dishOptions.category.namePlaceholder")}
                    />
                  </Box>
                  <Box
                    flex={["auto", null, "none"]}
                    width={[null, null, "120px"]}
                    mr={3}
                  >
                    <FormInput
                      name={`${name}.limit`}
                      validate={composeValidators(
                        required(t),
                        isNotNegativeInt(t)
                      )}
                      label={t("dishOptions.category.limit")}
                      placeholder={t("dishOptions.category.limit")}
                    />
                  </Box>
                  <DeleteListItemBtn
                    type="button"
                    onClick={onDeleteCategoryClick}
                  >
                    <CloseIcon />
                  </DeleteListItemBtn>
                </Flex>
                <FieldArray
                  name={`${name}.dishOptions`}
                  component={CategoryOptionsList}
                  hasPosIntegration={hasPosIntegration}
                />
              </Box>
            );
          })}
        </div>
      )}
    </FieldArray>
  );
};

DishOptionsForm.propTypes = {
  hasPosIntegration: bool.isRequired
};

export default DishOptionsForm;
