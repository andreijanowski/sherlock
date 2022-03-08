import { H2 } from "components";
import { Box } from "@rebass/grid";
import styled from "styled-components";

export const Orange = styled.span`
  color: rgb(${p => p.theme.colors.carrotOrange});
  text-decoration: none;
`;

export const StyledH2 = styled(H2)`
  text-align: center;
`;

export const SplitFee = styled.div`
  width: 8em;
`;

export const OutlineFreeBox = styled(Box)`
  outline: none;
`;
