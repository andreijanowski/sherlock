import React from "react";
import { Field, Form } from "react-final-form";
import { arrayOf, func, shape, string } from "prop-types";

import { StyledButton, FormDropdown, FormInput, H3 } from "components";
import { required } from "utils/validators";
import { ButtonsWrap, Wrapper } from "./styled";

const AddServiceLinkForm = ({ onSubmit, serviceItems, onClose, t }) => (
  <Form onSubmit={onSubmit}>
    {({ handleSubmit, form: { getState } }) => {
      const { submitting } = getState();
      return (
        <Wrapper onSubmit={handleSubmit}>
          <H3>{t("additionalInformation:addExternalServiceLink")}</H3>
          <Field name="serviceId" validate={required(t)}>
            {({ input, meta }) => (
              <FormDropdown
                {...{
                  long: true,
                  input,
                  meta,
                  label: t("additionalInformation:servicePlaceholder"),
                  items: serviceItems
                }}
              />
            )}
          </Field>
          <FormInput
            name="url"
            validate={required(t)}
            label={t("additionalInformation:urlPlaceholder")}
            placeholder={t("additionalInformation:urlPlaceholder")}
          />
          <ButtonsWrap>
            <StyledButton type="button" styleName="reject" onClick={onClose}>
              {t("forms:cancel")}
            </StyledButton>
            <StyledButton styleName="accept" disabled={submitting}>
              {t("forms:save")}
            </StyledButton>
          </ButtonsWrap>
        </Wrapper>
      );
    }}
  </Form>
);

AddServiceLinkForm.propTypes = {
  serviceItems: arrayOf(
    shape({
      label: string.isRequired,
      value: string.isRequired,
      src: string.isRequired
    })
  ).isRequired,
  onSubmit: func.isRequired,
  onClose: func.isRequired,
  t: func.isRequired
};

export default AddServiceLinkForm;
