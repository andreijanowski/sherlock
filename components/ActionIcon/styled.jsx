import styled from "styled-components";
import { Flex } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const IconWrapper = styled(Flex).attrs(p => ({
  width: p.deletePicture ? 24 : 40,
  alignItems: "center",
  justifyContent: "center",
  ml: p.deletePicture ? undefined : 2
}))`
  cursor: pointer;
  height: ${p => (p.deletePicture ? 24 : 40)}px;
  background-color: ${p =>
    p.deletePicture
      ? `rgb(${p.theme.colors.white})`
      : `rgba(
      ${p.red ? p.theme.colors.red : p.theme.colors.green},
      0.1
    )`};
  border-radius: ${p => p.theme.radius.default};
  color: rgb(
    ${p =>
      p.red || p.deletePicture ? p.theme.colors.red : p.theme.colors.green}
  );
  ${p => p.deletePicture && `position: absolute; top: 8px; right: 8px;`}

  &:hover {
    background-color: rgb(
      ${p =>
        p.red || p.deletePicture ? p.theme.colors.red : p.theme.colors.green}
    );
    color: rgb(${p => p.theme.colors.white});
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  margin: 0.5rem 0;
`;
