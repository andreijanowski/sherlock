import { H3, DropzoneWithCropper, PerfectSquare } from "components";
import { func, shape, string } from "prop-types";
import { Flex, Box } from "@rebass/grid";

const Logo = ({ t, logo, saveLogo }) => (
  <>
    <H3>{t("logo")}</H3>
    <Flex width={[1 / 2, 1 / 4]}>
      <Box width={1}>
        <PerfectSquare>
          <DropzoneWithCropper
            tip={t("chooseOrDragFile")}
            info={t("picturesInfo")}
            errorTipType={t("invalidFiles")}
            errorInfoType={t("validImages")}
            errorTipMultiple={t("invalidMultiple")}
            errorInfoMultiple={t("validMultiple")}
            accept={t("common:accept")}
            cancel={t("common:cancel")}
            multiple={false}
            maxWidth={300}
            maxHeight={300}
            image={logo.url ? `${logo.url}?${new Date().getTime()}` : undefined}
            saveImage={saveLogo}
            aspectRatio={1}
          />
        </PerfectSquare>
      </Box>
    </Flex>
  </>
);

Logo.propTypes = {
  t: func.isRequired,
  logo: shape({ url: string }),
  saveLogo: func.isRequired
};

Logo.defaultProps = {
  logo: {}
};

export default Logo;
