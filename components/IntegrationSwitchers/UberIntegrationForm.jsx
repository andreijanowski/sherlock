import React from "react";
import { Form } from "react-final-form";
import { PulseLoader } from "react-spinners";
import { func, bool, string } from "prop-types";
import { Box } from "@rebass/grid";

import { InputField, H4 } from "components";
import { required } from "utils/validators";
import { Trans } from "i18n";
import { FOODETECTIVE_MAIL, UBER_EATS_RESTAURANT_URL } from "consts";

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
          <H4>
            <strong>{t("integrations:uberEatsHint.title")}</strong>
          </H4>
          <ol>
            <Box as="li" mb={3}>
              <Trans
                t={t}
                i18nKey="integrations:uberEatsHint.step1"
                components={[
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={UBER_EATS_RESTAURANT_URL}
                  >
                    {UBER_EATS_RESTAURANT_URL}
                  </a>
                ]}
              />
            </Box>
            <Box as="li">
              <Trans
                t={t}
                i18nKey="integrations:uberEatsHint.step2"
                components={[<br />, <strong />]}
              />
            </Box>
          </ol>
          <p>
            <Trans
              t={t}
              i18nKey="integrations:uberEatsHint.ifDoesntWork"
              components={[
                <a href={`mailto:${FOODETECTIVE_MAIL}`}>{FOODETECTIVE_MAIL}</a>
              ]}
            />
          </p>
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
