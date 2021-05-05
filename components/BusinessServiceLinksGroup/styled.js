import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 16px;
`;

export const ServiceForm = styled.form`
  display: flex;
  flex-wrap: no-wrap;
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
`;
