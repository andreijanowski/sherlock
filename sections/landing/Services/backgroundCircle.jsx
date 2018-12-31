import styled from "styled-components";
import { number, string } from "prop-types";

const Svg = styled.svg.attrs(({ size }) => ({
  height: size,
  width: size
}))`
  position: absolute;
  top: ${({ top }) => top}px;
  left: calc(50% + ${({ left }) => left}px);
`;

const BackgroundCircle = ({ size, top, left, color }) => (
  <Svg {...{ size, top, left }}>
    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`rgb(${color})`} />
  </Svg>
);

BackgroundCircle.propTypes = {
  top: number.isRequired,
  left: number.isRequired,
  size: number,
  color: string
};

BackgroundCircle.defaultProps = {
  size: 100,
  color: "255, 0, 33"
};

export default BackgroundCircle;
