import styled from "styled-components";

export const WordmarkWrapper = styled.p`
  margin: 0 8px 0 12px;
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f24};
  @media (min-width: ${p => p.theme.breakpoints[3]}) {
    font-size: ${p => p.theme.fontSizes.f36};
  }
`;

export const Tagline = styled.small`
  display: ${({ inline }) => (inline ? "inline" : "block")};
  color: rgba(${p => p.theme.colors.dark}, 0.4);
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f16};
  @media (min-width: ${p => p.theme.breakpoints[3]}) {
    font-size: ${p => p.theme.fontSizes.f24};
  }
`;
