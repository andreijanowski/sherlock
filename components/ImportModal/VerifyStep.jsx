import React from "react";
import { func, shape } from "prop-types";

import { StepWrapper } from "./styled";
import VerifyStepError from "./VerifyStepError";
import VerifyStepLoader from "./VerifyStepLoader";

const VerifyStep = ({ t, error, onUploadAgainClick }) => (
  <StepWrapper isCentered={!error}>
    {error ? (
      <VerifyStepError
        t={t}
        error={error}
        onUploadAgainClick={onUploadAgainClick}
      />
    ) : (
      <VerifyStepLoader t={t} />
    )}
  </StepWrapper>
);

VerifyStep.propTypes = {
  t: func.isRequired,
  onUploadAgainClick: func.isRequired,
  error: shape()
};

VerifyStep.defaultProps = {
  error: null
};

export default VerifyStep;
