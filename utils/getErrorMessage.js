import Notifications from "react-notification-system-redux";

const isInvalidStateTransitionError = error =>
  error.title &&
  error.title.startsWith &&
  error.title.startsWith("Cannot transition state via");

export const getErrorMessageKey = errors => ({
  message: isInvalidStateTransitionError(errors[0])
    ? `forms:validation.error.server_error-Cannot transition state via`
    : `forms:validation.error.${errors[0].code}-${errors[0].title}`,
  meta: errors[0].meta
});

export const getValidMessageKey = (errors, code) => {
  const validErrors = errors.filter(e => e.code === code);
  if (validErrors.length) {
    return getErrorMessageKey(validErrors);
  }
  return null;
};

export default errors => {
  let translatedMessage = { message: "Error" };
  if (errors.length) {
    translatedMessage = getErrorMessageKey(errors);
  }

  return Notifications.error(translatedMessage);
};
