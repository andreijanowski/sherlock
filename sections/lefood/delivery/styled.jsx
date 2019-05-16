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
  padding-right: 8px;
  color: rgb(${p => p.theme.colors.dark});
`;
export const Price = styled.div`
  padding-right: 8px;
  color: rgb(${p => p.theme.colors.blue});
`;
export const Remove = styled(FontAwesomeIcon).attrs({
  icon: ["fa", "times"]
})`
  color: rgb(${p => p.theme.colors.lavenderGray});

  &:hover {
    color: rgb(${p => p.theme.colors.ruby});
  }
`;
