import { string, func, shape, arrayOf } from "prop-types";
import {
  H3,
  DropzoneWithCropper,
  Paragraph,
  PerfectSquare,
  Picture
} from "components";
import { Flex, Box } from "@rebass/grid";

const Pictures = ({ t, pictures, addPicture, removePicture }) => (
  <>
    <H3 mt={4}>{t("uploadCoverPicture")}</H3>
    <Paragraph app>{t("uploadCoverPictureTip")}</Paragraph>
    <Flex m={-2} flexWrap="wrap">
      <Box width={[1 / 3, 1 / 4]} p={2}>
        <PerfectSquare width={1}>
          <DropzoneWithCropper
            tip="＋"
            info={t("picturesInfo")}
            errorTipType={t("invalidFiles")}
            errorInfoType={t("validImages")}
            crop={t("app:crop")}
            cancel={t("app:cancel")}
            multiple
            maxWidth={4096}
            maxHeight={4096}
            saveImage={image => addPicture(image)}
          />
        </PerfectSquare>
      </Box>
      {pictures.map(p => (
        <Box width={[1 / 3, 1 / 4]} p={2} key={p.url}>
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
