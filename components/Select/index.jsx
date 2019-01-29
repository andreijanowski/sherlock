import { shape, arrayOf, func, string } from "prop-types";
import Downshift from "downshift";
import { LoadingIndicator } from "components";
import {
  ToggleButtonWrapper,
  ExpandIcon,
  Items,
  Item,
  Avatar,
  Action,
  ItemsWrapper
} from "./styled";

const Select = ({ value, items, onChange, bottomAction }) => (
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
      closeMenu,
      selectedItem: dsSelectedItem
    }) => (
      <div style={{ position: "relative", width: "100%" }}>
        <ToggleButtonWrapper {...getToggleButtonProps()}>
          <Avatar src={value.src} />
          {value.label}
          <ExpandIcon />
          {!value.value && <LoadingIndicator />}
        </ToggleButtonWrapper>
        {isOpen && items.length > 0 && (
          <ItemsWrapper bottomAction={!!bottomAction}>
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
            {bottomAction && (
              <Action
                onClick={() => {
                  closeMenu();
                  bottomAction.handleClick();
                }}
              >
                {bottomAction.text}
              </Action>
            )}
          </ItemsWrapper>
        )}
      </div>
    )}
  </Downshift>
);

Select.propTypes = {
  items: arrayOf(shape()).isRequired,
  value: shape().isRequired,
  onChange: func.isRequired,
  bottomAction: shape({
    onClick: func.isRequired,
    text: string.isRequired
  })
};

Select.defaultProps = {
  bottomAction: null
};

export default Select;
