import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Container = styled(Flex).attrs(p =>
  p.isVertical
    ? {
        flexDirection: "column"
      }
    : {}
)`
  align-items: center;
  color: rgb(${p => p.theme.colors.landingDarkBlue});
  cursor: pointer;
`;

export const Label = styled.div`
  font-size: ${p => p.theme.fontSizes.f24};
  font-weight: ${p => p.theme.fontWeights.medium};
  line-height: 25px;
`;

export const Icon = styled.div`
  svg {
    height: 62px;
    width: 62px;
  }
`;
