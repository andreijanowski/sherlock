import React from "react";

import { func, shape } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import setFieldData from "final-form-set-field-data";
import { Trans } from "i18n";

import { matchYoutubeUrl } from "utils/validators";
import { useT } from "utils/hooks";
import { MobilePreview } from "components/Onboarding";
import { FormInput, AutoSave } from "components";

import {
  Blue,
  Content,
  Wrapper,
  Title,
  Hint,
  Info,
  InfoWrapper,
  FormWrapper,
  FieldLabel,
  Optional
} from "./styled";

const Description = ({ values: initialValues, handleSubmit }) => {
  const t = useT(["basicInformation", "contactInformation"]);

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      mutators={{ setFieldData }}
      subscription={{ values: true, form: true }}
      render={({ values, form: { mutators } }) => (
        <FormWrapper>
          <AutoSave
            setFieldData={mutators.setFieldData}
            save={handleSubmit}
            t={t}
            hasHiddenMessages
          />
          <Wrapper>
            <Title>{t("description")}</Title>
            <Content>
              <InfoWrapper minWidth="800px" height="570px">
                <FieldLabel>
                  {t("businessBio")}
                  <Optional>{t("optional")}</Optional>
                </FieldLabel>
                <FormInput
                  name="bio"
                  label={t("bioLabel")}
                  placeholder={t("businessBioPlaceholder")}
                />
                {!values.bio && (
                  <Hint>
                    <Info fs="16px" fw="600" margin="0 0 9px">
                      <Trans t={t} i18nKey="hints.0" components={[<Blue />]} />
                    </Info>
                    {[1, 2, 3, 4].map(el => (
                      <Info fs="14px" key={el} margin="18px 0 0">
                        {t(`hints.${el}`)}
                      </Info>
                    ))}
                  </Hint>
                )}
                <FieldLabel>
                  {t("contactInformation:youtube")}
                  <Optional>{t("optional")}</Optional>
                </FieldLabel>
                <FormInput
                  name="youtube"
                  label={t("contactInformation:youtubeLabel")}
                  placeholder={t("contactInformation:youtubePlaceholder")}
                  validate={matchYoutubeUrl(t, "value")}
                />
                <Info fs="14px">
                  <Trans
                    t={t}
                    i18nKey="contactInformation:youtubeDescription"
                    components={[<b />]}
                  />
                </Info>
                <FieldLabel>
                  Facebook
                  <Optional>{t("optional")}</Optional>
                </FieldLabel>
                <FormInput
                  name="facebook"
                  label="Facebook (optional)"
                  placeholder={t("contactInformation:facebookPlaceholder")}
                />
                <FieldLabel>
                  Instagram
                  <Optional>{t("optional")}</Optional>
                </FieldLabel>
                <FormInput
                  name="instagram"
                  label="Instagram (optional)"
                  placeholder={t("contactInformation:instagramPlaceholder")}
                />
              </InfoWrapper>
              <MobilePreview {...values} />
            </Content>
          </Wrapper>
        </FormWrapper>
      )}
    />
  );
};

Description.propTypes = {
  values: shape(),
  handleSubmit: func
};

Description.defaultProps = {
  values: null,
  handleSubmit: null
};

export default Description;
