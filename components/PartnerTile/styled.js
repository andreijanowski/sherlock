import styled, { css } from "styled-components";

import { StyledButton } from "components";

const CommonButtonStyles = css`
  width: 100%;
  white-space: nowrap;
  height: 40px;
  ${p =>
    p.big
      ? `
      padding: 0px;
    `
      : `
    padding: 6px;
    font-weight: ${p.theme.fontWeights.medium};
    font-size: ${p.theme.fontSizes.f12};
    line-height: ${p.theme.fontSizes.f16};
  `};
  ${p =>
    p.gradient &&
    `color: white;
    background: linear-gradient(
      to right,
      rgba(${p.theme.colors.b2bSecondary}, 1),
      rgb(${p.theme.colors.blue})
    );`}
`;

export const OutlineButton = styled(StyledButton)`
  ${CommonButtonStyles};
`;

export const BlueButton = styled(StyledButton)`
  ${CommonButtonStyles}
  display: flex;
  align-items: center;
  justify-content: center;
  ${"" /* border: 2px solid rgb(${p => p.theme.colors.navyBlue}); */}
`;
