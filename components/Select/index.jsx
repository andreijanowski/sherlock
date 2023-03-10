import { isNil } from "lodash";
import { shape, arrayOf, func, string, bool } from "prop-types";
import Downshift from "downshift";
import { LoadingIndicator } from "components";
import { ExpandIcon, ExpandIconRestyled } from "icons";
import {
  ToggleButtonWrapper,
  Items,
  Item,
  Avatar,
  Action,
  ItemsWrapper,
  ButtonLabel
} from "./styled";

const Select = ({
  value = {},
  items,
  onChange,
  bottomAction,
  withImage,
  ButtonComponent,
  restyled
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
          <ToggleButtonWrapper
            {...getToggleButtonProps({ withImage })}
            restyled={restyled}
          >
            {withImage && <Avatar src={value.src} />}
            <ButtonLabel>{value.label}</ButtonLabel>
            {restyled ? <ExpandIconRestyled /> : <ExpandIcon />}
            {isNil(value.value) && <LoadingIndicator />}
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
  items: arrayOf(
    shape({
      label: string,
      src: string,
      value: string
    })
  ).isRequired,
  value: shape().isRequired,
  onChange: func.isRequired,
  withImage: bool,
  ButtonComponent: func,
  restyled: bool,
  bottomAction: shape({
    onClick: func,
    text: string
  })
};

Select.defaultProps = {
  bottomAction: null,
  withImage: false,
  ButtonComponent: null,
  restyled: false
};

export default Select;
