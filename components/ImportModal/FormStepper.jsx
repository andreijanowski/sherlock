import React, { Fragment } from "react";
import { string, shape, func, arrayOf } from "prop-types";

import {
  FormStepperCircle,
  FormStepperItem,
  FormStepperLabel,
  FormStepperLine,
  FormStepperWrapper
} from "./styled";

const FormStepper = ({ t, step, steps }) => {
  const selectedStepIndex = steps.findIndex(({ id }) => id === step);

  return (
    <FormStepperWrapper
      justifyContent="center"
      alignItems="center"
      flexWrap="noWrap"
    >
      {steps.map((orderedStep, index, array) => {
        const isActive = index <= selectedStepIndex;
        const isNotLast = index < array.length - 1;
        return (
          <Fragment key={orderedStep.id}>
            <FormStepperItem flexDirection="column" alignItems="center">
              <FormStepperCircle isActive={isActive} />
              <FormStepperLabel isActive={isActive}>
                {t(orderedStep.label)}
              </FormStepperLabel>
            </FormStepperItem>
            {isNotLast && <FormStepperLine isActive={isActive} />}
          </Fragment>
        );
      })}
    </FormStepperWrapper>
  );
};

FormStepper.propTypes = {
  t: func.isRequired,
  step: string.isRequired,
  steps: arrayOf(
    shape({
      id: string.isRequired,
      label: string.isRequired
    })
  ).isRequired
};

export default FormStepper;
