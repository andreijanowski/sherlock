import styled from "styled-components";
import { Box } from "@rebass/grid";

const H2 = styled(Box).attrs(p => ({
  as: "h2",
  mb: p.mb || 3,
  mt: p.mt || 0
}))`
  color: rgb(${p => (p.white ? p.theme.colors.white : p.theme.colors.dark)});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f24};
  line-height: 1.25;
  ${p => p.textAlign && `text-align: ${p.textAlign};`}
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f32};
  }
`;

export default H2;
