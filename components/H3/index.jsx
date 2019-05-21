import styled from "styled-components";
import { Box } from "@rebass/grid";

const H3 = styled(Box).attrs(p => ({
  as: "h3",
  mb: 3,
  mt: p.mt || 0
}))`
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.regular};
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 1.5;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f21};
  }
`;

export default H3;
