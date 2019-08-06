import React from "react";
import { func, string } from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";
import {
  H3,
  Button,
  FormInput,
  FormSelect,
  FormDaypicker,
  FormTimePicker,
  parseTime
} from "components";
import { Flex, Box } from "@rebass/grid";
import { Router } from "routes";
import countriesPhoneCodes from "utils/countriesPhoneCodes";
import { Form } from "./styled";

const CreateCateringForm = ({
  t,
  lng,
  handleFormSubmit,
  editedReservation
}) => (
  <FinalForm
    onSubmit={v => {
      handleFormSubmit(v, editedReservation.get("id"));
    }}
    initialValues={{
      partySize: editedReservation.getIn(["attributes", "partySize"]),
      date: editedReservation.getIn(["attributes", "date"]),
      from: parseTime(editedReservation.getIn(["attributes", "from"])),
      to: parseTime(editedReservation.getIn(["attributes", "to"])),
      name: editedReservation.getIn(["attributes", "name"]),
      email: editedReservation.getIn(["attributes", "email"]),
      phoneCountry: countriesPhoneCodes.find(
        ({ value: { code, prefix } }) =>
          code ===
            editedReservation.getIn(["attributes", "phoneCountryCode"]) &&
          prefix ===
            editedReservation.getIn(["attributes", "phoneCountryPrefix"])
      ),
      phone: editedReservation.getIn(["attributes", "phone"])
    }}
    subscription={{
      handleSubmit: true
    }}
    render={({ handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <H3 mt={3}>{t("reservationDetails")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="partySize" label={t("partySize")} />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormDaypicker name="date" label={t("date")} />
          </Box>
          <Box width={[1 / 2]} px={2}>
            <FormTimePicker
              name="from"
              label={t("from")}
              placeholder={t("from")}
            />
          </Box>
          <Box width={[1 / 2]} px={2}>
            <FormTimePicker name="to" label={t("to")} placeholder={t("to")} />
          </Box>
        </Flex>
        <H3 mt={3}>{t("personalInformation")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="name" label={t("name")} />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="email" label={t("email")} />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="phoneCountry"
              component={FormSelect}
              label={t("country")}
              placeholder={t("country")}
              items={countriesPhoneCodes}
              showFlag
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="phone" label={t("phone")} />
          </Box>
        </Flex>
        <Flex flexWrap="wrap" justifyContent="center" mx={-2} mt={3}>
          <Box width={1 / 2} px={2}>
            <Button
              styleName="formBlue"
              fluid
              type="button"
              onClick={() => {
                Router.pushRoute(`/${lng}/app/reservation/reservations/`);
              }}
            >
              {t("cancel")}
            </Button>
          </Box>
          <Box width={1 / 2} px={2}>
            <Button styleName="formBlue" type="submit" fluid>
              {t("save")}
            </Button>
          </Box>
        </Flex>
      </Form>
    )}
  />
);

CreateCateringForm.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  handleFormSubmit: func.isRequired,
  editedReservation: func.isRequired
};

export default CreateCateringForm;
