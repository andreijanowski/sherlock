import React from "react";
import { func, shape, string } from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";
import {
  H3,
  File,
  Button,
  FormInput,
  FormSelect,
  FormTextarea,
  FormDropdown,
  FormDaypicker,
  FormTimePicker
} from "components";
import { Flex, Box } from "@rebass/grid";
import { Router } from "routes";
import { normalizePrice } from "utils/normalizers";
import currencies from "utils/currencies";
import { Form } from "../styled";

const EditCateringForm = ({ t, lng, editedCatering, handleFormSubmit }) => (
  <FinalForm
    initialValues={{
      name: editedCatering.get("name"),
      date: editedCatering.get("date"),
      from: editedCatering.get("from"),
      to: editedCatering.get("to"),
      typeOfEvent: editedCatering.get("typeOfEvent"),
      outdoors: editedCatering.get("outdoors"),
      corporateEvent: editedCatering.get("corporateEvent"),
      companyName: editedCatering.get("companyName"),
      numberOfServings: editedCatering.get("numberOfServings"),
      specifications: editedCatering.get("specifications"),
      menu: editedCatering.get("menu"),
      chefAttendance: editedCatering.get("chefAttendance"),
      numberOfWaiters: editedCatering.get("numberOfWaiters"),
      cutlery: editedCatering.get("cutlery"),
      priceCents: normalizePrice(editedCatering.get("priceCents")),
      currency: currencies.find(c => c.value === editedCatering.get("currency"))
    }}
    onSubmit={v => {
      handleFormSubmit(v, editedCatering.get("id"));
    }}
    subscription={{
      handleSubmit: true
    }}
    render={({ handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <H3 mt={3}>{t("events:createEvent.basicInfo")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="name" label={t("events:createEvent.name")} />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormDaypicker name="date" label={t("events:createEvent.date")} />
          </Box>
          <Box width={1 / 2} px={2}>
            <FormTimePicker
              name="from"
              label={t("events:createEvent.from")}
              placeholder={t("events:createEvent.from")}
            />
          </Box>
          <Box width={1 / 2} px={2}>
            <FormTimePicker
              name="to"
              label={t("events:createEvent.to")}
              placeholder={t("events:createEvent.to")}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="priceCents"
              parse={normalizePrice}
              label={t("events:createEvent.price")}
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
        </Flex>
        <Flex flexWrap="wrap" justifyContent="center" mx={-2} mt={3}>
          <Box width={1 / 2} px={2}>
            <Button
              styleName="formBlue"
              fluid
              type="button"
              onClick={() => {
                Router.pushRoute(
                  `/${lng}/app/events-management/catering/month?date=${editedCatering.get(
                    "date"
                  )}`
                );
              }}
            >
              {t("forms:cancel")}
            </Button>
          </Box>
          <Box width={1 / 2} px={2}>
            <Button styleName="formBlue" type="submit" fluid>
              {t("events:sendOffer")}
            </Button>
          </Box>
        </Flex>
      </Form>
    )}
  />
);

EditCateringForm.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  handleFormSubmit: func.isRequired,
  editedCatering: shape().isRequired
};

export default EditCateringForm;
