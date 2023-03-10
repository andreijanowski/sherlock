import styled from "styled-components";
import { number, oneOfType, string } from "prop-types";
import { Box } from "@rebass/grid";

const Paragraph = styled(Box).attrs(p => ({
  as: "p",
  mb: p.mb,
  mt: p.mt
}))`
  color: rgba(
    ${p => (p.white ? p.theme.colors.white : p.theme.colors.dark)},
    ${p => (p.app ? 0.4 : 0.72)}
  );
  font-weight: ${p =>
    p.app ? p.theme.fontWeights.medium : p.theme.fontWeights.regular};
  font-size: ${p => (p.app ? p.theme.fontSizes.f14 : p.theme.fontSizes.f16)};
  line-height: 1.5;
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    font-size: ${p => p.theme.fontSizes.f18};
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
