import React from "react";
import { func } from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";
import {
  H3,
  FormDropdown,
  FormInput,
  Button,
  FormTimePicker,
  FormDaypicker
} from "components";
import { Flex, Box } from "@rebass/grid";
import { Router } from "routes";
import { Form } from "../styled";

const CreateCateringForm = ({ t, handleFormSubmit }) => (
  <FinalForm
    initialValues={{
      cutlery: false,
      chefAttendance: false,
      outdoors: false,
      corporateEvent: false
    }}
    onSubmit={v => handleFormSubmit(v)}
    render={({ handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <H3 mt={3}>{t("createEvent.basicInfo")}</H3>
        <Flex flexWrap="wrap" mx={-2}>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="name" label={t("createEvent.name")} />
          </Box>
          <Box width={[1 / 2, 1 / 3]} px={2}>
            <FormTimePicker name="from" label={t("createEvent.from")} />
          </Box>
          <Box width={[1 / 2, 1 / 3]} px={2}>
            <FormTimePicker name="to" label={t("createEvent.to")} />
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
            <FormInput name="userName" label={t("createEvent.userName")} />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput name="email" label={t("createEvent.email")} />
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
          <Box width={[1, 1 / 2]} px={2}>
            <FormInput
              name="specifications"
              label={t("createEvent.specifications")}
            />
          </Box>
        </Flex>
        <Flex flexWrap="wrap" justifyContent="center" mx={-2} mt={3}>
          <Box width={[1 / 2, 165]} px={2}>
            <Button
              styleName="formBlue"
              fluid
              onClick={e => {
                e.preventDefault();
                Router.pushRoute("/app/catering/month/");
              }}
            >
              {t("forms:cancel")}
            </Button>
          </Box>
          <Box width={[1 / 2, 165]} px={2}>
            <Button styleName="formBlue" type="submit" fluid>
              {t("forms:save")}
            </Button>
          </Box>
        </Flex>
      </Form>
    )}
  />
);

CreateCateringForm.propTypes = {
  t: func.isRequired,
  handleFormSubmit: func.isRequired
};

export default CreateCateringForm;
