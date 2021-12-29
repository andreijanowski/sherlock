import styled, { css } from "styled-components";

import { downThanBreakpoint } from "utils/theme";

export const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const MOBILE_BREAKPOINT = 1;

export const ServiceForm = styled.form`
  display: flex;
  flex-wrap: no-wrap;
  ${downThanBreakpoint(MOBILE_BREAKPOINT)} {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const ButtonBlockCSS = css`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border: 1px solid rgb(${p => p.theme.colors.snuff});
  border-radius: ${p => p.theme.radius.small};
`;

export const ServiceLogo = styled.div`
  ${ButtonBlockCSS}
  display: block;
  margin-right: 16px;
  margin-bottom: 16px;
  background-size: cover;
  background-position: center;
  background-image: url(${p => p.url});
  ${downThanBreakpoint(MOBILE_BREAKPOINT)} {
    margin-right: 0;
  }
`;

export const ServiceDeleteButton = styled.button`
  ${ButtonBlockCSS}
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  margin-bottom: 16px;
  background-color: transparent;
  cursor: pointer;
  color: rgb(${p => p.theme.colors.ruby});
  ${downThanBreakpoint(MOBILE_BREAKPOINT)} {
    margin-left: 0;
    width: 100%;
  }
`;
