import {
  FormInput,
  FormTextarea,
  FormSelect,
  BigCheckbox,
  H3,
  WhenFieldChanges,
  FormMultipleSelect
} from "components";
import { Form as FinalForm, Field } from "react-final-form";
import { required, maxLength } from "utils/validators";
import iso3166 from "iso-3166-2";
import { func } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { Form } from "../styled";

const countries = Object.entries(iso3166.data)
  .map(i => ({
    value: i[0],
    label: i[1].name
  }))
  .sort((a, b) => (a.label > b.label ? 1 : -1));

const getSubdivisions = country =>
  Object.entries(iso3166.country(country).sub).map(i => ({
    value: i[0],
    label: i[1].name.replace(", City of", "")
  }));

const BasicInformationForm = ({ t }) => (
  <FinalForm
    onSubmit={v => console.log(v)}
    render={({ values }) => (
      <Form>
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
        <Flex mx={-2}>
          <Box width={1 / 2} px={2}>
            <Field
              name="country"
              component={FormSelect}
              label={t("countryLabel")}
              placeholder={t("countryPlaceholder")}
              items={countries}
              showFlag
            />
          </Box>
          <Box width={1 / 2} px={2}>
            <Field
              name="region"
              component={FormSelect}
              label={t("regionLabel")}
              placeholder={t("regionPlaceholder")}
              disabled={!values.country}
              items={
                (values.country && getSubdivisions(values.country.value)) || []
              }
            />
          </Box>
        </Flex>
        <Flex mx={-2}>
          <Box width={1 / 2} px={2}>
            <FormInput
              name="street"
              validate={maxLength(t, 100)}
              label={t("streetLabel")}
              placeholder={t("streetPlaceholder")}
            />
          </Box>
          <Box width={3 / 10} px={2}>
            <FormInput
              name="streetNumber"
              validate={maxLength(t, 100)}
              label={t("streetNumberLabel")}
              placeholder={t("streetNumberPlaceholder")}
            />
          </Box>
          <Box width={1 / 5} px={2}>
            <FormInput
              name="postCode"
              validate={maxLength(t, 100)}
              label={t("postCodeLabel")}
              placeholder={t("postCodePlaceholder")}
            />
          </Box>
        </Flex>
        <Flex mx={-2}>
          <Box width={1 / 4} p={2}>
            <BigCheckbox
              {...{
                label: t("bigCheckboxLabel"),
                name: "bigCheckbox",
                value: "value1",
                setError: err => console.log(err)
              }}
            />
          </Box>
          <Box width={1 / 4} p={2}>
            <BigCheckbox
              {...{
                label: t("bigCheckboxLabel"),
                name: "bigCheckbox",
                value: "value2",
                setError: err => console.log(err)
              }}
            />
          </Box>
          <Box width={1 / 4} p={2}>
            <BigCheckbox
              {...{
                label: t("bigCheckboxLabel"),
                name: "bigCheckbox",
                value: "value3",
                setError: err => console.log(err)
              }}
            />
          </Box>
          <Box width={1 / 4} p={2}>
            <BigCheckbox
              {...{
                label: t("bigCheckboxLabel"),
                name: "bigCheckbox",
                value: "value4",
                setError: err => console.log(err)
              }}
            />
          </Box>
        </Flex>
        <H3 mt={4}>{t("cusines")}</H3>
        <Field
          name="cusines"
          placeholder={t("cusinesPlaceholder")}
          component={FormMultipleSelect}
          maxItems={12}
          items={[
            { value: "value1", label: "label1" },
            { value: "value2", label: "label2" },
            { value: "value3", label: "label3" },
            { value: "value4", label: "label4" },
            { value: "value5", label: "label5" },
            { value: "value6", label: "label6" },
            { value: "value7", label: "label7" },
            { value: "value8", label: "label8" },
            { value: "value9", label: "label9" },
            { value: "value10", label: "label10" },
            { value: "value11", label: "label11" }
          ]}
        />
        <H3 mt={4}>{t("foodAndDrinks")}</H3>
        <Field
          name="foodAndDrinks"
          placeholder={t("foodAndDrinksPlaceholder")}
          component={FormMultipleSelect}
          maxItems={12}
          items={[
            { value: "value1", label: "label1" },
            { value: "value2", label: "label2" },
            { value: "value3", label: "label3" },
            { value: "value4", label: "label4" },
            { value: "value5", label: "label5" },
            { value: "value6", label: "label6" },
            { value: "value7", label: "label7" },
            { value: "value8", label: "label8" },
            { value: "value9", label: "label9" },
            { value: "value10", label: "label10" },
            { value: "value11", label: "label11" }
          ]}
        />
        <H3 mt={4}>{t("perfectFor")}</H3>
        <Field
          name="perfectFor"
          placeholder={t("perfectForPlaceholder")}
          component={FormMultipleSelect}
          maxItems={12}
          items={[
            { value: "value1", label: "label1" },
            { value: "value2", label: "label2" },
            { value: "value3", label: "label3" },
            { value: "value4", label: "label4" },
            { value: "value5", label: "label5" },
            { value: "value6", label: "label6" },
            { value: "value7", label: "label7" },
            { value: "value8", label: "label8" },
            { value: "value9", label: "label9" },
            { value: "value10", label: "label10" },
            { value: "value11", label: "label11" }
          ]}
        />
        <H3 mt={4}>{t("diet")}</H3>
        <Field
          name="diet"
          placeholder={t("dietPlaceholder")}
          component={FormMultipleSelect}
          maxItems={12}
          items={[
            { value: "value1", label: "label1" },
            { value: "value2", label: "label2" },
            { value: "value3", label: "label3" },
            { value: "value4", label: "label4" },
            { value: "value5", label: "label5" },
            { value: "value6", label: "label6" },
            { value: "value7", label: "label7" },
            { value: "value8", label: "label8" },
            { value: "value9", label: "label9" },
            { value: "value10", label: "label10" },
            { value: "value11", label: "label11" }
          ]}
        />
        <H3 mt={4}>{t("additionalInformation")}</H3>
        <FormInput
          name="role"
          label={t("roleLabel")}
          placeholder={t("rolePlaceholder")}
        />
        <FormTextarea
          name="bio"
          label={t("bioLabel")}
          placeholder={t("bioPlaceholder")}
        />
      </Form>
    )}
  />
);

BasicInformationForm.propTypes = {
  t: func.isRequired
};

export default BasicInformationForm;
