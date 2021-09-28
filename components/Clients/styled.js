import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const Pane = styled(Flex)`
  overflow: auto;
  padding: ${p => (p.noPadding ? undefined : "20px 30px 15px")};
  background: rgb(${p => p.theme.colors.white});
  box-shadow: 0px 0px 17px rgba(55, 81, 255, 0.15);
  border-radius: ${p => p.theme.radius.double};
  letter-spacing: 0.2px;
`;

export const LoadingIndicatorWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  height: 50px;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  background: rgb(${p => p.theme.colors.background});
  ${p =>
    p.small &&
    `
    width: 70px;
    height: 70px;
  `}
  ${p =>
    p.big &&
    `
    width: 160px;
    height: 160px;
  `}
`;

export const AvatarWrapper = styled(Box)`
  position: relative;
`;

export const Name = styled.div`
  white-space: nowrap;
  color: rgb(${p => p.theme.colors.black});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 18px;
  ${p =>
    p.big &&
    `  
    font-weight: ${p.theme.fontWeights.bold};
    font-size: ${p.theme.fontSizes.f24};
    line-height: 36px;
    letter-spacing: 3px;
    white-space: pre-line;
    word-break: break-word;
    text-align: center;
  `}
`;

export const DetectiveLabel = styled.div`
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 1;
  text-align: left;
  color: rgb(${p => p.theme.colors.blue});
`;
