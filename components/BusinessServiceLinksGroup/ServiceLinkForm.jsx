import React from "react";
import setFieldData from "final-form-set-field-data";
import { Form } from "react-final-form";
import { shape, string, func } from "prop-types";

import { AutoSave, FormInput } from "components";
import { CloseIcon } from "components/Icons";
import { ServiceDeleteButton, ServiceForm, ServiceLogo } from "./styled";

const ServiceLinkForm = ({
  label,
  onSubmit,
  initialValues,
  url,
  onDeleteClick,
  t
}) => (
  <Form
    onSubmit={onSubmit}
    initialValues={initialValues}
    subscription={{
      submitting: true
    }}
    mutators={{ setFieldData }}
  >
    {({ handleSubmit, form: { mutators, getState } }) => {
      const { submitting } = getState();

      return (
        <ServiceForm handleSubmit={handleSubmit}>
          <AutoSave
            setFieldData={mutators.setFieldData}
            save={handleSubmit}
            t={t}
          />
          <ServiceLogo url={url} />
          <FormInput name="service_url" label={label} placeholder={label} />
          <ServiceDeleteButton
            type="button"
            disabled={submitting}
            onClick={onDeleteClick}
          >
            <CloseIcon />
          </ServiceDeleteButton>
        </ServiceForm>
      );
    }}
  </Form>
);

ServiceLinkForm.propTypes = {
  label: string.isRequired,
  url: string.isRequired,
  initialValues: shape().isRequired,
  onSubmit: func.isRequired,
  onDeleteClick: func.isRequired,
  t: func.isRequired
};

export default ServiceLinkForm;
