import {
  IntroStep,
  Step1,
  BasicInfo,
  Description,
  OpeningHours,
  ImagesMenus,
  SecretCode,
  Tags,
  AdditionalInfo,
  RedirectionLinks,
  LiveInfo,
  LookingGood,
  FinalConfirmation
} from "components/Onboarding";
import { checkLength } from "utils/validators";

export const CLOSE = "close";
export const STEP = {
  INTRO: "intro",
  FIRST: "first",
  BASIC_INFO: "basic_info",
  OPENING_HOURS: "opening_hours",
  IMAGES_MENUS: "images_menus",
  SECRET_CODE: "secret_code",
  DESCRIPTION: "description",
  TAGS: "tags",
  ADDITIONAL_INFO: "additional_info",
  REDIRECTION_LINKS: "redirection_links",
  LIVE_INFO: "live_info",
  LOOKING_GOOD: "looking_good",
  CONFIRM: "confirm"
};

export const getContent = t => ({
  [STEP.INTRO]: {
    component: <IntroStep />,
    nextStep: STEP.FIRST,
    buttonText: t("intro.letsgo"),
    progress: 0
  },
  [STEP.FIRST]: {
    component: <Step1 />,
    nextStep: STEP.BASIC_INFO,
    buttonText: t("intro.next"),
    progress: 0
  },
  [STEP.BASIC_INFO]: {
    component: <BasicInfo />,
    nextStep: STEP.OPENING_HOURS,
    buttonText: t("intro.next"),
    progress: 10,
    prevStep: STEP.FIRST,
    prevButtonText: t("intro.previous")
  },
  [STEP.OPENING_HOURS]: {
    component: <OpeningHours />,
    nextStep: STEP.IMAGES_MENUS,
    buttonText: t("intro.next"),
    progress: 20,
    prevStep: STEP.BASIC_INFO,
    prevButtonText: t("intro.previous")
  },
  [STEP.IMAGES_MENUS]: {
    component: <ImagesMenus />,
    nextStep: STEP.SECRET_CODE,
    buttonText: t("intro.next"),
    progress: 30,
    prevStep: STEP.OPENING_HOURS,
    prevButtonText: t("intro.previous")
  },
  [STEP.SECRET_CODE]: {
    component: <SecretCode />,
    nextStep: STEP.DESCRIPTION,
    buttonText: t("intro.next"),
    progress: 40,
    prevStep: STEP.IMAGES_MENUS,
    prevButtonText: t("intro.previous")
  },
  [STEP.DESCRIPTION]: {
    component: <Description />,
    nextStep: STEP.TAGS,
    buttonText: t("intro.next"),
    progress: 50,
    prevStep: STEP.SECRET_CODE,
    prevButtonText: t("intro.previous")
  },
  [STEP.TAGS]: {
    component: <Tags />,
    nextStep: STEP.ADDITIONAL_INFO,
    buttonText: t("intro.next"),
    progress: 60,
    prevStep: STEP.DESCRIPTION,
    prevButtonText: t("intro.previous")
  },
  [STEP.ADDITIONAL_INFO]: {
    component: <AdditionalInfo />,
    nextStep: STEP.REDIRECTION_LINKS,
    buttonText: t("intro.next"),
    progress: 70,
    prevStep: STEP.TAGS,
    prevButtonText: t("intro.previous")
  },
  [STEP.REDIRECTION_LINKS]: {
    component: <RedirectionLinks />,
    nextStep: STEP.LIVE_INFO,
    buttonText: t("intro.next"),
    progress: 80,
    prevStep: STEP.ADDITIONAL_INFO,
    prevButtonText: t("intro.previous")
  },
  [STEP.LIVE_INFO]: {
    component: <LiveInfo />,
    nextStep: STEP.LOOKING_GOOD,
    buttonText: t("intro.next"),
    progress: 90,
    prevStep: STEP.REDIRECTION_LINKS,
    prevButtonText: t("intro.previous")
  },
  [STEP.LOOKING_GOOD]: {
    component: <LookingGood />,
    nextStep: STEP.CONFIRM,
    buttonText: t("intro.publish"),
    progress: 100,
    prevStep: STEP.LIVE_INFO,
    prevButtonText: t("intro.previous")
  },
  [STEP.CONFIRM]: {
    component: <FinalConfirmation />,
    nextStep: CLOSE,
    buttonText: t("confirmation.gotit"),
    progress: 0
  }
});

export const FORM_STATUS = {
  CLEAR: "clear",
  UNCLEAR: "unlcear"
};

export const checkValidFields = (values, step) => {
  switch (step) {
    case STEP.BASIC_INFO:
      return Boolean(
        values.name &&
          values.country &&
          values.street &&
          values.streetNumber &&
          values.city &&
          values.postCode &&
          values.email &&
          values.phoneCountry &&
          values.phone
      );
    case STEP.TAGS:
      return Boolean(
        checkLength(values.types, 1, 3) &&
          checkLength(values.cuisines, 1, 5) &&
          checkLength(values.foodsAndDrinks, 1, 6) &&
          checkLength(values.quirks, 3, 10)
      );
    default:
      return false;
  }
};
