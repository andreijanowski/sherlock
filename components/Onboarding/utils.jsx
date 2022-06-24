import {
  IntroStep,
  Step1,
  BasicInfo,
  OpeningHours,
  ImagesMenus
} from "components/Onboarding";

export const CLOSE = "close";
export const STEP = {
  INTRO: "intro",
  FIRST: "first",
  BASIC_INFO: "basic_info",
  OPENING_HOURS: "opening_hours",
  IMAGES_MENUS: "images_menus"
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
    prevButtonText: "Previous"
  },
  [STEP.OPENING_HOURS]: {
    component: <OpeningHours />,
    nextStep: STEP.IMAGES_MENUS,
    buttonText: t("intro.next"),
    progress: 20,
    prevStep: STEP.BASIC_INFO,
    prevButtonText: "Previous"
  },
  [STEP.IMAGES_MENUS]: {
    component: <ImagesMenus />,
    nextStep: STEP.BASIC_INFO,
    buttonText: t("intro.next"),
    progress: 30,
    prevStep: STEP.BASIC_INFO,
    prevButtonText: "Previous"
  }
});
