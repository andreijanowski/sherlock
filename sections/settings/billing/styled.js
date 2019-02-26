import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Container = styled(Flex)`
  height: 100%;
  background: rgb(${p => p.theme.colors.white});
`;
