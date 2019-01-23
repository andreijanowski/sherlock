import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const RightBox = styled(Flex)`
  background-color: white;
  min-height: 100vh;
  position: relative;
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
`;

export const LeftBox = styled(Flex)`
  padding-right: 12%;
  padding-left: 80px;
  flex-direction: row;
`;

export const SherlockMark = styled.div`
  position: absolute;
  margin: 0;
  top: 80px;
`;

export const BackToLandingPage = styled.a`
  display: flex;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(${({ theme }) => theme.colors.dark}, 0.4);
  color: rgb(${({ theme }) => theme.colors.dark});
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
  &:hover {
    border: 2px solid rgba(${({ theme }) => theme.colors.dark}, 1);
  }
`;
