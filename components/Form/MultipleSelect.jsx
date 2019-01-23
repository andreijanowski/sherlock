import { PureComponent } from "react";
import { string, shape, arrayOf, number } from "prop-types";
import Downshift from "downshift";
import RawMultipleSelect from "./RawMultipleSelect";

class FormMultipleSelect extends PureComponent {
  state = {
    inputValue: ""
  };

  handleSelect = i => {
    const { input } = this.props;
    const safeValue = input.value || [];
    input.onChange([...safeValue, i]);
    this.setState({ inputValue: "" });
  };

  render() {
    const { input, meta, placeholder, items, maxItems } = this.props;
    const { inputValue } = this.state;

    return (
      <Downshift
        selectedItem={input.value}
        onChange={this.handleSelect}
        itemToString={i => i.label}
      >
        {({
          isOpen,
          getInputProps,
          getItemProps,
          highlightedIndex,
          openMenu,
          closeMenu
        }) => (
          <div style={{ position: "relative" }}>
            <RawMultipleSelect
              {...{
                isOpen,
                getInputProps,
                getItemProps,
                highlightedIndex,
                openMenu,
                closeMenu,
                input,
                meta,
                placeholder,
                items,
                maxItems,
                inputValue,
                setInputValue: v => this.setState({ inputValue: v })
              }}
            />
          </div>
        )}
      </Downshift>
    );
  }
}

FormMultipleSelect.propTypes = {
  input: shape().isRequired,
  meta: shape().isRequired,
  placeholder: string.isRequired,
  items: arrayOf(shape()).isRequired,
  maxItems: number.isRequired
};

export default FormMultipleSelect;
