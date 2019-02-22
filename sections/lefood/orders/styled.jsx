import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const ColumnsWrapper = styled(Flex).attrs({ mx: -2 })``;
export const ColumnWrapper = styled(Flex).attrs({
  flexDirection: "column",
  width: 1 / 5,
  p: 2
})``;
export const ColumnHeader = styled(Flex).attrs({})``;
export const ColumnTitle = styled(Box).attrs({})``;
export const OrdersNumber = styled(Box).attrs({})``;
export const OrdersWrapper = styled(Flex).attrs({
  flexDirection: "column",
  p: 2
})`
  background-color: rgb(${p => p.theme.colors.snuff});
  border-radius: ${p => p.theme.radius.default};
  height: 100%;
`;
export const OrderWrapper = styled(Flex).attrs({
  flexDirection: "column",
  mb: 2
})`
  border: 1px solid rgb(${p => p.theme.colors.lavenderGray});
  border-radius: ${p => p.theme.radius.default};
  overflow: hidden;
`;
export const OrderHeader = styled(Flex).attrs({
  px: 3,
  py: 2,
  alignItems: "center",
  justifyContent: "space-between"
})`
  line-height: 24px;
  background-color: rgb(${p => p.theme.colors.background});
  border-bottom: 1px solid rgb(${p => p.theme.colors.lavenderGray});
`;
export const OrderPrice = styled(Box).attrs({})`
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f14};
`;
export const OrderTime = styled(Box).attrs({})`
  color: rgba(${p => p.theme.colors.abbey});
  font-size: ${p => p.theme.fontSizes.f12};
`;
export const OrderDetails = styled(Flex).attrs({
  flexDirection: "column",
  p: 3
})`
  background-color: rgb(${p => p.theme.colors.white});
`;
export const OrderDetail = styled(Box).attrs({})`
  color: rgba(${p => p.theme.colors.abbey});
  font-size: ${p => p.theme.fontSizes.f14};
`;
