import { H2 } from "components";
import styled from "styled-components";

export const ModalHeader = styled.h3`
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.regular};
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 1.5;
  text-align: center;
`;

export const Orange = styled.span`
  color: rgb(${p => p.theme.colors.carrotOrange});
  text-decoration: none;
`;

export const StyledH2 = styled(H2)`
  text-align: center;
`;
