import styled, { css } from "styled-components";

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
  padding: 16px;

  &:hover:enabled {
    background-color: rgba(${p => p.theme.colors.blue}, 1);
    color: rgb(${p => p.theme.colors.white});
    box-shadow: 0 1px 3px 0 rgba(${p => p.theme.colors.blue}, 0.48);
  }
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

const Button = styled.button`
  border-radius: ${p => p.theme.radius.default};
  font-size: ${p => p.theme.fontSizes.f16};
  font-weight: ${p => p.theme.fontWeights.medium};
  line-height: 1.5;
  cursor: pointer;

  ${p => p.styleName === "login" && login};
  ${p => p.styleName === "blue" && blue};
  ${p => p.styleName === "orange" && orange};
  ${p => p.styleName === "deepSkyBlue" && deepSkyBlue};
  ${p => p.styleName === "navyBlue" && navyBlue};
  ${p => p.styleName === "hanPurple" && hanPurple};
  ${p => p.styleName === "transparent" && transparent};
  ${p => p.styleName === "limeade" && limeade};
  ${p => p.styleName === "outlineBlue" && outlineBlue};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default Button;
