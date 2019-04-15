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
  TagIcon
} from "./styled";
import { getError } from "./utils";

class RawMultipleSelect extends PureComponent {
  handleInputChange = e => {
    const {
      input: { value },
      items,
      setInputValue
    } = this.props;
    const safeValue = value || [];
    if (safeValue.length === items.length) return;
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
      isOpen,
      getInputProps,
      getItemProps,
      highlightedIndex,
      inputValue,
      closeMenu,
      max,
      min
    } = this.props;
    const error = getError(meta);
    const selectItems = this.getItems(inputValue, items);

    return (
      <>
        <MultipleSelectWrapper
          onClick={() => this.handleFocus()}
          isActive={meta.active}
          isEmpty={input.value.length === 0}
        >
          {input.value &&
            input.value.map((i, index) => (
              <Tag key={i.value} isInvalid={index >= max}>
                {i.label}
                <TagIcon
                  isInvalid={index >= max}
                  onClick={
                    input.value.length > min ? () => this.remove(i) : undefined
                  }
                />
              </Tag>
            ))}
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
          {error && <Error>{error}</Error>}
          {meta.data.saving && !meta.active && <LoadingIndicator />}
        </MultipleSelectWrapper>
        {isOpen && selectItems.length > 0 && (
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
  isOpen: bool.isRequired,
  getInputProps: func.isRequired,
  getItemProps: func.isRequired,
  highlightedIndex: number,
  inputValue: string.isRequired,
  setInputValue: func.isRequired,
  openMenu: func.isRequired,
  closeMenu: func.isRequired,
  max: number.isRequired,
  min: number.isRequired
};

RawMultipleSelect.defaultProps = {
  highlightedIndex: undefined
};

export default onClickOutside(RawMultipleSelect);
