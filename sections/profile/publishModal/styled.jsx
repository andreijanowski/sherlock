import { Flex } from "@rebass/grid";
import styled from "styled-components";
import { H2 as RawH2 } from "components";

export const Wrapper = styled(Flex).attrs({
  flexDirection: "column"
})`
  max-width: 640px;
  text-align: center;
`;

export const Header = styled(Flex).attrs({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap"
})`
  /* stylelint-disable no-empty-block */
`;

export const H2 = styled(RawH2)`
  font-size: ${p => p.theme.fontSizes.f24};
`;

export const StepWrapper = styled(Flex).attrs({
  width: 1,
  p: 3,
  mb: 3,
  alignItems: "center",
  justifyContent: "space-between"
})`
  position: relative;
  text-align: left;
  border: 3px solid rgba(${p => p.theme.colors.dark}, 0.08);
  border-radius: ${p => p.theme.radius.default};
`;

export const StepNumber = styled.div`
  position: absolute;
  top: -12px;
  padding: 0 8px;
  font-size: ${p => p.theme.fontSizes.f14};
  font-weight: ${p => p.theme.fontWeights.bold};
  border: 2px solid rgb(${p => p.theme.colors.blue});
  border-radius: ${p => p.theme.radius.default};
  color: rgb(${p => p.theme.colors.blue});
  background-color: rgb(${p => p.theme.colors.white});
`;

export const StepTip = styled.div`
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 28px;
  color: rgba(${p => p.theme.colors.dark}, 0.64);
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f24};
  }
`;

export const StepName = styled.a`
  font-size: ${p => p.theme.fontSizes.f18};
  font-weight: ${p => p.theme.fontWeights.semiBold};
  line-height: 32px;
  text-decoration: none;
  color: rgb(${p => p.theme.colors.blue});
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f24};
  }
`;

export const StepStatus = styled(Flex).attrs({
  width: [30, 40],
  justifyContent: "center",
  alignItems: "center"
})`
  height: 30px;
  border-radius: 20px;
  color: ${p =>
    p.isChecked
      ? `rgb(${p.theme.colors.white})`
      : `rgba(${p.theme.colors.dark}, 0.32)`};
  background-color: rgb(
    ${p => (p.isChecked ? p.theme.colors.blue : p.theme.colors.white)}
  );
  ${p =>
    !p.isChecked && `border: 3px solid rgba(${p.theme.colors.dark}, 0.08);`}

  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    height: 40px;
  }
`;
