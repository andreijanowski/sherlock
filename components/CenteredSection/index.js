import styled from "styled-components";
import { Flex } from "@rebass/grid";

const CenteredSection = styled(Flex)`
  flex: auto;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: calc(100vh - 200px);
`;

export default CenteredSection;
