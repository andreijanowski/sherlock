import { PureComponent } from "react";
import { H3, Dropzone } from "components";
import { func, arrayOf, shape, string } from "prop-types";
import { withTranslation } from "i18n";
import Menu from "./Menu";
import { DropzoneWrapper } from "./styled";

const namespaces = ["picturesAndMenus"];

class Menus extends PureComponent {
  state = {
    isAddingFile: false
  };

  handleDrop = async m => {
    try {
      const { addMenu } = this.props;
      this.setState({ isAddingFile: true });
      await addMenu(m);
      this.setState({ isAddingFile: false });
    } catch (e) {
      console.log(e);
      this.setState({ isAddingFile: false });
    }
  };

  render() {
    const { t, menus, updateMenu, removeMenu, addToUber } = this.props;
    const { isAddingFile } = this.state;
    return (
      <>
        <H3 mt={4}>{t("menu")}</H3>
        <DropzoneWrapper>
          <Dropzone
            accept={["image/png", "image/jpeg", "application/pdf"]}
            tip={t("chooseOrDragFile")}
            info={t("picturesInfo")}
            errorTipType={t("invalidFiles")}
            errorInfoType={t("validMenus")}
            multiple
            loading={isAddingFile}
            onDrop={this.handleDrop}
          />
        </DropzoneWrapper>
        {menus.map(m => (
          <Menu
            {...{ ...m, t, addToUber, updateMenu, removeMenu, key: m.id }}
          />
        ))}
      </>
    );
  }
}

Menus.propTypes = {
  t: func.isRequired,
  menus: arrayOf(shape({ id: string, displayName: string, url: string })),
  addMenu: func.isRequired,
  updateMenu: func.isRequired,
  removeMenu: func.isRequired,
  addToUber: func.isRequired
};

Menus.defaultProps = {
  menus: []
};

export default withTranslation(namespaces)(Menus);
