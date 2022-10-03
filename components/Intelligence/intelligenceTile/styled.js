import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Container = styled(Flex)`
  position: relative;
  min-height: 100%;
  min-width: 100%;
  flex-direction: column;
  padding: 24px 12px;
  border: 1px solid
    rgba(
      ${p =>
        p.isLandingPage ? p.theme.colors.navyBlue : p.theme.colors.gray["3"]}
    );
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
  color: rgb(${p => p.theme.colors.darkBlue});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: ${p => p.theme.fontSizes.f21};
`;

export const Description = styled.div`
  color: rgb(${p => p.theme.colors.gray});
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f12};
  line-height: ${p => p.theme.fontSizes.f16};
`;
