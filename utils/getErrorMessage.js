import Notifications from "react-notification-system-redux";

export default errors => {
  let translatedMessage = { message: "Error" };
  if (errors.length) {
    translatedMessage = {
      message: `errors.${errors[0].code}.${errors[0].title}`,
      meta: errors[0].meta
    };
  }

  return Notifications.error(translatedMessage);
};
