import React from "react";
import FacebookLoginBase from "react-facebook-login/dist/facebook-login-render-props";
import { node, func, bool } from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PUBLIC_FACEBOOK_APP_ID, PUBLIC_FACEBOOK_APP_FIELDS } from "consts";
import { facebookLogin } from "actions/auth";
import { FacebookIcon } from "icons";
import { Flex } from "@rebass/grid";
import {
  FacebookStyledButton,
  FacebookIconWrapper,
  LoadingIconWrapper,
  FacebookButtonText
} from "./styled";

const handleClick = cb => e => {
  e.preventDefault();
  cb(e);
};

const FacebookLogin = props => (
  <FacebookLoginBase
    appId={PUBLIC_FACEBOOK_APP_ID}
    fields={PUBLIC_FACEBOOK_APP_FIELDS}
    callback={({ accessToken }) =>
      props.facebookLogin({ accessToken, agreement: props.withAgreement })
    }
    isMobile
    disableMobileRedirect
    render={({ onClick, isProcessing, isSdkLoaded }) => (
      <FacebookStyledButton
        type="button"
        fluid
        disabled={isProcessing || !isSdkLoaded || props.disabled}
        onClick={handleClick(onClick)}
      >
        <Flex alignItems="center">
          <FacebookIconWrapper>
            <FacebookIcon />
          </FacebookIconWrapper>
          {isProcessing ? (
            <FontAwesomeIcon icon="circle-notch" spin size="lg" />
          ) : (
            <FacebookButtonText>
              {props.children || (
                <LoadingIconWrapper>
                  <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                </LoadingIconWrapper>
              )}
            </FacebookButtonText>
          )}
        </Flex>
      </FacebookStyledButton>
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
