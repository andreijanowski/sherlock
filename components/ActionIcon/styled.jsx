import styled, { css } from "styled-components";
import { Flex } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const red = css`
  background-color: ${p => `rgba(${p.theme.colors.ruby}, 0.1)`};
  color: rgb(${p => p.theme.colors.ruby});

  &:hover {
    background-color: rgb(${p => p.theme.colors.ruby});
    color: rgb(${p => p.theme.colors.white});
  }
`;

const deletePicture = css`
  height: 24px;
  color: rgb(${p => p.theme.colors.ruby});
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: ${p => `rgb(${p.theme.colors.white})`};
  &:hover {
    background-color: rgb(${p => p.theme.colors.ruby});
    color: rgb(${p => p.theme.colors.white});
  }
`;

const white = css`
  background-color: ${p => `rgb(${p.theme.colors.white})`};
  color: ${p => `rgb(${p.theme.colors.blue})`};
  &:hover {
    background-color: rgb(${p => p.theme.colors.blue});
    color: rgb(${p => p.theme.colors.white});
  }
`;

export const IconWrapper = styled(Flex).attrs(p => ({
  width: p.deletePicture ? 24 : 40,
  alignItems: "center",
  justifyContent: "center",
  ml: p.deletePicture ? undefined : 2
}))`
  cursor: pointer;
  height: 40px;
  background-color: ${p => `rgba(${p.theme.colors.green}, 0.1)`};
  color: rgb(${p => p.theme.colors.green});
  border-radius: ${p => p.theme.radius.default};

  &:hover {
    background-color: rgb(${p => p.theme.colors.green});
    color: rgb(${p => p.theme.colors.white});
  }

  ${p => p.red && red};
  ${p => p.deletePicture && deletePicture};
  ${p => p.white && white};
  ${p => p.deletePicture && deletePicture};
`;

export const Icon = styled(FontAwesomeIcon)`
  margin: 0.5rem 0;
`;
