import { Flex } from "@rebass/grid";
import styled from "styled-components";

import { Button } from "components";

export const Wrapper = styled(Flex).attrs(() => ({
  px: [3, 4],
  pt: [3, 4],
  pb: [null, 3],
  flexWrap: "wrap"
}))`
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const NoPartners = styled(Flex)`
  height: 200px;
`;

export const GridWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 32px;
  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const BackToListButton = styled(Flex)`
  color: rgb(${p => p.theme.colors.navyBlue});
  cursor: pointer;
`;

export const BlueButton = styled(Button)`
  width: auto;
`;

export const IframeWrapper = styled.iframe`
  width: 100%;
  flex: 1;
  min-height: 500px;
  border: none;
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;
