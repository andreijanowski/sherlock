import React from "react";
import { DropzoneWithCropper, PerfectSquare } from "components";
import { func } from "prop-types";

const Avatar = ({ t }) => (
  <>
    <PerfectSquare>
      <DropzoneWithCropper
        tip={t("updatePhoto")}
        info={t("avatarInfo")}
        errorTip={t("invalidFileType")}
        errorInfo={t("validFileTypeInfo")}
        accept={t("common:accept")}
        cancel={t("common:cancel")}
        multiple={false}
        isCircleShape
        maxWidth={300}
        maxHeight={300}
        image={undefined}
        saveImage={e => {
          console.log(e);
        }}
        aspectRatio={1}
      />
    </PerfectSquare>
  </>
);

Avatar.propTypes = {
  t: func.isRequired
};

export default Avatar;
