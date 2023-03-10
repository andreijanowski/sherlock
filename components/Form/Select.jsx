import { PureComponent } from "react";
import { string, shape, arrayOf, bool } from "prop-types";
import Downshift from "downshift";
import matchSorter from "match-sorter";
import { LoadingIndicator } from "components";
import {
  FieldWrapper,
  RawInput,
  Label,
  Error,
  Items,
  Item,
  ExpandIcon,
  FlagIcon
} from "./styled";
import { getError } from "./utils";

class FormSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.input.value.label || ""
    };
  }

  handleInputChange = e => this.setState({ inputValue: e.target.value });

  handleBlur = (items, input, inputValue) => {
    if (items.length && inputValue) {
      this.setState({ inputValue: items[0].label || "" });
      input.onChange(items[0]);
    } else {
      this.setState({ inputValue: "" });
      input.onChange(undefined);
    }
    input.onBlur();
  };

  handleFocus = (input, inputValue, openMenu, items) => {
    input.onFocus();
    if (!inputValue) {
      openMenu();
    } else {
      const selectItems = this.getItems(inputValue, items);
      if (!selectItems.some(i => i.label === inputValue)) {
        this.setState({ inputValue: "" });
        openMenu();
      }
    }
  };

  getValue = (input, meta, inputValue) =>
    meta.active ? inputValue : (input.value && input.value.label) || "";

  getItems = (inputValue, items) =>
    inputValue
      ? matchSorter(items, inputValue, {
          keys: [
            "label",
            "value",
            "value.code",
            "value.prefix",
            "value.name",
            "value.native"
          ]
        })
      : items;

  render() {
    const {
      input,
      meta,
      placeholder,
      label,
      items,
      disabled,
      showFlag,
      isErrorVisibilityRequired
    } = this.props;
    const { inputValue } = this.state;
    const error = getError(meta, isErrorVisibilityRequired);
    const selectItems = this.getItems(inputValue, items);

    return (
      <Downshift
        id={`select-${input.name}`}
        selectedItem={input.value}
        onChange={v => {
          input.onChange(v);
          this.setState({ inputValue: v ? v.label : "" });
        }}
        itemToString={i => i.label}
      >
        {({
          isOpen,
          getInputProps,
          getItemProps,
          highlightedIndex,
          openMenu,
          selectedItem: dsSelectedItem
        }) => (
          <div style={{ position: "relative" }}>
            <FieldWrapper>
              <RawInput
                autoComplete="nope"
                {...getInputProps({
                  invalid: error ? "true" : undefined,
                  value: this.getValue(input, meta, inputValue),
                  onFocus: () =>
                    this.handleFocus(input, inputValue, openMenu, items),
                  onBlur: () => this.handleBlur(selectItems, input, inputValue),
                  placeholder,
                  disabled,
                  padding: showFlag ? "16px 16px 16px 48px" : undefined,
                  name: input.name,
                  onChange: this.handleInputChange
                })}
              />
              <Label htmlFor={input.name}>{label}</Label>
              {showFlag && input.value.value && (
                <FlagIcon
                  chosen
                  code={
                    typeof input.value.value === "object"
                      ? input.value.value.code
                      : input.value.value
                  }
                />
              )}
              <ExpandIcon />
              {error && <Error>{error}</Error>}
              {meta.data && meta.data.saving && !meta.active && (
                <LoadingIndicator />
              )}
            </FieldWrapper>
            {isOpen && selectItems.length > 0 && (
              <Items>
                {selectItems.map((item, index) => (
                  <Item
                    key={
                      typeof item.value === "object"
                        ? JSON.stringify(item.value)
                        : item.value
                    }
                    {...getItemProps({
                      item,
                      isActive: highlightedIndex === index,
                      isSelected: dsSelectedItem.value === item.value,
                      onClick: () => this.setState({ inputValue: item.label })
                    })}
                  >
                    {showFlag && (
                      <FlagIcon
                        code={
                          typeof item.value === "object"
                            ? item.value.code
                            : item.value
                        }
                      />
                    )}
                    {item.label}
                  </Item>
                ))}
              </Items>
            )}
          </div>
        )}
      </Downshift>
    );
  }
}

FormSelect.propTypes = {
  input: shape().isRequired,
  meta: shape().isRequired,
  placeholder: string.isRequired,
  items: arrayOf(shape()).isRequired,
  label: string.isRequired,
  disabled: bool,
  showFlag: bool,
  isErrorVisibilityRequired: bool
};

FormSelect.defaultProps = {
  disabled: false,
  showFlag: false,
  isErrorVisibilityRequired: false
};

export default FormSelect;
