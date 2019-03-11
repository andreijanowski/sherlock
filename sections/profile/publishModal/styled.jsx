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
})``;

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
  text-align: left;
  position: relative;
  border: 3px solid rgba(${p => p.theme.colors.dark}, 0.08);
  border-radius: ${p => p.theme.radius.default};
`;

export const StepNumber = styled.div`
  position: absolute;
  border: 2px solid rgb(${p => p.theme.colors.blue});
  border-radius: ${p => p.theme.radius.default};
  background-color: rgb(${p => p.theme.colors.white});
  color: rgb(${p => p.theme.colors.blue});
  padding: 0 8px;
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f14};
  top: -12px;
`;

export const StepTip = styled.div`
  line-height: 28px;
  font-size: ${p => p.theme.fontSizes.f16};
  color: rgba(${p => p.theme.colors.dark}, 0.64);
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f24};
  }
`;

export const StepName = styled.a`
  line-height: 32px;
  font-size: ${p => p.theme.fontSizes.f18};
  color: rgb(${p => p.theme.colors.blue});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  text-decoration: none;
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
  background-color: rgb(
    ${p => (p.isChecked ? p.theme.colors.blue : p.theme.colors.white)}
  );
  color: ${p =>
    p.isChecked
      ? `rgb(${p.theme.colors.white})`
      : `rgba(${p.theme.colors.dark}, 0.32)`};
  border-radius: 20px;
  ${p =>
    !p.isChecked && `border: 3px solid rgba(${p.theme.colors.dark}, 0.08);`}

    @media (min-width: ${p => p.theme.breakpoints[0]}) {
      height: 40px;
  }
`;
