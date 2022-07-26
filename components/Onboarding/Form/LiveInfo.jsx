import React from "react";

import { func, shape } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import setFieldData from "final-form-set-field-data";
import { Trans } from "i18n";

import { useT } from "utils/hooks";

import { FormInput, AutoSave } from "components";
import { MobilePreview } from "components/Onboarding";

import {
  Content,
  Wrapper,
  Title,
  Header,
  Info,
  InfoWrapper,
  InputWrapper,
  FormWrapper,
  FieldLabel,
  Optional
} from "./styled";

const LiveInfo = ({ values: initialValues, handleSubmit }) => {
  const t = useT(["liveInfo", "app"]);

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
          />
          <Wrapper>
            <Title>{t("header")}</Title>
            <Content>
              <InfoWrapper minWidth="800px" height="550px">
                <FieldLabel>
                  <Header>
                    {t("liveInfoLabel")}
                    <Optional>{t("basicInformation:optional")}</Optional>
                  </Header>
                </FieldLabel>
                <Info>
                  <Trans t={t} i18nKey="liveInfoHint" components={[<br />]} />
                </Info>
                <InputWrapper>
                  <FormInput
                    name="liveInfo"
                    label={t("liveInfoLabel")}
                    placeholder={t("liveInfoPlaceholder")}
                  />
                </InputWrapper>
              </InfoWrapper>
              <MobilePreview {...initialValues} />
            </Content>
          </Wrapper>
        </FormWrapper>
      )}
    />
  );
};

LiveInfo.propTypes = {
  values: shape().isRequired,
  handleSubmit: func.isRequired
};

export default LiveInfo;
