import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const FormWrapper = styled(Flex).attrs(() => ({
  flexDirection: "column",
  width: 1
}))`
  background-color: rgb(${p => p.theme.colors.white});
`;

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

  @media (max-width: 1450px) {
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
  font-size: 36px !important;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  margin: 10px 0;
`;

export const Header = styled.h5`
  font-weight: 700;
  font-size: 24px !important;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  margin: 46px 0 12px;
`;

export const Center = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const InfoWrapper = styled(Box)`
  margin: 10px auto 0;
  height: ${p => p.height || "100%"};
  min-width: ${p => p.minWidth};
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  label {
    margin-bottom: 14px;
  }
`;

export const Info = styled.h5`
  font-weight: ${p => p.fw || "400"};
  font-size: ${p => p.fs || "18px"};
  color: rgb(
    ${p => (p.black ? p.theme.colors.black : p.theme.colors.buttonSecondary)}
  );
  margin: ${p => p.margin || "12px 0 46px"};
  text-align: ${p => p.align || "initial"};
  line-height: ${p => p.lh || "normal"};
`;

export const InputWrapper = styled.div`
  input {
    max-width: 515px;
  }
`;

export const FieldLabel = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  padding: 8px 0;
`;

export const Optional = styled.span`
  color: rgb(${p => p.theme.colors.mischka});
  margin-left: 5px;
`;

export const Link = styled.button`
  display: inline-block;
  align-self: flex-start;
  padding: 0;
  background-color: transparent;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  color: rgb(${p => p.theme.colors.deepSkyBlue});
`;

export const Hint = styled.div`
  position: relative;
  padding: 24px;
  top: -12px;
  left: 3px;
  width: calc(100% - 6px);
  background-color: rgb(${p => p.theme.colors.white});
  box-shadow: 0px 0px 10px rgba(55, 81, 255, 0.15);
  border-radius: 4px;
`;

export const Blue = styled.span`
  color: rgb(${p => p.theme.colors.blue});
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
