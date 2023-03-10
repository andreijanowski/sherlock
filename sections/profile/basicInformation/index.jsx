import React, { PureComponent } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { arrayOf, bool, func, shape, string } from "prop-types";
import { Box, Flex } from "@rebass/grid";
import setFieldData from "final-form-set-field-data";

import {
  AutoSave,
  FormInput,
  FormMultipleSelect,
  FormSelect,
  FormTextarea,
  H3,
  LoadingIndicator,
  WhenFieldChanges
} from "components";
import { getSubdivisions } from "utils/iso-3166-2";
import {
  matchYoutubeUrl,
  required,
  requiredProperty,
  validateLength
} from "utils/validators";
import countriesPhoneCodes from "utils/countriesPhoneCodes";
import { normalizePhone } from "utils/normalizers";
import { Form } from "../styled";

class BasicInformationForm extends PureComponent {
  constructor(props) {
    super(props);
    this.validateTypesLength = validateLength(props.t, 1, 3);
    this.validateCuisinesLength = validateLength(props.t, 1, 5);
    this.validateFoodsAndDrinksLength = validateLength(props.t, 1, 6);
    this.validateQuirksLength = validateLength(props.t, 3, 10);
    this.validateMichelinStarsLength = validateLength(props.t, 0, 1);
    this.requiredCountry = requiredProperty(props.t, "value");
    this.required = required(props.t);
    this.isYoutubeLink = matchYoutubeUrl(props.t, "value");
  }

