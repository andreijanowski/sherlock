import { PureComponent } from "react";
import { string, shape, arrayOf } from "prop-types";
import Downshift from "downshift";
import { LoadingIndicator } from "components";
import {
  FieldWrapper,
  ToggleButton,
  DropdownLabel,
  Items,
  Item,
  ExpandIcon
} from "./styled";

class FormDropdown extends PureComponent {
  render() {
    const { input, meta, label, items } = this.props;

    return (
      <Downshift
        id={`form-dropdown-${input.name}`}
        selectedItem={input.value}
        onChange={v => input.onChange(v.value)}
        itemToString={i => i.label}
      >
        {({
          isOpen,
          getToggleButtonProps,
          getItemProps,
          highlightedIndex,
          selectedItem: dsSelectedItem
        }) => (
          <div style={{ position: "relative" }}>
            <FieldWrapper>
              <ToggleButton {...getToggleButtonProps({ isOpen })}>
                <DropdownLabel>{label}</DropdownLabel>
                {items.find(i => i.value === input.value).label}
                <ExpandIcon />
                {meta.data.saving && !meta.active && <LoadingIndicator />}
              </ToggleButton>
            </FieldWrapper>
            {isOpen && items.length > 0 && (
              <Items>
                {items.map((item, index) => (
                  <Item
                    {...getItemProps({
                      item,
                      isActive: highlightedIndex === index,
                      isSelected: dsSelectedItem === item.value,
                      key: item.value
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

FormDropdown.propTypes = {
  input: shape().isRequired,
  meta: shape().isRequired,
  items: arrayOf(shape()).isRequired,
  label: string.isRequired
};

export default FormDropdown;
