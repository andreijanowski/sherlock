export const STEPS = {
  CONNECT: "connect",
  MANAGE: "manage",
  ANALYZE: "analyze"
};

export const STEPS_ARRAY = [STEPS.CONNECT, STEPS.MANAGE, STEPS.ANALYZE];

export const getStepImageWidth = step => {
  switch (step) {
    case STEPS.CONNECT:
      return 158;
    case STEPS.MANAGE:
      return 186;
    case STEPS.ANALYZE:
      return 284;

    default:
      return "auto";
  }
};
