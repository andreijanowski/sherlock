export const getInitialValues = ({ editedWidgetId, widgets }) => {
  if (editedWidgetId && widgets) {
    return widgets.get(editedWidgetId);
  }
  return {};
};
