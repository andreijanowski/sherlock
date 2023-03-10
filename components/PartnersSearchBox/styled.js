import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  margin: ${p => (p.centered ? "24px auto" : "0")};
  margin-bottom: 24px;
  max-width: 440px;
`;

export const Input = styled.input`
  position: relative;
  width: 100%;
  padding-left: 48px;
  padding-right: 40px;
  min-height: 35px;
  font-size: ${p => p.theme.fontSizes.f15};
  font-weight: ${p => p.theme.fontWeights.semiBold};
  line-height: 24px;
  border: none;
  box-shadow: 0 0 5px 0 rgb(${p => p.theme.colors.greyBorder});
  border-radius: 20px;
  &:focus {
    outline: none;
  }
`;

const BaseIconCSS = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  line-height: 0;
  ${p => p.clickable && "cursor: pointer"};
  z-index: 1;
`;

export const LeftIcon = styled.div`
  ${BaseIconCSS};
  left: 16px;
`;

export const RightIcon = styled.div`
  ${BaseIconCSS}
  right: 12px;
  font-size: ${p => p.theme.fontSizes.f18};
`;
