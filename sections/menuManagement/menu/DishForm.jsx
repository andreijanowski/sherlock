import React from "react";
import { Field, useForm } from "react-final-form";
import { bool, func, shape, string } from "prop-types";
import { Box, Flex } from "@rebass/grid";
import Cookies from "js-cookie";

import {
  Button,
  DropzoneWithCropper,
  FormCheckbox,
  FormDropdown,
  FormInput,
  FormTextarea,
  H3,
  PerfectSquare,
  Picture
} from "components";
import { InfoIcon } from "components/Icons";
import { normalizePrice, normalizeString } from "utils/normalizers";
import { required } from "utils/validators";
import { ImportButton } from "./styled";

const DishForm = ({
  t,
  pictureUrl,
  setPictureUrl,
  removePicture,
  categories,
  isUberAvailable,
  onShowUploadModalClick,
  hasPosIntegration
}) => {
  const { submit, getState } = useForm();
  const { initialValues } = getState();

  const hasPendingSynchPOS = Cookies.get("SynchPOS");

  const { picture: initialPicture } = initialValues;

  return (
    <>
      <Flex justifyContent="space-between" flexWrap="wrap">
        <H3>{t("addDish")}</H3>
        <ImportButton onClick={onShowUploadModalClick}>
          {t("lefood:import.edit_menu")}
          {hasPendingSynchPOS && <InfoIcon />}
        </ImportButton>
      </Flex>
      <Flex justifyContent="center" flexWrap="wrap">
        <Box width={152} pr={[0, null, 3]} pb={3}>
          {initialPicture ? (
            <Picture {...{ ...initialPicture, remove: removePicture }} />
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
                image={pictureUrl}
                saveImage={setPictureUrl}
              />
            </PerfectSquare>
          )}
        </Box>
        <Flex
          flexDirection="column"
          width={["100%", null, "calc(100% - 152px)"]}
        >
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
          parse={normalizeString}
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
          parse={normalizeString}
          validate={hasPosIntegration && required(t)}
        />
      </Box>
      <Box my={4}>
        <H3>Available in: </H3>
        <FormCheckbox name="available" label="Foodetective Orders" />
        {isUberAvailable && (
          <FormCheckbox name="onUberEats" label={t("uber_availability")} />
        )}
      </Box>
      <Box mb={3}>
        <Button fluid styleName="blue" type="button" onClick={submit}>
          {initialValues.name ? t("Save") : t("addToMenu")}
        </Button>
      </Box>
    </>
  );
};

DishForm.propTypes = {
  t: func.isRequired,
  removePicture: func.isRequired,
  categories: shape().isRequired,
  isUberAvailable: bool.isRequired,
  onShowUploadModalClick: func.isRequired,
  pictureUrl: string.isRequired,
  setPictureUrl: func.isRequired,
  hasPosIntegration: bool.isRequired
};

export default DishForm;
