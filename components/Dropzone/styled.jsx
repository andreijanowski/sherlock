import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs(() => ({
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: 1,
  px: 3
}))`
  position: relative;
  overflow: hidden;
  text-align: center;
  border: 1px dashed rgb(${p => p.theme.colors.snuff});
  border-radius: ${p => p.theme.radius.default};
  ${p => p.isCircleShape && "border-radius: 50%;"};
  cursor: pointer;

  ${p =>
    p.isDragActive &&
    (p.isDragReject
      ? `background-color: rgb(${p.theme.colors.ruby}); cursor: no-drop`
      : `background-color: rgb(${p.theme.colors.background});`)};

  ${p =>
    !p.isDragActive &&
    p.image &&
    !p.loading &&
    `
    &::before {
      content: "";
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-image:url(${p.image});
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }

    span {
      opacity: 0;
    }
  `}

  ${p =>
    !p.loading &&
    `
  &:hover {
    &::before {
      filter: grayscale(100%);
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(${p.theme.colors.blue}, 0.7);
    }

    span {
      opacity: 1;
      color: rgb(${p.theme.colors.white});
    }
  }
  `}
  &:focus {
    outline: none;
  }
`;

export const Input = styled.input`
  display: none;
`;

export const Tip = styled.span`
  position: relative;
  z-index: 1;
  margin-bottom: 4px;
  color: rgb(
    ${p => (p.isDragReject ? p.theme.colors.white : p.theme.colors.dark)}
  );
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f16};
`;

export const Info = styled.span`
  position: relative;
  z-index: 1;
  color: rgb(
    ${p => (p.isDragReject ? p.theme.colors.white : p.theme.colors.bombay)}
  );
  font-size: ${p => p.theme.fontSizes.f12};
`;
