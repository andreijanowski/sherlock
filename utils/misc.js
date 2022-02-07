const GRANTED_PERMISSION = "granted";

export const bytesToKB = sizeInBytes =>
  parseFloat((sizeInBytes / 1024).toFixed(2));

export const requestNotificationsPermission = async () => {
  const isNativeNotificationsAvailable = "Notification" in window;
  if (!isNativeNotificationsAvailable) {
    return null;
  }

  return Notification.requestPermission();
};

export const showNativeNotification = async title => {
  const permission = await requestNotificationsPermission();

  if (permission !== GRANTED_PERMISSION) {
    return;
  }

  // we need to use new to trigger notifications
  // eslint-disable-next-line
  new Notification(title);
};
