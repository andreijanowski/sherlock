import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Period = styled(Flex).attrs({
  justifyContent: "space-between",
  alignItems: "center"
})`
  line-height: 28px;
  padding: 16px;
  font-size: ${p => p.theme.fontSizes.f18};
  color: rgb(${p => p.theme.colors.dark});
`;

export const NavigationItem = styled.div`
  color: rgb(${p => p.theme.colors.dark});
  cursor: pointer;
  &:hover {
    color: rgb(${p => p.theme.colors.blue});
  }
`;
