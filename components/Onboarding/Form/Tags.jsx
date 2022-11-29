import React from "react";

import { bool, func, shape } from "prop-types";
import { Field, Form as FinalForm } from "react-final-form";
import setFieldData from "final-form-set-field-data";

import { useT } from "utils/hooks";
import { MobilePreview } from "components/Onboarding";
import { FormMultipleSelect, AutoSave } from "components";
import { validateLength } from "utils/validators";

import {
  Content,
  Wrapper,
  Title,
  Info,
  InfoWrapper,
  FormWrapper,
  FieldLabel,
  Optional
} from "./styled";

const Tags = ({
  values: initialValues,
  handleSubmit,
  groupsData,
  hasValidationError
}) => {
  const t = useT(["basicInformation", "contactInformation"]);

  const { types, cuisines, foodsAndDrinks, quirks, diets, michelinStars } =
    groupsData;

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      mutators={{ setFieldData }}
      subscription={{
        form: true
      }}
      render={({ form: { mutators } }) => (
        <FormWrapper>
          <AutoSave
            setFieldData={mutators.setFieldData}
            save={handleSubmit}
            t={t}
            hasHiddenMessages
          />
          <Wrapper>
            <Title>{t("tags")}</Title>
            <Content>
              <InfoWrapper minWidth="800px" height="572px">
                <Info>{t("tagsDescription")}</Info>
                <FieldLabel>{t("types")}</FieldLabel>
                <Field
                  name="types"
                  placeholder={t("typesPlaceholder")}
                  component={FormMultipleSelect}
                  items={types}
                  max={3}
                  min={1}
                  isErrorVisibilityRequired={hasValidationError}
                  validate={validateLength(t, 1, 3)}
                />
                <FieldLabel>{t("cuisines")}</FieldLabel>
                <Field
                  name="cuisines"
                  placeholder={t("cuisinesPlaceholder")}
                  component={FormMultipleSelect}
                  items={cuisines}
                  max={5}
                  min={1}
                  isErrorVisibilityRequired={hasValidationError}
                  validate={validateLength(t, 1, 5)}
                />
                <FieldLabel>{t("foodsAndDrinks")}</FieldLabel>
                <Field
                  name="foodsAndDrinks"
                  placeholder={t("foodsAndDrinksPlaceholder")}
                  component={FormMultipleSelect}
                  items={foodsAndDrinks}
                  max={6}
                  min={1}
                  isErrorVisibilityRequired={hasValidationError}
                  validate={validateLength(t, 1, 6)}
                />
                <FieldLabel>{t("quirks")}</FieldLabel>
                <Field
                  name="quirks"
                  placeholder={t("quirksPlaceholder")}
                  component={FormMultipleSelect}
                  items={quirks}
                  max={10}
                  min={3}
                  isErrorVisibilityRequired={hasValidationError}
                  validate={validateLength(t, 3, 10)}
                />
                <FieldLabel>
                  {t("diets")}
                  <Optional>{t("optional")}</Optional>
                </FieldLabel>
                <Field
                  name="diets"
                  placeholder={t("dietsPlaceholder")}
                  component={FormMultipleSelect}
                  items={diets}
                />
                <FieldLabel>
                  {t("labelsDistinctions")}
                  <Optional>{t("optional")}</Optional>
                </FieldLabel>
                <Field
                  name="michelinStars"
                  placeholder={t("michelinStarsPlaceholder")}
                  component={FormMultipleSelect}
                  items={michelinStars}
                  max={1}
                  min={0}
                />
              </InfoWrapper>
              <MobilePreview {...initialValues} />
            </Content>
          </Wrapper>
        </FormWrapper>
      )}
    />
  );
};

Tags.propTypes = {
  values: shape(),
  handleSubmit: func,
  groupsData: shape(),
  hasValidationError: bool
};

Tags.defaultProps = {
  values: null,
  handleSubmit: null,
  groupsData: null,
  hasValidationError: false
};

export default Tags;
