import { PureComponent } from "react";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputWithRemoveButton } from "components";
import { string, func } from "prop-types";
import { FileIconWrapper } from "../styled";

class Menu extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      value: props.displayName || "",
      saving: false
    };
  }

  handleChange = e => this.setState({ value: e.target.value });

  handleBlur = async () => {
    const { updateMenu, id } = this.props;
    const { value } = this.state;
    this.setState({ saving: true });
    await updateMenu(id, value);
    this.setState({ saving: false });
  };

  render() {
    const { id, url, removeMenu } = this.props;
    const { value, saving } = this.state;
    return (
      <Flex width={1} alignItems="center">
        <FileIconWrapper href={url}>
          <FontAwesomeIcon size="2x" icon={["fa", "file-alt"]} />
        </FileIconWrapper>
        <Box mt={3} width="calc(100% - 60px)" pl={2}>
          <InputWithRemoveButton
            label="label"
            name="name"
            placeholder="placeholder"
            type="text"
            input={{
              value,
              onChange: this.handleChange,
              onBlur: this.handleBlur
            }}
            remove={() => removeMenu(id)}
            saving={saving}
          />
        </Box>
      </Flex>
    );
  }
}

Menu.propTypes = {
  id: string.isRequired,
  url: string.isRequired,
  displayName: string.isRequired,
  updateMenu: func.isRequired,
  removeMenu: func.isRequired
};

export default Menu;
