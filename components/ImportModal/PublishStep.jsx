import React from "react";
import { func, shape } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { withTheme } from "styled-components";
import { Box } from "@rebass/grid";

import { StepWrapper, PublishHeading } from "./styled";

const PublishStep = ({ t, theme }) => (
  <StepWrapper isCentered>
    <Box mb={5}>
      <PublishHeading>{t("lefood:import.success")}</PublishHeading>
    </Box>
    <FontAwesomeIcon
      size="8x"
      icon={faCheck}
      color={`rgb(${theme.colors.blue})`}
    />
  </StepWrapper>
);

PublishStep.propTypes = {
  t: func.isRequired,
  theme: shape().isRequired
};

export default withTheme(PublishStep);
