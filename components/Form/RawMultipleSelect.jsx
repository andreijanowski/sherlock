import { PureComponent } from "react";
import matchSorter from "match-sorter";
import onClickOutside from "react-onclickoutside";
import { LoadingIndicator } from "components";
import { shape, arrayOf, number, string, bool, func } from "prop-types";
import {
  MultipleSelectWrapper,
  MultipleSelectInput,
  Error,
  Items,
  Item,
  Tag,
  TagIcon,
  DisabledMessage
} from "./styled";
import { getError } from "./utils";

class RawMultipleSelect extends PureComponent {
  handleInputChange = e => {
    const {
      input: { value },
      maxItems,
      items,
      setInputValue
    } = this.props;
    const safeValue = value || [];
    if (
      (maxItems && safeValue.length >= maxItems) ||
      safeValue.length === items.length
    )
      return;
    setInputValue(e.target.value);
  };

  handleKeyDown = e => {
    const {
      input: { value, onChange },
      inputValue
    } = this.props;
    const safeValue = value || [];
    if (safeValue.length && !inputValue.length && e.keyCode === 8) {
      onChange(safeValue.slice(0, safeValue.length - 1));
    }
  };

  handleFocus = () => {
    const { input, openMenu } = this.props;
    input.onFocus();
    openMenu();
  };

  handleBlur = () => {
    const { input, closeMenu } = this.props;
    input.onBlur();
    closeMenu();
  };

  remove = item => {
    const {
      input: { value, onChange }
    } = this.props;
    const newValue = value.filter(i => i.value !== item.value);
    onChange(newValue);
  };

  getItems = (inputValue, items) => {
    const {
      input: { value }
    } = this.props;
    const matchingItems = inputValue
      ? matchSorter(items, inputValue, { keys: ["label", "value"] })
      : items;

    return value
      ? matchingItems.filter(i => !value.some(e => e.value === i.value))
      : matchingItems;
  };

  handleClickOutside = () => {
    const { meta } = this.props;
    if (meta.active) {
      this.handleBlur();
    }
  };

  render() {
    const {
      input,
      meta,
      placeholder,
      items,
      maxItems,
      isOpen,
      getInputProps,
      getItemProps,
      highlightedIndex,
      inputValue,
      closeMenu
    } = this.props;
    const error = getError(meta);
    const selectItems = this.getItems(inputValue, items);
    const disabled =
      !!meta.data.invalidGroupName && meta.data.invalidGroupName !== input.name;

    return (
      <>
        <MultipleSelectWrapper
          onClick={() => this.handleFocus()}
          isActive={meta.active}
          isEmpty={input.value.length === 0}
        >
          {input.value &&
            input.value.map(i => (
              <Tag key={i.value}>
                {i.label}
                <TagIcon
                  onClick={disabled ? undefined : () => this.remove(i)}
                />
              </Tag>
            ))}
          {!disabled && (
            <MultipleSelectInput
              autoComplete="nope"
              {...getInputProps({
                invalid: error ? "true" : undefined,
                value: inputValue,
                placeholder,
                name: input.name,
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown
              })}
            />
          )}
          {disabled && (
            <DisabledMessage>
              {meta.data.invalidGroupNameMessage}
            </DisabledMessage>
          )}
          {error && <Error>{error}</Error>}
          {meta.data.saving && !meta.active && <LoadingIndicator />}
        </MultipleSelectWrapper>
        {!disabled &&
          isOpen &&
          selectItems.length > 0 &&
          (!maxItems || input.value.length < maxItems) && (
            <Items>
              {selectItems.map((item, index) => (
                <Item
                  className="ignore-react-onclickoutside"
                  key={
                    typeof item.value === "object"
                      ? JSON.stringify(item.value)
                      : item.value
                  }
                  {...getItemProps({
                    item,
                    isActive: highlightedIndex === index,
                    onClick: closeMenu
                  })}
                >
                  {item.label}
                </Item>
              ))}
            </Items>
          )}
      </>
    );
  }
}

RawMultipleSelect.propTypes = {
  input: shape().isRequired,
  meta: shape().isRequired,
  placeholder: string.isRequired,
  items: arrayOf(shape()).isRequired,
  maxItems: number,
  isOpen: bool.isRequired,
  getInputProps: func.isRequired,
  getItemProps: func.isRequired,
  highlightedIndex: number,
  inputValue: string.isRequired,
  setInputValue: func.isRequired,
  openMenu: func.isRequired,
  closeMenu: func.isRequired
};

RawMultipleSelect.defaultProps = {
  highlightedIndex: undefined,
  maxItems: undefined
};

export default onClickOutside(RawMultipleSelect);
