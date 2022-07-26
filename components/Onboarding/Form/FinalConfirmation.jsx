import React from "react";

import { Trans } from "i18n";

import { useT } from "utils/hooks";
import {
  Content,
  Center,
  Wrapper,
  Info,
  InfoWrapper,
  FormWrapper
} from "./styled";
import { Blue, Image } from "../Intro/styled";

const FinalConfirmation = () => {
  const t = useT("onboarding");

  return (
    <FormWrapper>
      <Wrapper>
        <Content>
          <InfoWrapper>
            <Info fs="48px" fw="600" black align="center">
              <Trans
                t={t}
                i18nKey="confirmation.header"
                components={[<Blue />]}
              />
            </Info>
            <Info fw="400" align="center" lh="25px">
              <Trans
                t={t}
                i18nKey="confirmation.subheader"
                components={[<Blue />, <br />]}
              />
            </Info>
            <Center>
              <Image
                src="/static/img/onboarding/finalStep.svg"
                margin="32px auto 8px"
              />
            </Center>
          </InfoWrapper>
        </Content>
      </Wrapper>
    </FormWrapper>
  );
};

export default FinalConfirmation;
