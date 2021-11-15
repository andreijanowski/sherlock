import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const TableHintContainer = styled.div`
  position: relative;
  align-self: flex-start;
  margin-left: 6px;
`;

export const TableHintPopper = styled.div`
  min-width: 300px;
  padding: 24px;
  text-align: center;
  color: rgb(${p => p.theme.colors.darkText});
  background: rgb(${p => p.theme.colors.white});
  border-radius: 15px;
  filter: drop-shadow(0px 0px 21px rgba(83, 121, 247, 0.25));
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 15px;
    width: 15px;
    height: 15px;
    background: white;
    border-top-right-radius: 4px;
    transform-origin: left top;
    transform: rotate(-45deg);
  }
`;

export const TableHintIcon = styled(Flex)`
  align-items: flex-start;
  cursor: pointer;
  font-size: 12px;
  color: rgb(${p => p.theme.colors.navyBlue});
`;

export const TableHintTitle = styled.div`
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: ${p => p.theme.fontSizes.f22};
`;

export const TableHintCaption = styled.div`
  margin-top: 4px;
  font-style: italic;
  font-weight: ${p => p.theme.fontWeights.regular};
  font-size: ${p => p.theme.fontSizes.f12};
  line-height: ${p => p.theme.fontSizes.f15};
`;
