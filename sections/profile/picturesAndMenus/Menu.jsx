import { H3, Dropzone, InputWithRemoveButton } from "components";
import { Flex, Box } from "@rebass/grid";

const Menu = ({ t, onDrop }) => (
  <>
    <H3 mt={4}>{t("menu")}</H3>
    <Dropzone
      accept={["image/png", "image/jpeg", "application/pdf"]}
      tip={t("chooseOrDragFile")}
      info={t("picturesInfo")}
      errorTip={t("someFilesAreInvalid")}
      errorInfo={t("validFiles")}
      multiple
      onDrop={onDrop}
    />
    <Flex width={1} flexDirection="column">
      <Box mt={3}>
        <InputWithRemoveButton
          label="label"
          name="name"
          placeholder="placeholder"
          type="text"
          input={{ value: "" }}
        />
      </Box>
    </Flex>
  </>
);

export default Menu;
