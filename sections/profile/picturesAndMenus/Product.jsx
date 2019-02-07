import {
  PerfectSquare,
  DropzoneWithCropper,
  InputWithRemoveButton
} from "components";
import { Flex, Box } from "@rebass/grid";
import { func, string } from "prop-types";
import Picture from "./Picture";

const Product = ({ t, photo, name }) => (
  <Flex m={-2} mb={3} alignItems="center">
    <Box width={1 / 4} p={2}>
      {photo ? (
        <Picture src={photo} />
      ) : (
        <PerfectSquare width={1}>
          <DropzoneWithCropper
            tip="＋"
            info={t("picturesInfo")}
            errorTip={t("someFilesAreInvalid")}
            errorInfo={t("validFiles")}
            accept={t("common:accept")}
            cancel={t("common:cancel")}
            multiple
            maxWidth={4096}
            maxHeight={4096}
            // eslint-disable-next-line no-unused-vars
            saveImage={image => null}
          />
        </PerfectSquare>
      )}
    </Box>
    <Box width={3 / 4} p={2}>
      <InputWithRemoveButton
        label="label"
        name="name"
        placeholder="placeholder"
        type="text"
        input={{ value: name || "" }}
      />
    </Box>
  </Flex>
);

Product.propTypes = {
  t: func.isRequired,
  photo: string.isRequired,
  name: string.isRequired
};

export default Product;
