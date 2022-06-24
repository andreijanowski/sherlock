import React, { useState } from "react";
import { Modal } from "components";
// import Cookies from "js-cookie";
import { useT } from "utils/hooks";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import ProgressBar from "components/Dashboard/progressBar";
import { STEP, CLOSE, getContent } from "components/Onboarding/utils";
import { ModalStyles, BottomNavigation } from "./styled";

const OnboardingModal = () => {
  const t = useT("onboarding");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(getContent(t)[STEP.INTRO]);

  const onClose = () => {
    setIsModalOpen(false);
    // remove comment
    // Cookies.remove("Onboarding");
  };

  const handleNextClick = () =>
    currentStep.nextStep === CLOSE
      ? onClose()
      : setCurrentStep(getContent(t)[currentStep.nextStep]);

  const handlePrevClick = () =>
    setCurrentStep(getContent(t)[currentStep.prevStep]);

  return (
    <>
      <ModalStyles />
      <Modal open={isModalOpen} onClose={onClose}>
        {currentStep.component}
        <BottomNavigation>
          <ProgressBar
            color="midnightblue"
            width={currentStep.progress}
            height="5px"
            radius="5px"
            bgcolor="#fff"
            wrapperStyles={{
              width: "calc(100% + 76px)",
              position: "absolute",
              top: "-10px"
            }}
          />
          {currentStep.prevButtonText && (
            <Button
              onClick={handlePrevClick}
              color="black"
              variant={BUTTON_VARIANT.OUTLINE}
            >
              {currentStep.prevButtonText}
            </Button>
          )}
          <Button
            onClick={handleNextClick}
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
