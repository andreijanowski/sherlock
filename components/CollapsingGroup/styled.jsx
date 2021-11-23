import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const CollapsingGroupContainer = styled(Box)`
  list-style: none;
`;

export const CollapsingGroupToggle = styled(Flex)`
  align-items: center;
  flex-wrap: nowrap;
  padding: 6px 6px 6px 18px;
  color: rgb(${p => p.theme.colors.textDarkBlue});
  cursor: pointer;
`;

export const CollapsingGroupContent = styled.ul`
  margin: 0;
  padding-left: 0;
`;

export const CollapsingGroupTitle = styled(Box)`
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: ${p => p.theme.fontSizes.f24};
`;
