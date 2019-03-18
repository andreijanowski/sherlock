import styled from "styled-components";
import { Box } from "@rebass/grid";

const Separator = styled(Box).attrs(({ size }) => ({
  as: "p",
  my: size
}))`
  font-size: ${p => p.theme.fontSizes.f10};
  color: rgba(${p => p.theme.colors.dark}, 0.4);
  line-height: ${p => p.theme.fontSizes.f24};
  position: relative;
  text-transform: uppercase;
  text-align: center;
  position: relative;
  border: none;
  width: 100%;
  &::after,
  &::before {
    content: "";
    position: absolute;
    width: calc(50% - 48px);
    top: calc(50% - 1px);
    border-bottom: 2px solid rgb(238, 239, 239);
  }
  &::after {
    right: 0;
  }
  &::before {
    left: 0;
  }
`;

export default Separator;
