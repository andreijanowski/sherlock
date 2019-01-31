import { string, func, shape, arrayOf } from "prop-types";
import { H3, DropzoneWithCropper, Paragraph, PerfectSquare } from "components";
import { Flex, Box } from "@rebass/grid";
import Picture from "./Picture";

const Pictures = ({ t, pictures, addPicture, removePicture }) => (
  <>
    <H3 mt={4}>{t("uploadCoverPicture")}</H3>
    <Paragraph app>{t("uploadCoverPictureTip")}</Paragraph>
    <Flex m={-2} flexWrap="wrap">
      <Box width={1 / 4} p={2}>
        <PerfectSquare width={1}>
          <DropzoneWithCropper
            tip="＋"
            info={t("picturesInfo")}
            errorTipType={t("invalidFiles")}
            errorInfoType={t("validImages")}
            accept={t("common:accept")}
            cancel={t("common:cancel")}
            multiple
            maxWidth={4096}
            maxHeight={4096}
            // eslint-disable-next-line no-unused-vars
            saveImage={image => addPicture(image)}
          />
        </PerfectSquare>
      </Box>
      {pictures.map(p => (
        <Box width={1 / 4} p={2} key={p.url}>
          <Picture {...{ ...p, remove: removePicture }} />
        </Box>
      ))}
    </Flex>
  </>
);

Pictures.propTypes = {
  t: func.isRequired,
  pictures: arrayOf(shape({ id: string, url: string })),
  addPicture: func.isRequired,
  removePicture: func.isRequired
};

Pictures.defaultProps = {
  pictures: []
};

export default Pictures;
