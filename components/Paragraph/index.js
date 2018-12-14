import styled from "styled-components";
import { Box } from "@rebass/grid";

const Paragraph = styled(Box).attrs({
  as: "p",
  mb: 4,
  mt: 0
})`
  font-size: ${p => p.theme.fontSizes.f21};
  font-weight: 400;
  line-height: 1.5;
  color: rgba(
    ${p => (p.white ? p.theme.colors.white : p.theme.colors.dark)},
    0.72
  );
`;

export default Paragraph;
