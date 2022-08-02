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
              <InfoWrapper minWidth="800px" height="570px">
                <Info fs="24px" fw="700" black>
                  <Trans
                    t={t}
                    i18nKey="lookingGood.subheader"
                    components={[<Blue />]}
                  />
                </Info>
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
  values: shape(),
  handleSubmit: func
};

LookingGood.defaultProps = {
  values: null,
  handleSubmit: null
};

export default LookingGood;
