import styled from "styled-components";
import { Flex } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Wrapper = styled(Flex).attrs({ flexDirection: "column", p: 4 })`
  background-color: rgb(${p => p.theme.colors.white});
`;
export const Delivery = styled(Flex).attrs({ p: 3 })`
  background-color: rgb(${p => p.theme.colors.background});
`;
export const Code = styled.div`
  color: rgb(${p => p.theme.colors.dark});
  padding-right: 8px;
`;
export const Price = styled.div`
  color: rgb(${p => p.theme.colors.blue});
  padding-right: 8px;
`;
export const Remove = styled(FontAwesomeIcon).attrs({
  icon: ["fa", "times"]
})`
  color: rgb(${p => p.theme.colors.lavenderGray});

  &:hover {
    color: rgb(${p => p.theme.colors.ruby});
  }
`;
