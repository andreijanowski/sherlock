import { isEmail as isValidEmail, isInt, isNumeric } from "validator";
import { formValidation } from "consts";

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
  value.length >= formValidation.MINIMUM_PASSWORD_LENGTH
    ? undefined
    : t("forms:validation.error.password", {
        length: formValidation.MINIMUM_PASSWORD_LENGTH
      });

export const isEmail = t => value =>
  value && !isValidEmail(value) ? t("forms:validation.error.email") : undefined;

export const isNumber = t => num =>
  isNumeric(String(num)) ? undefined : t("forms:validation.error.number");

export const isNotNegativeNumber = t =>
  composeValidators(isNumber(t), num =>
    num >= 0 ? undefined : t("forms:validation.error.nonNegative")
  );

export const isInteger = t => num =>
  isInt(String(num)) ? undefined : t("forms:validation.error.integer");

export const isNotNegativeInt = t =>
  composeValidators(isInteger(t), isNotNegativeNumber(t));

export const validateEmail = t => composeValidators(required(t), isEmail(t));

export const validatePassword = t =>
  composeValidators(required(t), minPasswordLength(t));

export const validatePasswordsMatch = t => (
  passwordConfirmation,
  { password }
) => {
  if (!passwordConfirmation) return t("forms:validation.error.required");
  if (passwordConfirmation !== password)
    return t("forms:validation.error.passwordMatch");

  if (passwordConfirmation.length < formValidation.MINIMUM_PASSWORD_LENGTH)
    return t("forms:validation.error.password", {
      length: formValidation.MINIMUM_PASSWORD_LENGTH
    });

  return undefined;
};
