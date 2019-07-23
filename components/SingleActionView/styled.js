import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { H2, Paragraph } from "components";

export const Wrapper = styled(Flex).attrs(() => ({
  width: 1,
  flexDirection: ["column", "column", "row"],
  p: [3, 3, 0]
}))`
  min-height: 100vh;
  background-color: rgb(${p => p.theme.colors.white});
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    background: none;
  }
`;

export const RightBox = styled(Flex)`
  position: relative;
  background-color: white;

  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    min-height: 100vh;
    &::after {
      position: absolute;
      top: -30%;
      left: -20%;
      z-index: -1;
      width: 130%;
      height: 160%;
      background-color: white;
      border-top-left-radius: 100%;
      border-bottom-left-radius: 100%;
      box-shadow: -30px 0px 60px 0px rgba(0, 0, 0, 0.1);
      content: "";
    }
  }
`;

export const RightBoxChildrenWrapper = styled(Box)`
  max-width: 600px;
`;

export const LeftBox = styled(Flex).attrs(() => ({
  pr: [0, 0, "12%"],
  pl: [0, 0, 80]
}))`
  flex-direction: row;
`;

export const H2Styled = styled(H2)`
  text-align: center;
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    text-align: start;
  }
`;

export const ParagraphStyled = styled(Paragraph)`
  text-align: center;
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    text-align: start;
  }
`;

export const SherlockMark = styled.div`
  display: none;
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    position: absolute;
    top: 80px;
    display: block;
    margin: 0;
  }
`;

export const BackWrapper = styled(Flex).attrs(() => ({
  justifyContent: ["center", "center", "flex-start"]
}))`
  position: relative;
`;

export const LogoMobileWrapper = styled.div`
  display: block;
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    display: none;
  }
`;

export const BackToLandingPage = styled.a`
  position: absolute;
  top: 9px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: rgb(${p => p.theme.colors.dark});
  border: 2px solid rgba(${p => p.theme.colors.dark}, 0.4);
  border-radius: 100%;
  &:hover {
    border: 2px solid rgba(${p => p.theme.colors.dark}, 1);
  }

  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    position: static;
    margin-top: 0;
    margin-bottom: 36px;
    margin-left: 0;
  }
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    width: 20px;
    height: 20px;
  }
`;
