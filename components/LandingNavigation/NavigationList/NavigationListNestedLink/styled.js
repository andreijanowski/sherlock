import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { downThanBreakpoint, themeGet } from "utils/theme";

export const PopupContainer = styled.div`
  padding: 24px;
  display: flex;
  background: rgb(${p => p.theme.colors.white});
  box-shadow: 0px 4px 27px rgba(${p => p.theme.colors.black}, 0.3);
  border-radius: 13px;

  &:before {
    content: ' ';
    display: block;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid white;
    width: 0px;
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
  }

  ${downThanBreakpoint(2)} {
    display: block;
    padding: 16px;
    border-radius: 0;
    box-shadow: none;
    border-bottom: 1px solid rgb(${themeGet("colors.border")});
  }
`;

export const NestedLinkContainer = styled(Flex)`
  color: rgb(${p => p.theme.colors.white});
  cursor: pointer;
`;

export const Link = styled.a`
  display: flex;
  align-items: center;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 20px;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  ${p =>
    p.isDisabled
      ? `
      cursor: not-allowed;
      color: rgb(${themeGet("colors.gray.3")})
    `
      : `
      &:hover {
        opacity: 0.8;
      }
    `}
`;

export const Section = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  font-size: ${p => p.theme.fontSizes.f14};
  font-weight: ${p => p.theme.fontWeights.semiBold};
`;

export const Title = styled.div`
  color: rgb(${p => p.theme.colors.mischka});
  text-transform: uppercase;
  margin-bottom: 32px;
`;

export const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 12px;
`;

export const LinkWrapper = styled.div`
  padding: 16px 0;
`;
