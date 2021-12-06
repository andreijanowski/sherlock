import { shape, string, number, bool, arrayOf } from "prop-types";

export const partnerShape = shape({
  icon: string.isRequired,
  top: number.isRequired,
  left: number.isRequired,
  size: number.isRequired,
  isComingSoon: bool,
  cannotBeIntegrated: bool
});

export const partnersGroupShape = shape({
  label: string,
  partners: arrayOf(partnerShape).isRequired
});

export const sectionItemShape = shape({
  label: string.isRequired,
  id: string.isRequired,
  isComingSoon: bool,
  groups: arrayOf(partnersGroupShape).isRequired
});

export const configSectionShape = shape({
  label: string,
  id: string.isRequired,
  items: arrayOf(sectionItemShape).isRequired
});

export const configShape = arrayOf(configSectionShape);
