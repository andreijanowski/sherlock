import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Brandmark = styled.img.attrs(() => ({
  src: "/static/LogoFoodetective.svg"
}))`
  max-width: 100%;
  max-height: 100%;
`;

export const SquaredBrandmark = styled(Flex)`
  width: 110px;
  height: 110px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      270deg,
      rgba(8, 12, 66, 0.38) 39.58%,
      rgba(56, 79, 203, 0.38) 80%
    ),
    rgb(${p => p.theme.colors.landingDarkBlue});
  border-radius: 18px;
`;

export const BrandmarkWrapper = styled.div`
  width: ${p => (p.squared ? "110px" : "48px")};
  height: ${p => (p.squared ? "110px" : "48px")};
  background: rgb(${p => p.theme.colors.white});
  border-radius: ${p => (p.rounded ? "12px" : "32px")};
  box-shadow: 0 4px 24px rgba(${p => p.theme.colors.dark}, 0.16);
`;
