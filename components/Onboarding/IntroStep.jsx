import React from "react";
import { func } from "prop-types";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import { STEP } from "components/Onboarding/utils";

const IntroStep = ({ handleNextStep }) => (
  <div>
    IntroStep
    <Button
      onClick={() => handleNextStep(STEP.FIRST)}
      styleName="popup"
      withArrow
      variant={BUTTON_VARIANT.GRADIENT}
    >
      Lets go!
    </Button>
  </div>
);

IntroStep.propTypes = {
  handleNextStep: func.isRequired
};

export default IntroStep;
