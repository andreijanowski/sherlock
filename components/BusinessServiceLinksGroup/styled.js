import styled, { css } from "styled-components";

export const ServiceForm = styled.form`
  display: flex;
  flex-wrap: no-wrap;
  margin-bottom: 20px;
`;

const ButtonBlockCSS = css`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border: 1px solid rgb(${p => p.theme.colors.snuff});
  border-radius: ${p => p.theme.radius.small};
`;

export const ServiceLogo = styled.form`
  ${ButtonBlockCSS}
  display: block;
  margin-right: 20px;
  background-size: cover;
  background-image: url(${p => p.url});
`;

export const ServiceDeleteButton = styled.button`
  ${ButtonBlockCSS}
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
`;
