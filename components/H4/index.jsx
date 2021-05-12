import styled from "styled-components";
import { Box } from "@rebass/grid";

const H4 = styled(Box).attrs(p => ({
  as: "h4",
  mb: 3,
  mt: p.mt || 0
}))`
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.regular};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
`;

export default H4;
