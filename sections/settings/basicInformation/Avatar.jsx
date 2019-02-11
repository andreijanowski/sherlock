import React from "react";
import { DropzoneWithCropper, PerfectSquare } from "components";
import { func, string } from "prop-types";

const Avatar = ({ t, url, saveImage }) => (
  <>
    <PerfectSquare>
      <DropzoneWithCropper
        tip={t("updatePhoto")}
        info={t("avatarInfo")}
        errorTip={t("invalidFileType")}
        errorInfo={t("validFileTypeInfo")}
        crop={t("app:crop")}
        cancel={t("app:cancel")}
        multiple={false}
        isCircleShape
        maxWidth={300}
        maxHeight={300}
        image={url}
        saveImage={imgBase64 => {
          saveImage("avatar", imgBase64);
        }}
        aspectRatio={1}
      />
    </PerfectSquare>
  </>
);

Avatar.propTypes = {
  t: func.isRequired,
  url: string,
  saveImage: func.isRequired
};

Avatar.defaultProps = {
  url: null
};

export default Avatar;
