import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Form = styled(Flex).attrs(() => ({
  as: "form",
  flexDirection: "column",
  width: 1
}))`
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);

  h3 {
    color: rgb(
      ${p =>
        p.onboarding ? p.theme.colors.b2bSecondary : p.theme.colors.black}
    );
    font-weight: ${p => (p.onboarding ? "700" : "400")};
    font-size: ${p => (p.onboarding ? "24px" : "21px")};
    margin-bottom: ${p => (p.onboarding ? "6px" : "16px")};
  }

  p {
    font-size: ${p => (p.onboarding ? "14px" : "18x")};
    color: rgb(${p => p.onboarding && p.theme.colors.buttonSecondary});
  }
`;

export const Actions = styled(Flex).attrs(() => ({
  width: 96,
  mb: 3
}))`
  /* stylelint-disable-line no-empty-block */
`;

export const PublishMobileIconWrapper = styled(Flex).attrs(() => ({
  alignItems: "center",
  mb: 2
}))`
  background-color: rgb(${p => p.theme.colors.white});
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: none;
  }
`;

export const PublishHeader = styled.p`
  margin-left: 8px;
`;

export const TypesWrapper = styled(Flex).attrs(() => ({
  mx: -2,
  flexWrap: "wrap"
}))`
  position: relative;
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
