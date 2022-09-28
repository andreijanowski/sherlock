import styled from "styled-components";
import { Flex } from "@rebass/grid";
import { H3, Input as BaseInput } from "components/index";

export const TotalClientsCount = styled.div`
  padding: 0 20px;
  color: rgb(${p => p.theme.colors.darkText});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f21};
  line-height: 31px;
  background: rgba(${p => p.theme.colors.violet}, 0.3);
  border-radius: ${p => p.theme.radius.default};
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    font-size: ${p => p.theme.fontSizes.f28};
    line-height: 42px;
  }
`;

export const TotalClientsLabel = styled(H3)`
  margin-bottom: 0;
  color: rgb(${p => p.theme.colors.navyBlue});
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 27px;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    font-size: ${p => p.theme.fontSizes.f28};
    line-height: 42px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    max-width: 270px;
    margin-left: 16px;
  }
`;

export const Input = styled(BaseInput)`
  padding-right: 32px;
  background: rgb(${p => p.theme.colors.white});
  border: 1px solid rgb(${p => p.theme.colors.greyBorder});
  &:hover,
  &:focus {
    box-shadow: none;
    background: rgb(${p => p.theme.colors.white});
  }
`;

export const InputIcon = styled(Flex).attrs({
  justifyContent: "center",
  alignItems: "center"
})`
  position: absolute;
  top: 50%;
  right: 15px;
  font-size: 24px;
  transform: translateY(-50%);
  ${p => p.onClick && `cursor: pointer;`}
`;

export const Pane = styled(Flex)`
  margin-top: 15px;
  overflow: auto;
  padding: ${p => (p.noPadding ? undefined : "20px 30px 15px")};
  background: rgb(${p => p.theme.colors.white});
  box-shadow: 0px 0px 17px rgba(55, 81, 255, 0.15);
  border-radius: ${p => p.theme.radius.double};
  letter-spacing: 0.2px;
`;
