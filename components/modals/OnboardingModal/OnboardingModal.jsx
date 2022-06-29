import React, { cloneElement, useState } from "react";
import { Modal, WhenFieldChanges } from "components";
// import Cookies from "js-cookie";
import { useT } from "utils/hooks";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import ProgressBar from "components/Dashboard/progressBar";
import { Form as FinalForm } from "react-final-form";
import { STEP, CLOSE, getContent } from "components/Onboarding/utils";
import { ModalStyles, BottomNavigation, Form } from "./styled";

const OnboardingModal = () => {
  const t = useT("onboarding");
  const [isModalOpen, setIsModalOpen] = useState(true);
  // remove comment
  const [currentStep, setCurrentStep] = useState(
    getContent(t)[STEP.BASIC_INFO]
  );

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

  const handleSubmit = values => console.log(values);

  return (
    <>
      <ModalStyles />
      <Modal open={isModalOpen} onClose={onClose}>
        <FinalForm
          onSubmit={handleSubmit}
          subscription={{ values: true, form: true }}
          render={({ values }) => (
            <Form>
              <WhenFieldChanges
                field="country"
                set="region"
                to={undefined}
                shouldChange={
                  values.region &&
                  values.region.value &&
                  values.country &&
                  values.country.value &&
                  !values.region.value.includes(values.country.value)
                }
              />
              {cloneElement(currentStep.component, { values }, null)}
            </Form>
          )}
        />
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
