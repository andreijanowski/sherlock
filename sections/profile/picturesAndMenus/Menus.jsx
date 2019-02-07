import { H3, Dropzone } from "components";
import { func, arrayOf, shape, string } from "prop-types";
import Menu from "./Menu";
import { DropzoneWrapper } from "../styled";

const Menus = ({ t, menus, addMenu, updateMenu, removeMenu }) => (
  <>
    <H3 mt={4}>{t("menu")}</H3>
    <DropzoneWrapper>
      <Dropzone
        accept={["image/png", "image/jpeg", "application/pdf"]}
        tip={t("chooseOrDragFile")}
        info={t("picturesInfo")}
        errorTip={t("someFilesAreInvalid")}
        errorInfo={t("validFiles")}
        multiple
        onDrop={m => addMenu(m)}
      />
    </DropzoneWrapper>
    {menus.map(m => (
      <Menu {...{ ...m, updateMenu, removeMenu, key: m.id }} />
    ))}
  </>
);

Menus.propTypes = {
  t: func.isRequired,
  menus: arrayOf(shape({ id: string, displayName: string, url: string })),
  addMenu: func.isRequired,
  updateMenu: func.isRequired,
  removeMenu: func.isRequired
};

Menus.defaultProps = {
  menus: []
};

export default Menus;
