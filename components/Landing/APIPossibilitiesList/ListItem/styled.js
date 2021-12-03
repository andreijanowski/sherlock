import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { H3 } from "components/styleguide/Typography";
import { downThanBreakpoint, themeGet } from "utils/theme";

export const Container = styled(Flex)`
  flex-direction: column;
  ${downThanBreakpoint(2)} {
    align-items: center;
    ${p =>
      !p.isLastChild &&
      `
      border-bottom: 2px dotted rgba(${themeGet("colors.border")}, 0.5);
    `}
  }
`;

export const Title = styled(Flex).attrs({ as: H3 })`
  margin-bottom: 64px;
  align-items: center;
  &:before {
    content: "";
    display: block;
    flex: none;
    width: 16px;
    height: 16px;
    margin-right: 16px;
    background: rgb(${p => p.theme.colors.blue});
    border-radius: 50%;
    border: 2px solid rgb(${p => p.theme.colors.white});
  }
`;

export const ImageContainer = styled(Box)`
  border-left: 2px dotted rgba(${themeGet("colors.border")}, 0.5);
  padding-left: 18px;
  margin-bottom: 42px;
  ${downThanBreakpoint(2)} {
    padding-left: 0;
    border-left: none;
  }
`;

export const Image = styled.img`
  display: block;
  max-width: 100%;
  border-radius: 13px;
`;

export const Description = styled.div`
  padding: 8px 24px;
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: ${p => p.theme.fontSizes.f24};
  color: rgb(${p => p.theme.colors.white});
  background: rgba(${p => p.theme.colors.white}, 0.15);
  border-radius: 19px;
  ${downThanBreakpoint(2)} {
    text-align: center;
  }
`;
