import styled, { css } from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextareaAutosize from "react-autosize-textarea";

export const LABEL_ACTIVE_SCALE = 0.7;

const InputStyles = css`
  border-radius: ${p => p.theme.radius.small};
  border: 1px solid
    rgb(${p => (p.invalid ? p.theme.colors.ruby : p.theme.colors.snuff)});
  padding: ${p => p.padding || "16px"};
  box-sizing: border-box;
  ${p => !p.rows && "height: 54px;"}
  width: 100%;
  resize: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    ${p => !p.rows && "height: 60px;"}
  }

  & + label {
    transition: transform 0.2s;
  }

  &::placeholder {
    color: transparent;
  }

  &:disabled {
    background: rgb(${p => p.theme.colors.background});
    cursor: not-allowed;

    & + label {
      color: rgb(${p => p.theme.colors.snuff});
    }
  }

  &:focus {
    padding-top: 27px;
    padding-bottom: 12px;

    && {
      outline: 0;
      border-color: rgb(${p => p.theme.colors.blue});
    }

    &::placeholder {
      color: rgb(${p => p.theme.colors.bombay});
    }

    & + label {
      transform: translateY(-120%) scale(${LABEL_ACTIVE_SCALE});
    }
  }

  &:invalid {
    border-color: rgb(${p => p.theme.colors.ruby});
  }
`;

const FilledInputStyles = css`
  padding-top: 27px;
  padding-bottom: 12px;

  & + label {
    transform: translateY(-120%) scale(${LABEL_ACTIVE_SCALE});
  }
`;

export const FieldWrapper = styled(Flex).attrs({
  width: 1,
  mb: 3,
  alignItems: "center"
})`
  position: relative;
  ${p => p.as === "label" && "cursor:pointer;"}

  .ExpandIcon {
    position: absolute;
    right: 24px;
  }
`;

export const RawInput = styled.input`
  ${InputStyles}

  &:not([value=""]) {
    ${FilledInputStyles}
  }
`;

export const RawTextarea = styled(({ smallLabel, ...p }) => (
  <TextareaAutosize {...p} />
))`
  ${InputStyles}
  ${p => p.smallLabel && FilledInputStyles}
`;

export const MultipleSelectInput = styled(RawInput)`
  border: 0;
  height: 42px;
  padding: 8px 16px;
  width: auto;

  &::placeholder {
    color: rgb(${p => p.theme.colors.bombay});
  }

  &:focus,
  &:not([value=""]) {
    padding: 8px 16px;
  }
`;

export const MultipleSelectWrapper = styled(FieldWrapper).attrs(p => ({
  as: "label",
  p: 2,
  pb: p.isEmpty ? undefined : 0,
  flexWrap: "wrap",
  alignItems: "flex-start"
}))`
  border-radius: ${p => p.theme.radius.small};
  border: 1px solid
    rgb(${p => (p.invalid ? p.theme.colors.ruby : p.theme.colors.snuff)});
  ${p => p.isActive && `border-color:rgb(${p.theme.colors.blue});`}
`;

export const Tag = styled(Flex).attrs({
  px: 3,
  mr: 2,
  mb: 2,
  alignItems: "center"
})`
  background-color: rgb(${p => p.theme.colors.background});
  border-radius: ${p => p.theme.radius.default};
  font-size: ${p => p.theme.fontSizes.f14};
  font-weight: ${p => p.theme.fontWeights.semiBold};
  line-height: 42px;
`;

export const TagIcon = styled(FontAwesomeIcon).attrs({
  size: "sm",
  icon: ["fa", "times"]
})`
  margin-left: 8px;
  color: rgb(${p => p.theme.colors.lavenderGray});
  cursor: pointer;

  &:hover {
    color: rgb(${p => p.theme.colors.ruby});
  }
`;

export const Error = styled.span`
  position: absolute;
  bottom: -${p => p.theme.fontSizes.f12};
  color: rgb(${p => p.theme.colors.ruby});
  font-size: ${p => p.theme.fontSizes.f12};
`;

export const Label = styled.label`
  position: absolute;
  top: ${p => (p.textarea ? "30px" : "50%")};
  margin-left: 16px;
  transform: translateY(-50%);
  transform-origin: left;
  font-size: ${p => p.theme.fontSizes.f14};
  color: rgb(${p => p.theme.colors.bombay});
  pointer-events: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f16};
  }
`;

export const Items = styled(Flex).attrs({
  flexDirection: "column",
  mt: -2,
  width: 1
})`
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.small};
  border: 1px solid rgb(${p => p.theme.colors.blue});
  overflow: scroll;
  position: absolute;
  max-height: 250px;
  z-index: 2;
`;

export const Item = styled(Box).attrs({
  px: 3,
  py: 2
})`
  cursor: pointer;
  ${p => p.isActive && `background-color: rgb(${p.theme.colors.background});`}
`;

export const ExpandIcon = () => (
  <span className="ExpandIcon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
    >
      <path
        fill="none"
        fillRule="evenodd"
        stroke="#2A2F38"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity=".4"
        strokeWidth="2"
        d="M1 1l4 4 4-4"
      />
    </svg>
  </span>
);

export const CheckboxLabel = styled(Flex).attrs({
  as: "label",
  justifyContent: "center",
  alignItems: "center",
  width: 1
})`
  text-align: center;
  cursor: pointer;
  background-color: rgb(
    ${p => (p.checked ? p.theme.colors.white : p.theme.colors.background)}
  );
  border: 2px solid
    rgb(${p => (p.checked ? p.theme.colors.blue : p.theme.colors.background)});
  border-radius: ${p => p.theme.radius.default};
  color: rgb(${p => (p.checked ? p.theme.colors.blue : p.theme.colors.dark)});
  font-size: ${p => p.theme.fontSizes.f14};
  font-weight: ${p =>
    p.checked ? p.theme.fontWeights.semiBold : p.theme.fontWeights.medium};
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const CheckboxText = styled(Box).attrs({
  width: "calc(100% - 64px)"
})``;

export const FlagIcon = styled.img.attrs(({ code }) => ({
  src: `/static/flags/${code.toLowerCase()}.svg`
}))`
  width: 22px;
  height: 14px;

  ${p =>
    p.choosed
      ? "position: absolute; left: 16px; top: 30px;"
      : "margin-right: 16px"}
`;

export const Checkmark = styled(Flex).attrs({
  width: 40,
  justifyContent: "center",
  alignItems: "center",
  mr: 24
})`
  height: 40px;
  background-color: rgb(
    ${p => (p.isChecked ? p.theme.colors.blue : p.theme.colors.white)}
  );
  color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.small};
  ${p =>
    !p.isChecked &&
    `border: 1px solid
    rgb(${p.invalid ? p.theme.colors.ruby : p.theme.colors.snuff});`}
`;

export const HiddenCheckboxInput = styled.input.attrs({
  type: "checkbox"
})`
  position: absolute;
  opacity: 0;
`;

export const TimekeeperWrapper = styled.div`
  position: absolute;
  width: 260px;
  left: 0;
  transform: translateY(${p => p.top}px);
  z-index: 2;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    left: calc(50% - 130px);
  }
`;

export const ActionIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const DaypickerWrapper = styled.div`
  position: relative;
  .DayPicker {
    position: absolute;
    right: 0;
    top: 70px;
    z-index: 2;
    background: rgb(${p => p.theme.colors.white});
    border: 1px solid rgb(${p => p.theme.colors.snuff});
    border-radius: ${p => p.theme.radius.small};
    &-Day--selected {
      background-color: rgb(${p => p.theme.colors.blue}) !important;
    }
  }
`;
