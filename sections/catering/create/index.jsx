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
import { normalizePhone } from "utils/normalizers";
import { Form } from "../styled";

const CreateCateringForm = ({ t, lng, isSending, handleFormSubmit }) => (
  <FinalForm
    initialValues={{
      corporateEvent: false,
      outdoors: false,
      chefAttendance: false,
      cutlery: false
    }}
    onSubmit={handleFormSubmit}
    subscription={{
      handleSubmit: true,
      values: true
    }}
    render={({ handleSubmit, values }) => (
      <Form onSubmit={handleSubmit}>
        <H3 mt={3}>{t("events:createEvent.basicInfo")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="name" label={t("events:createEvent.name")} />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormDaypicker name="date" label={t("events:createEvent.date")} />
          </Box>
          <Box width={[1 / 2, 1 / 2]} px={2}>
            <FormTimePicker
              name="from"
              label={t("events:createEvent.from")}
              placeholder={t("events:createEvent.from")}
            />
          </Box>
          <Box width={[1 / 2, 1 / 2]} px={2}>
            <FormTimePicker
              name="to"
              label={t("events:createEvent.to")}
              placeholder={t("events:createEvent.to")}
            />
          </Box>
        </Flex>
        <H3 mt={3}>{t("events:createEvent.address")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1 / 2, 1 / 2]} px={2}>
            <FormInput
              name="addressStreet"
              label={t("events:createEvent.street")}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="addressStreetNumber"
              label={t("events:createEvent.streetNumber")}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="addressCity"
              label={t("events:createEvent.city")}
            />
          </Box>
          <Box width={[1 / 2, 1 / 2]} px={2}>
            <FormInput
              name="addressPostCode"
              label={t("events:createEvent.postCode")}
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
              label={t("events:createEvent.country")}
              placeholder={t("events:createEvent.country")}
              items={countries}
              showFlag
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="addressRegion"
              component={FormSelect}
              label={t("events:createEvent.region")}
              placeholder={t("events:createEvent.region")}
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
            <FormTextarea
              name="addressNotes"
              label={t("events:createEvent.notes")}
            />
          </Box>
        </Flex>
        <H3 mt={3}>{t("events:createEvent.client")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="userName"
              label={t("events:createEvent.userName")}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="email" label={t("events:createEvent.email")} />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="phoneCountry"
              component={FormSelect}
              label={t("events:createEvent.country")}
              placeholder={t("events:createEvent.country")}
              items={countriesPhoneCodes}
              showFlag
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="phone"
              label={t("events:createEvent.phone")}
              parse={normalizePhone}
            />
          </Box>
        </Flex>
        <H3 mt={3}>{t("events:createEvent.details")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="numberOfServings"
              label={t("events:createEvent.numberOfServings")}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="typeOfEvent"
              label={t("events:createEvent.typeOfEvent")}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="numberOfWaiters"
              label={t("events:createEvent.numberOfWaiters")}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="outdoors"
              component={FormDropdown}
              label={t("events:createEvent.outdoors")}
              items={[
                {
                  label: t("events:createEvent.outdoorsOption.yes"),
                  value: true
                },
                {
                  label: t("events:createEvent.outdoorsOption.no"),
                  value: false
                }
              ]}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="cutlery"
              component={FormDropdown}
              label={t("events:createEvent.cutlery")}
              items={[
                {
                  label: t("events:createEvent.cutleryOption.yes"),
                  value: true
                },
                {
                  label: t("events:createEvent.cutleryOption.no"),
                  value: false
                }
              ]}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="chefAttendance"
              component={FormDropdown}
              label={t("events:createEvent.chefAttendance")}
              items={[
                {
                  label: t("events:createEvent.chefAttendanceOption.yes"),
                  value: true
                },
                {
                  label: t("events:createEvent.chefAttendanceOption.no"),
                  value: false
                }
              ]}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="corporateEvent"
              component={FormDropdown}
              label={t("events:createEvent.corporateEvent")}
              items={[
                {
                  label: t("events:createEvent.corporateEventOption.yes"),
                  value: true
                },
                {
                  label: t("events:createEvent.corporateEventOption.no"),
                  value: false
                }
              ]}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="companyName"
              label={t("events:createEvent.companyName")}
            />
          </Box>
          <Box width={1} px={2}>
            <FormTextarea
              name="specifications"
              label={t("events:createEvent.specifications")}
            />
          </Box>
          <Box width={1} px={2}>
            <File
              {...{
                name: "menu",
                accept: ["image/png", "image/jpeg", "application/pdf"],
                tip: t("events:createEvent.chooseOrDragFile"),
                info: t("events:createEvent.menuInfo"),
                errorTipType: t("events:createEvent.invalidFiles"),
                errorInfoType: t("events:createEvent.validMenu")
              }}
            />
          </Box>
          <Flex width={1} alignItems="center" mt={3}>
            <Box width={1 / 2} px={2}>
              <FormCheckbox
                name="consentGdpr"
                label={t("events:createEvent.consentGdpr")}
              />
            </Box>
            <Box width={1 / 2} px={2}>
              <Field
                name="currency"
                component={FormSelect}
                label={t("events:createEvent.currency")}
                placeholder={t("events:createEvent.currency")}
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
              {t("events:forms:cancel")}
            </Button>
          </Box>
          <Box width={1 / 2} px={2}>
            <Button styleName="formBlue" type="submit" fluid>
              {t("events:forms:save")}
            </Button>
          </Box>
        </Flex>
        {isSending && <LoadingIndicator />}
      </Form>
    )}
  />
);

CreateCateringForm.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  handleFormSubmit: func.isRequired,
  isSending: bool.isRequired
};

export default CreateCateringForm;
