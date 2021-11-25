import { shape, string, arrayOf, oneOfType } from "prop-types";

export const linkShape = shape({
  label: string.isRequired,
  href: string.isRequired
});

export const linksGroupShape = shape({
  label: string,
  items: arrayOf(linkShape).isRequired
});

export const nestedLinkShape = shape({
  label: string.isRequired,
  baseHref: string.isRequired,
  groups: arrayOf(linksGroupShape).isRequired
});

export const mixedLinkShape = oneOfType([linkShape, nestedLinkShape]);

export const configShape = arrayOf(mixedLinkShape);
