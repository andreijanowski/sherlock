import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { Paragraph } from "components";

export const SuccessMessageWrapper = styled(Paragraph)`
  max-width: 558px;
  margin: 0 auto;
  text-align: center;
  word-break: break-word;
`;

export const HelperTitle = styled.h2`
  margin: 0 0 16px 0;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f16};
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    font-size: ${p => p.theme.fontSizes.f24};
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 558px;
  margin-bottom: 8px;
`;

export const Separator = styled(Box).attrs(({ size }) => ({
  as: "hr",
  mt: size
}))`
  border: none;
`;

export const FieldsContainer = styled.div`
  position: relative;
  max-width: 570px;
  max-height: calc(100vh - 330px);
  overflow-y: auto;
`;

export const CustomRadioButtonPlaceholder = styled.span`
  display: block;
  width: 120px;
`;

export const RadioButtonFieldContainer = styled(Flex).attrs(() => ({
  width: 0.25
}))`
  /* stylelint-disable-line no-empty-block */
`;

export const RadioButtonsContainer = styled(Flex).attrs(() => ({
  width: 1,
  flexWrap: "wrap",
  m: -1
}))`
  max-width: 570px;
`;
