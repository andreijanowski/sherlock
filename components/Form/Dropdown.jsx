import { string, shape, arrayOf, bool } from "prop-types";
import { useState } from "react";
import Downshift from "downshift";
import { LoadingIndicator } from "components";
import {
  FieldWrapper,
  SelectInputWrapper,
  Items,
  Item,
  ExpandIcon,
  Error,
  SelectInput,
  SearchIcon,
  Label
} from "./styled";
import { getError } from "./utils";

const FormDropdown = ({
  input,
  meta,
  label,
  items,
  isErrorVisibilityRequired
}) => {
  const [selectInput, setSelectInput] = useState("");
  const inputData = items.find(i => i.value === input.value);
  const labelContent = inputData ? inputData.label : "";
  const error = getError(meta, isErrorVisibilityRequired);

  return (
    <Downshift
      id={`form-dropdown-${input.name}`}
      selectedItem={input.value}
      onChange={v => {
        input.onChange(v.value);
        setSelectInput("");
      }}
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
            <SelectInputWrapper {...getToggleButtonProps({ isOpen })}>
              {labelContent || <Label>{label}</Label>}
              <ExpandIcon />
              {meta.data.saving && !meta.active && <LoadingIndicator />}
            </SelectInputWrapper>
            {error && <Error>{error}</Error>}
            {meta.data.saving && !meta.active && <LoadingIndicator />}
          </FieldWrapper>
          {isOpen && items.length > 0 && (
            <Items>
              <SelectInput
                onChange={e => setSelectInput(e.target.value)}
                value={selectInput}
              />
              <SearchIcon />
              {items
                .filter(item =>
                  selectInput.length
                    ? item.label
                        .toLowerCase()
                        .includes(selectInput.toLocaleLowerCase())
                    : item
                )
                .map((item, index) => (
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
