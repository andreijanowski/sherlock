import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { upThanBreakpoint } from "utils/theme";

export const Container = styled.div`
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  ${upThanBreakpoint(2)} {
    width: 680px;
  }
`;

export const Bullets = styled(Flex).attrs({ as: "ul" })`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -20px;
  padding: 0;
  margin: 0;
  list-style: none;
  ${upThanBreakpoint(2)} {
    bottom: -50px;
  }
`;

export const Bullet = styled.li`
  display: block;
  width: 8px;
  height: 8px;
  border: 1px solid rgb(${p => p.theme.colors.white});
  border-radius: 50%;
  cursor: pointer;
  ${p =>
    p.isActive &&
    `
    background: rgb(${p.theme.colors.white});
  `}
  &:not(:last-child) {
    margin-right: 7px;
  }
  ${upThanBreakpoint(2)} {
    width: 13px;
    height: 13px;
    &:not(:last-child) {
      margin-right: 12px;
    }
  }
`;
