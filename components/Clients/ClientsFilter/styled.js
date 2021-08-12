import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { H3, Input as BaseInput } from "components/index";

export const TotalClientsCount = styled.div`
  padding: 0 20px;
  color: rgb(${p => p.theme.colors.darkText});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f28};
  line-height: 42px;
  background: rgba(${p => p.theme.colors.violet}, 0.3);
  border-radius: ${p => p.theme.radius.default};
`;

export const TotalClientsLabel = styled(H3)`
  margin-bottom: 0;
  color: rgb(${p => p.theme.colors.black});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f28};
  line-height: 42px;
`;

export const InputWrapper = styled.div`
  position: relative;
  max-width: 270px;
  width: 100%;
  margin-left: 16px;
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
