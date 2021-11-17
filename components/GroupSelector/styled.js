import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Container = styled(Flex).attrs({
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "nowrap"
})``;

export const Label = styled.div`
  margin-right: 16px;
  color: #000;
`;
export const OptionsContainer = styled(Flex)`
  width: 100%;
  max-width: 330px;
  flex-wrap: nowrap;
`;

export const Caption = styled.span`
  color: rgb(${p => p.theme.colors.plansCaptionBlue});
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f12};
  line-height: ${p => p.theme.fontSizes.f12};
`;

export const Option = styled.div`
  flex: 1;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  border: 1px solid rgb(${p => p.theme.colors.black});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f13};
  line-height: ${p => p.theme.fontSizes.f13};
  &:not(:last-child) {
    border-right: none;
  }
  &:first-child {
    border-radius: 13px 0 0 13px;
  }
  &:last-child {
    border-radius: 0 13px 13px 0;
  }
  ${p =>
    p.isActive &&
    `
    color: rgb(${p.theme.colors.white});
    background-color: rgb(${p.theme.colors.textDarkBlue});
    ${Caption} {
      color: rgb(${p.theme.colors.white});
    }
  `}
`;
