import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs(p => ({
  width: [
    1,
    p.withMenu ? "calc(100% - 241px)" : "calc(100% - 80px)",
    p.withMenu ? "calc(100% - 321px)" : "calc(100% - 80px)",
    p.withMenu ? "calc(100% - 361px)" : "calc(100% - 80px)"
  ],
  flexDirection: "column",
  p: 3,
  mt: [60, 0]
}))`
  position: relative;
`;

export const HeaderWrapper = styled(Flex).attrs({
  width: ["100vw", 1],
  ml: [-3, 0],
  mt: [-3, 0],
  mb: [3, 0],
  alignItems: "center",
  justifyContent: ["center", "space-between"],
  p: 3
})`
  height: 60px;
  background: rgb(${p => p.theme.colors.white});
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    height: auto;
    background: rgb(${p => p.theme.colors.iceBlue});
    box-shadow: none;
  }
`;

export const MainIconWrapper = styled(Flex).attrs({
  alignItems: "center",
  justifyContent: "center",
  width: [undefined, 32, 32, 48]
})`
  display: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: flex;
    height: 32px;
    border-radius: 24px;
    background-color: rgb(${p => p.theme.colors.blue});
    box-shadow: 0 3px 8px 0 rgba(${p => p.theme.colors.blue}, 0.48);

    path,
    circle,
    rect {
      stroke: rgb(${p => p.theme.colors.white});
      fill: rgb(${p => p.theme.colors.white});
    }
  }
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    height: 48px;
  }
`;

export const Header = styled(Flex).attrs({ as: "h1", ml: [0, 3], my: 0 })`
  font-size: ${p => p.theme.fontSizes.f16};
  font-weight: ${p => p.theme.fontWeights.semiBold};
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f21};
  }
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    font-size: ${p => p.theme.fontSizes.f24};
  }
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    font-size: ${p => p.theme.fontSizes.f36};
  }
`;

export const Icon = styled(Flex).attrs({
  width: 32,
  alignItems: "center",
  justifyContent: "center",
  mx: 1
})`
  height: 32px;
  border-radius: 16px;
  cursor: pointer;

  path,
  circle,
  rect {
    stroke: rgb(${p => (p.active ? p.theme.colors.blue : p.theme.colors.dark)});
    fill: rgb(${p => (p.active ? p.theme.colors.blue : p.theme.colors.dark)});
  }

  &:hover {
    background-color: rgb(${p => p.theme.colors.dark});
    box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.dark}, 0.48);

    path,
    circle,
    rect {
      stroke: rgb(${p => p.theme.colors.white});
      fill: rgb(${p => p.theme.colors.white});
    }
  }
`;

export const IconsWrapper = styled(Flex)`
  display: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: flex;
  }
`;

export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  margin-left: 4px;
  border-radius: 16px;
  cursor: pointer;
  background-color: rgb(${p => p.theme.colors.dark});
  background-image: url(${p => p.src});
  background-size: cover;
  background-position: center;
`;
