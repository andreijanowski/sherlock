import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs(p => ({
  width: p.withMenu ? "calc(100% - 361px)" : "calc(100% - 80px)",
  flexDirection: "column",
  p: 3
}))``;

export const HeaderWrapper = styled(Flex).attrs({
  width: 1,
  alignItems: "center",
  justifyContent: "space-between",
  p: 3
})``;

export const MainIconWrapper = styled(Flex).attrs({
  alignItems: "center",
  justifyContent: "center",
  width: 48
})`
  height: 48px;
  border-radius: 24px;
  background-color: rgb(${p => p.theme.colors.blue});
  box-shadow: 0 3px 8px 0 rgba(${p => p.theme.colors.blue}, 0.48);

  path,
  circle,
  rect {
    stroke: rgb(${p => p.theme.colors.white});
    fill: rgb(${p => p.theme.colors.white});
  }
`;

export const Header = styled(Flex).attrs({ as: "h1", ml: 3, my: 0 })`
  font-size: ${p => p.theme.fontSizes.f36};
  font-weight: 600;
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
