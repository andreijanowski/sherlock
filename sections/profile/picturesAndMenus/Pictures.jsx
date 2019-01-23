import { H3, DropzoneWithCropper, Paragraph, PerfectSquare } from "components";
import { Flex, Box } from "@rebass/grid";
import Picture from "./Picture";

const Pictures = ({
  t,
  pictures = [
    "https://images.unsplash.com/photo-1543363136-3fdb62e11be5",
    "https://images.unsplash.com/photo-1543364195-bfe6e4932397",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
  ]
}) => (
  <>
    <H3 mt={4}>{t("uploadCoverPicture")}</H3>
    <Paragraph app>{t("uploadCoverPictureTip")}</Paragraph>
    <Flex m={-2}>
      <Box width={1 / 4} p={2}>
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
      </Box>
      {pictures.map(p => (
        <Box width={1 / 4} p={2} key={p}>
          <Picture src={p} />
        </Box>
      ))}
    </Flex>
  </>
);

export default Pictures;
