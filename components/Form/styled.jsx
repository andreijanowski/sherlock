import styled, { css } from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextareaAutosize from "react-autosize-textarea";

export const LABEL_ACTIVE_SCALE = 0.7;

const InputStyles = css`
  box-sizing: border-box;
  width: 100%;
  padding: ${p => p.padding || "16px"};
  border: 1px solid
    rgb(${p => (p.invalid ? p.theme.colors.ruby : p.theme.colors.snuff)});
  border-radius: ${p => p.theme.radius.small};
  ${p => !p.rows && "height: 54px;"}
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
      border-color: rgb(${p => p.theme.colors.blue});
      outline: 0;
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
  /* stylelint-disable no-descending-specificity */
  & + label {
    transform: translateY(-120%) scale(${LABEL_ACTIVE_SCALE});
  }
`;

export const FieldWrapper = styled(Flex).attrs(() => ({
  width: 1,
  mb: 3,
  alignItems: "center"
}))`
  position: relative;
  ${p => p.as === "label" && "cursor:pointer;"}

  .ExpandIcon {
    position: absolute;
    right: 24px;
    stroke: rgb(${p => p.theme.colors.dark});
  }
`;

export const RawInput = styled.input`
  ${InputStyles}

  &:not([value=""]) {
    ${FilledInputStyles}
  }
`;

export const ToggleButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  ${p => !p.rows && "height: 60px;"}
  padding: 27px 16px 12px;
  text-align: left;
  border: 1px solid
    rgb(
      ${p =>
        // eslint-disable-next-line no-nested-ternary
        p.isOpen
          ? p.theme.colors.blue
          : p.invalid
          ? p.theme.colors.ruby
          : p.theme.colors.snuff}
    );
  border-radius: ${p => p.theme.radius.small};
  appearance: none !important;
  resize: none;

  .ExpandIcon {
    top: calc(50% - 9px);
    stroke: rgb(${p => p.theme.colors.dark});
  }
`;

export const DropdownLabel = styled.div`
  position: absolute;
  top: 50%;
  color: rgb(${p => p.theme.colors.bombay});
  transform: translateY(-120%) scale(${LABEL_ACTIVE_SCALE});
  transform-origin: left;
  pointer-events: none;
`;

export const RawTextarea = styled(({ smallLabel, ...p }) => (
  <TextareaAutosize {...p} />
))`
  ${InputStyles}
  &:focus {
    padding-bottom: 5px;
  }
  ${p => p.smallLabel && FilledInputStyles}
  ${p => p.smallLabel && "padding-bottom: 5px;"}
`;

export const MultipleSelectInput = styled(RawInput)`
  width: auto;
  height: 42px;
  margin-top: -8px;
  padding: 8px 16px;
  border: 0;

  &::placeholder {
    color: rgb(${p => p.theme.colors.bombay});
  }

  &:focus,
  &:not([value=""]) {
    padding: 8px 16px;
  }
`;

export const MultipleSelectWrapper = styled(FieldWrapper).attrs(() => ({
  as: "label",
  p: 2,
  mb: 0,
  pb: 0,
  flexWrap: "wrap",
  alignItems: "flex-start"
}))`
  position: static;
  border: 1px solid
    rgb(${p => (p.invalid ? p.theme.colors.ruby : p.theme.colors.snuff)});
  border-radius: ${p => p.theme.radius.small};
  ${p => p.isActive && `border-color:rgb(${p.theme.colors.blue});`}
`;

export const Tag = styled(Flex).attrs(() => ({
  px: 3,
  mr: 2,
  mb: 2,
  alignItems: "center"
}))`
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 42px;
  background-color: rgb(${p => p.theme.colors.background});
  border-radius: ${p => p.theme.radius.default};
  ${p =>
    p.isInvalid &&
    `
    background-color: rgb(${p.theme.colors.ruby});
    color: rgb(${p.theme.colors.white});
  `}

  &:active {
    opacity: 0.5;
  }
`;

export const TagIcon = styled(({ isInvalid, ...p }) => (
  <FontAwesomeIcon {...p} />
)).attrs(() => ({
  size: "sm",
  icon: ["fa", "times"]
}))`
  margin-left: 8px;
  color: rgb(${p => p.theme.colors.lavenderGray});
  ${p => p.isInvalid && `color: rgb(${p.theme.colors.white});`}
  cursor: pointer;

  &:hover {
    color: rgb(${p => p.theme.colors.ruby});
    ${p => p.isInvalid && `color: rgba(${p.theme.colors.white}, 0.5);`}
  }
