import styled, { createGlobalStyle } from "styled-components";
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
