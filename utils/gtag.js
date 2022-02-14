export const handleGtagEvent = ({ event, action, to, cb }) => {
  if (!window.gtag) {
    if (cb) {
      cb();
    }
    return;
  }

  window.gtag(event, action, {
    send_to: to,
    ...(cb
      ? {
          event_callback: cb
        }
      : null)
  });
};
