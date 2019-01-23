import React from "react";
import FacebookLoginBase from "react-facebook-login/dist/facebook-login-render-props";
import { node, func, bool } from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FACEBOOK_APP_ID, FACEBOOK_APP_FIELDS } from "consts";
import { Button } from "components";
import { facebookLogin } from "actions/auth";

const handleClick = cb => e => {
  e.preventDefault();
  cb(e);
};

const FacebookLogin = props => (
  <FacebookLoginBase
    appId={FACEBOOK_APP_ID}
    fields={FACEBOOK_APP_FIELDS}
    callback={({ accessToken }) =>
      props.facebookLogin({ accessToken, agreement: props.withAgreement })
    }
    isMobile
    disableMobileRedirect
    render={({ onClick, isProcessing, isSdkLoaded }) => (
      <Button
        type="button"
        disabled={isProcessing || !isSdkLoaded || props.disabled}
        onClick={handleClick(onClick)}
        styleName="outlineBlue"
      >
        {isProcessing ? (
          <React.Fragment>
            <FontAwesomeIcon icon="circle-notch" spin size="lg" />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {props.children || <FontAwesomeIcon icon={["fab", "facebook-f"]} />}
          </React.Fragment>
        )}
      </Button>
    )}
  />
);

FacebookLogin.propTypes = {
  facebookLogin: func.isRequired,
  children: node,
  disabled: bool,
  withAgreement: bool
};

FacebookLogin.defaultProps = {
  children: null,
  disabled: false,
  withAgreement: false
};

export default connect(
  null,
  { facebookLogin }
)(FacebookLogin);
