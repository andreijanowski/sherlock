import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs({
  width: 80,
  flexDirection: "column",
  alignItems: "center",
  py: 4
})`
  position: relative;
  z-index: 100;
  min-height: 100vh;
  background-color: rgb(${p => p.theme.colors.white});
`;

export const Logo = styled.img.attrs({
  src: "/static/LogoFoodetectiveSmall.svg"
})`
  width: 24px;
  height: 32px;
`;

export const LogoWrapper = styled(Flex).attrs({
  alignItems: "center",
  justifyContent: "center",
  mb: 4,
  width: 48
})`
  height: 48px;
  border-radius: 24px;
  box-shadow: 0 3px 8px 0 rgba(${p => p.theme.colors.dark}, 0.16);
`;

export const Item = styled(Flex).attrs({
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  mb: 3
})`
  position: relative;
  height: 40px;
  border-radius: 20px;

  > nav {
    display: none;
  }

  path,
  circle,
  rect {
    fill: rgb(${p => (p.active ? p.theme.colors.blue : p.theme.colors.dark)});
    stroke: rgb(${p => (p.active ? p.theme.colors.blue : p.theme.colors.dark)});
  }

  &:hover {
    > nav {
      display: flex;
    }

    ${p =>
      !p.inactive &&
      `
    background-color: rgb(${p.theme.colors.dark});
    box-shadow: 0 2px 6px 0 rgba(${p.theme.colors.dark}, 0.48);

    path,
    circle,
    rect {
      stroke: rgb(${p.theme.colors.white});
      fill: rgb(${p.theme.colors.white});
    }
    `}
  }
`;

export const Icon = styled(Flex).attrs({
  width: 40,
  alignItems: "center",
  justifyContent: "center"
})`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  ${p => p.inactive && "opacity: 0.5;"}
`;

export const SubitemsWrapper = styled(Flex).attrs({ pl: 3, as: "nav" })`
  position: absolute;
  left: 100%;
  z-index: 2;
  ${p => p.top !== undefined && `top: ${p.top}px;`}

  &:after {
    position: absolute;
    top: ${p =>
      p.arrowTop !== undefined ? `${p.arrowTop}px` : "calc(50% - 20px)"};
    left: -20px;
    z-index: 2;
    width: 40px;
    height: 40px;
    transform: rotate(45deg);
    content: "";
  }
`;

export const Subitems = styled(Flex).attrs({
  flexDirection: "column",
  p: 2
})`
  position: relative;
  background-color: rgb(${p => p.theme.colors.dark});
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.dark}, 0.48);

  &:after {
    position: absolute;
    top: ${p =>
      p.arrowTop !== undefined ? `${p.arrowTop}px` : "calc(50% - 6px)"};
    left: -6px;
    width: 12px;
    height: 12px;
    background-color: rgb(${p => p.theme.colors.dark});
    box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.dark}, 0.48);
    transform: rotate(45deg);
    content: "";
  }
`;

export const Subitem = styled(Box).attrs({ as: "a", p: 3 })`
  color: rgb(${p => p.theme.colors.white});
  white-space: nowrap;
  text-decoration: none;
  border-radius: ${p => p.theme.radius.default};
  cursor: pointer;

  &:hover {
    background-color: rgb(${p => p.theme.colors.brightGray});
  }
`;
