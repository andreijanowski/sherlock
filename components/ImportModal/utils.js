import { capitalize } from "lodash";

export const STEPS = {
  UPLOAD: "upload",
  VERIFY: "verify",
  PUBLISH: "publish"
};

export const ORDERED_STEPS = [
  { id: STEPS.UPLOAD, label: `import.steps.${STEPS.UPLOAD}` },
  { id: STEPS.VERIFY, label: `import.steps.${STEPS.VERIFY}` },
  { id: STEPS.PUBLISH, label: `import.steps.${STEPS.PUBLISH}` }
];

export const MODE = {
  ADD: "add",
  REPLACE: "replace"
};

export const ERROR = {
  MISSING_DATA: "missing_data",
  OTHER: "other"
};

export const extractErrorData = (errorData, index, t) => {
  const {
    meta: { code, column, row }
  } = errorData;

  return {
    index: index + 1,
    key: errorData.code,
    row,
    error: t(`lefood:import.row_error.${code}`, {
      column: capitalize(column),
      context: row === 1 ? "header" : ""
    })
  };
};
