import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs(() => ({
  justifyContent: "space-between"
}))`
  position: relative;
  max-height: 75vh;
  overflow: scroll;
  display: flex;
  flex-direction: ${p => (p.row ? "row" : "column")};
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1400px) {
    max-height: 85vh;
  }
`;

export const Content = styled(Flex).attrs(() => ({
  justifyContent: "space-between"
}))`
  position: relative;
`;

export const Title = styled.h4`
  font-weight: 700;
  font-size: 24px !important;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  margin: 10px 0;
`;

export const InfoWrapper = styled(Box)`
  margin: 10px auto;
  height: 100%;
`;

export const HintModal = styled.div`
  position: absolute;
  top: 150px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-around;
  align-items: center;
  padding: 16px 24px;
  width: 416px;
  height: 250px;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  z-index: 1;
  right: 400px;
  border-radius: 16px;
  margin: 0 auto;
  background-color: rgb(${p => p.theme.colors.white});
  box-shadow: 34px 18px 66px rgba(170, 172, 175, 0.15),
    7.75433px 25px 69px rgba(69, 71, 75, 0.15);

  > button {
    max-width: 120px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 105px;
    right: -15px;
    width: 35px;
    height: 35px;
    border-radius: 6px;
    background-color: rgb(${p => p.theme.colors.white});
    transform: rotate(45deg);
    z-index: 0;
  }
`;
