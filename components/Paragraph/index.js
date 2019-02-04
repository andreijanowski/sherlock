import styled from "styled-components";
import { number, oneOfType, string } from "prop-types";
import { Box } from "@rebass/grid";

const Paragraph = styled(Box).attrs(p => ({
  as: "p",
  mb: p.mb,
  mt: p.mt
}))`
  font-size: ${p => (p.app ? p.theme.fontSizes.f14 : p.theme.fontSizes.f21)};
  font-weight: ${p => (p.app ? 500 : 400)};
  line-height: 1.5;
  color: rgba(
    ${p => (p.white ? p.theme.colors.white : p.theme.colors.dark)},
    ${p => (p.app ? 0.4 : 0.72)}
  );
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f21};
  }
`;

Paragraph.propTypes = {
  mb: oneOfType([string, number]),
  mt: oneOfType([string, number])
};

Paragraph.defaultProps = {
  mb: 4,
  mt: 0
};

export default Paragraph;
