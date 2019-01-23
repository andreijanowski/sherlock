import { H3, DropzoneWithCropper } from "components";

const Logo = ({ t }) => (
  <>
    <H3>{t("logo")}</H3>
    <DropzoneWithCropper
      tip={t("chooseOrDragFile")}
      info={t("picturesInfo")}
      errorTip={t("someFilesAreInvalid")}
      errorInfo={t("validFiles")}
      accept={t("common:accept")}
      cancel={t("common:cancel")}
      multiple={false}
      maxWidth={4096}
      maxHeight={4096}
      // eslint-disable-next-line no-unused-vars
      saveImage={image => null}
      aspectRatio={1}
    />
  </>
);

export default Logo;
