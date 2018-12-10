/* eslint-env jest */
import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";
import { theme } from "utils/theme";

// eslint-disable-next-line import/prefer-default-export
export const renderWithTheme = component =>
  renderer.create(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

export const themeHOC = component => (
  <ThemeProvider theme={theme}>{component}</ThemeProvider>
);
