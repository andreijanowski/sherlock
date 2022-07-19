import React, { cloneElement, useState } from "react";
import { Modal, WhenFieldChanges } from "components";
import Cookies from "js-cookie";
import { useT } from "utils/hooks";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import Bar from "components/Dashboard/progressBar";
import { Form as FinalForm } from "react-final-form";
import { STEP, CLOSE, getContent } from "components/Onboarding/utils";
import { ModalStyles, BottomNavigation, Form } from "./styled";

const OnboardingModal = () => {
  const t = useT("onboarding");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [hasHintOpen, setHasHintOpen] = useState(true);

  const [currentStep, setCurrentStep] = useState(getContent(t)[STEP.INTRO]);

  const onClose = () => {
    setIsModalOpen(false);
    Cookies.remove("Onboarding");
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
      <Modal
        open={isModalOpen}
        onClose={onClose}
        btnCancelText={t("forms:cancel")}
      >
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
              {cloneElement(
                currentStep.component,
                { values, hasHintOpen, setHasHintOpen },
                null
              )}
            </Form>
          )}
        />
        <BottomNavigation>
          <Bar
            color="midnightblue"
            width={currentStep.progress || "0"}
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
