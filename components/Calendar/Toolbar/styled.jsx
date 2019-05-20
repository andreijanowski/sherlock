import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Period = styled(Flex).attrs({
  justifyContent: "space-between",
  alignItems: "center"
})`
  padding: 16px;
  color: rgb(${p => p.theme.colors.dark});
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 28px;
`;

export const NavigationItem = styled.div`
  color: rgb(${p => p.theme.colors.dark});
  cursor: pointer;
  &:hover {
    color: rgb(${p => p.theme.colors.blue});
  }
`;
