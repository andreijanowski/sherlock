import { shape, arrayOf, func, string, bool } from "prop-types";
import Downshift from "downshift";
import { LoadingIndicator } from "components";
import { ExpandIcon } from "icons";
import {
  ToggleButtonWrapper,
  Items,
  Item,
  Avatar,
  Action,
  ItemsWrapper
} from "./styled";

const Select = ({
  value,
  items,
  onChange,
  bottomAction,
  withImage,
  ButtonComponent
}) => (
  <Downshift
    id="select-single"
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
        {ButtonComponent ? (
          <ButtonComponent {...getToggleButtonProps()} />
        ) : (
          <ToggleButtonWrapper {...getToggleButtonProps({ withImage })}>
            {withImage && <Avatar src={value.src} />}
            {value.label}
            <ExpandIcon />
            {!value.value && <LoadingIndicator />}
          </ToggleButtonWrapper>
        )}
        {isOpen && items.length > 0 && (
          <ItemsWrapper bottomAction={!!bottomAction}>
            <Items>
              {items.map((item, index) => (
                <Item
                  key={JSON.stringify(item)}
                  {...getItemProps({
                    item,
                    isActive: highlightedIndex === index,
                    isSelected: dsSelectedItem.value === item.value,
                    withImage
                  })}
                >
                  {withImage && <Avatar src={item.src} />}
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
  withImage: bool,
  ButtonComponent: func,
  bottomAction: shape({
    onClick: func,
    text: string
  })
};

Select.defaultProps = {
  bottomAction: null,
  withImage: false,
  ButtonComponent: null
};

export default Select;
