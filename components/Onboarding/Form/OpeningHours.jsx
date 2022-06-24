import React from "react";

import { useT } from "utils/hooks";
import { Periods } from "components";
import { Content, Wrapper, Title, InfoWrapper, PreviewWrapper } from "./styled";

const OpeningHours = () => {
  const t = useT("onboarding");

  const addPeriod = openPeriod => {
    console.log(openPeriod);
  };

  const updatePeriod = openPeriod => {
    console.log(openPeriod);
  };

  const removePeriod = id => {
    console.log(id);
  };

  return (
    <Wrapper>
      <Title>{t("app:manageProfile.openingHours")}</Title>
      <Content>
        <InfoWrapper>
          <Periods
            {...{
              t,
              isLocationVisible: true,
              initialValues: {},
              addPeriod,
              updatePeriod,
              removePeriod,
              currentPage: "openingHours"
            }}
          />
        </InfoWrapper>
        <PreviewWrapper>
          <div>.</div>
        </PreviewWrapper>
      </Content>
    </Wrapper>
  );
};

export default OpeningHours;
