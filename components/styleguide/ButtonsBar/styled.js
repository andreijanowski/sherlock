import styled from "styled-components";
import { Flex } from "@rebass/grid";

const BORDER_RADIUS = "24px";

export const Container = styled.div`
  text-align: center;
`;

export const List = styled(Flex)`
  display: inline-flex;
  border: 1px solid rgb(${p => p.primaryColor});
  border-radius: ${BORDER_RADIUS};
  z-index: 0;
`;

export const ListItem = styled.button`
  z-index: 1;
  padding: ${p => (p.slim ? "4px 16px" : "8px 24px")};
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: ${p => p.theme.fontSizes.f22};
  letter-spacing: 0.01em;
  color: rgb(${p => p.primaryColor});
  background: transparent;
  border: none;
  cursor: pointer;
  appearance: none;
  white-space: nowrap;

  ${p =>
    p.isActive &&
    `
      color: rgb(${p.secondaryColor});
      background: rgb(${p.primaryColor});
      border-radius: ${BORDER_RADIUS};
  `}
`;
