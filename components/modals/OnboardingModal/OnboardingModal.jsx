import React, { cloneElement, useState } from "react";
import { shape, string } from "prop-types";
import { Modal, parsePeriods } from "components";
import { connect } from "react-redux";
// import Cookies from "js-cookie";
import { useT } from "utils/hooks";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import ProgressBar from "components/Dashboard/progressBar";
import { STEP, CLOSE, getContent } from "components/Onboarding/utils";
import { getInitialValues as getBasicValues } from "sections/profile/basicInformation/utils";
import { getInitialValues } from "sections/profile/picturesAndMenus/utils";
import { ModalStyles, BottomNavigation } from "./styled";

const OnboardingModal = ({
  business,
  businessId,
  businessGroups,
  businessOpenPeriods,
  businessMenus,
  businessPictures,
  businessProducts
}) => {
  const t = useT("onboarding");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [hasHintOpen, setHasHintOpen] = useState(true);
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

  const initialValues = business && {
    ...getBasicValues({ business, businessGroups }),
    ...parsePeriods(businessOpenPeriods),
    ...getInitialValues(
      business,
      businessMenus,
      businessPictures,
      businessProducts
    )
  };

  console.log("INITIALS", initialValues);

  return (
    <>
      <ModalStyles />
      <Modal open={isModalOpen} onClose={onClose}>
        {cloneElement(
          currentStep.component,
          {
            values: initialValues,
            business,
            businessId,
            hasHintOpen,
            setHasHintOpen
          },
          null
        )}
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

OnboardingModal.propTypes = {
  business: shape(),
  businessId: string,
  businessGroups: shape(),
  businessOpenPeriods: shape(),
  businessMenus: shape(),
  businessPictures: shape(),
  businessProducts: shape()
};

OnboardingModal.defaultProps = {
  business: {},
  businessId: "",
  businessGroups: null,
  businessOpenPeriods: null,
  businessMenus: null,
  businessPictures: null,
  businessProducts: null
};

export default connect(
  state => {
    const businessData = state.getIn(["users", "currentBusiness", "data"]);
    const business =
      businessData &&
      businessData.get("businesses") &&
      businessData.get("businesses").first();
    return {
      business: business && business.get("attributes"),
      businessId: business && business.get("id"),
      businessGroups: businessData && businessData.get("groups"),
      businessOpenPeriods: businessData && businessData.get("openPeriods"),
      businessMenus: businessData && businessData.get("menus"),
      businessPictures: businessData && businessData.get("pictures"),
      businessProducts: businessData && businessData.get("products")
    };
  },
  null
)(OnboardingModal);
