import React, { cloneElement, useState } from "react";
import { Modal, parsePeriods } from "components";
import { func, string, shape } from "prop-types";
// import Cookies from "js-cookie";
import { useT } from "utils/hooks";
import { connect } from "react-redux";

import { postBusiness, patchBusiness } from "actions/businesses";
import { fetchProfileBusiness } from "actions/users";
import { setCurrentBusiness } from "actions/app";

import {
  getInitialValues,
  getGroupsValues,
  isSelectValueChanged
} from "sections/profile/basicInformation/utils";
import { getInitialValues as getImagesValues } from "sections/profile/picturesAndMenus/utils";

import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import Bar from "components/Dashboard/progressBar";
import { STEP, CLOSE, getContent } from "components/Onboarding/utils";
import { addProtocol } from "utils/urls";
import { ModalStyles, BottomNavigation } from "./styled";

const OnboardingModal = ({
  business,
  businessId,
  businessGroups,
  updateBusiness,
  businessOpenPeriods,
  businessMenus,
  businessPictures,
  businessProducts
}) => {
  const t = useT("onboarding");

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [hasHintOpen, setHasHintOpen] = useState(true);

  // const [currentStep, setCurrentStep] = useState(getContent(t)[STEP.INTRO]);
  const [currentStep, setCurrentStep] = useState(
    getContent(t)[STEP.SECRET_CODE]
  );

  const onClose = () => {
    setIsModalOpen(false);
    // Cookies.remove("Onboarding");
  };

  const handleNextClick = () =>
    currentStep.nextStep === CLOSE
      ? onClose()
      : setCurrentStep(getContent(t)[currentStep.nextStep]);

  const handlePrevClick = () =>
    setCurrentStep(getContent(t)[currentStep.prevStep]);

  const handleSubmit = (
    {
      name,
      tagline,
      country,
      region,
      street,
      streetNumber,
      city,
      postCode,
      ownerRole,
      bio,
      email,
      phone,
      phoneCountry,
      secretCode,
      website,
      facebook,
      instagram,
      youtube
    },
    { types, cuisines, foodsAndDrinks, quirks, diets, michelinStars },
    { country: countryValue, region: regionValue }
  ) => {
    const sendGroupsList =
      !name &&
      !tagline &&
      !(country && country.value) &&
      !(region && region.value) &&
      !street &&
      !streetNumber &&
      !city &&
      !postCode &&
      !ownerRole &&
      !bio;

    const requestValues = {
      name,
      tagline,
      countryCode: isSelectValueChanged(country, countryValue)
        ? country.value
        : undefined,
      regionCode: isSelectValueChanged(region, regionValue)
        ? region.value
        : undefined,
      street,
      streetNumber,
      city,
      postCode,
      groupsList: sendGroupsList
        ? getGroupsValues([
            ...types.slice(0, 3),
            ...cuisines.slice(0, 5),
            ...foodsAndDrinks.slice(0, 6),
            ...quirks.slice(0, 10),
            ...diets,
            ...michelinStars.slice(0, 1)
          ])
        : undefined,
      ownerRole,
      bio,
      email,
      phone,
      phoneCountryPrefix:
        phoneCountry && phoneCountry.value
          ? phoneCountry.value.prefix
          : undefined,
      phoneCountryCode:
        phoneCountry && phoneCountry.value
          ? phoneCountry.value.code
          : undefined,
      secretCode,
      website: addProtocol(website),
      facebook: addProtocol(facebook),
      instagram: addProtocol(instagram),
      youtube: addProtocol(youtube)
    };
    if (Object.values(requestValues).some(v => !!v)) {
      return updateBusiness(businessId, requestValues, true);
    }
    return null;
  };

  const initialPeriods = businessOpenPeriods
    ? parsePeriods(businessOpenPeriods)
    : {};

  console.log("INITIAL_PERIODS", initialPeriods);

  const initialValues = business && {
    ...getInitialValues({ business, businessGroups }),
    periods: initialPeriods,
    ...getImagesValues({
      business,
      businessMenus,
      businessPictures,
      businessProducts
    })
  };

  console.log(initialValues);

  return (
    <>
      <ModalStyles />
      <Modal
        open={isModalOpen}
        onClose={onClose}
        btnCancelText={t("forms:cancel")}
      >
        {cloneElement(
          currentStep.component,
          {
            values: initialValues,
            hasHintOpen,
            setHasHintOpen,
            handleSubmit,
            businessId
          },
          null
        )}
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
              variant={BUTTON_VARIANT.NAKED}
            >
              {currentStep.prevButtonText}
            </Button>
          )}
          <Button
            onClick={handleNextClick}
            withArrow
            type="submit"
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
  updateBusiness: func.isRequired,
  businessOpenPeriods: shape(),
  businessMenus: shape(),
  businessPictures: shape(),
  businessProducts: shape()
};

OnboardingModal.defaultProps = {
  business: null,
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
      businessMenus: businessData && businessData.get("menus"),
      businessPictures: businessData && businessData.get("pictures"),
      businessProducts: businessData && businessData.get("products"),
      businessOpenPeriods: businessData && businessData.get("openPeriods")
    };
  },
  {
    updateBusiness: patchBusiness,
    changeCurrentBusiness: setCurrentBusiness,
    addBusiness: postBusiness,
    getProfileBusiness: fetchProfileBusiness
  }
)(OnboardingModal);
