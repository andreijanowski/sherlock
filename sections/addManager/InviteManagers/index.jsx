import React, { PureComponent } from "react";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { func } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputField, Button } from "components";
import { isEmail } from "utils/validators";
import {
  ButtonContainer,
  HelperTitle,
  Separator,
  SuccessMessageWrapper,
  FieldsContainer,
  RemoveButton
} from "./styled";

class InviteManagers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: null
    };
    this.fieldsContainer = React.createRef();
    this.validateEmail = isEmail(props.t);
  }

  initializeMembers = () =>
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
    const { t } = this.props;
    const { successMessage } = this.state;
    if (successMessage) {
      return <SuccessMessageWrapper>{successMessage}</SuccessMessageWrapper>;
    }
    return (
      <Form
        onSubmit={() => null}
        mutators={{
          ...arrayMutators
        }}
        initialValues={{
          members: this.initializeMembers()
        }}
        render={({ handleSubmit, pristine, invalid, submitting }) => (
          <form onSubmit={handleSubmit}>
            <HelperTitle>{t("emailHelperTitle")}</HelperTitle>
            <FieldArray name="members">
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
                  <Separator size={32} />
                  <ButtonContainer>
                    <Button
                      onClick={handleSubmit}
                      styleName="blue"
                      disabled={invalid || pristine || submitting}
                    >
                      {submitting ? (
                        <FontAwesomeIcon icon="circle-notch" spin size="lg" />
                      ) : (
                        t("inviteButton")
                      )}
                    </Button>
                    <Button
                      type="button"
                      styleName="outlineBlue"
                      onClick={() => fields.push({ email: undefined })}
                    >
                      {t("addEmailButton")}
                    </Button>
                  </ButtonContainer>
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
  t: func.isRequired
};

export default InviteManagers;
