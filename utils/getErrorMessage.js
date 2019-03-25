import Notifications from "react-notification-system-redux";

const isInvalidStateTransitionError = error =>
  error.title &&
  error.title.startsWith &&
  error.title.startsWith("Cannot transition state via");

const generateErrorMassageKey = error =>
  isInvalidStateTransitionError(error)
    ? `forms:validation.error.server_error-Cannot transition state via`
    : `forms:validation.error.${error.code}-${error.title}`;

export default errors => {
  let translatedMessage = { message: "Error" };
  if (errors.length) {
    translatedMessage = {
      message: generateErrorMassageKey(errors[0]),
      meta: errors[0].meta
    };
  }

  return Notifications.error(translatedMessage);
};
