import styled from "styled-components";
import { Box } from "@rebass/grid";

const H5 = styled(Box).attrs(p => ({
  as: "h5",
  mb: 3,
  mt: p.mt || 0
}))`
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 1.5;
`;

export default H5;
