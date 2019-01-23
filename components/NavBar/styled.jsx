import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs({
  width: 80,
  flexDirection: "column",
  alignItems: "center",
  py: 4
})`
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
  height: 40px;
  border-radius: 20px;
  position: relative;

  > nav {
    display: none;
  }

  path,
  circle,
  rect {
    stroke: rgb(${p => (p.active ? p.theme.colors.blue : p.theme.colors.dark)});
    fill: rgb(${p => (p.active ? p.theme.colors.blue : p.theme.colors.dark)});
  }

  &:hover {
    background-color: rgb(${p => p.theme.colors.dark});
    box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.dark}, 0.48);

    > nav {
      display: flex;
    }

    path,
    circle,
    rect {
      stroke: rgb(${p => p.theme.colors.white});
      fill: rgb(${p => p.theme.colors.white});
    }
  }
`;

export const Icon = styled(Flex).attrs({
  width: 40,
  alignItems: "center",
  justifyContent: "center"
})`
  height: 40px;
  border-radius: 20px;
  z-index: 3;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
`;

export const SubitemsWrapper = styled(Flex).attrs({ pl: 3, as: "nav" })`
  position: absolute;
  left: 100%;
  z-index: 2;

  &:after {
    z-index: 2;
    content: "";
    width: 40px;
    height: 40px;
    position: absolute;
    top: calc(50% - 20px);
    transform: rotate(45deg);
    left: -20px;
  }
`;

export const Subitems = styled(Flex).attrs({
  flexDirection: "column",
  p: 2
})`
  position: relative;
  border-radius: ${p => p.theme.radius.default};
  background-color: rgb(${p => p.theme.colors.dark});
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.dark}, 0.48);

  &:after {
    content: "";
    width: 12px;
    height: 12px;
    background-color: rgb(${p => p.theme.colors.dark});
    box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.dark}, 0.48);
    position: absolute;
    top: calc(50% - 6px);
    transform: rotate(45deg);
    left: -6px;
  }
`;

export const Subitem = styled(Box).attrs({ p: 3 })`
  color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: rgb(${p => p.theme.colors.brightGray});
  }
`;
