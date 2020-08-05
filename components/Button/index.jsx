import styled, { css } from "styled-components";
import { Flex } from "@rebass/grid";

const login = css`
  display: flex;
  align-items: center;
  padding: 5px 13px;
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f15};
  line-height: 28px;
  background: rgba(${p => p.theme.colors.white}, 0.5);
  border: none;
  border-radius: ${p => p.theme.radius.biggest};
`;

const signUp = css`
  ${login}
  background: rgba(${p => p.theme.colors.white}, 0.2);
`;

const blue = css`
  padding: 8px 20px;
  color: rgb(${p => p.theme.colors.blue});
  background-color: rgba(${p => p.theme.colors.blue}, 0.1);
  border: none;

  &:hover:enabled {
    color: rgb(${p => p.theme.colors.white});
    background-color: rgba(${p => p.theme.colors.blue}, 1);
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
  padding: 13px 16px;
  color: rgb(${p => p.theme.colors.blue});
  background-color: white;
  border: ${p => p.theme.borderWeights.normal} solid
    rgba(${p => p.theme.colors.blue}, 0.1);

  &:hover:enabled {
    border: ${p => p.theme.borderWeights.normal} solid
      rgba(${p => p.theme.colors.blue}, 1);
    box-shadow: 0 1px 3px 0 rgba(${p => p.theme.colors.blue}, 0.48);
  }
`;

const planButton = css`
  width: 100%;
  padding: 12px;
  color: rgb(${p => p.theme.colors.white});
  border: none;

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

const white = css`
  ${planButton};
  color: rgb(${p => p.theme.colors.blue});
  background-color: rgb(${p => p.theme.colors.white});
`;

const hanPurple = css`
  background-color: rgb(${p => p.theme.colors.hanPurple});
  ${planButton};
`;

const smallBlue = css`
  background-color: rgb(${p => p.theme.colors.blue});
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

const background = css`
  ${planButton};
  color: rgba(${p => p.theme.colors.dark}, 0.5);
  background-color: rgb(${p => p.theme.colors.background});
`;

const newOrderButton = css`
  padding: 12px;
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f12};
  line-height: 16px;
  text-transform: uppercase;
  border: none;

  &:hover {
    color: rgb(${p => p.theme.colors.white});
  }
`;

const reject = css`
  ${newOrderButton}
  color: rgb(${p => p.theme.colors.ruby});
  background-color: rgba(${p => p.theme.colors.ruby}, 0.1);

  &:hover {
    background-color: rgba(${p => p.theme.colors.ruby}, 1);
    box-shadow: 0 1px 3px 0 rgba(${p => p.theme.colors.ruby}, 0.48);
  }
`;

const accept = css`
  ${newOrderButton}
  color: rgb(${p => p.theme.colors.greenHaze});
  background-color: rgba(${p => p.theme.colors.greenHaze}, 0.1);

  &:hover {
    background-color: rgba(${p => p.theme.colors.greenHaze}, 1);
    box-shadow: 0 1px 3px 0 rgba(${p => p.theme.colors.greenHaze}, 0.48);
  }
`;

const withImageActive = css`
  color: rgb(${p => p.theme.colors.white});
  background-color: rgb(${p => p.theme.colors.blue});
  fill: rgb(${p => p.theme.colors.white});
  stroke: rgb(${p => p.theme.colors.white});
  ${p => p.red && `background-color: rgb(${p.theme.colors.ruby});`}
  ${p => p.greenHaze && `background-color: rgb(${p.theme.colors.greenHaze});`}
`;

const withImage = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0;
  color: rgb(${p => p.theme.colors.dark});
  ${p => p.red && `color: rgb(${p.theme.colors.ruby});`};
  ${p => p.blue && `color: rgb(${p.theme.colors.blue});`};
  ${p => p.greenHaze && `color: rgb(${p.theme.colors.greenHaze});`};
  font-weight: ${p => p.theme.fontWeights.regular};
  line-height: 24px;
  background-color: ${p => `rgb(${p.theme.colors.white})`};
  ${p => p.red && `background-color: rgba(${p.theme.colors.ruby}, 0.1);`}
  ${p => p.blue && `background-color: rgba(${p.theme.colors.blue}, 0.1);`}
  ${p =>
    p.greenHaze && `background-color:rgba(${p.theme.colors.greenHaze}, 0.1);`}
  border: none;
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
  fill: rgb(${p => p.theme.colors.dark});
  ${p => p.red && `fill: rgb(${p.theme.colors.ruby});`}
  ${p => p.blue && `fill: rgb(${p.theme.colors.blue});`}
  stroke: rgb(${p => p.theme.colors.dark});
  ${p => p.red && `stroke: rgb(${p.theme.colors.ruby});`}
  ${p => p.blue && `stroke: rgb(${p.theme.colors.blue});`}


  ${p => p.active && withImageActive}


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
  overflow: hidden;
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
  text-decoration: none;
  border-radius: ${p => p.theme.radius.default};
  cursor: pointer;

  ${p => p.width && `width: ${p.width};`};

  ${p => p.styleName === "login" && login};
  ${p => p.styleName === "signUp" && signUp};
  ${p => p.styleName === "blue" && blue};
  ${p => p.styleName === "formBlue" && formBlue};
  ${p => p.styleName === "orange" && orange};
  ${p => p.styleName === "deepSkyBlue" && deepSkyBlue};
  ${p => p.styleName === "navyBlue" && navyBlue};
  ${p => p.styleName === "white" && white};
  ${p => p.styleName === "hanPurple" && hanPurple};
  ${p => p.styleName === "smallBlue" && smallBlue};
  ${p => p.styleName === "transparent" && transparent};
  ${p => p.styleName === "limeade" && limeade};
  ${p => p.styleName === "background" && background};
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
  padding: 0 16px;
  line-height: 40px;
  border-left: 1px solid rgb(${p => p.theme.colors.linkWater});

  input {
    color: inherit;
    background-color: transparent;
    border: none;
    outline: none;
  }
`;

export const ButtonWithImageIconWrapper = styled(Flex)`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;
