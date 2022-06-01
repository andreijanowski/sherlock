import { IntroStep, Step1 } from "components/Onboarding";

export const CLOSE = "close";
export const STEP = {
  INTRO: "intro",
  FIRST: "first"
};

export const getContent = t => ({
  [STEP.INTRO]: {
    component: <IntroStep />,
    nextStep: STEP.FIRST,
    buttonText: t("intro.letsgo")
  },
  [STEP.FIRST]: {
    component: <Step1 />,
    nextStep: CLOSE,
    buttonText: t("intro.next")
  }
});
