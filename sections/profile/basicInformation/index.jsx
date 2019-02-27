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
import { required, maxLength } from "utils/validators";
import { func, shape, arrayOf, string } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import setFieldData from "final-form-set-field-data";
import { Form } from "../styled";
import { getSubdivisions } from "./utils";

const BasicInformationForm = ({
  t,
  initialValues,
  countries,
  types,
  cuisines,
  foodsAndDrinks,
  quirks,
  diets,
  handleSubmit
}) =>
  initialValues ? (
    <FinalForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      mutators={{ setFieldData }}
      render={({ values, form: { mutators } }) => (
        <Form>
          <AutoSave setFieldData={mutators.setFieldData} save={handleSubmit} />
          <WhenFieldChanges field="country" set="region" to={undefined} />
          <H3>{t("basicInformation")}</H3>
          <FormInput
            name="name"
            validate={required(t)}
            label={t("nameLabel")}
            placeholder={t("namePlaceholder")}
          />
          <FormInput
            name="tagline"
            validate={maxLength(t, 100)}
            label={t("taglineLabel")}
            placeholder={t("taglinePlaceholder")}
          />
          <Flex mx={-2} flexWrap="wrap">
            <Box width={[1, 1 / 2]} px={2}>
              <Field
                name="country"
                component={FormSelect}
                label={t("countryLabel")}
                placeholder={t("countryPlaceholder")}
                items={countries}
                showFlag
              />
            </Box>
            <Box width={[1, 1 / 2]} px={2}>
              <Field
                name="region"
                component={FormSelect}
                label={t("regionLabel")}
                placeholder={t("regionPlaceholder")}
                disabled={!values.country}
                items={
                  (values.country.value &&
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
                validate={maxLength(t, 100)}
                label={t("streetLabel")}
                placeholder={t("streetPlaceholder")}
              />
            </Box>
            <Box width={[1 / 2, 3 / 10]} px={2}>
              <FormInput
                name="streetNumber"
                validate={maxLength(t, 100)}
                label={t("streetNumberLabel")}
                placeholder={t("streetNumberPlaceholder")}
              />
            </Box>
            <Box width={[1 / 2, 1 / 5]} px={2}>
              <FormInput
                name="postCode"
                validate={maxLength(t, 100)}
                label={t("postCodeLabel")}
                placeholder={t("postCodePlaceholder")}
              />
            </Box>
          </Flex>
          <Flex mx={-2} flexWrap="wrap">
            {types.map(type => (
              <Box width={[1 / 3, 1 / 4]} p={2} key={type.value}>
                <BigCheckbox
                  {...{
                    label: type.label,
                    name: "types",
                    value: type,
                    setError: err => err
                  }}
                />
              </Box>
            ))}
          </Flex>
          <H3 mt={4}>{t("cuisines")}</H3>
          <Field
            name="cuisines"
            placeholder={t("cuisinesPlaceholder")}
            component={FormMultipleSelect}
            maxItems={12}
            items={cuisines}
          />
          <H3 mt={4}>{t("foodsAndDrinks")}</H3>
          <Field
            name="foodsAndDrinks"
            placeholder={t("foodsAndDrinksPlaceholder")}
            component={FormMultipleSelect}
            maxItems={12}
            items={foodsAndDrinks}
          />
          <H3 mt={4}>{t("quirks")}</H3>
          <Field
            name="quirks"
            placeholder={t("quirksPlaceholder")}
            component={FormMultipleSelect}
            maxItems={12}
            items={quirks}
          />
          <H3 mt={4}>{t("diets")}</H3>
          <Field
            name="diets"
            placeholder={t("dietsPlaceholder")}
            component={FormMultipleSelect}
            maxItems={12}
            items={diets}
          />
          <H3 mt={4}>{t("additionalInformation")}</H3>
          <FormInput
            name="ownerRole"
            label={t("ownerRoleLabel")}
            placeholder={t("ownerRolePlaceholder")}
          />
          <FormTextarea
            name="bio"
            label={t("bioLabel")}
            placeholder={t("bioPlaceholder")}
          />
        </Form>
      )}
    />
  ) : (
    <LoadingIndicator />
  );

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
  handleSubmit: func.isRequired
};

BasicInformationForm.defaultProps = {
  initialValues: undefined
};

export default BasicInformationForm;
