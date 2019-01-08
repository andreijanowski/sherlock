import styled, { css } from "styled-components";

export const MeterBackground = styled.path.attrs({
  d:
    "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
})``;

export const MeterProgress = styled.path.attrs({
  d:
    "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
})``;

export const emptyPassword = css`
  background-image: none;
  ${MeterProgress} {
    display: none;
  }
`;

export const weekPassword = css`
  background-image: url("/static/emoji/face-screaming-in-fear.png");
  ${MeterProgress} {
    stroke: rgba(${({ theme }) => theme.colors.ruby}, 1);
  }
`;

export const mediumPassword = css`
  background-image: url("/static/emoji/slightly-smiling-face.png");
  ${MeterProgress} {
    stroke: rgba(${({ theme }) => theme.colors.carrotOrange}, 1);
  }
`;

export const strongPassword = css`
  background-image: url("/static/emoji/smiling-face-with-sunglasses.png");
  ${MeterProgress} {
    stroke: rgba(${({ theme }) => theme.colors.blue}, 1);
  }
`;

export const PasswordStrengthMeterWrapper = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  top: 8px;
  right: 8px;
  background-size: 18px 18px;
  background-repeat: no-repeat;
  background-position: center;

  svg {
    display: block;
    width: 100%;
  }

  ${MeterBackground} {
    fill: none;
    stroke: rgba(${({ theme }) => theme.colors.dark}, 0.24);
    stroke-width: 3.8;
  }

  ${MeterProgress} {
    fill: none;
    stroke-width: 2.8;
    stroke-linecap: round;
  }

  ${({ isEmpty }) => isEmpty && emptyPassword};
  ${({ strength }) => strength === "week" && weekPassword};
  ${({ strength }) => strength === "medium" && mediumPassword};
  ${({ strength }) => strength === "strong" && strongPassword};
`;
