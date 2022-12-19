import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { themeGet } from "utils/theme";

export const Wrapper = styled(Flex).attrs(() => ({
  width: [1, "calc(100% - 300px)"],
  flexDirection: "column",
  p: 3,
  mt: [60, 0]
}))`
  position: relative;
  ${p =>
    p.mainIcon === "clients" &&
    `
      background: rgb(${p.theme.colors.white});
      @media (min-width: ${p.theme.breakpoints[2]}) {
        background: transparent;
      }
  `}
`;

export const HeaderWrapper = styled(Flex).attrs(() => ({
  width: ["100vw", 1],
  ml: [-3, 0],
  mt: [-3, 0],
  mb: [3, 0],
  alignItems: "center",
  justifyContent: ["center", "space-between"],
  flexDirection: ["column", null, "row"],
  p: 3
}))`
  height: 60px;
  background: rgb(${p => p.theme.colors.white});
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    background: rgb(${p => p.theme.colors.iceBlue});
    box-shadow: none;
  }
  @media (max-width: ${p => p.theme.breakpoints[2]}) {
    height: 110px;
  }
`;

export const MainIconWrapper = styled(Flex).attrs(() => ({
  alignItems: "center",
  justifyContent: "center",
  width: [undefined, 32, 32, 48]
}))`
  display: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: flex;
    height: 32px;
    font-size: 32px;
    background-color: rgb(${p => p.theme.colors.landingDarkBlue});
    border-radius: 24px;
    box-shadow: 0 3px 8px 0 rgba(${p => p.theme.colors.landingDarkBlue}, 0.48);
  }
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    height: 48px;
    font-size: 48px;
  }

  svg .primary {
    color: rgb(${p => p.theme.colors.white});
  }
  svg .secondary {
    color: rgb(${p => p.theme.colors.white});
  }
`;

export const Header = styled(Flex).attrs(() => ({
  as: "h1",
  ml: [0, 3],
  my: 0
}))`
  display: flex;
  align-items: center;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f16};
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

export const Icon = styled(Flex).attrs(() => ({
  width: 36,
  mx: 1
}))`
  background-color: rgb(${p => p.theme.colors.white});
  height: 36px;
  font-size: 24px;
  border-radius: 18px;
  cursor: pointer;
  box-shadow: 0 4px 2px -2px gray;

  path,
  circle,
  &:hover {
    background-color: rgb(${p => p.theme.colors.darkBlue});
    box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.dark}, 0.48);

    path,
    circle,
    rect {
      fill: rgb(${p => p.theme.colors.darkBlue});
      stroke: rgb(${p => p.theme.colors.white});
    }
  }
`;

export const IconsWrapper = styled(Flex)`
  display: none;
  align-items: center;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: flex;
  }
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  margin-left: 4px;
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.dark}, 0.48);
  background-color: rgb(${p => p.theme.colors.dark});
  background-position: center;
  background-size: cover;
  border-radius: 18px;
  cursor: pointer;
  ${p => p.src && `background-image: url(${p.src});`}
`;

export const Container = styled(Box)`
  cursor: pointer;
`;

export const CheckboxesContainer = styled.form`
  padding: 16px;
  border-radius: 8px;
  background: rgb(${themeGet("colors.white")});
  box-shadow: 0 0 4px 0 rgba(${themeGet("colors.boxShadow")}, 0.5);
`;

export const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;

export const TutorialButton = styled.div`
  display: flex;
  align-items: center;
  margin-right: 6px;
  color: rgb(76, 104, 255);
  font-size: 14px;
  cursor: pointer;
`;

export const YoutubeWrapper = styled.div`
  padding: 16px;
`;

export const LanguageSwitcherWrapper = styled(Flex)`
  margin: 0 6px;
  align-items: center;
`;
