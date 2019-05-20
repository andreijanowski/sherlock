import styled, { createGlobalStyle } from "styled-components";
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
})`
  /* stylelint-disable-line no-empty-block */
`;

export const ColumnTitle = styled(Box)`
  color: rgb(${p => p.theme.colors.dark});
  font-size: ${p => p.theme.fontSizes.f21};
`;

export const OrdersNumber = styled(Box).attrs({ width: 32 })`
  height: 32px;
  color: rgb(${p => (p.rejected ? p.theme.colors.ruby : p.theme.colors.blue)});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 32px;
  text-align: center;
  background-color: rgba(
    ${p => (p.rejected ? p.theme.colors.ruby : p.theme.colors.blue)},
    0.1
  );
  border-radius: 16px;
`;

export const OrdersWrapper = styled(Flex).attrs({
  flexDirection: "column",
  p: 2
})`
  ${p =>
    p.rejected
      ? `background: repeating-linear-gradient(45deg,
          rgb(${p.theme.colors.white}),
          rgb(${p.theme.colors.white}) 10px,
          rgb(${p.theme.colors.linkWater}) 10px,
          rgb(${p.theme.colors.linkWater}) 11px);
        border: 1px solid rgb(${p.theme.colors.linkWater})`
      : `background-color: rgb(${p.theme.colors.linkWater})`};
  height: 100%;
  border-radius: ${p => p.theme.radius.default};
  ${p =>
    p.isDropDisabled && `background-color: rgba(${p.theme.colors.ruby}, 0.1);`}
`;

export const OrderWrapper = styled(Flex).attrs({
  flexDirection: "column",
  mb: 2
})`
  overflow: hidden;
  border: 1px solid rgb(${p => p.theme.colors.linkWaterDark});
  border-radius: ${p => p.theme.radius.default};
  ${p => p.rejected && "opacity: 0.6;"}
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

export const OrderPrice = styled(Box)`
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f14};
`;

export const OrderTime = styled(Box)`
  color: rgba(${p => p.theme.colors.rollingStone});
  font-size: ${p => p.theme.fontSizes.f12};
`;
export const OrderDetails = styled(Flex).attrs({
  flexDirection: "column",
  p: 3
})`
  background-color: rgb(${p => p.theme.colors.white});
`;

export const OrderDetail = styled(Box).attrs({ pb: 2 })`
  color: rgba(${p => p.theme.colors.rollingStone});
  font-size: ${p => p.theme.fontSizes.f14};
`;

export const PaymentConfirmed = styled(Flex).attrs({
  mb: 2
})`
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

export const SliderStyles = createGlobalStyle`
  .bm-burger-button {
    display: none
  }

  .bm-cross-button {
    top: 12px !important;
    right: 12px !important;
    width: 20px !important;
    height: 20px !important;
    border: 2px solid rgba(${p => p.theme.colors.dark}, 0.4);
    border-radius: 100%;
    cursor: pointer;

    > span {
      top: 7px !important;
      right: 13px !important;
    }
  }

  .bm-cross {
    width: 10px !important;
    height: 2px !important;
    background: rgb(${p => p.theme.colors.dark});
    border-radius: 2px;
  }

  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  .bm-menu {
    padding: 32px;
    background: rgb(${p => p.theme.colors.white});
  }

  .bm-item {
    outline: none;
  }

  .bm-overlay {
    background-color: rgba(${p => p.theme.colors.dark}, 0.16);
  }
`;

export const OrderDetailsHeader = styled.h2`
  margin: 0;
  padding-bottom: 32px;
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f24};
`;

export const OrderDetailsSubheader = styled(OrderDetailsHeader)`
  font-size: ${p => p.theme.fontSizes.f18};
`;

export const OrderDetailsSpacer = styled.div`
  width: calc(100% + 64px);
  height: 1px;
  margin: 8px -32px 24px -32px;
  background-color: rgb(${p => p.theme.colors.linkWaterDark});
`;

export const OrderDetailWrapper = styled(Flex).attrs({
  justifyContent: "space-between",
  pb: 3
})`
  color: rgb(
    ${p => (p.isBold ? p.theme.colors.dark : p.theme.colors.rollingStone)}
  );
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
`;

export const PersonalInformationName = styled.div`
  color: rgb(${p => p.theme.colors.bombay});
  font-size: ${p => p.theme.fontSizes.f12};
  line-height: 1.5;
`;
export const PersonalInformationValue = styled.div`
  padding-bottom: 16px;
  color: rgb(${p => p.theme.colors.dark});
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
`;

export const OrderDetailsState = styled(PersonalInformationValue)`
  /* stylelint-disable-line no-empty-block */
`;