`;

export const Error = styled.span`
  position: absolute;
  bottom: -13px;
  color: rgb(${p => p.theme.colors.ruby});
  font-size: ${p => p.theme.fontSizes.f12};
`;

export const Label = styled.label`
  position: absolute;
  top: ${p => (p.textarea ? "30px" : "50%")};
  margin-left: 16px;
  color: rgb(${p => p.theme.colors.bombay});
  font-size: ${p => p.theme.fontSizes.f14};
  transform: translateY(-50%);
  transform-origin: left;
  pointer-events: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f16};
  }
`;

export const Items = styled(Flex).attrs(p => ({
  flexDirection: "column",
  mt: p.mt || -2,
  width: 1
}))`
  position: absolute;
  z-index: 2;
  max-height: 250px;
  overflow: scroll;
  background-color: rgb(${p => p.theme.colors.white});
  border: 1px solid rgb(${p => p.theme.colors.blue});
  border-radius: ${p => p.theme.radius.small};
`;

export const Item = styled(Box).attrs(() => ({
  px: 3,
  py: 2
}))`
  color: rgb(${p => p.theme.colors.dark});
  cursor: pointer;
  ${p => p.isActive && `background-color: rgb(${p.theme.colors.background});`}
  ${p =>
    p.isSelected && `background-color: rgb(${p.theme.colors.linkWaterLight});`}
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

export const CheckboxLabel = styled(Flex).attrs(() => ({
  as: "label",
  justifyContent: "center",
  alignItems: "center",
  width: 1,
  flexDirection: "column"
}))`
  color: rgb(
    ${p =>
      p.disabled || !p.checked ? p.theme.colors.dark : p.theme.colors.blue}
  );
  font-weight: ${p =>
    p.checked ? p.theme.fontWeights.semiBold : p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f12};
  text-align: center;
  background-color: rgb(
    ${p =>
      p.disabled || p.checked
        ? p.theme.colors.white
        : p.theme.colors.background}
  );
  border: 2px solid
    rgb(
      ${p =>
        p.disabled || !p.checked
          ? p.theme.colors.background
          : p.theme.colors.blue}
    );
  border-radius: ${p => p.theme.radius.default};
  cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};

  ${p =>
    p.checked &&
    p.error &&
    `background-color: rgba(${p.theme.colors.ruby}, 0.1);
    border-color: rgb(${p.theme.colors.ruby});
    color: rgb(${p.theme.colors.ruby});`}

  &:active {
    opacity: 0.5;
  }
`;

export const Checkbox = styled.input.attrs(() => ({ type: "checkbox" }))`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`;

export const CheckboxText = styled(Box).attrs(p => ({
  width: p.hasCloserText ? "calc(100% - 46px)" : "calc(100% - 64px)"
}))`
  /* stylelint-disable-line no-empty-block */
`;

export const FlagIcon = styled.img.attrs(({ code }) => ({
  src: `/static/flags/${code.toLowerCase()}.svg`
}))`
  width: 22px;
  height: 14px;

  ${p =>
    p.chosen
      ? "position: absolute; left: 16px; top: 30px;"
      : "margin-right: 16px"}
`;

export const Checkmark = styled(Flex).attrs(p => ({
  width: 40,
  justifyContent: "center",
  alignItems: "center",
  mr: p.hasCloserText ? "8px" : 24
}))`
  height: 40px;
  color: rgb(${p => p.theme.colors.white});
  background-color: rgb(
    ${p => (p.isChecked ? p.theme.colors.blue : p.theme.colors.white)}
  );
  border-radius: ${p => p.theme.radius.small};
  ${p =>
    !p.isChecked &&
    `border: 1px solid
    rgb(${p.invalid ? p.theme.colors.ruby : p.theme.colors.snuff});`}
`;

export const HiddenCheckboxInput = styled.input.attrs(() => ({
  type: "checkbox"
}))`
  position: absolute;
  opacity: 0;
`;

export const TimekeeperWrapper = styled.div`
  position: absolute;
  left: 0;
  z-index: 2;
  width: 260px;
  transform: translateY(${p => p.top}px);
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    left: calc(50% - 130px);
  }
`;

export const ActionIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const DaypickerWrapper = styled.div`
  position: relative;
  .DayPicker {
    position: absolute;
    top: 70px;
    right: 0;
    z-index: 2;
    background: rgb(${p => p.theme.colors.white});
    border: 1px solid rgb(${p => p.theme.colors.snuff});
    border-radius: ${p => p.theme.radius.small};
    &-Day--selected {
      background-color: rgb(${p => p.theme.colors.blue}) !important;
    }
  }
`;

export const FileWrapper = styled(Flex)`
  height: 60px;
`;
