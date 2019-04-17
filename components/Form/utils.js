import { colors } from "utils/theme";

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

export const TimekeeperConfig = {
  // main container
  TIMEPICKER_BACKGROUND: `rgb(${colors.white})`,
  FONT_FAMILY: '"Inter UI", sans-serif',
  DONE_BUTTON_COLOR: `rgb(${colors.dark})`,
  DONE_BUTTON_BORDER_COLOR: `rgb(${colors.snuff})`,

  // time
  TIME_BACKGROUND: `rgb(${colors.white})`,
  TIME_DEFAULT_COLOR: `rgb(${colors.dark})`,
  TIME_SELECTED_COLOR: `rgb(${colors.blue})`,

  // time dropdown
  DROPDOWN_BORDER: `rgb(${colors.snuff})`,
  DROPDOWN_COLOR: `rgb(${colors.dark})`,
  DROPDOWN_SELECTED_COLOR: `rgb(${colors.background})`,

  // clock wrapper
  CLOCK_WRAPPER_BACKGROUND: `rgb(${colors.blue})`,
  CLOCK_WRAPPER_MERIDIEM_BACKGROUND: `rgb(${colors.white})`,
  CLOCK_WRAPPER_MERIDIEM_COLOR: `rgb(${colors.dark})`,
  CLOCK_WRAPPER_MERIDIEM_BACKGROUND_COLOR_SELECTED: `rgb(${colors.background})`,
  CLOCK_WRAPPER_MERIDIEM_TEXT_COLOR_SELECTED: `rgb(${colors.blue})`,

  // clock
  CLOCK_BACKGROUND: `rgb(${colors.white})`,
  CLOCK_NUMBER_COLOR: `rgb(${colors.dark})`,
  CLOCK_HAND_ARM: `rgb(${colors.snuff})`,
  CLOCK_HAND_CIRCLE_BACKGROUND: `rgb(${colors.snuff})`,
  CLOCK_HAND_INTERMEDIATE_CIRCLE_BACKGROUND: `rgb(${colors.snuff})`
};
