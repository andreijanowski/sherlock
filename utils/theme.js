import * as _ from "lodash";

const breakpoints = ["40em", "52em", "64em", "75em"];
const breakpointsPx = ["575px", "767px", "992px", "1199px", "1399px"];

const DEFAULT_BODY_PIXEL_SIZE = 16;

const borderWeights = {
  tiny: "2px",
  normal: "3px"
};

export const colors = {
  dark: "42, 47, 56",
  blue: "76, 104, 255",
  darkBlue: "26, 31, 103",
  facebookBlue: "66, 103, 178",
  white: "255, 255, 255",
  background: "248, 249, 255",
  deepSkyBlue: "15, 177, 243",
  navyBlue: "15, 87, 243",
  hanPurple: "107, 15, 243",
  limeade: "90, 175, 51",
  abbey: "79, 83, 92",
  mischka: "165, 168, 175",
  brightGray: "61, 67, 78",
  snuff: "221, 223, 239",
  green: "3, 160, 79",
  bombay: "170, 172, 175",
  lavenderGray: "180, 184, 209",
  ruby: "222, 17, 84",
  carrotOrange: "243, 119, 15",
  iceBlue: "248, 249, 255",
  linkWaterDark: "228, 231, 248",
  linkWater: "235, 237, 251",
  linkWaterLight: "238, 239, 250",
  titanWhite: "251, 251, 255",
  rollingStone: "119, 122, 128",
  greenHaze: "3, 160, 79",
  ghostWhite: "238, 240, 255",
  purpleBlue: "69, 90, 248",
  greyBorder: "224, 224, 224",
  darkText: "51, 51, 51",
  bombayDark: "69, 71, 75",
  menuDarkBlue: "147, 164, 255",
  boxShadow: "189, 189, 189",
  darkGreyText: "79, 79, 79",
  lightGreyText: "170, 170, 170",
  detectivesBackgroundGrey: "242, 242, 242",
  lightBlue: "248, 249, 254",
  importGray: "157, 157, 156",
  error: "235, 87, 87",
  violet: "55, 81, 255",
  black: "0, 0, 0",
  pink: "243, 129, 118",
  textDarkBlue: "13, 18, 73",
  tableBorder: "234, 229, 229",
  plansCaptionBlue: "83, 121, 247",
  buttonSecondary: "78, 77, 102",
  landingDarkBlue: "15, 17, 59",
  blackDark: "32, 32, 31",
  border: "220, 223, 239",
  b2bSecondary: "15, 21, 85",
  yellow: "244, 181, 1, 1",
  gray: {
    2: "79, 79, 79",
    3: "130, 130, 130",
    4: "189, 189, 189",
    5: "192, 192, 192",
    6: "176, 170, 173"
  },
  gradient: `linear-gradient(89.71deg, #050732 21.63%, rgba(0, 0, 0, 0) 98.23%,
    rgba(5, 7, 50, 0) 98.23%), #4C68FF;`
};

const fontSizes = {
  f10: "10px",
  f12: "12px",
  f13: "13px",
  f14: "14px",
  f15: "15px",
  f16: "16px",
  f18: "18px",
  f21: "21px",
  f22: "22px",
  f23: "23px",
  f24: "24px",
  f27: "27px",
  f28: "28px",
  f30: "30px",
  f32: "32px",
  f36: "36px",
  f44: "44px",
  f46: "46px",
  f48: "48px",
  f52: "52px",
  f56: "56px",
  f60: "60px"
};

export const radius = {
  tiny: "2px",
  small: "4px",
  default: "6px",
  semi: "10px",
  double: "12px",
  biggest: "20px"
};

const fontWeights = {
  thin: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700
};

export const theme = {
  breakpoints,
  breakpointsPx,
  borderWeights,
  colors,
  fontSizes,
  radius,
  fontWeights
};

export const WRAPPER_WIDTH = 1150;

export const emToPx = em => Number.parseInt(em, 10) * DEFAULT_BODY_PIXEL_SIZE;

export const upThanBreakpoint = breakpointIndex =>
  `@media (min-width: ${breakpoints[breakpointIndex]})`;

export const downThanBreakpoint = breakpointIndex =>
  `@media (max-width: ${emToPx(breakpoints[breakpointIndex]) - 1}px)`;

export const themeGet = path => _.get(theme, path);

export const LANDING_BLOCK_ANGLE = "177deg";

export const adaptiveAbsolutePosition = ({
  top = [],
  right = [],
  bottom = [],
  left = []
}) => {
  let positionStyles = "";

  if (left.length || top.length || right.length || bottom.length) {
    const addStyles = ({
      currentTop,
      currentRight,
      currentBottom,
      currentLeft,
      breakpoint
    }) => {
      const currentPositionStyles = `
          ${currentTop != null ? `top: ${currentTop}px;` : ""}
          ${currentRight != null ? `right: ${currentRight}px;` : ""}
          ${currentBottom != null ? `bottom: ${currentBottom}px;` : ""}
          ${currentLeft != null ? `left: ${currentLeft}px;` : ""}
        `;

      const hasStylesForThisBreakpoint = currentPositionStyles.trim().length;

      if (!hasStylesForThisBreakpoint) return;

      positionStyles = positionStyles.concat(
        breakpoint
          ? `@media (min-width: ${breakpoint}) {
            ${currentPositionStyles}
          }`
          : currentPositionStyles
      );
    };

    const addBreakpointStyles = (breakpoint, index) => {
      // we start to use breakpoints from 1 element in our array
      const arrIndex = index + 1;
      const currentTop = top[arrIndex];
      const currentRight = right[arrIndex];
      const currentBottom = bottom[arrIndex];
      const currentLeft = left[arrIndex];
      addStyles({
        currentTop,
        currentRight,
        currentBottom,
        currentLeft,
        breakpoint
      });
    };

    addStyles({
      currentTop: top[0],
      currentRight: right[0],
      currentBottom: bottom[0],
      currentLeft: left[0]
    });
    breakpoints.map(addBreakpointStyles);
  }

  return positionStyles.trim().length
    ? `position: absolute; ${positionStyles}`
    : "";
};
