import styled from "styled-components";
import { Box } from "@rebass/grid";

const Separator = styled(Box).attrs(({ size }) => ({
  as: "p",
  my: size
}))`
  position: relative;
  width: 100%;
  color: rgba(${p => p.theme.colors.dark}, 0.4);
  font-size: ${p => p.theme.fontSizes.f10};
  line-height: ${p => p.theme.fontSizes.f24};
  text-align: center;
  text-transform: uppercase;
  border: none;
  &::after,
  &::before {
    position: absolute;
    top: calc(50% - 1px);
    width: calc(50% - 48px);
    border-bottom: 2px solid rgb(238, 239, 239);
    content: "";
  }
  &::after {
    right: 0;
  }
  &::before {
    left: 0;
  }
`;

export default Separator;
