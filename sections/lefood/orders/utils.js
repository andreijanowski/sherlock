export const getElementLabel = ({ element, nameAttribute }) =>
  `${element.getIn(["attributes", "units"])}x ${element.getIn([
    "attributes",
    nameAttribute
  ])}`;
