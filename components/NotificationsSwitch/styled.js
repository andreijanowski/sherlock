import styled from "styled-components";
import { Box } from "@rebass/grid";
import { themeGet } from "utils/theme";

export const Container = styled(Box)`
  cursor: pointer;
`;

export const CheckboxesContainer = styled.form`
  padding: 16px;
  border-radius: 8px;
  background: rgb(${themeGet("colors.white")});
  box-shadow: 0 0 4px 0 rgba(${themeGet("colors.boxShadow")}, 0.5);
`;

export const YoutubeIcon = styled.img.attrs(() => ({
  src: "/static/icons/youtube.svg"
}))`
  height: ${({ height }) => height || "10px"};
  & path {
    fill: ${({ color }) => color || "#000"};
  }
  &:hover path {
    fill: ${({ hoverColor }) => hoverColor || "blue"};
  }
`;
