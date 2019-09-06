import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const ColumnsWrapper = styled(Flex).attrs(() => ({ mx: -2 }))`
  overflow: auto;
`;

export const OrderDetail = styled(Box).attrs(() => ({ pb: 2 }))`
  color: rgba(${p => p.theme.colors.rollingStone});
  font-size: ${p => p.theme.fontSizes.f14};
`;

export const PaymentConfirmed = styled(Flex).attrs(() => ({
  mb: 2
}))`
  color: rgb(${p => p.theme.colors.greenHaze});
  font-size: ${p => p.theme.fontSizes.f14};
`;

export const WaitingForPayment = styled(PaymentConfirmed)`
  color: rgb(${p => p.theme.colors.carrotOrange});
`;

export const ElementsWrapper = styled(Box)`
  border: 1px solid rgb(${p => p.theme.colors.snuff});
  border-radius: ${p => p.theme.radius.small};
`;

export const OrderDetailWrapper = styled(Flex).attrs(() => ({
  justifyContent: "space-between",
  pb: 3
}))`
  color: rgb(
    ${p => (p.isBold ? p.theme.colors.dark : p.theme.colors.rollingStone)}
  );
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
`;
