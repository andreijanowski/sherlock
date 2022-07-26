import React from "react";

import { func, shape } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import setFieldData from "final-form-set-field-data";
import { Trans } from "i18n";

import { useT } from "utils/hooks";

import { MobilePreview } from "components/Onboarding";

import {
  Content,
  Center,
  Wrapper,
  Title,
  Info,
  InfoWrapper,
  FormWrapper
} from "./styled";
import { Blue, Image } from "../Intro/styled";

const LookingGood = ({ values: initialValues, handleSubmit }) => {
  const t = useT(["onboarding"]);

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      mutators={{ setFieldData }}
      subscription={{
        form: true
      }}
      render={() => (
        <FormWrapper>
          <Wrapper>
            <Title>{t("lookingGood.header")}</Title>
            <Content>
              <InfoWrapper minWidth="800px" height="550px">
                <b>
                  <Info fs="24px" fw="700">
                    <Trans
                      t={t}
                      i18nKey="lookingGood.subheader"
                      components={[<Blue />]}
                    />
                  </Info>
                </b>
                <Info>
                  <Trans
                    t={t}
                    i18nKey="lookingGood.hint"
                    components={[<br />]}
                  />
                </Info>
                <Center>
                  <Image
                    src="/static/img/onboarding/lookingGood.svg"
                    margin="32px auto 8px"
                  />
                </Center>
              </InfoWrapper>
              <MobilePreview {...initialValues} />
            </Content>
          </Wrapper>
        </FormWrapper>
      )}
    />
  );
};

LookingGood.propTypes = {
  values: shape().isRequired,
  handleSubmit: func.isRequired
};

export default LookingGood;
