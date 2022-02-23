import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { themeGet } from "utils/theme";
import { NavigationLink } from "../styled";

export const Container = styled.div`
  position: relative;
`;

export const Caption = styled(NavigationLink)`
  &:hover {
    color: rgb(${themeGet("colors.white")});
  }
`;

export const Error = styled(Caption)`
  color: red;
  &:hover {
    color: red;
  }
`;

export const InputWrapper = styled(Flex)`
  border-bottom: 1px solid ${p => (p.isInvalid ? "red" : "white")};
`;

export const Input = styled.input`
  flex: auto;
  font-size: 16px;
  line-height: 24px;
  color: rgb(${themeGet("colors.white")});
  background: transparent;
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgb(${themeGet("colors.white")});
  }
`;

export const Button = styled(Box).attrs({ as: "button" })`
  padding: 4px 16px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  cursor: pointer;
  color: rgb(${themeGet("colors.primary")});
  background: rgb(${themeGet("colors.white")});
  border: none;
  border-radius: 24px;
  appearance: none;
`;

export const LoaderWrapper = styled.div`
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;
  z-index: 1;
  background: rgb(${themeGet("colors.darkBlue")});
`;
