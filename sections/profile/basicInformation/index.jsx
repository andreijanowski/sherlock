import { PureComponent } from "react";
import {
  FormInput,
  FormTextarea,
  FormSelect,
  BigCheckbox,
  H3,
  WhenFieldChanges,
  FormMultipleSelect,
  AutoSave,
  LoadingIndicator
} from "components";
import { Form as FinalForm, Field } from "react-final-form";
import { func, shape, arrayOf, string, bool } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import setFieldData from "final-form-set-field-data";
import { getSubdivisions } from "utils/iso-3166-2";
import { validateLength, required, requiredProperty } from "utils/validators";
import { Form, TypesWrapper } from "../styled";
import TypesError from "./TypesError";

class BasicInformationForm extends PureComponent {
  constructor(props) {
    super(props);
    this.validateTypesLength = validateLength(props.t, 1, 3);
    this.validateCuisinesLength = validateLength(props.t, 1, 5);
    this.validateFoodsAndDrinksLength = validateLength(props.t, 1, 6);
    this.validateQuirksLength = validateLength(props.t, 3, 10);
    this.requiredCountry = requiredProperty(props.t, "value");
    this.required = required(props.t);
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
      handleSubmit,
      forceShowError
    } = this.props;
    return initialValues ? (
      <FinalForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        mutators={{ setFieldData }}
        render={({ values, form: { mutators } }) => (
          <Form>
            <AutoSave
              setFieldData={mutators.setFieldData}
              save={handleSubmit}
              t={t}
            />
            <WhenFieldChanges field="country" set="region" to={undefined} />
            <H3>{t("basicInformation")}</H3>
            <FormInput
              name="name"
              label={t("nameLabel")}
              placeholder={t("namePlaceholder")}
              forceShowError={forceShowError}
              validate={this.required}
            />
            <FormInput
              name="tagline"
              label={t("taglineLabel")}
              placeholder={t("taglinePlaceholder")}
              forceShowError={forceShowError}
            />
            <Flex mx={-2} flexWrap="wrap">
              <Box width={[1, 1 / 2]} px={2}>
                <Field
                  name="country"
                  component={FormSelect}
                  label={t("countryLabel")}
                  placeholder={t("countryPlaceholder")}
                  items={countries}
                  forceShowError={forceShowError}
                  showFlag
                  validate={this.requiredCountry}
                />
              </Box>
              <Box width={[1, 1 / 2]} px={2}>
                <Field
                  name="region"
                  component={FormSelect}
                  label={t("regionLabel")}
                  forceShowError={forceShowError}
                  placeholder={t("regionPlaceholder")}
                  disabled={!values.country}
                  items={
                    (values.country &&
                      values.country.value &&
                      getSubdivisions(values.country.value)) ||
                    []
                  }
                />
              </Box>
            </Flex>
            <Flex mx={-2} flexWrap="wrap">
              <Box width={[1, 1 / 2]} px={2}>
                <FormInput
                  name="street"
                  label={t("streetLabel")}
                  forceShowError={forceShowError}
                  placeholder={t("streetPlaceholder")}
                  validate={this.required}
                />
              </Box>
              <Box width={[1, 1 / 2]} px={2}>
                <FormInput
                  name="streetNumber"
                  label={t("streetNumberLabel")}
                  forceShowError={forceShowError}
                  placeholder={t("streetNumberPlaceholder")}
                />
              </Box>
              <Box width={[1, 1 / 2]} px={2}>
                <FormInput
                  name="city"
                  label={t("cityLabel")}
                  forceShowError={forceShowError}
                  placeholder={t("cityPlaceholder")}
                  validate={this.required}
                />
              </Box>
              <Box width={[1, 1 / 2]} px={2}>
                <FormInput
                  name="postCode"
                  label={t("postCodeLabel")}
                  forceShowError={forceShowError}
                  placeholder={t("postCodePlaceholder")}
                  validate={this.required}
                />
              </Box>
            </Flex>
            <H3 mt={4}>{t("types")}</H3>
            <TypesWrapper>
              {types.map(type => (
                <Box
                  width={[1 / 4, 1 / 4, 1 / 5, 1 / 7]}
                  p={2}
                  key={type.value}
                >
                  <BigCheckbox
                    {...{
                      label: type.label,
                      name: "types",
                      value: type,
                      min: 1,
                      max: 3,
                      validate: this.validateTypesLength
                    }}
                  />
                </Box>
              ))}
              <TypesError forceShowError={forceShowError} />
            </TypesWrapper>
            <H3 mt={4}>{t("cuisines")}</H3>
            <Field
              name="cuisines"
              placeholder={t("cuisinesPlaceholder")}
              component={FormMultipleSelect}
              items={cuisines}
              max={5}
              min={1}
              forceShowError={forceShowError}
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
              forceShowError={forceShowError}
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
              forceShowError={forceShowError}
              validate={this.validateQuirksLength}
            />
            <H3 mt={4}>{t("diets")}</H3>
            <Field
              name="diets"
              placeholder={t("dietsPlaceholder")}
              component={FormMultipleSelect}
              items={diets}
              forceShowError={forceShowError}
            />
            <H3 mt={4}>{t("additionalInformation")}</H3>
            <FormInput
              name="ownerRole"
              label={t("ownerRoleLabel")}
              forceShowError={forceShowError}
              placeholder={t("ownerRolePlaceholder")}
            />
            <FormTextarea
              name="bio"
              label={t("bioLabel")}
              forceShowError={forceShowError}
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
  handleSubmit: func.isRequired,
  forceShowError: bool
};

BasicInformationForm.defaultProps = {
  initialValues: undefined,
  forceShowError: false
};

export default BasicInformationForm;
