import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs({ flexDirection: "column", p: 4 })`
  background-color: rgb(${p => p.theme.colors.white});
`;

export const Dish = styled(Flex).attrs({
  p: 2,
  pr: 3,
  mb: 2,
  alignItems: "center",
  justifyContent: "space-between"
})`
  background-color: rgb(${p => p.theme.colors.white});
  border: 1px solid rgb(${p => p.theme.colors.snuff});
  border-radius: ${p => p.theme.radius.default};
`;

export const Image = styled.div`
  background-color: rgb(${p => p.theme.colors.snuff});
  background-image: url(${p => p.src});
  background-position: center;
  background-size: cover;
  width: 60px;
  height: 60px;
  border-radius: ${p => p.theme.radius.default};
  margin-right: 16px;
`;

export const Name = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${p => p.theme.fontSizes.f16};
  font-weight: ${p => p.theme.fontWeights.medium};
  line-height: 24px;
  color: rgb(${p => p.theme.colors.dark});
`;
export const Description = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${p => p.theme.fontSizes.f14};
  font-weight: ${p => p.theme.fontWeights.medium};
  line-height: 24px;
  color: rgb(${p => p.theme.colors.bombay});
`;

export const Price = styled.div`
  font-size: ${p => p.theme.fontSizes.f16};
  font-weight: ${p => p.theme.fontWeights.medium};
  line-height: 24px;
  color: rgb(${p => p.theme.colors.dark});
  padding-right: 32px;
`;
