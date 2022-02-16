import { Flex } from "@rebass/grid";
import styled, { keyframes } from "styled-components";

const DELAY = "3s";

export const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const getSlideKeyframes = count => {
  const step = 100 / (count - 1);
  const customCss = new Array(count)
    .fill(null)
    .map(
      (_v, index) => `
        ${index * step}% {
          transform: translateY(-${index * 100}%);
        }
      `
    )
    .join("");

  return keyframes`
    ${customCss}
  `;
};

export const Scroller = styled(Flex)`
  animation: ${({ count }) => getSlideKeyframes(count)}
    ${p => (p.count - 1) * 2}s infinite ${DELAY};
`;

export const Word = styled.div`
  white-space: nowrap;
  ${({ index }) => {
    if (!index) return "";
    return `
      position: absolute;
      top: ${index * 100}%;
    `;
  }}
`;
