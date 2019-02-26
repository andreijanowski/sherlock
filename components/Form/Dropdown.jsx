import { PureComponent } from "react";
import { string, shape, arrayOf, bool } from "prop-types";
import Downshift from "downshift";
import { LoadingIndicator } from "components";
import {
  FieldWrapper,
  RawInput,
  Label,
  Error,
  Items,
  Item,
  ExpandIcon
} from "./styled";
import { getError } from "./utils";

class FormSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.input.value.label || ""
    };
  }

  handleFocus = (input, openMenu) => {
    input.onFocus();
    openMenu();
  };

  getValue = (input, meta, inputValue) =>
    meta.active ? inputValue : (input.value && input.value.label) || "";

  render() {
    const { input, meta, placeholder, label, items, disabled } = this.props;
    const { inputValue } = this.state;
    const error = getError(meta);

    return (
      <Downshift
        selectedItem={input.value}
        onChange={v => {
          input.onChange(v.value);
          this.setState({ inputValue: v.label });
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
                  onClick: () => this.handleFocus(input, openMenu),
                  placeholder,
                  disabled,
                  name: input.name
                })}
              />
              <Label htmlFor={input.name}>{label}</Label>
              <ExpandIcon />
              {error && <Error>{error}</Error>}
              {meta.data.saving && !meta.active && <LoadingIndicator />}
            </FieldWrapper>
            {isOpen && items.length > 0 && (
              <Items>
                {items.map((item, index) => (
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
  showFlag: bool
};

FormSelect.defaultProps = {
  disabled: false,
  showFlag: false
};

export default FormSelect;
