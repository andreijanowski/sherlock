import styled from "styled-components";
import { Box } from "@rebass/grid";

const H1 = styled(Box).attrs({
  as: "h1",
  mb: 4,
  mt: 0
})`
  font-size: ${p => p.theme.fontSizes.f56};
  font-weight: 600;
  line-height: 1.15;
  color: rgb(${p => p.theme.colors.dark});
`;

export default H1;
