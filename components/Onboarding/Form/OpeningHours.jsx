import React from "react";
import { shape } from "prop-types";

import { useT } from "utils/hooks";
import { Periods } from "components";
import { MobilePreview } from "components/Onboarding";
import { Content, Wrapper, Title, InfoWrapper } from "./styled";

const OpeningHours = ({ values }) => {
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
        <MobilePreview {...values} />
      </Content>
    </Wrapper>
  );
};

OpeningHours.propTypes = {
  values: shape().isRequired
};

export default OpeningHours;
