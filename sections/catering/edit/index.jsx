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
  FormTimePicker,
  parseTime
} from "components";
import { Flex, Box } from "@rebass/grid";
import { Router } from "routes";
import { normalizePrice } from "utils/normalizers";
import currencies from "utils/currencies";
import { Form } from "../styled";

const EditCateringForm = ({ t, lng, editedCatering, handleFormSubmit }) => (
  <FinalForm
    initialValues={{
      name: editedCatering.name,
      date: editedCatering.date,
      from: parseTime(editedCatering.from),
      to: parseTime(editedCatering.to),
      typeOfEvent: editedCatering.typeOfEvent,
      outdoors: editedCatering.outdoors,
      corporateEvent: editedCatering.corporateEvent,
      companyName: editedCatering.companyName,
      numberOfServings: editedCatering.numberOfServings,
      specifications: editedCatering.specifications,
      menu: editedCatering.menu,
      chefAttendance: editedCatering.chefAttendance,
      numberOfWaiters: editedCatering.numberOfWaiters,
      cutlery: editedCatering.cutlery,
      priceCents: normalizePrice(editedCatering.priceCents),
      currency: currencies.find(c => c.value === editedCatering.currency)
    }}
    onSubmit={v => {
      handleFormSubmit(v, editedCatering.id);
    }}
    render={({ handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <H3 mt={3}>{t("createEvent.basicInfo")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="name" label={t("createEvent.name")} />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormDaypicker name="date" label={t("createEvent.date")} />
          </Box>
          <Box width={1 / 2} px={2}>
            <FormTimePicker
              name="from"
              label={t("createEvent.from")}
              placeholder={t("createEvent.from")}
            />
          </Box>
          <Box width={1 / 2} px={2}>
            <FormTimePicker
              name="to"
              label={t("createEvent.to")}
              placeholder={t("createEvent.to")}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="priceCents"
              parse={normalizePrice}
              label={t("createEvent.price")}
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
