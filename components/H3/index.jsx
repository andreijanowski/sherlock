import styled from "styled-components";
import { Box } from "@rebass/grid";

const H3 = styled(Box).attrs(p => ({
  as: "h3",
  mb: 3,
  mt: p.mt || 0
}))`
  font-size: ${p => p.theme.fontSizes.f21};
  font-weight: 400;
  line-height: 1.5;
  color: rgb(${p => p.theme.colors.dark});
`;

export default H3;
