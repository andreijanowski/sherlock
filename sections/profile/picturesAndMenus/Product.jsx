import { PureComponent } from "react";
import { InputWithRemoveButton } from "components";
import { Flex, Box } from "@rebass/grid";
import { func, string } from "prop-types";
import Picture from "./Picture";

class Product extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      value: props.name || "",
      saving: false
    };
  }

  handleChange = e => this.setState({ value: e.target.value });

  handleBlur = async () => {
    try {
      const { updateProduct, id } = this.props;
      const { value } = this.state;
      this.setState({ saving: true });
      await updateProduct(id, value);
      this.setState({ saving: false });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { t, id, url, removeProduct } = this.props;
    const { value, saving } = this.state;
    return (
      <Flex m={-2} mb={3} alignItems="center">
        <Box width={1 / 4} p={2}>
          <Picture {...{ url, id, remove: removeProduct }} />
        </Box>
        <Box width={3 / 4} p={2}>
          <InputWithRemoveButton
            label={t("productLabel")}
            name="name"
            placeholder={t("productPlaceholder")}
            type="text"
            input={{
              value,
              onChange: this.handleChange,
              onBlur: this.handleBlur
            }}
            remove={() => removeProduct(id)}
            saving={saving}
          />
        </Box>
      </Flex>
    );
  }
}

Product.propTypes = {
  t: func.isRequired,
  id: string.isRequired,
  url: string.isRequired,
  name: string.isRequired,
  removeProduct: func.isRequired,
  updateProduct: func.isRequired
};

export default Product;
