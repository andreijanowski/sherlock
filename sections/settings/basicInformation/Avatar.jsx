import React, { PureComponent } from "react";
import { DropzoneWithCropper, PerfectSquare } from "components";
import { func, string } from "prop-types";

class Avatar extends PureComponent {
  state = {
    chosenAvatar: null
  };

  onImageSave = imgBase64 => {
    const { saveToFormState } = this.props;
    this.setState({ chosenAvatar: imgBase64 });
    saveToFormState("avatar", imgBase64);
  };

  render() {
    const { t, url } = this.props;
    const { chosenAvatar } = this.state;
    return (
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
          image={chosenAvatar || url}
          saveImage={this.onImageSave}
          aspectRatio={1}
        />
      </PerfectSquare>
    );
  }
}

Avatar.propTypes = {
  t: func.isRequired,
  url: string,
  saveToFormState: func.isRequired
};

Avatar.defaultProps = {
  url: null
};

export default Avatar;
