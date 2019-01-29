import styled from "styled-components";
import { Box } from "@rebass/grid";

const H2 = styled(Box).attrs({
  as: "h2",
  mb: 3,
  mt: 0
})`
  font-size: ${p => p.theme.fontSizes.f46};
  font-weight: ${p => p.theme.fontWeights.semiBold};
  line-height: 1.25;
  color: rgb(${p => (p.white ? p.theme.colors.white : p.theme.colors.dark)});
`;

export default H2;
