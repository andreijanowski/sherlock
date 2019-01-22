import styled from "styled-components";
import { Box } from "@rebass/grid";
import { Paragraph, Button } from "components";

export const SuccessMessageWrapper = styled(Paragraph)`
  max-width: 558px;
  text-align: center;
  margin: 0 auto;
`;

export const FormContainer = styled.form`
  position: relative;
  width: 100%;
  max-width: 558px;
  ${Button} {
    width: 100%;
  }
`;

export const Separator = styled(Box).attrs(({ size }) => ({
  as: "p",
  my: size
}))`
  font-size: ${({ theme }) => theme.fontSizes.f10};
  color: rgba(${({ theme }) => theme.colors.dark}, 0.4);
  line-height: ${({ theme }) => theme.fontSizes.f24};
  position: relative;
  text-transform: uppercase;
  text-align: center;
  position: relative;
  border: none;
  width: 100%;
  &::after,
  &::before {
    content: "";
    position: absolute;
    width: calc(50% - 48px);
    top: calc(50% - 1px);
    border-bottom: 2px solid rgb(238, 239, 239);
  }
  &::after {
    right: 0;
  }
  &::before {
    left: 0;
  }
`;
