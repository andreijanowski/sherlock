import React, { PureComponent } from "react";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { func } from "prop-types";
import { Box, Flex } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputField, Button } from "components";
import { isEmail } from "utils/validators";
import {
  HelperTitle,
  FieldsContainer,
  RemoveButton,
  BottomButton,
  ButtonWrapper
} from "./styled";

class InviteManagers extends PureComponent {
  constructor(props) {
    super(props);
    this.fieldsContainer = React.createRef();
    this.validateEmail = isEmail(props.t);
  }

  initializeEmails = () =>
    Array(3).fill({
      email: undefined
    });

  scrollToLastField = () => {
    if (this.fieldsContainer.current)
      this.fieldsContainer.current.scrollTo(
        0,
        this.fieldsContainer.current.scrollHeight
      );
  };

  render() {
    const { t, addReferrals } = this.props;
    return (
      <Form
        onSubmit={addReferrals}
        mutators={{
          ...arrayMutators
        }}
        initialValues={{
          emails: this.initializeEmails()
        }}
        subscription={{
          handleSubmit: true,
          pristine: true,
          invalid: true,
          submitting: true
        }}
        render={({ handleSubmit, pristine, invalid, submitting }) => (
          <form onSubmit={handleSubmit}>
            <HelperTitle>{t("emailHelperTitle")}</HelperTitle>
            <FieldArray name="emails">
              {({ fields }) => (
                <>
                  <FieldsContainer ref={this.fieldsContainer}>
                    {fields.map((name, index) => (
                      <InputField
                        key={name}
                        name={`${name}.email`}
                        type="email"
                        placeholder="name@company.com"
                        validate={this.validateEmail}
                      >
                        {index > 2 && (
                          <RemoveButton onClick={() => fields.remove(index)} />
                        )}
                      </InputField>
                    ))}
                    {this.scrollToLastField()}
                  </FieldsContainer>
                  <ButtonWrapper
                    flexDirection={["column-reverse", "row"]}
                    mt={[1, 2]}
                  >
                    <Box width={[1]} mt={[4, 0]} mr={[0, 2]}>
                      <Button
                        type="button"
                        fluid
                        styleName="outlineBlue"
                        onClick={() => fields.push({ email: undefined })}
                      >
                        {t("addEmailButton")}
                      </Button>
                    </Box>
                    <Box width={[1]}>
                      <Button
                        onClick={handleSubmit}
                        type="button"
                        fluid
                        styleName="outlineBlue"
                      >
                        {t("skip")}
                      </Button>
                    </Box>
                  </ButtonWrapper>
                  <Flex
                    justifyContent={["center", "flex-end"]}
                    width={[1]}
                    mt={[4, 4, 4, 0]}
                    mr={[0, 2]}
                  >
                    <BottomButton
                      onClick={handleSubmit}
                      styleName="blue"
                      fluid
                      disabled={invalid || pristine || submitting}
                    >
                      {submitting ? (
                        <FontAwesomeIcon icon="circle-notch" spin size="lg" />
                      ) : (
                        t("inviteButton")
                      )}
                    </BottomButton>
                  </Flex>
                </>
              )}
            </FieldArray>
          </form>
        )}
      />
    );
  }
}

InviteManagers.propTypes = {
  t: func.isRequired,
  addReferrals: func.isRequired
};

export default InviteManagers;
