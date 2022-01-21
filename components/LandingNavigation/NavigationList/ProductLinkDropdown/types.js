import { string, shape, arrayOf, func } from "prop-types";

export const linkShape = shape({
  title: string.isRequired,
  description: string.isRequired,
  icon: func.isRequired,
  href: string,
  status: string
});

export const linksGroupShape = shape({
  title: string.isRequired,
  items: arrayOf(linkShape).isRequired
});
