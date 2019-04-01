import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { H2, Paragraph } from "components";

export const Wrapper = styled(Flex).attrs({
  width: 1,
  flexDirection: ["column", "column", "row"],
  p: [3, 3, 0]
})`
  min-height: 100vh;
  background-color: rgb(${p => p.theme.colors.white});
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    background: none;
  }
`;

export const RightBox = styled(Flex)`
  background-color: white;
  position: relative;

  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    min-height: 100vh;
    &::after {
      content: "";
      position: absolute;
      width: 130%;
      left: -20%;
      top: -30%;
      height: 160%;
      background-color: white;
      z-index: -1;
      border-bottom-left-radius: 100%;
      border-top-left-radius: 100%;
      box-shadow: -30px 0px 60px 0px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const RightBoxChildrenWrapper = styled(Box)`
  max-width: 558px;
`;

export const LeftBox = styled(Flex).attrs({
  pr: [0, 0, "12%"],
  pl: [0, 0, 80]
})`
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
    display: block;
    position: absolute;
    margin: 0;
    top: 80px;
  }
`;

export const BackWrapper = styled(Flex).attrs({
  justifyContent: ["center", "center", "flex-start"]
})`
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
  left: 0;
  top: 9px;
  display: flex;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(${p => p.theme.colors.dark}, 0.4);
  color: rgb(${p => p.theme.colors.dark});
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  &:hover {
    border: 2px solid rgba(${p => p.theme.colors.dark}, 1);
  }

  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    position: static;
    margin-top: 0;
    margin-left: 0;
    margin-bottom: 36px;
  }
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    width: 20px;
    height: 20px;
  }
`;
