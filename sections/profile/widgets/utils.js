export const getInitialValues = ({ editedWidgetId, widgets }) => {
  if (editedWidgetId && widgets && widgets.get(editedWidgetId)) {
    return {
      initialValues: {
        domains: widgets
          .getIn([editedWidgetId, "attributes", "domains"])
          .toArray()
          .toString()
      },
      apiKey: widgets.getIn([editedWidgetId, "attributes", "apiKey"])
    };
  }
  return { initialValues: {}, apiKey: "" };
};
