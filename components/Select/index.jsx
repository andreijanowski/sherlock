import { PureComponent } from "react";
import { shape, arrayOf, func } from "prop-types";
import Downshift from "downshift";
import { LoadingIndicator } from "components";
import { ToggleButtonWrapper, ExpandIcon, Items, Item, Avatar } from "./styled";

class Select extends PureComponent {
  getValue = (input, meta, inputValue) =>
    meta.active ? inputValue : (input.value && input.value.label) || "";

  render() {
    const { value, items, onChange } = this.props;

    return (
      <Downshift
        selectedItem={value}
        onChange={onChange}
        itemToString={i => i.label}
      >
        {({
          isOpen,
          getToggleButtonProps,
          getItemProps,
          highlightedIndex,
          selectedItem: dsSelectedItem
        }) => (
          <div style={{ position: "relative", width: "100%" }}>
            <ToggleButtonWrapper {...getToggleButtonProps()}>
              {value.src && <Avatar src={value.src} />}
              {value.label}
              <ExpandIcon />
              {!value.value && <LoadingIndicator />}
            </ToggleButtonWrapper>
            {isOpen && items.length > 0 && (
              <Items>
                {items.map((item, index) => (
                  <Item
                    key={JSON.stringify(item)}
                    {...getItemProps({
                      item,
                      isActive: highlightedIndex === index,
                      isSelected: dsSelectedItem.value === item.value
                    })}
                  >
                    <Avatar src={item.src} />
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

Select.propTypes = {
  items: arrayOf(shape()).isRequired,
  value: shape().isRequired,
  onChange: func.isRequired
};

export default Select;
