import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const Container = styled(Flex)`
  position: relative;
  max-height: 150px;
  min-width: 240px;
  margin-right: 27px;
  flex-direction: column;
  padding: 24px 12px;
  border: ${p =>
    p.isAvailable
      ? `2px solid rgba(${p.theme.colors.b2bSecondary})`
      : `1px solid rgba(${p.theme.colors.gray["3"]})`};
  border-radius: ${p => p.theme.radius.double};
  box-shadow: 0px 0px 14.5193px rgba(55, 81, 255, 0.15);
  transition: border-color 0.2s;
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
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: ${p => p.theme.fontSizes.f16};
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f12};
  line-height: ${p => p.theme.fontSizes.f16};
`;

export const ParnterFullyConnectedCheckmark = styled.img.attrs({
  src: "/static/img/partnerConnected.svg"
})`
  position: relative;
  height: 18px;
`;

export const ButtonWrapper = styled(Box)`
  width: 100%;
  display: flex;
  &:not(:last-child) {
    margin-right: 16px;
  }

  @media (max-width: 1200px) {
    &:not(:last-child) {
      margin-right: 0;
      margin-bottom: 16px;
    }
  }

  > button {
    color: rgb(${p => p.theme.colors.b2bSecondary});
    border: 1px solid rgba(${p => p.theme.colors.b2bSecondary});

    &:not(:last-child) {
      margin-right: 16px;
    }

    &:hover {
      border: 1px solid rgba(${p => p.theme.colors.blue}) !important;
    }
  }
`;

export const InfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgb(${p => p.theme.colors.b2bSecondary});
  border-radius: 6px;
  color: rgb(${p => p.theme.colors.white});
  background-color: rgb(${p => p.theme.colors.b2bSecondary});
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f12};
  min-width: 86px;
  width: 100%;
  min-height: 28px;
`;
