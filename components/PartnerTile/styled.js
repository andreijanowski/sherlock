import styled, { css } from "styled-components";

import { Button } from "components";

const CommonButtonStyles = css`
  width: 100%;
  white-space: nowrap;
  ${p =>
    p.big
      ? `
      padding: 8px;
    `
      : `
    padding: 6px;
    font-weight: ${p.theme.fontWeights.medium};
    font-size: ${p.theme.fontSizes.f12};
    line-height: ${p.theme.fontSizes.f16};
  `};
`;

export const OutlineButton = styled(Button).attrs({
  styleName: "outlineBlue"
})`
  ${CommonButtonStyles}
`;

export const BlueButton = styled(Button).attrs({
  styleName: "navyBlue"
})`
  ${CommonButtonStyles}
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgb(${p => p.theme.colors.navyBlue});
`;
