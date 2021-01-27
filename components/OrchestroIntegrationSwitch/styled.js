import styled from "styled-components";
import { Box } from "@rebass/grid";

export const Option = styled(Box)`
  color: ${p =>
    p.dark
      ? `rgba(${p.theme.colors.dark}, 0.8)`
      : `rgb(${p.theme.colors.blue})`};
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f15};
  line-height: 20px;
  letter-spacing: 0.3px;
  opacity: 0.8;
`;

export const SwitchWrapper = styled(Box)`
  height: 39px;
  padding: 4px;
  background: linear-gradient(
    to right,
    rgba(${p => p.theme.colors.dark}, 0.4),
    rgb(${p => p.theme.colors.blue})
  );
  border-radius: 45px;
`;

export const ModalHeader = styled.h1`
  font-size: 18px;
`;

export const Label = styled.label`
  position: absolute;
  top: 10px;
  margin-left: 16px;
  font-size: 12px;
  transform: translateY(-50%);
  transform-origin: left;
  pointer-events: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f16};
  }
`;
