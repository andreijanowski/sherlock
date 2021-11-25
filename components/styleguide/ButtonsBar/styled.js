import styled from "styled-components";
import { Flex } from "@rebass/grid";

const BORDER_RADIUS = "24px";

export const Container = styled(Flex)`
  border: 1px solid rgb(${p => p.theme.colors.white});
  border-radius: ${BORDER_RADIUS};
  z-index: 0;
`;

export const Item = styled.button`
  z-index: 1;
  padding: 8px 24px;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: ${p => p.theme.fontSizes.f22};
  letter-spacing: 0.01em;
  color: rgb(${p => p.theme.colors.white});
  background: transparent;
  border: none;
  cursor: pointer;
  appearance: none;

  ${p =>
    p.isActive &&
    `
      color: rgb(${p.theme.colors.blue});
      background: rgb(${p.theme.colors.white});
      border-radius: ${BORDER_RADIUS};
  `}
`;
