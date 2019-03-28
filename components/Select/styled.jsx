import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const ToggleButtonWrapper = styled(Flex).attrs(p => ({
  width: 1,
  alignItems: "center",
  pl: p.withImage ? 48 : 3,
  pr: 40,
  py: 2
}))`
  appearance: none !important;
  position: relative;
  line-height: 24px;
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
  min-height: 40px;
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};

  .ExpandIcon {
    position: absolute;
    right: 16px;
    stroke: rgb(${p => p.theme.colors.dark});
  }
`;

export const Avatar = styled.div`
  position: absolute;
  left: 16px;
  background-color: rgb(${p => p.theme.colors.blue});
  background-image: url(${p => p.src});
  background-position: center;
  background-size: cover;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(${p => p.theme.colors.dark}, 0.16);
`;

export const Action = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 56px;
  line-height: 56px;
  text-align: center;
  color: rgb(${p => p.theme.colors.blue});
  border-top: 1px solid rgb(${p => p.theme.colors.background});
  cursor: pointer;
  &:hover {
    background-color: rgb(${p => p.theme.colors.blue});
    color: rgb(${p => p.theme.colors.white});
  }
`;

export const ItemsWrapper = styled(Flex).attrs(p => ({
  flexDirection: "column",
  mt: 2,
  width: 1,
  pb: p.bottomAction ? 56 : undefined
}))`
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
  position: absolute;
  z-index: 99;
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
  overflow: hidden;
`;

export const Items = styled(Flex).attrs({
  flexDirection: "column",
  mt: 2,
  width: 1
})`
  position: relative;
  overflow: scroll;
  max-height: 250px;
`;

export const Item = styled(Box).attrs(p => ({
  pl: p.withImage ? 48 : 3,
  pr: 3,
  py: 2
}))`
  line-height: 24px;
  cursor: pointer;
  ${p => p.isActive && `background-color: rgb(${p.theme.colors.background});`}
`;
