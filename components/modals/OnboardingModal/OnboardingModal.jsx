import React, { useState } from "react";
import { Modal } from "components";
import { useT } from "utils/hooks";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import { STEP, CLOSE, getContent } from "components/Onboarding/utils";
import { ModalStyles, BottomNavigation } from "./styled";

const OnboardingModal = () => {
  const t = useT("onboarding");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(getContent(t)[STEP.INTRO]);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleNextClick = () =>
    currentStep.nextStep === CLOSE
      ? onClose()
      : setCurrentStep(getContent(t)[currentStep.nextStep]);

  return (
    <>
      <ModalStyles />
      <Modal open={isModalOpen} onClose={() => null}>
        {currentStep.component}
        <BottomNavigation>
          <Button
            onClick={handleNextClick}
            styleName="popup"
            withArrow
            variant={BUTTON_VARIANT.GRADIENT}
          >
            {currentStep.buttonText}
          </Button>
        </BottomNavigation>
      </Modal>
    </>
  );
};

export default OnboardingModal;
