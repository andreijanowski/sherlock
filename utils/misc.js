const GRANTED_PERMISSION = "granted";

export const bytesToKB = sizeInBytes =>
  parseFloat((sizeInBytes / 1024).toFixed(2));

export const requestNotificationsPermission = async () => {
  console.log("asking notifications");
  const isNativeNotificationsAvailable = "Notification" in window;
  if (!isNativeNotificationsAvailable) {
    console.log("no notifications in window");
    return null;
  }

  console.log("notifications are in window, asking permissions...");
  return Notification.requestPermission();
};

export const showNativeNotification = async title => {
  console.log(`trying to show ${title} notification, asking permission...`);
  const permission = await requestNotificationsPermission();
  console.log(`permissions is ${permission}`);

  if (permission !== GRANTED_PERMISSION) {
    console.log(`permission is not granted for ${title}`);
    return;
  }

  console.log(`showing notification ${title}`);

  // we need to use new to trigger notifications
  // eslint-disable-next-line
  new Notification(title);
};
