import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Card = styled(Flex)`
  padding: 24px 16px;
  background: rgb(${p => p.theme.colors.lightBlue});
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const DetectiveIconWrapper = styled.div`
  position: absolute;
  top: -5px;
  left: -5px;
`;

export const Info = styled.div`
  font-size: ${p => p.theme.fontSizes.f14};
  word-break: break-all;
  line-height: 21px;
  color: rgb(${p => p.theme.colors.black});
`;

export const LoadMoreButton = styled(Flex).attrs({
  justifyContent: "center",
  alignItems: "center"
})`
  width: 100%;
  .ExpandIcon {
    stroke-opacity: 1;
    stroke: rgb(${p => p.theme.colors.blue});
  }
`;
