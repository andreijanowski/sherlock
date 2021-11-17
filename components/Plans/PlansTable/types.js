import { shape, string, bool, func, arrayOf } from "prop-types";

export const columnShape = shape({
  isAvailable: bool,
  label: string,
  renderHint: func
});

export const rowShape = shape({
  icon: func.isRequired,
  label: string.isRequired,
  columns: arrayOf(columnShape).isRequired,
  href: string,
  renderHint: func,
  onClick: func,
  isComingSoon: bool
});

export const sectionShape = shape({
  id: string.isRequired,
  rows: arrayOf(rowShape).isRequired,
  link: shape({
    label: string.isRequired
  })
});

export const tablePartShape = shape({
  heading: string.isRequired,
  sections: arrayOf(sectionShape).isRequired
});

export const configShape = arrayOf(tablePartShape);
