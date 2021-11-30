import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { H3 } from "components/styleguide/Typography";

export const Title = styled(Flex).attrs({ as: H3 })`
  margin-bottom: 64px;
  align-items: center;
  &:before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    margin-right: 16px;
    background: rgb(${p => p.theme.colors.blue});
    border-radius: 50%;
    border: 2px solid rgb(${p => p.theme.colors.white});
  }
`;

export const ImageContainer = styled.div`
  border-left: 2px dotted rgba(${p => p.theme.colors.white}, 0.5);
  padding-left: 18px;
  margin-bottom: 42px;
`;

export const Image = styled.img`
  border-radius: 13px;
`;

export const Description = styled.div`
  padding: 8px 24px;
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: ${p => p.theme.fontSizes.f24};
  color: rgb(${p => p.theme.colors.white});
  background: rgba(${p => p.theme.colors.white}, 0.15);
  border-radius: 19px;
`;
