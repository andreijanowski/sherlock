import { PureComponent } from "react";
import { Form, Field } from "react-final-form";
import { func } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputField, Button, RadioButtonField } from "components";
import { required } from "utils/validators";
import { Box } from "@rebass/grid";
import {
  HelperTitle,
  Separator,
  SuccessMessageWrapper,
  RadioButtonsContainer,
  CustomRadioButtonPlaceholder
} from "./styled";

class VenueForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: null
    };
    this.validateRequired = required(props.t);
  }

  // Temporary mock fn() before real API connected.
  submitForm = async ({
    accountName,
    managerName,
    venueName,
    venueAddress,
    venueNumber,
    venueNumberCustom
  }) => {
    const payload = {
      accountName,
      managerName,
      venueName,
      venueAddress,
      venueNumber: venueNumber === "custom" ? venueNumberCustom : venueNumber
    };

    await new Promise(resolve => {
      setTimeout(() => resolve(), 1200);
    }).then(() =>
      this.setState({
        successMessage: JSON.stringify(payload)
      })
    );
  };

  render() {
    const { t } = this.props;
    const { successMessage } = this.state;
    if (successMessage) {
      return <SuccessMessageWrapper>{successMessage}</SuccessMessageWrapper>;
    }
    return (
      <Form
        onSubmit={this.submitForm}
        subscription={{
          handleSubmit: true,
          pristine: true,
          invalid: true,
          submitting: true,
          values: true
        }}
        render={({ handleSubmit, pristine, invalid, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <HelperTitle>{t("accountName")}</HelperTitle>
            <InputField
              name="accountName"
              type="text"
              placeholder={t("forms:placeholder.egAccount")}
              validate={this.validateRequired}
            />
            <Separator size={32} />
            <HelperTitle>{t("managerName")}</HelperTitle>
            <InputField
              name="managerName"
              type="text"
              placeholder={t("forms:placeholder.egAccount")}
              validate={this.validateRequired}
            />
            <Separator size={32} />
            <HelperTitle>{t("venueName")}</HelperTitle>
            <InputField
              name="venueName"
              type="text"
              placeholder={t("forms:placeholder.egAccount")}
              validate={this.validateRequired}
            />
            <Separator size={32} />
            <HelperTitle>{t("venueAddress")}</HelperTitle>
            <InputField
              name="venueAddress"
              type="text"
              placeholder={t("forms:placeholder.location")}
              validate={this.validateRequired}
            />
            <Separator size={32} />
            <HelperTitle>{t("venueNumber")}</HelperTitle>
            <RadioButtonsContainer>
              <Box width={[1 / 4, 1 / 5, 1 / 4]} p={1}>
                <RadioButtonField name="venueNumber" value="1-3">
                  1-3
                </RadioButtonField>
              </Box>
              <Box width={[1 / 4, 1 / 5, 1 / 4]} p={1}>
                <RadioButtonField name="venueNumber" value="4-10">
                  4-10
                </RadioButtonField>
              </Box>
              <Box width={[1 / 4, 1 / 5, 1 / 4]} p={1}>
                <RadioButtonField name="venueNumber" value="11-20">
                  11-20
                </RadioButtonField>
              </Box>
              <Box width={[1 / 4, 1 / 5, 1 / 4]} p={1}>
                <RadioButtonField name="venueNumber" value="21-30">
                  21-30
                </RadioButtonField>
              </Box>
              <Box width={[1 / 4, 1 / 5, 1 / 4]} p={1}>
                <RadioButtonField name="venueNumber" value="31-50">
                  31-50
                </RadioButtonField>
              </Box>
              <Box width={[3 / 4, 1, 3 / 4]} p={1}>
                <RadioButtonField name="venueNumber" value="custom">
                  <Field name="venueNumber" subscription={{ value: true }}>
                    {({ input: { value } }) =>
                      value === "custom" ? (
                        <Field
                          name="venueNumberCustom"
                          component="input"
                          placeholder={t("forms:placeholder.custom")}
                        />
                      ) : (
                        <CustomRadioButtonPlaceholder>
                          {values.venueNumberCustom ||
                            t("forms:placeholder.custom")}
                        </CustomRadioButtonPlaceholder>
                      )
                    }
                  </Field>
                </RadioButtonField>
              </Box>
            </RadioButtonsContainer>
            <Separator size={32} />
            <Box width={[1, "auto"]}>
              <Button
                onClick={handleSubmit}
                styleName="blue"
                fluid
                disabled={invalid || pristine || submitting}
              >
                {submitting ? (
                  <FontAwesomeIcon icon="circle-notch" spin size="lg" />
                ) : (
                  t("startButton")
                )}
              </Button>
            </Box>
          </form>
        )}
      />
    );
  }
}

VenueForm.propTypes = {
  t: func.isRequired
};

export default VenueForm;
