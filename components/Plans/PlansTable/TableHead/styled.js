import styled from "styled-components";
import { Cell } from "../styled";

export const Container = styled.thead``;

export const TableHeadPrimaryCell = styled(Cell)`
  color: #000;
`;

export const TableHeadColumnCell = styled(Cell)`
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: ${p => p.theme.fontSizes.f24};
  color: #000;
  text-align: center;
`;
