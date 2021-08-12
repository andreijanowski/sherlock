import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Pane = styled(Flex)`
  overflow: auto;
  padding: ${p => (p.noPadding ? undefined : "20px 30px 15px")};
  background: rgb(${p => p.theme.colors.white});
  box-shadow: 0px 0px 17px rgba(55, 81, 255, 0.15);
  border-radius: ${p => p.theme.radius.double};
  letter-spacing: 0.2px;
`;

export const LoadingIndicatorWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  height: 50px;
`;
