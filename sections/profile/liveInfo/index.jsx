import React from "react";
import { func, shape } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import { H3, FormInput, AutoSave, LoadingIndicator } from "components";
import setFieldData from "final-form-set-field-data";
import { Form } from "../styled";

const ContactInformationForm = ({ t, initialValues, handleSubmit }) =>
  initialValues ? (
    <FinalForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      mutators={{ setFieldData }}
      subscription={{
        form: true
      }}
      render={({ form: { mutators } }) => (
        <Form>
          <AutoSave
            setFieldData={mutators.setFieldData}
            save={handleSubmit}
            t={t}
          />
          <H3>{t("liveInfo")}</H3>
          <FormInput
            name="liveInfo"
            label={t("liveInfoLabel")}
            placeholder={t("liveInfoPlaceholder")}
          />
        </Form>
      )}
    />
  ) : (
    <LoadingIndicator />
  );

ContactInformationForm.propTypes = {
  t: func.isRequired,
  initialValues: shape(),
  handleSubmit: func.isRequired
};

ContactInformationForm.defaultProps = {
  initialValues: undefined
};

export default ContactInformationForm;
