import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Container = styled(Flex)`
  position: relative;
  justify-content: center;
`;

export const NavigationListItem = styled(Flex)`
  position: relative;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 25px;
  color: rgb(${p => p.theme.colors.white});
  ${p =>
    p.isActive &&
    `
    &:after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -10px;
      border: 3px solid rgb(${p.theme.colors.white});
      background: rgb(${p.theme.colors.white});
      border-radius: 10px;
    }
  `}
`;

export const LanguageSwitcherContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 32px;
  transform: translateY(-50%);
`;
