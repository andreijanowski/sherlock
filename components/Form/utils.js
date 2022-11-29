import moment from "moment";

import { validateTimeString } from "utils/validators";

export const getError = (meta, isErrorVisibilityRequired) =>
  isErrorVisibilityRequired
    ? meta.error || (meta.data && meta.data.error)
    : (meta.touched && meta.error) || (meta.data && meta.data.error);

export const getArraysDiff = (a = [], b = [], err) =>
  a.filter((ai, i) =>
    err && err[i]
      ? false
      : (b.map(bi => JSON.stringify(bi)) || []).indexOf(JSON.stringify(ai)) ===
        -1
  );

const partiallyTimeRegexp = /^\d\d\d$/;

const formatTimeDigits = units => String(units).padStart(2, "0");

export const formatTimeNumber = s => {
  // if we received non-number value from store, we dont need to parse it
  if (typeof s !== "number") return s;
  const duration = moment.duration(s, "seconds");
  return [
    formatTimeDigits(duration.get("hours")),
    formatTimeDigits(duration.get("minutes"))
  ].join(":");
};

export const formatPartialTimeString = s => {
  if (partiallyTimeRegexp.test(s)) {
    return s.slice(0, 2).concat(":").concat(s.slice(2));
  }
  return s;
};

export const parseTimeString = s => {
  // if no value or error validation error exists we dont want to
  // provide seconds data to form, so we will store there raw string value
  if (!s || validateTimeString(v => v)(s)) {
    return formatPartialTimeString(s);
  }
  const [hours, minutes] = s.split(":");
  return moment
    .duration({
      hours,
      minutes
    })
    .as("seconds");
};

export const getMenuFileName = fileName => fileName.split("/").slice(-1)[0];
