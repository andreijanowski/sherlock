import { isEmail as isValidEmail, isInt, isNumeric } from "validator";

export const composeValidators = (...validators) => (...values) =>
  validators.reduce(
    (error, validator) => error || validator(...values),
    undefined
  );

export const required = t => value =>
  value ? undefined : t("forms:validation.error.required");

export const requiredProperty = (t, property) => value =>
  value && value[property] ? undefined : t("forms:validation.error.required");

export const maxLength = (t, length) => value =>
  value && value.length > length
    ? t("forms:validation.error.maxLength", { length })
    : undefined;

export const validateLength = (t, min, max) => value =>
  value && (value.length > max || value.length < min)
    ? t("forms:validation.error.length", { min, max })
    : undefined;

export const minPasswordLength = t => (value = "") =>
  value.length >= 8
    ? undefined
    : t("forms:validation.error.password", {
        length: 8
      });

export const validatePassword = t =>
  composeValidators(required(t), minPasswordLength(t));

export const isEmail = t => value =>
  value && !isValidEmail(value) ? t("forms:validation.error.email") : undefined;

export const isNumber = t => num =>
  isNumeric(String(num)) ? undefined : t("forms:validation.error.number");

export const isNotNegativeNumber = t =>
  composeValidators(isNumber(t), num =>
    num >= 0 ? undefined : t("forms:validation.error.nonNegative")
  );

export const isInteger = (t, options) => num =>
  isInt(String(num), options)
    ? undefined
    : t(
        options
          ? "forms:validation.error.integerWithOptions"
          : "forms:validation.error.integer",
        options
      );

export const isNotNegativeInt = t =>
  composeValidators(isInteger(t), isNotNegativeNumber(t));

export const validateEmail = t => composeValidators(required(t), isEmail(t));

export const validateTableName = t =>
  composeValidators(required(t), maxLength(t, 10));

export const validateFileExtensions = (t, extensions) => value => {
  if (!value) return undefined;
  const fileExt = value.name
    .split(".")
    .slice(-1)[0]
    .toLocaleLowerCase();
  return extensions.includes(`.${fileExt}`)
    ? undefined
    : t("forms:validation.error.invalid_files");
};
