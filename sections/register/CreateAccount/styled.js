import styled from "styled-components";
import { Box } from "@rebass/grid";
import { Paragraph, TextSeparator } from "components";

export const SuccessMessageWrapper = styled(Paragraph)`
  max-width: 558px;
  text-align: center;
  margin: 0 auto;
`;

export const HelperTitle = styled.h2`
  font-size: ${p => p.theme.fontSizes.f16};
  font-weight: ${p => p.theme.fontWeights.semiBold};
  margin: 0 0 16px 0;
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

export const TextSeparatorStyled = styled(TextSeparator)`
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    display: none;
  }
`;
