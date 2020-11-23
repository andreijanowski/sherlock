import { string, shape, arrayOf, bool } from "prop-types";
import Downshift from "downshift";
import { LoadingIndicator } from "components";
import {
  FieldWrapper,
  ToggleButton,
  DropdownLabel,
  Items,
  Item,
  ExpandIcon,
  Error
} from "./styled";
import { getError } from "./utils";

const FormDropdown = ({
  input,
  meta,
  label,
  items,
  isErrorVisibilityRequired
}) => {
  const inputData = items.find(i => i.value === input.value);
  const labelContent = inputData ? inputData.label : "";
  const error = getError(meta, isErrorVisibilityRequired);

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
              {labelContent}
              <ExpandIcon />
              {meta.data.saving && !meta.active && <LoadingIndicator />}
            </ToggleButton>
            {error && <Error>{error}</Error>}
            {meta.data.saving && !meta.active && <LoadingIndicator />}
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
};

FormDropdown.propTypes = {
  input: shape().isRequired,
  meta: shape().isRequired,
  items: arrayOf(shape()).isRequired,
  label: string.isRequired,
  isErrorVisibilityRequired: bool
};
FormDropdown.defaultProps = {
  isErrorVisibilityRequired: false
};

export default FormDropdown;
