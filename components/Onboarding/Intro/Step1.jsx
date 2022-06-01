import React from "react";
import { useT } from "utils/hooks";
import { Header, Wrapper } from "./styled";

const Step1 = () => {
  const t = useT("onboarding");

  return (
    <Wrapper>
      <Header>{t("step1.header")}</Header>
      STEP 1
    </Wrapper>
  );
};

export default Step1;
