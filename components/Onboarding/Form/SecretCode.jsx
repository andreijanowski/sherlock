import React from "react";

import { func, shape } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import setFieldData from "final-form-set-field-data";
import { Trans } from "i18n";

import { useT } from "utils/hooks";

import { FormInput, AutoSave } from "components";

import {
  Content,
  Wrapper,
  Title,
  Info,
  InfoWrapper,
  InputWrapper,
  FormWrapper,
  Header
} from "./styled";

const SecretCode = ({ values: initialValues, handleSubmit }) => {
  const t = useT(["additionalInformation", "app"]);

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      mutators={{ setFieldData }}
      subscription={{
        form: true
      }}
      render={({ form: { mutators } }) => (
        <FormWrapper>
          <AutoSave
            setFieldData={mutators.setFieldData}
            save={handleSubmit}
            t={t}
            hasHiddenMessages
          />
          <Wrapper>
            <Title>{t("secretCodeLabel")}</Title>
            <Content>
              <InfoWrapper minWidth="1174px" height="572px">
                <Header>{t("secretCodeLabel")}</Header>
                <Info>
                  <Trans
                    t={t}
                    i18nKey="secretCodeHint"
                    components={[<br />, <b />]}
                  />
                </Info>
                <InputWrapper>
                  <FormInput
                    name="secretCode"
                    label={t("secretCodeLabel")}
                    placeholder={t("secretCodePlaceholder")}
                  />
                </InputWrapper>
              </InfoWrapper>
            </Content>
          </Wrapper>
        </FormWrapper>
      )}
    />
  );
};

SecretCode.propTypes = {
  values: shape(),
  handleSubmit: func
};

SecretCode.defaultProps = {
  values: null,
  handleSubmit: null
};

export default SecretCode;
