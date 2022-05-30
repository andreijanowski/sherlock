import React, { useState, useEffect } from "react";
import { Modal } from "components";
import { STEP } from "components/Onboarding/utils";
import { IntroStep, Step1 } from "components/Onboarding";
import { ModalStyles } from "./styled";

const OnboardingModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(STEP.INTRO);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const content = {
    [STEP.INTRO]: <IntroStep handleNextStep={setCurrentStep} />,
    [STEP.FIRST]: <Step1 handleNextStep={setCurrentStep} />
  };

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <ModalStyles />
      <Modal open={isModalOpen} onClose={onClose}>
        {content[currentStep]}
      </Modal>
    </>
  );
};

export default OnboardingModal;
