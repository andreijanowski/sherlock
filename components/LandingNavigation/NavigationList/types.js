import { shape, string, arrayOf, oneOfType, bool, func } from "prop-types";

export const linkShape = shape({
  label: string.isRequired,
  href: string.isRequired,
  isDisabled: bool
});

export const nestedLinkShape = shape({
  label: string.isRequired,
  component: func,
  items: arrayOf(linkShape)
});

export const mixedLinkShape = oneOfType([linkShape, nestedLinkShape]);

export const configShape = arrayOf(mixedLinkShape);
