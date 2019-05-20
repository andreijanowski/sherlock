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
  /* stylelint-disable-line no-empty-block */
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
  color: rgb(${p => p.theme.colors.blue});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f14};
  background-color: rgb(${p => p.theme.colors.white});
  border: 2px solid rgb(${p => p.theme.colors.blue});
  border-radius: ${p => p.theme.radius.default};
`;

export const StepTip = styled.div`
  color: rgba(${p => p.theme.colors.dark}, 0.64);
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 28px;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f24};
  }
`;

export const StepName = styled.a`
  color: rgb(${p => p.theme.colors.blue});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 32px;
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
  color: ${p =>
    p.isFilled || !p.isValid
      ? `rgb(${p.theme.colors.white})`
      : `rgba(${p.theme.colors.dark}, 0.32)`};
  background-color: rgb(
    ${p => (p.isFilled ? p.theme.colors.blue : p.theme.colors.white)}
  );
  border-radius: 20px;
  ${p => !p.isValid && `background-color: rgb(${p.theme.colors.ruby});`}
  ${p => !p.isFilled && `border: 3px solid rgba(${p.theme.colors.dark}, 0.08);`}

  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    height: 40px;
  }
`;
