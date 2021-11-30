import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Container = styled.div`
  flex: auto;
  position: relative;
`;

export const Partner = styled(Flex)`
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 10px;
  ${p => `
      left: ${p.left}px;
      top: ${p.top}px;
      width: ${p.size}px;
      height: ${p.size}px;
    `}
  border-radius: 50%;
  background: rgb(${p => p.theme.colors.white});
  box-shadow: 0px 0px 26.5762px rgba(14, 17, 59, 0.2);
`;

export const PartnerLabel = styled.div`
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: 8px;
  line-height: ${p => p.theme.fontSizes.f12};
  color: rgb(${p => p.theme.colors.landingDarkBlue});
  text-align: center;
`;

export const PartnerIcon = styled.img`
  max-width: 100%;
`;
