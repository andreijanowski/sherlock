import styled from "styled-components";

export const WordmarkWrapper = styled.p`
  font-size: ${p => p.theme.fontSizes.f36};
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  margin: 0 8px 0 12px;
`;

export const Tagline = styled.small`
  display: ${({ inline }) => (inline ? "inline" : "block")};
  font-size: ${p => p.theme.fontSizes.f24};
  color: rgba(${p => p.theme.colors.dark}, 0.4);
  font-weight: ${p => p.theme.fontWeights.semiBold};
  margin-left: 8px;
`;
