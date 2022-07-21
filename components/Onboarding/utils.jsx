import {
  IntroStep,
  Step1,
  BasicInfo,
  Description,
  OpeningHours,
  ImagesMenus,
  SecretCode,
  Tags
} from "components/Onboarding";

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
    nextStep: STEP.DESCRIPTION,
    buttonText: t("intro.next"),
    progress: 60,
    prevStep: STEP.DESCRIPTION,
    prevButtonText: t("intro.previous")
  },
  [STEP.ADDITIONAL_INFO]: {
    component: <div>Additional Info</div>,
    nextStep: STEP.REDIRECTION_LINKS,
    buttonText: t("intro.next"),
    progress: 70,
    prevStep: STEP.TAGS,
    prevButtonText: t("intro.previous")
  },
  [STEP.REDIRECTION_LINKS]: {
    component: <div>Redirection Links</div>,
    nextStep: STEP.LIVE_INFO,
    buttonText: t("intro.next"),
    progress: 80,
    prevStep: STEP.ADDITIONAL_INFO,
    prevButtonText: t("intro.previous")
  },
  [STEP.LIVE_INFO]: {
    component: <div>Live Info</div>,
    nextStep: STEP.LOOKING_GOOD,
    buttonText: t("intro.next"),
    progress: 90,
    prevStep: STEP.REDIRECTION_LINKS,
    prevButtonText: t("intro.previous")
  },
  [STEP.LOOKING_GOOD]: {
    component: <div>Looking Good</div>,
    nextStep: STEP.CONFIRM,
    buttonText: t("intro.next"),
    progress: 100,
    prevStep: STEP.ADDITIONAL_INFO,
    prevButtonText: t("intro.previous")
  },
  [STEP.CONFIRM]: {
    component: <div>Confirm</div>,
    buttonText: t("intro.next"),
    progress: 100,
    prevStep: STEP.LOOKING_GOOD,
    prevButtonText: t("intro.previous")
  }
});
