import React from "react";
import { func } from "prop-types";
import { Box } from "@rebass/grid";

import { LoadingIndicator } from "components";
import { LoadingIndicatorWrapper, VerifyHeading } from "./styled";

const VerifyStepLoader = ({ t }) => (
  <Box width={1}>
    <LoadingIndicatorWrapper>
      <LoadingIndicator size={40} />
    </LoadingIndicatorWrapper>
    <VerifyHeading>{t("lefood:import.verifying")}</VerifyHeading>
  </Box>
);

VerifyStepLoader.propTypes = {
  t: func.isRequired
};

export default VerifyStepLoader;
