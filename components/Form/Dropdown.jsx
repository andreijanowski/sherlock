import {
  string,
  shape,
  arrayOf,
  bool,
  any,
  oneOf,
  number,
  node
} from "prop-types";
import { Fragment, useState } from "react";
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
  SelectLabel,
  ItemThumb
} from "./styled";
import { getError } from "./utils";

const FormDropdown = ({
  input,
  meta,
  label,
  items,
  isErrorVisibilityRequired,
  long
}) => {
  const isGroupedMenu = Array.isArray(items[0] && items[0].items);

  const [selectInput, setSelectInput] = useState("");
  let inputData;

  if (isGroupedMenu) {
    items.forEach(itemsGroup => {
      if (inputData) return;
      inputData = itemsGroup.items.find(i => i.value === input.value);
    });
  } else {
    inputData = items.find(i => i.value === input.value);
  }

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
        selectedItem: dsSelectedItem
      }) => {
        const renderMenuItems = data =>
          data
            .filter(item =>
              selectInput.length
                ? item.label
                    .toLowerCase()
                    .includes(selectInput.toLocaleLowerCase())
                : item
            )
            .map(item => (
              <Item
                {...getItemProps({
                  item,
                  isSelected: dsSelectedItem === item.value,
                  key: item.value
                })}
              >
                {item.src && <ItemThumb src={item.src} />}
                {item.label}
              </Item>
            ));

        const renderGroupedMenuItems = groupedItems =>
          groupedItems.map(itemsGroup => {
            const visibleGroupItems = renderMenuItems(itemsGroup.items);
            if (!visibleGroupItems.length) return null;
            return (
              <Fragment key={itemsGroup.label}>
                <Item isGroupLabel>{itemsGroup.label}</Item>
                {visibleGroupItems}
              </Fragment>
            );
          });

        return (
          <div style={{ position: "relative" }}>
            <FieldWrapper>
              <SelectInputWrapper {...getToggleButtonProps({ isOpen })}>
                {labelContent || <SelectLabel>{label}</SelectLabel>}
                <ExpandIcon />
                {meta.data.saving && !meta.active && <LoadingIndicator />}
              </SelectInputWrapper>
              {error && <Error>{error}</Error>}
              {meta.data.saving && !meta.active && <LoadingIndicator />}
            </FieldWrapper>
            {isOpen && items.length > 0 && (
              <Items long={long}>
                <SelectInput
                  onChange={e => setSelectInput(e.target.value)}
                  value={selectInput}
                />
                <SearchIcon />
                {isGroupedMenu
                  ? renderGroupedMenuItems(items)
                  : renderMenuItems(items)}
              </Items>
            )}
          </div>
        );
      }}
    </Downshift>
  );
};

FormDropdown.propTypes = {
  input: shape().isRequired,
  meta: shape().isRequired,
  items: arrayOf(
    oneOf([
      shape({
        // eslint-disable-next-line react/forbid-prop-types
        label: any.isRequired,
        items: arrayOf(
          // eslint-disable-next-line react/forbid-prop-types
          shape({ label: any.isRequired, value: any.isRequired, src: string })
        )
      }),
      shape({
        label: oneOf([string, node]).isRequired,
        value: oneOf([string, number]).isRequired,
        src: string
      })
    ])
  ).isRequired,
  label: string.isRequired,
  isErrorVisibilityRequired: bool,
  long: bool
};
FormDropdown.defaultProps = {
  isErrorVisibilityRequired: false,
  long: false
};

export default FormDropdown;
