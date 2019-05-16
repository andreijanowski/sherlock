import styled from "styled-components";
import { Box } from "@rebass/grid";

const H1 = styled(Box).attrs({
  as: "h1",
  mb: 4,
  mt: 0
})`
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f32};
  line-height: 1.15;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f48};
  }
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    font-size: ${p => p.theme.fontSizes.f56};
  }
`;

export default H1;
