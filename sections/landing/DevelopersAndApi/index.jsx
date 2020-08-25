import React from "react";
import { H2 } from "components";
import { func, oneOfType, shape, any } from "prop-types";
import { DeveloperWrapper } from "./styled";
import { LandingWrapper } from "../sharedStyled";

const DevelopersAndApi = ({ t, developersAndApiRef }) => (
  <DeveloperWrapper>
    <LandingWrapper>
      <H2 ref={developersAndApiRef} white>
        {t("developersAndApi.header")}
      </H2>
    </LandingWrapper>
  </DeveloperWrapper>
);

DevelopersAndApi.propTypes = {
  t: func.isRequired,
  developersAndApiRef: oneOfType([func, shape({ current: any })]).isRequired
};

export default DevelopersAndApi;
