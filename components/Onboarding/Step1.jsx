import React from "react";
import { func } from "prop-types";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import { STEP } from "components/Onboarding/utils";

const Step1 = ({ handleNextStep }) => (
  <div>
    STEP 1
    <Button
      onClick={() => handleNextStep(STEP.FIRST)}
      styleName="popup"
      withArrow
      variant={BUTTON_VARIANT.GRADIENT}
    >
      Next
    </Button>
  </div>
);

Step1.propTypes = {
  handleNextStep: func.isRequired
};

export default Step1;
