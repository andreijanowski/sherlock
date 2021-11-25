import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const PopupContainer = styled(Flex)`
  padding: 24px;
  background: rgb(${p => p.theme.colors.white});
  box-shadow: 0px 4px 27px rgba(${p => p.theme.colors.white}, 0.3);
  border-radius: 13px;
`;

export const NestedLinkContainer = styled(Flex)`
  color: rgb(${p => p.theme.colors.white});
  cursor: pointer;
`;

export const LinksGroupLabel = styled.div`
  margin: 0 0 4px -4px;
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f12};
  line-height: 20px;
  color: rgb(${p => p.theme.colors.blue});
`;

export const LinksGroupItem = styled.a`
  display: block;
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 20px;
  color: #0e113b;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;
