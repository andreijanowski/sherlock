import { isEmail as isValidEmail } from "validator";
import { formValidation } from "consts";

export const composeValidators = (...validators) => (...values) =>
  validators.reduce(
    (error, validator) => error || validator(...values),
    undefined
  );

export const required = t => value =>
  value ? undefined : t("forms:validation.error.required");

export const minPasswordLength = t => (value = "") =>
  value.length >= formValidation.MINIMUM_PASSWORD_LENGTH
    ? undefined
    : t("forms:validation.error.password", {
        length: formValidation.MINIMUM_PASSWORD_LENGTH
      });

export const isEmail = t => value =>
  value && !isValidEmail(value) ? t("forms:validation.error.email") : undefined;

export const validateEmail = t => composeValidators(required(t), isEmail(t));

export const validatePassword = t =>
  composeValidators(required(t), minPasswordLength(t));
