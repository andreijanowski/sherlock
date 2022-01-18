import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { themeGet } from "utils/theme";

export const Brandmark = styled.img.attrs(() => ({
  src: "/static/LogoFoodetective.svg"
}))`
  max-width: 100%;
  max-height: 100%;
`;

export const SquaredBrandmark = styled(Flex)`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      270deg,
      rgba(8, 12, 66, 0.38) 39.58%,
      rgba(56, 79, 203, 0.38) 80%
    ),
    rgb(${themeGet("colors.landingDarkBlue")});
  border-radius: 18px;
  color: rgb(${themeGet("colors.white")});
  font-size: 70px;
`;

export const BrandmarkWrapper = styled.div`
  width: ${p => (p.squared ? "100px" : "48px")};
  height: ${p => (p.squared ? "100px" : "48px")};
  background: rgb(${themeGet("colors.white")});
  border-radius: ${p => (p.rounded ? "12px" : "32px")};
  box-shadow: 0 4px 24px rgba(${themeGet("colors.dark")}, 0.16);
`;
