export const getInitialValues = ({ editedWidgetId, widgets }) => {
  if (editedWidgetId && widgets) {
    return {
      domains: widgets
        .getIn([editedWidgetId, "attributes", "domains"])
        .toArray()
    };
  }
  return {};
};
