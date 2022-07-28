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
  Hint,
  Info,
  InfoWrapper,
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
      subscription={{ values: true, form: true }}
      render={({ values, form: { mutators } }) => (
        <FormWrapper>
          <AutoSave
            setFieldData={mutators.setFieldData}
            save={handleSubmit}
            t={t}
            hasHiddenMessages
          />
          <Wrapper>
            <Title>{t("header")}</Title>
            <Content>
              <InfoWrapper minWidth="800px" height="570px">
                <FieldLabel>
                  <Header>
                    {t("liveInfoLabel")}
                    <Optional>{t("basicInformation:optional")}</Optional>
                  </Header>
                </FieldLabel>
                <Info>
                  <Trans t={t} i18nKey="liveInfoHint" components={[<br />]} />
                </Info>
                <FormInput
                  name="liveInfo"
                  label={t("liveInfoLabel")}
                  placeholder={t("liveInfoPlaceholder")}
                />
                {!values.liveInfo && (
                  <Hint>
                    <Info fs="16px" fw="600" margin="0 0 9px">
                      {t("hints.0")}
                    </Info>
                    {[...Array(4)].map(el => (
                      <Info fs="14px" key={el} margin="18px 0 0">
                        {t(`hints.${el}`)}
                      </Info>
                    ))}
                  </Hint>
                )}
              </InfoWrapper>
              <MobilePreview {...values} />
            </Content>
          </Wrapper>
        </FormWrapper>
      )}
    />
  );
};

LiveInfo.propTypes = {
  values: shape(),
  handleSubmit: func
};

LiveInfo.defaultProps = {
  values: null,
  handleSubmit: null
};

export default LiveInfo;
