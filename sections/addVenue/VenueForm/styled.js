import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { Paragraph } from "components";

export const SuccessMessageWrapper = styled(Paragraph)`
  max-width: 558px;
  text-align: center;
  margin: 0 auto;
  word-break: break-word;
`;

export const HelperTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.f24};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  margin: 0 0 16px 0;
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
  overflow-y: auto;
  max-height: calc(100vh - 330px);
  position: relative;
  max-width: 570px;
`;

export const CustomRadioButtonPlaceholder = styled.span`
  display: block;
  width: 120px;
`;

export const RadioButtonsContainer = styled(Flex).attrs({
  width: 1,
  alignItems: "center",
  justifyContent: "space-between"
})`
  max-width: 570px;
`;
