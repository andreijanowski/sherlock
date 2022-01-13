import React, { Fragment } from "react";
import { Box, Flex } from "@rebass/grid";
import { shape, func } from "prop-types";

import { FormInput } from "components";
import { required } from "utils/validators";
import { AdaptiveBox, DeleteListItemBtn } from "components/styleguide/common";
import { CloseIcon } from "components/Icons";
import { useT } from "utils/hooks";
import { normalizePrice } from "utils/normalizers";
import AddEntityButton from "./AddEntityButton";

const CategoryOptionsList = ({ fields }) => {
  const t = useT(["lefood", "forms"]);

  const onAddOptionClick = () => {
    fields.push({});
  };

  return (
    <Flex flexDirection="column" alignItems="flex-end" pl={3}>
      {fields.map((name, index) => {
        const onDeleteOptionClick = () => {
          fields.remove(index);
        };
        const isNotLastChild = index < fields.length - 1;
        return (
          <Fragment key={name}>
            <Flex width={1} flexWrap={["wrap", null, "nowrap"]}>
              <Flex flex="auto" width={[1, null, "auto"]}>
                <Box flex="auto" mr={3}>
                  <FormInput
                    name={`${name}.name`}
                    validate={required(t)}
                    label={t("dishOptions.option.name")}
                    placeholder={t("dishOptions.option.name")}
                  />
                </Box>
                <Box
                  flex={["auto", null, "none"]}
                  width={["auto", null, "120px"]}
                  mr={[0, null, 3]}
                >
                  <FormInput
                    name={`${name}.pricePerItemCents`}
                    validate={required(t)}
                    parse={normalizePrice}
                    label={t("dishOptions.option.price")}
                    placeholder={t("dishOptions.option.price")}
                  />
                </Box>
              </Flex>
              <Flex width={[1, null, "auto"]}>
                <Box
                  flex={["auto", null, "none"]}
                  width={["auto", null, "120px"]}
                  mr={3}
                >
                  <FormInput
                    name={`${name}.skuRef`}
                    label={t("dishOptions.option.skuRef")}
                    placeholder={t("dishOptions.option.skuRef")}
                  />
                </Box>
                <DeleteListItemBtn type="button" onClick={onDeleteOptionClick}>
                  <CloseIcon />
                </DeleteListItemBtn>
              </Flex>
            </Flex>
            {isNotLastChild && (
              <AdaptiveBox
                display={["block", null, "none"]}
                width="100%"
                mb={3}
              >
                <Box as="hr" m={0} />
              </AdaptiveBox>
            )}
          </Fragment>
        );
      })}
      <AddEntityButton onClick={onAddOptionClick}>
        {t("dishOptions.addOption")}
      </AddEntityButton>
    </Flex>
  );
};

CategoryOptionsList.propTypes = {
  fields: shape({
    map: func.isRequired,
    add: func.isRequired,
    remove: func.isRequired
  }).isRequired
};

export default CategoryOptionsList;
