import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const ColumnsWrapper = styled(Flex).attrs({ mx: -2 })`
  overflow: auto;
`;
export const ColumnWrapper = styled(Flex).attrs({
  flexDirection: "column",
  width: 1 / 5,
  p: 2
})`
  min-width: 280px;
`;
export const ColumnHeader = styled(Flex).attrs({
  py: 3,
  px: 2,
  justifyContent: "space-between",
  alignItems: "center"
})``;
export const ColumnTitle = styled(Box).attrs({})`
  font-size: ${p => p.theme.fontSizes.f21};
  color: rgb(${p => p.theme.colors.dark});
`;
export const OrdersNumber = styled(Box).attrs({ width: 32 })`
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 16px;
  background-color: rgba(
    ${p => (p.canceled ? p.theme.colors.ruby : p.theme.colors.blue)},
    0.1
  );
  color: rgb(${p => (p.canceled ? p.theme.colors.ruby : p.theme.colors.blue)});
  font-size: ${p => p.theme.fontSizes.f14};
  font-weight: ${p => p.theme.fontWeights.bold};
`;
export const OrdersWrapper = styled(Flex).attrs({
  flexDirection: "column",
  p: 2
})`
  ${p =>
    p.canceled
      ? `background: repeating-linear-gradient(45deg, 
          rgb(${p.theme.colors.white}),
          rgb(${p.theme.colors.white}) 10px,
          rgb(${p.theme.colors.linkWater}) 10px,
          rgb(${p.theme.colors.linkWater}) 11px);
        border: 1px solid rgb(${p.theme.colors.linkWater})`
      : `background-color: rgb(${p.theme.colors.linkWater})`};
  border-radius: ${p => p.theme.radius.default};
  height: 100%;
`;
export const OrderWrapper = styled(Flex).attrs({
  flexDirection: "column",
  mb: 2
})`
  border: 1px solid rgb(${p => p.theme.colors.linkWaterDark});
  border-radius: ${p => p.theme.radius.default};
  overflow: hidden;
  ${p => p.canceled && "opacity: 0.6;"}
`;
export const OrderHeader = styled(Flex).attrs({
  px: 3,
  py: 2,
  alignItems: "center",
  justifyContent: "space-between"
})`
  line-height: 24px;
  background-color: rgb(${p => p.theme.colors.titanWhite});
  border-bottom: 1px solid rgb(${p => p.theme.colors.linkWaterDark});
`;
export const OrderPrice = styled(Box).attrs({})`
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f14};
`;
export const OrderTime = styled(Box).attrs({})`
  color: rgba(${p => p.theme.colors.rollingStone});
  font-size: ${p => p.theme.fontSizes.f12};
`;
export const OrderDetails = styled(Flex).attrs({
  flexDirection: "column",
  p: 3
})`
  background-color: rgb(${p => p.theme.colors.white});
`;
export const OrderDetail = styled(Box).attrs({})`
  color: rgba(${p => p.theme.colors.rollingStone});
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 24px;
`;

export const PaymentConfirmed = styled(Flex).attrs({
  mb: 2
})`
  color: rgb(${p => p.theme.colors.greenHaze});
  font-size: ${p => p.theme.fontSizes.f14};
`;

export const ModalHeader = styled.h3`
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 1.5;
  color: rgb(${p => p.theme.colors.dark});
  text-align: center;
  font-weight: ${p => p.theme.fontWeights.regular};
`;
