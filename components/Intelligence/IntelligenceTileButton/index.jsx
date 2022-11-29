import React, { useState, useEffect } from "react";
import { func, shape } from "prop-types";
import { IntelligenceModal } from "components/modals";
import IntelligenceVideoButton from "../PlayVideoButton";
import { Container, ButtonWrapper, BlueButton } from "./styled";

const IntelligenceTileButton = ({ t, data }) => {
  const {
    redirectionText,
    redirectionUrl,
    videoUrl,
    title,
    subtitle,
    logoUrl,
    description
  } = data;
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked(value => !value);

  useEffect(() => {
    if (checked) {
      document.getElementById("intelligence-section").style.filter =
        "blur(5px)";
    } else {
      document.getElementById("intelligence-section").style.filter =
        "blur(0px)";
    }
  }, [checked]);

  return (
    <>
      <Container hasUrl={redirectionUrl}>
        {videoUrl && (
          <ButtonWrapper>
            {videoUrl && (
              <IntelligenceVideoButton
                t={t}
                big
                url={videoUrl}
                styleName="blueDegrade"
              />
            )}
          </ButtonWrapper>
        )}
        {description && (
          <ButtonWrapper>
            <BlueButton
              big
              as="a"
              styleName="blueDegrade"
              onClick={toggleChecked}
            >
              {t("app:seeMore")}
            </BlueButton>
            {checked && (
              <IntelligenceModal
                description={description}
                title={title}
                subtitle={subtitle}
                image={logoUrl}
                onConfirm={toggleChecked}
                onCloseModal={toggleChecked}
              />
            )}
          </ButtonWrapper>
        )}
      </Container>
      {redirectionUrl && (
        <ButtonWrapper>
          <BlueButton
            big
            as="a"
            target="_blank"
            href={`${redirectionUrl}`}
            styleName="blueDegrade"
          >
            {redirectionText ? (
              <>
                {redirectionText.substring(0, 20)}{" "}
                {redirectionText.length >= 20 && "..."}
              </>
            ) : (
              <>{t("app:learnMore")}</>
            )}
          </BlueButton>
        </ButtonWrapper>
      )}
    </>
  );
};

IntelligenceTileButton.propTypes = {
  t: func.isRequired,
  data: shape().isRequired
};

export default IntelligenceTileButton;
