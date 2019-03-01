import React from "react";
import { func } from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";
import {
  H3,
  FormDropdown,
  FormInput,
  Button,
  FormTimePicker,
  MenusUploader,
  FormDaypicker
} from "components";
import { Flex, Box } from "@rebass/grid";
import {
  required,
  isNotNegativeInt,
  composeValidators,
  isNotNegativeNumber
} from "utils/validators";
import { Router } from "routes";
import Form from "./styled";

const CreateEventForm = ({ t }) => (
  <FinalForm
    initialValues={{
      cutlery: "true",
      chefAttendance: "false"
    }}
    onSubmit={catering => {
      console.log(catering);
    }}
    render={({ handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <H3 mt={3}>{t("createEvent.basicInfo")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="cateringName"
              label={t("createEvent.name")}
              validate={required(t)}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="price"
              label={t("createEvent.price")}
              validate={composeValidators(required(t), isNotNegativeNumber(t))}
            />
          </Box>
          <Box width={[1 / 2, 1 / 3]} px={2}>
            <FormTimePicker name="fromHour" label={t("createEvent.from")} />
          </Box>
          <Box width={[1 / 2, 1 / 3]} px={2}>
            <FormTimePicker name="toHour" label={t("createEvent.to")} />
          </Box>
          <Box width={[1, 1 / 3]} px={2}>
            <FormDaypicker name="date" label={t("createEvent.date")} />
          </Box>
        </Flex>
        <H3 mt={3}>{t("createEvent.details")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="numberOfServings"
              label={t("createEvent.numberOfServings")}
              validate={composeValidators(required(t), isNotNegativeInt(t))}
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
              validate={composeValidators(required(t), isNotNegativeInt(t))}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Field
              name="cutlery"
              component={FormDropdown}
              label={t("createEvent.cutlery")}
              items={[
                { label: t("createEvent.cutleryOption.yes"), value: "true" },
                { label: t("createEvent.cutleryOption.no"), value: "false" }
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
                  value: "true"
                },
                {
                  label: t("createEvent.chefAttendanceOption.no"),
                  value: "false"
                }
              ]}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="specifications"
              label={t("createEvent.specifications")}
            />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="additional" label={t("createEvent.additional")} />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="location"
              label={t("createEvent.location")}
              validate={required(t)}
            />
          </Box>
        </Flex>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={1} px={2}>
            <MenusUploader
              {...{
                // placeholder, waiting for API connection
                menus: [
                  {
                    displayName: "photo",
                    id: "b5ea2478-7224-436e-a57d-cdda2ea49630",
                    url:
                      "https://thefooddetective-staging.s3.amazonaws.com/uploads/menu/file/b5ea2478-7224-436e-a57d-cdda2ea49630/file.jpeg"
                  }
                ],
                // waiting for API connection
                addMenu: null,
                updateMenu: null,
                removeMenu: null
              }}
            />
          </Box>
        </Flex>
        <Flex flexWrap="wrap" justifyContent="center" mx={-2} mt={3}>
          <Box width={[1, 165]} px={2}>
            <Button
              styleName="formBlue"
              fluid
              onClick={() => {
                Router.pushRoute("/app/catering/month/");
              }}
            >
              {t("forms:cancel")}
            </Button>
          </Box>
          <Box width={[1, 165]} px={2}>
            <Button styleName="formBlue" type="submit" fluid>
              {t("forms:save")}
            </Button>
          </Box>
        </Flex>
      </Form>
    )}
  />
);

CreateEventForm.propTypes = {
  t: func.isRequired
};

export default CreateEventForm;
