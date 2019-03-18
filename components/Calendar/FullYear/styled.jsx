import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const Day = styled(Box).attrs({ width: 20, pb: 2 })`
  line-height: 24px;
  font-size: ${p => p.theme.fontSizes.f14};
  color: rgb(${p => p.theme.colors.dark});
  text-align: center;
  cursor: pointer;

  ${p =>
    p.outside &&
    `
        cursor: default;
        color: rgb(${p.theme.colors.bombay});
  `}
`;

export const Week = styled(Flex).attrs({ justifyContent: "space-between" })``;

export const WeekDay = styled(Box).attrs({ width: 20, pb: 2 })`
  line-height: 24px;
  font-size: ${p => p.theme.fontSizes.f14};
  color: rgb(${p => p.theme.colors.bombay});
  text-align: center;
`;

export const WeekDays = styled(Flex).attrs({
  justifyContent: "space-between"
})``;

export const Month = styled(Flex).attrs({
  flexDirection: "column",
  width: [1, 1 / 3],
  p: 24
})`
  border-left: 1px solid rgb(${p => p.theme.colors.background});
  border-bottom: 1px solid rgb(${p => p.theme.colors.background});
`;

export const MonthName = styled(Box).attrs({ pb: 3 })`
  font-size: ${p => p.theme.fontSizes.f18};
  color: rgb(${p => p.theme.colors.dark});
`;

export const Wrapper = styled(Flex).attrs({
  flexWrap: "wrap"
})`
  border-right: 1px solid rgb(${p => p.theme.colors.background});
  border-top: 1px solid rgb(${p => p.theme.colors.background});
`;

export const Event = styled.div`
  width: 6px;
  height: 6px;
  box-shadow: 0 3px 8px 0 rgba(${p => p.theme.colors.blue}, 0.48);
  background-color: rgba(${p => p.theme.colors.blue}, 0.9);
  border-radius: 3px;
  margin-left: 7px;
  position: absolute;
`;
