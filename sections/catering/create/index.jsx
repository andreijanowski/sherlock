import React from "react";
import { func, string, bool } from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";
import {
  H3,
  File,
  Button,
  FormInput,
  FormSelect,
  FormTextarea,
  FormCheckbox,
  FormDropdown,
  FormDaypicker,
  FormTimePicker,
  WhenFieldChanges,
  LoadingIndicator
} from "components";
import { Flex, Box } from "@rebass/grid";
import { Router } from "routes";
import countriesPhoneCodes from "utils/countriesPhoneCodes";
import { getSubdivisions, countries } from "utils/iso-3166-2";
import currencies from "utils/currencies";
import { Form } from "../styled";

const CreateCateringForm = ({ t, lng, sending, handleFormSubmit }) => (
  <FinalForm
    initialValues={{
      corporateEvent: false,
      outdoors: false,
      chefAttendance: false,
      cutlery: false
    }}
    onSubmit={handleFormSubmit}
    render={({ handleSubmit, values }) => (
      <Form onSubmit={handleSubmit}>
        <H3 mt={3}>{t("createEvent.basicInfo")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="name" label={t("createEvent.name")} />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormDaypicker name="date" label={t("createEvent.date")} />
          </Box>
          <Box width={[1 / 2, 1 / 2]} px={2}>
            <FormTimePicker
              name="from"
              label={t("createEvent.from")}
              placeholder={t("createEvent.from")}
            />
          </Box>
          <Box width={[1 / 2, 1 / 2]} px={2}>
            <FormTimePicker
              name="to"
              label={t("createEvent.to")}
              placeholder={t("createEvent.to")}
            />
          </Box>
        </Flex>
        <H3 mt={3}>{t("createEvent.address")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1 / 2, 1 / 2]} px={2}>
            <FormInput name="addressStreet" label={t("createEvent.street")} />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="addressStreetNumber"
              label={t("createEvent.streetNumber")}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="addressCity" label={t("createEvent.city")} />
          </Box>
          <Box width={[1 / 2, 1 / 2]} px={2}>
            <FormInput
              name="addressPostCode"
              label={t("createEvent.postCode")}
            />
          </Box>
          <WhenFieldChanges
            field="addressCountry"
            set="addressRegion"
            to={undefined}
          />
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="addressCountry"
              component={FormSelect}
              label={t("createEvent.country")}
              placeholder={t("createEvent.country")}
              items={countries}
              showFlag
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="addressRegion"
              component={FormSelect}
              label={t("createEvent.region")}
              placeholder={t("createEvent.region")}
              disabled={!values.addressCountry}
              items={
                (values.addressCountry &&
                  values.addressCountry.value &&
                  getSubdivisions(values.addressCountry.value)) ||
                []
              }
            />
          </Box>
          <Box width={1} px={2}>
            <FormTextarea name="addressNotes" label={t("createEvent.notes")} />
          </Box>
        </Flex>
        <H3 mt={3}>{t("createEvent.client")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="userName" label={t("createEvent.userName")} />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="email" label={t("createEvent.email")} />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="phoneCountry"
              component={FormSelect}
              label={t("createEvent.country")}
              placeholder={t("createEvent.country")}
              items={countriesPhoneCodes}
              showFlag
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="phone" label={t("createEvent.phone")} />
          </Box>
        </Flex>
        <H3 mt={3}>{t("createEvent.details")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="numberOfServings"
              label={t("createEvent.numberOfServings")}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="typeOfEvent"
              label={t("createEvent.typeOfEvent")}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="numberOfWaiters"
              label={t("createEvent.numberOfWaiters")}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="outdoors"
              component={FormDropdown}
              label={t("createEvent.outdoors")}
              items={[
                { label: t("createEvent.outdoorsOption.yes"), value: true },
                { label: t("createEvent.outdoorsOption.no"), value: false }
              ]}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="cutlery"
              component={FormDropdown}
              label={t("createEvent.cutlery")}
              items={[
                { label: t("createEvent.cutleryOption.yes"), value: true },
                { label: t("createEvent.cutleryOption.no"), value: false }
              ]}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="chefAttendance"
              component={FormDropdown}
              label={t("createEvent.chefAttendance")}
              items={[
                {
                  label: t("createEvent.chefAttendanceOption.yes"),
                  value: true
                },
                {
                  label: t("createEvent.chefAttendanceOption.no"),
                  value: false
                }
              ]}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="corporateEvent"
              component={FormDropdown}
              label={t("createEvent.corporateEvent")}
              items={[
                {
                  label: t("createEvent.corporateEventOption.yes"),
                  value: true
                },
                {
                  label: t("createEvent.corporateEventOption.no"),
                  value: false
                }
              ]}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="companyName"
              label={t("createEvent.companyName")}
            />
          </Box>
          <Box width={1} px={2}>
            <FormTextarea
              name="specifications"
              label={t("createEvent.specifications")}
            />
          </Box>
          <Box width={1} px={2}>
            <File
              {...{
                name: "menu",
                accept: ["image/png", "image/jpeg", "application/pdf"],
                tip: t("createEvent.chooseOrDragFile"),
                info: t("createEvent.menuInfo"),
                errorTipType: t("createEvent.invalidFiles"),
                errorInfoType: t("createEvent.validMenu")
              }}
            />
          </Box>
          <Flex width={1} alignItems="center" mt={3}>
            <Box width={1 / 2} px={2}>
              <FormCheckbox
                name="consentGdpr"
                label={t("createEvent.consentGdpr")}
              />
            </Box>
            <Box width={1 / 2} px={2}>
              <Field
                name="currency"
                component={FormSelect}
                label={t("createEvent.currency")}
                placeholder={t("createEvent.currency")}
                items={currencies}
              />
            </Box>
          </Flex>
        </Flex>
        <Flex flexWrap="wrap" justifyContent="center" mx={-2} mt={3}>
          <Box width={1 / 2} px={2}>
            <Button
              styleName="formBlue"
              fluid
              type="button"
              onClick={() => {
                Router.pushRoute(`/${lng}/app/catering/month/`);
              }}
            >
              {t("forms:cancel")}
            </Button>
          </Box>
          <Box width={1 / 2} px={2}>
            <Button styleName="formBlue" type="submit" fluid>
              {t("forms:save")}
            </Button>
          </Box>
        </Flex>
        {sending && <LoadingIndicator />}
      </Form>
    )}
  />
);

CreateCateringForm.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  handleFormSubmit: func.isRequired,
  sending: bool.isRequired
};

export default CreateCateringForm;
