import React from "react";
import { H2 } from "components";
import { func, oneOfType, shape, any } from "prop-types";
import { FeaturesWrapper } from "./styled";
import { LandingWrapper } from "../sharedStyled";

const DevelopersAndApi = ({ t, developersAndApiRef }) => (
  <FeaturesWrapper>
    <LandingWrapper>
      <H2 ref={developersAndApiRef} white>
        {t("developersAndApi.header")}
      </H2>
    </LandingWrapper>
  </FeaturesWrapper>
);

DevelopersAndApi.propTypes = {
  t: func.isRequired,
  developersAndApiRef: oneOfType([func, shape({ current: any })]).isRequired
};

export default DevelopersAndApi;
