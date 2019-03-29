import styled, { css } from "styled-components";
import { Flex } from "@rebass/grid";

const login = css`
  border: ${p => p.theme.borderWeights.normal} solid
    rgba(${p => p.theme.colors.dark}, 0.16);
  color: rgba(${p => p.theme.colors.dark}, 0.64);
  padding: 5px 13px;
  margin-left: 16px;
  background: transparent;
`;

const blue = css`
  background-color: rgba(${p => p.theme.colors.blue}, 0.1);
  border: none;
  color: rgb(${p => p.theme.colors.blue});
  padding: 8px 20px;

  &:hover:enabled {
    background-color: rgba(${p => p.theme.colors.blue}, 1);
    color: rgb(${p => p.theme.colors.white});
    box-shadow: 0 1px 3px 0 rgba(${p => p.theme.colors.blue}, 0.48);
  }

  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    padding: 16px 40px;
  }
`;

const formBlue = css`
  ${blue};
  padding: 9px;
`;

const outlineBlue = css`
  background-color: white;
  border: ${p => p.theme.borderWeights.normal} solid
    rgba(${p => p.theme.colors.blue}, 0.1);
  color: rgb(${p => p.theme.colors.blue});
  padding: 13px 16px;

  &:hover:enabled {
    border: ${p => p.theme.borderWeights.normal} solid
      rgba(${p => p.theme.colors.blue}, 1);
    box-shadow: 0 1px 3px 0 rgba(${p => p.theme.colors.blue}, 0.48);
  }
`;

const planButton = css`
  border: none;
  color: rgb(${p => p.theme.colors.white});
  padding: 12px;
  width: 100%;

  &:hover:enabled {
    box-shadow: 0 1px 3px 0 rgba(${p => p.theme.colors.blue}, 0.48);
  }
`;

const orange = css`
  background-color: rgb(${p => p.theme.colors.carrotOrange});
  ${planButton};
`;

const deepSkyBlue = css`
  background-color: rgb(${p => p.theme.colors.deepSkyBlue});
  ${planButton};
`;

const navyBlue = css`
  background-color: rgb(${p => p.theme.colors.navyBlue});
  ${planButton};
`;

const hanPurple = css`
  background-color: rgb(${p => p.theme.colors.hanPurple});
  ${planButton};
`;

const transparent = css`
  ${blue};
  background-color: transparent;
`;

const limeade = css`
  background-color: rgb(${p => p.theme.colors.limeade});
  ${planButton};
`;

const newOrderButton = css`
  border: none;
  padding: 12px;
  font-size: 12px;
  font-weight: ${p => p.theme.fontWeights.bold};
  text-transform: uppercase;
  line-height: 16px;

  &:hover {
    color: rgb(${p => p.theme.colors.white});
  }
`;

const reject = css`
  ${newOrderButton}
  background-color: rgba(${p => p.theme.colors.ruby}, 0.1);
  color: rgb(${p => p.theme.colors.ruby});

  &:hover {
    background-color: rgba(${p => p.theme.colors.ruby}, 1);
    box-shadow: 0 1px 3px 0 rgba(${p => p.theme.colors.ruby}, 0.48);
  }
`;

const accept = css`
  ${newOrderButton}
  background-color: rgba(${p => p.theme.colors.greenHaze}, 0.1);
  color: rgb(${p => p.theme.colors.greenHaze});

  &:hover {
    background-color: rgba(${p => p.theme.colors.greenHaze}, 1);
    box-shadow: 0 1px 3px 0 rgba(${p => p.theme.colors.greenHaze}, 0.48);
  }
`;
const withImageActive = css`
  color: rgb(${p => p.theme.colors.white});
  fill: rgb(${p => p.theme.colors.white});
  stroke: rgb(${p => p.theme.colors.white});
  background-color: rgb(${p => p.theme.colors.blue});
  ${p => p.red && `background-color: rgb(${p.theme.colors.ruby});`}
  ${p => p.greenHaze && `background-color: rgb(${p.theme.colors.greenHaze});`}
`;

const withImage = css`
  border: none;
  position: relative;
  line-height: 24px;
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
  min-height: 40px;
  background-color: ${p =>
    p.red
      ? `rgba(${p.theme.colors.ruby}, 0.1)`
      : `rgb(${p.theme.colors.white})`};
  border-radius: ${p => p.theme.radius.default};
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(${p => (p.red ? p.theme.colors.ruby : p.theme.colors.dark)});
  fill: rgb(${p => (p.red ? p.theme.colors.ruby : p.theme.colors.dark)});
  stroke: rgb(${p => (p.red ? p.theme.colors.ruby : p.theme.colors.dark)});
  ${p =>
    p.greenHaze &&
    `
    color: rgb(${p.theme.colors.greenHaze});
    background-color:rgba(${p.theme.colors.greenHaze}, 0.1);
  `}
  padding: 0;
  font-weight: ${p => p.theme.fontWeights.regular};

  ${p => p.active && withImageActive}

  stroke {
    color: rgb(${p => (p.red ? p.theme.colors.ruby : p.theme.colors.dark)});
  }

  &:hover {
    ${withImageActive}
  }
`;

const fluid = css`
  width: 100%;
`;

const fullHeight = css`
  height: 100%;
`;

const Button = styled.button`
  border-radius: ${p => p.theme.radius.default};
  font-size: ${p => p.theme.fontSizes.f16};
  font-weight: ${p => p.theme.fontWeights.medium};
  line-height: 1.5;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;

  ${p => p.width && `width: ${p.width};`};

  ${p => p.styleName === "login" && login};
  ${p => p.styleName === "blue" && blue};
  ${p => p.styleName === "formBlue" && formBlue};
  ${p => p.styleName === "orange" && orange};
  ${p => p.styleName === "deepSkyBlue" && deepSkyBlue};
  ${p => p.styleName === "navyBlue" && navyBlue};
  ${p => p.styleName === "hanPurple" && hanPurple};
  ${p => p.styleName === "transparent" && transparent};
  ${p => p.styleName === "limeade" && limeade};
  ${p => p.styleName === "outlineBlue" && outlineBlue};
  ${p => p.styleName === "reject" && reject};
  ${p => p.styleName === "accept" && accept};
  ${p => p.styleName === "withImage" && withImage};
  ${p => p.fluid && fluid};
  ${p => p.fullHeight && fullHeight};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default Button;

export const ButtonWithImageText = styled.div`
  height: 40px;
  line-height: 40px;
  padding: 0 16px;
  border-left: 1px solid rgb(${p => p.theme.colors.linkWater});

  input {
    border: none;
    background-color: transparent;
    color: inherit;
    outline: none;
  }
`;

export const ButtonWithImageIconWrapper = styled(Flex)`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;
