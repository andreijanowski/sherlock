import { isEmail as isValidEmail } from "validator";

export const composeValidators = (...validators) => (...values) =>
  validators.reduce(
    (error, validator) => error || validator(...values),
    undefined
  );

export const required = t => value =>
  value ? undefined : t("forms:validation.error.required");

export const maxLength = (t, length) => value =>
  value && value.length > length
    ? t("forms:validation.error.maxLength", { length })
    : undefined;

export const isEmail = t => value =>
  value && !isValidEmail(value) ? t("forms:validation.error.email") : undefined;

export const validateEmail = t => composeValidators(required(t), isEmail(t));
