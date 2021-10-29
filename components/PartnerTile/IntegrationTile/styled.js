import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Container = styled(Flex)`
  position: relative;
  min-height: 100%;
  flex-direction: column;
  padding: 24px 12px;
  border: 1px solid rgba(${p => p.theme.colors.gray["3"]});
  border-radius: ${p => p.theme.radius.double};
  box-shadow: 0px 0px 14.5193px rgba(55, 81, 255, 0.15);
  transition: border-color 0.2s;
  ${p =>
    p.isConnectedOrPending &&
    `
    border-color: rgb(${p.theme.colors.navyBlue});
  `}
  @media (max-width: 900px) {
    min-height: auto;
  }
`;

export const ImageContainer = styled.div`
  padding: 6px;
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0px 2px 11px rgba(42, 90, 234, 0.22);
`;

export const Image = styled.img`
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

export const Name = styled.div`
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: ${p => p.theme.fontSizes.f21};
`;

export const IntegrationFullyConnectedCheckmark = styled.img.attrs({
  src: "/static/img/integrationConnected.svg"
})`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
`;

export const IntegrationStatus = styled.div`
  position: absolute;
  top: 9px;
  right: 24px;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: 8px;
  line-height: ${p => p.theme.fontSizes.f12};
  color: rgb(${p => p.color});
`;
