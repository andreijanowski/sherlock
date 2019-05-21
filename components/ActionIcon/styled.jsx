import styled, { css } from "styled-components";
import { Flex } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const red = css`
  color: rgb(${p => p.theme.colors.ruby});
  background-color: ${p => `rgba(${p.theme.colors.ruby}, 0.1)`};

  &:hover {
    color: rgb(${p => p.theme.colors.white});
    background-color: rgb(${p => p.theme.colors.ruby});
  }
`;

const deletePicture = css`
  position: absolute;
  top: 8px;
  right: 8px;
  height: 24px;
  color: rgb(${p => p.theme.colors.ruby});
  background-color: ${p => `rgb(${p.theme.colors.white})`};
  &:hover {
    color: rgb(${p => p.theme.colors.white});
    background-color: rgb(${p => p.theme.colors.ruby});
  }
`;

const white = css`
  color: ${p => `rgb(${p.theme.colors.blue})`};
  background-color: ${p => `rgb(${p.theme.colors.white})`};
  &:hover {
    color: rgb(${p => p.theme.colors.white});
    background-color: rgb(${p => p.theme.colors.blue});
  }
`;

export const IconWrapper = styled(Flex).attrs(p => ({
  width: p.deletePicture ? 24 : 40,
  alignItems: "center",
  justifyContent: "center",
  ml: p.deletePicture ? undefined : 2
}))`
  height: 40px;
  color: rgb(${p => p.theme.colors.green});
  background-color: ${p => `rgba(${p.theme.colors.green}, 0.1)`};
  border-radius: ${p => p.theme.radius.default};
  cursor: pointer;

  &:hover {
    color: rgb(${p => p.theme.colors.white});
    background-color: rgb(${p => p.theme.colors.green});
  }

  ${p => p.red && red};
  ${p => p.deletePicture && deletePicture};
  ${p => p.white && white};
  ${p => p.deletePicture && deletePicture};
`;

export const Icon = styled(FontAwesomeIcon)`
  margin: 0.5rem 0;
`;
