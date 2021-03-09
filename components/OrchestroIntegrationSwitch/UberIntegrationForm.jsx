import { Form } from "react-final-form";
import { PulseLoader } from "react-spinners";
import { func, bool, string } from "prop-types";

import { InputField } from "components";
import { required } from "utils/validators";

import React from "react";

export const UberIntegrationForm = ({
  connectToUber,
  t,
  isFetching,
  businessId
}) => {
  const handleUberEatsIntegrationChange = async values => {
    connectToUber(values);
  };
  return (
    <Form
      initialValues={{ business_id: businessId }}
      onSubmit={handleUberEatsIntegrationChange}
      render={form => (
        <form onSubmit={form.handleSubmit} style={{ width: "100%" }}>
          <InputField
            name="store_id"
            placeholder="Store ID"
            type="text"
            validate={required(t)}
          />
          <input type="hidden" name="business_id" />
          <button type="submit" styleName="blue">
            {isFetching ? <PulseLoader size={6} /> : "Submit"}
          </button>
        </form>
      )}
    />
  );
};

UberIntegrationForm.propTypes = {
  isFetching: bool.isRequired,
  t: func.isRequired,
  connectToUber: func.isRequired,
  businessId: string.isRequired
};
