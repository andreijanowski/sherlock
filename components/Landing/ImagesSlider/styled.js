import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Container = styled.div`
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    width: auto;
  }
`;

export const Bullets = styled(Flex).attrs({ as: "ul" })`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -50px;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const Bullet = styled.li`
  display: block;
  width: 13px;
  height: 13px;
  border: 1px solid rgb(${p => p.theme.colors.white});
  border-radius: 50%;
  cursor: pointer;
  ${p =>
    p.isActive &&
    `
    background: rgb(${p.theme.colors.white});
  `}
  &:not(:last-child) {
    margin-right: 12px;
  }
`;
