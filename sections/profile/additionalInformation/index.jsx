import React, { useMemo } from "react";
import { func, shape } from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";
import { Flex, Box } from "@rebass/grid";
import setFieldData from "final-form-set-field-data";

import {
  H4,
  H3,
  FormCheckbox,
  FormSelect,
  FormInput,
  AutoSave,
  LoadingIndicator,
  Tooltip,
  BusinessServiceLinksGroup
} from "components";
import currencies from "utils/currencies";
import { groupServiceLinksByCategory } from "utils/servicesUtils";
import { Form, Link } from "../styled";
import { timeOfTheDay, paymentMethods } from "./utils";

const AdditionalInformationForm = ({
  t,
  initialValues,
  handleSubmit,
  serviceLinks,
  onServiceAdd,
  onServiceLinkChange,
  onServiceLinkDelete
}) => {
  const groupedServiceLinks = useMemo(
    () => (serviceLinks ? groupServiceLinksByCategory(serviceLinks) : {}),
    [serviceLinks]
  );

  return initialValues ? (
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
          <H3>{t("timeOfTheDay")}</H3>
          <Flex flexWrap="wrap">
            {timeOfTheDay.map(time => (
              <Box width={1 / 2} key={time}>
                <FormCheckbox name={time} label={t(time)} />
              </Box>
            ))}
          </Flex>
          <H3 mt={3}>{t("priceRange")}</H3>
          <Flex mx={-2}>
            <Box width={[1 / 2, 1 / 3, 1 / 3, 1 / 2]} px={2}>
              <Field
                name="currency"
                component={FormSelect}
                label={t("currencyLabel")}
                placeholder={t("currencyPlaceholder")}
                items={currencies}
              />
            </Box>
            <Box width={[1 / 2, 2 / 3, 2 / 3, 1 / 2]} px={2}>
              <FormInput
                name="pricePerPerson"
                label={t("pricePerPersonLabel")}
                placeholder={t("pricePerPersonPlaceholder")}
              />
            </Box>
          </Flex>

          <H3 mt={3}>{t("services")}</H3>
          <FormCheckbox name="hasCatering" label={t("hasCatering")} />
          <FormCheckbox name="hasReservations" label={t("hasReservations")} />
          <FormCheckbox name="hasPrivateEvents" label={t("hasPrivateEvents")} />
          <FormCheckbox
            name="availableInLefood"
            label={t("availableInLefood")}
          />

          <H3 mt={3}>{t("redirectionLinks")}</H3>
          <H4>{t("redirectionWebsiteLinks")}</H4>
          <Tooltip content={t("redirectionLinksTooltip")}>
            <FormInput
              name="deliveryUrl"
              label={t("deliveryUrlLabel")}
              placeholder={t("deliveryUrlPlaceholder")}
            />
          </Tooltip>
          <Tooltip content={t("redirectionLinksTooltip")}>
            <FormInput
              name="onlineBookingUrl"
              label={t("onlineBookingUrlLabel")}
              placeholder={t("onlineBookingUrlPlaceholder")}
            />
          </Tooltip>
          <Tooltip content={t("redirectionLinksTooltip")}>
            <FormInput
              name="takeawayUrl"
              label={t("takeawayUrlLabel")}
              placeholder={t("takeawayUrlPlaceholder")}
            />
          </Tooltip>

          <H4>{t("redirectionServicesLinks")}</H4>
          {Object.keys(groupedServiceLinks).map(category => (
            <BusinessServiceLinksGroup
              key={category}
              category={category}
              items={groupedServiceLinks[category]}
              onServiceLinkChange={onServiceLinkChange}
              onServiceLinkDelete={onServiceLinkDelete}
            />
          ))}

          <Link type="button" onClick={onServiceAdd}>
            {t("addExternalServiceLink")}
          </Link>

          <H3 mt={3}>{t("paymentMethods")}</H3>
          <Flex flexWrap="wrap">
            {paymentMethods.map(method => (
              <Box width={1 / 2} key={method}>
                <FormCheckbox name={method} label={t(method)} />
              </Box>
            ))}
          </Flex>
          <H3 mt={3}>{t("secretCode")}</H3>
          <FormInput
            name="secretCode"
            label={t("secretCodeLabel")}
            placeholder={t("secretCodePlaceholder")}
          />
        </Form>
      )}
    />
  ) : (
    <LoadingIndicator />
  );
};

AdditionalInformationForm.propTypes = {
  t: func.isRequired,
  initialValues: shape(),
  handleSubmit: func.isRequired,
  onServiceAdd: func.isRequired,
  onServiceLinkChange: func.isRequired,
  onServiceLinkDelete: func.isRequired,
  serviceLinks: shape()
};

AdditionalInformationForm.defaultProps = {
  initialValues: undefined,
  serviceLinks: null
};

export default AdditionalInformationForm;
