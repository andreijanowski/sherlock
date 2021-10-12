import { useState, useCallback } from "react";
import {
  FormInput,
  FormTextarea,
  FormDropdown,
  H3,
  Button,
  FormCheckbox,
  PerfectSquare,
  DropzoneWithCropper,
  Picture,
  LoadingIndicator
} from "components";
import { Form as FinalForm, Field } from "react-final-form";
import { func, shape, string, bool } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { normalizePrice } from "utils/normalizers";
import { required } from "utils/validators";
import { Form, ImportButton } from "./styled";

const DishForm = ({
  t,
  addPicture,
  removePicture,
  initialValues,
  initialPicture,
  setEditedDishId,
  addDish,
  categories,
  isUberAvailable,
  onShowImportModalClick
}) => {
  const [picture, setPicture] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const onSubmit = useCallback(
    async (values, formApi) => {
      try {
        setIsSending(true);
        const dish = await addDish(values);
        if (picture) {
          await addPicture(picture, dish.rawData.data.id);
        }
        setPicture(null);
        setEditedDishId(null);
        formApi.reset();
      } finally {
        setIsSending(false);
      }
    },
    [addDish, addPicture, picture, setEditedDishId]
  );

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      subscription={{
        handleSubmit: true,
        form: true
      }}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          {isSending ? (
            <LoadingIndicator />
          ) : (
            <>
              <Flex justifyContent="space-between" flexWrap="wrap">
                <H3>{t("addDish")}</H3>
                <ImportButton onClick={onShowImportModalClick}>
                  {t("lefood:import.upload_menu")}
                </ImportButton>
              </Flex>
              <Flex>
                <Box width={152} pr={3} pb={3}>
                  {initialPicture ? (
                    <Picture
                      {...{ ...initialPicture, remove: removePicture }}
                    />
                  ) : (
                    <PerfectSquare>
                      <DropzoneWithCropper
                        tip={t("chooseOrDragFile")}
                        info={t("picturesInfo")}
                        errorTipType={t("invalidFiles")}
                        errorInfoType={t("validImages")}
                        crop={t("app:crop")}
                        cancel={t("app:cancel")}
                        multiple={false}
                        maxWidth={4096}
                        maxHeight={4096}
                        image={picture}
                        saveImage={pic => setPicture(pic)}
                      />
                    </PerfectSquare>
                  )}
                </Box>
                <Flex flexDirection="column" width="calc(100% - 152px)">
                  <Box>
                    <FormInput
                      name="name"
                      validate={required(t)}
                      label={t("nameLabel")}
                      placeholder={t("namePlaceholder")}
                    />
                  </Box>
                  <Box>
                    <FormInput
                      name="pricePerItemCents"
                      validate={required(t)}
                      label={t("pricePerItemCentsLabel")}
                      placeholder={t("pricePerItemCentsPlaceholder")}
                      parse={normalizePrice}
                    />
                  </Box>
                </Flex>
              </Flex>
              <Box>
                <FormTextarea
                  rows={3}
                  name="description"
                  label={t("descriptionLabel")}
                  placeholder={t("descriptionPlaceholder")}
                />
              </Box>

              <Box>
                <Field
                  name="category"
                  component={FormDropdown}
                  label={t("categoryLabel")}
                  items={categories}
                  validate={required(t)}
                  value=""
                />
                <FormTextarea
                  rows={3}
                  name="skuRef"
                  label={t("sku")}
                  placeholder={t("sku")}
                />
              </Box>
              <Box my={4}>
                <H3>Available in: </H3>
                <FormCheckbox name="available" label={t("availability")} />
                {isUberAvailable && (
                  <FormCheckbox
                    name="onUberEats"
                    label={t("uber_availability")}
                  />
                )}
              </Box>
              <Box mb={3}>
                <Button fluid styleName="blue" type="submit">
                  {!initialValues.name ? t("addToMenu") : t("Save")}
                </Button>
              </Box>
            </>
          )}
        </Form>
      )}
    />
  );
};

DishForm.propTypes = {
  t: func.isRequired,
  businessId: string.isRequired,
  addDish: func.isRequired,
  addPicture: func.isRequired,
  removePicture: func.isRequired,
  setEditedDishId: func.isRequired,
  initialValues: shape({}).isRequired,
  initialPicture: shape({}),
  categories: shape().isRequired,
  isUberAvailable: bool.isRequired,
  onShowImportModalClick: func.isRequired
};

DishForm.defaultProps = {
  initialPicture: undefined
};

export default DishForm;