  render() {
    const {
      t,
      initialValues,
      countries,
      types,
      cuisines,
      foodsAndDrinks,
      quirks,
      diets,
      michelinStars,
      handleSubmit,
      isErrorVisibilityRequired
    } = this.props;
    const regionItems = country =>
      (country && country.value && getSubdivisions(country.value)) || [];

    return initialValues ? (
      <FinalForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        mutators={{ setFieldData }}
        subscription={{ values: true, form: true }}
        render={({ values, form: { mutators } }) => (
          <Form p={[3, 4]}>
            <AutoSave
              setFieldData={mutators.setFieldData}
              save={handleSubmit}
              t={t}
            />
            <WhenFieldChanges
              field="country"
              set="region"
              to={undefined}
              shouldChange={
                values.region &&
                values.region.value &&
                values.country &&
                values.country.value &&
                !values.region.value.includes(values.country.value)
              }
            />
            <H3>{t("basicInformation")}</H3>
            <FormInput
              name="name"
              label={t("nameLabel")}
              placeholder={t("namePlaceholder")}
              isErrorVisibilityRequired={isErrorVisibilityRequired}
              validate={this.required}
            />
            <FormInput
              name="tagline"
              label={t("taglineLabel")}
              placeholder={t("taglinePlaceholder")}
              isErrorVisibilityRequired={isErrorVisibilityRequired}
            />
            <Flex mx={-2} flexWrap="wrap">
              <Box width={[1, 1 / 2]} px={2}>
                <Field
                  name="country"
                  component={FormSelect}
                  label={t("countryLabel")}
                  placeholder={t("countryPlaceholder")}
                  items={countries}
                  isErrorVisibilityRequired={isErrorVisibilityRequired}
                  showFlag
                  validate={this.requiredCountry}
                />
              </Box>
              <Box width={[1, 1 / 2]} px={2}>
                <Field
                  name="region"
                  component={FormSelect}
                  label={t("regionLabel")}
                  isErrorVisibilityRequired={isErrorVisibilityRequired}
                  placeholder={t("regionPlaceholder")}
                  disabled={!values.country}
                  items={regionItems(values.country)}
                  validate={this.required}
                />
              </Box>
            </Flex>
            <Flex mx={-2} flexWrap="wrap">
              <Box width={[1, 1 / 2]} px={2}>
                <FormInput
                  name="street"
                  label={t("streetLabel")}
                  isErrorVisibilityRequired={isErrorVisibilityRequired}
                  placeholder={t("streetPlaceholder")}
                  validate={this.required}
                />
              </Box>
              <Box width={[1, 1 / 2]} px={2}>
                <FormInput
                  name="streetNumber"
                  label={t("streetNumberLabel")}
                  isErrorVisibilityRequired={isErrorVisibilityRequired}
                  placeholder={t("streetNumberPlaceholder")}
                  validate={this.required}
                />
              </Box>
              <Box width={[1, 1 / 2]} px={2}>
                <FormInput
                  name="city"
                  label={t("cityLabel")}
                  isErrorVisibilityRequired={isErrorVisibilityRequired}
                  placeholder={t("cityPlaceholder")}
                  validate={this.required}
                />
              </Box>
              <Box width={[1, 1 / 2]} px={2}>
                <FormInput
                  name="postCode"
                  label={t("postCodeLabel")}
                  isErrorVisibilityRequired={isErrorVisibilityRequired}
                  placeholder={t("postCodePlaceholder")}
                  validate={this.required}
                />
              </Box>
            </Flex>
            <H3>{t("contactInformation:contactInformation")}</H3>
            <FormInput
              name="email"
              label={t("contactInformation:emailLabel")}
              placeholder={t("contactInformation:emailPlaceholder")}
            />
            <Flex mx={-2} flexWrap="wrap">
              <Box width={[1, 1 / 2, 1 / 3]} px={2}>
                <Field
                  name="phoneCountry"
                  component={FormSelect}
                  label={t("contactInformation:countryLabel")}
                  placeholder={t("contactInformation:countryPlaceholder")}
                  items={countriesPhoneCodes}
                  showFlag
                />
              </Box>
              <Box width={[1, 1 / 2, 2 / 3]} px={2}>
                <FormInput
                  name="phone"
                  label={t("contactInformation:phoneLabel")}
                  placeholder={t("contactInformation:phonePlaceholder")}
                  parse={normalizePhone}
                />
              </Box>
            </Flex>
            <FormInput
              name="website"
              label="Website (optional)"
              placeholder={t("contactInformation:websitePlaceholder")}
            />
            <FormInput
              name="facebook"
              label="Facebook (optional)"
              placeholder={t("contactInformation:facebookPlaceholder")}
            />
            <FormInput
              name="instagram"
              label="Instagram (optional)"
              placeholder={t("contactInformation:instagramPlaceholder")}
            />
            <FormInput
              name="youtube"
              label="Youtube video (optional)"
              placeholder={t("contactInformation:youtubePlaceholder")}
              validate={this.isYoutubeLink}
            />
            <H3 mt={4}>{t("types")}</H3>
            <Field
              name="types"
              placeholder={t("typesPlaceholder")}
              component={FormMultipleSelect}
              items={types}
              max={3}
              min={1}
              isErrorVisibilityRequired={isErrorVisibilityRequired}
              validate={this.validateTypesLength}
            />
            <H3 mt={4}>{t("cuisines")}</H3>
            <Field
              name="cuisines"
              placeholder={t("cuisinesPlaceholder")}
              component={FormMultipleSelect}
              items={cuisines}
              max={5}
              min={1}
              isErrorVisibilityRequired={isErrorVisibilityRequired}
              validate={this.validateCuisinesLength}
            />
            <H3 mt={4}>{t("foodsAndDrinks")}</H3>
            <Field
              name="foodsAndDrinks"
              placeholder={t("foodsAndDrinksPlaceholder")}
              component={FormMultipleSelect}
              items={foodsAndDrinks}
              max={6}
              min={1}
              isErrorVisibilityRequired={isErrorVisibilityRequired}
              validate={this.validateFoodsAndDrinksLength}
            />
            <H3 mt={4}>{t("quirks")}</H3>
            <Field
              name="quirks"
              placeholder={t("quirksPlaceholder")}
              component={FormMultipleSelect}
              items={quirks}
              max={10}
              min={3}
              isErrorVisibilityRequired={isErrorVisibilityRequired}
              validate={this.validateQuirksLength}
            />
            <H3 mt={4}>{t("diets")}</H3>
            <Field
              name="diets"
              placeholder={t("dietsPlaceholder")}
              component={FormMultipleSelect}
              items={diets}
              isErrorVisibilityRequired={isErrorVisibilityRequired}
            />
            <H3 mt={4}>{t("labelsDistinctions")}</H3>
            <Field
              name="michelinStars"
              placeholder={t("michelinStarsPlaceholder")}
              component={FormMultipleSelect}
              items={michelinStars}
              isErrorVisibilityRequired={isErrorVisibilityRequired}
              max={1}
              min={0}
              validate={this.validateMichelinStarsLength}
            />
            <H3 mt={4}>{t("bio")}</H3>
            <FormTextarea
              name="bio"
              label={t("bioLabel")}
              isErrorVisibilityRequired={isErrorVisibilityRequired}
              placeholder={t("bioPlaceholder")}
            />
          </Form>
        )}
      />
    ) : (
      <LoadingIndicator />
    );
  }
}

BasicInformationForm.propTypes = {
  t: func.isRequired,
  initialValues: shape(),
  countries: arrayOf(
    shape({ value: string.isRequired, label: string.isRequired })
  ).isRequired,
  types: arrayOf(shape({ value: string.isRequired, label: string.isRequired }))
    .isRequired,
  cuisines: arrayOf(
    shape({ value: string.isRequired, label: string.isRequired })
  ).isRequired,
  foodsAndDrinks: arrayOf(
    shape({ value: string.isRequired, label: string.isRequired })
  ).isRequired,
  quirks: arrayOf(shape({ value: string.isRequired, label: string.isRequired }))
    .isRequired,
  diets: arrayOf(shape({ value: string.isRequired, label: string.isRequired }))
    .isRequired,
  michelinStars: arrayOf(
    shape({ value: string.isRequired, label: string.isRequired })
  ).isRequired,
  handleSubmit: func.isRequired,
  isErrorVisibilityRequired: bool
};

BasicInformationForm.defaultProps = {
  initialValues: undefined,
  isErrorVisibilityRequired: false
};

export default BasicInformationForm;
