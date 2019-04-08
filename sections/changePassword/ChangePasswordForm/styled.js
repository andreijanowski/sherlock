import styled from "styled-components";
import { Box } from "@rebass/grid";

export const HelperTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: ${p => p.theme.fontSizes.f16};
  font-weight: ${p => p.theme.fontWeights.semiBold};
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    font-size: ${p => p.theme.fontSizes.f24};
  }
`;

export const Separator = styled(Box).attrs(({ size }) => ({
  as: "hr",
  mt: size
}))`
  border: none;
`;
