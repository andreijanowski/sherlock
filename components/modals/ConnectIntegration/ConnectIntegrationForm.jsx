import React from "react";
import { Form } from "react-final-form";
import { func, shape } from "prop-types";

import { Button, FormInput } from "components";
import { required } from "utils/validators";
import { useT } from "utils/hooks";
import { Trans } from "i18n";
import { ONLINE_MEETING_LINK } from "consts";
import {
  BodyStyled,
  ButtonsWrap,
  H3Styled,
  Underline,
  Wrapper
} from "./styled";

const ConnectIntegrationForm = ({ partner, onSubmit, onClose }) => {
  const t = useT(["integrations", "forms"]);
  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, form: { getState } }) => {
        const { submitting } = getState();
        return (
          <Wrapper onSubmit={handleSubmit}>
            <H3Styled>
              {t("integrations:connectPartner", { name: partner.get("name") })}
            </H3Styled>
            <FormInput
              name="integrationLogin"
              validate={required(t)}
              label={t("integrations:id")}
              placeholder={t("integrations:id")}
            />
            <FormInput
              name="integrationPassword"
              type="password"
              validate={required(t)}
              label={t("integrations:password")}
              placeholder={t("integrations:password")}
            />
            <BodyStyled>
              <Trans
                t={t}
                i18nKey="integrations:connectPartnerNote"
                components={[<Underline />]}
              />
            </BodyStyled>
            <BodyStyled>
              <Trans
                t={t}
                i18nKey="integrations:bookMeeting"
                components={[
                  <a
                    href={ONLINE_MEETING_LINK}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={onClose}
                  >
                    online meeting
                  </a>
                ]}
              />
            </BodyStyled>
            <ButtonsWrap>
              <Button type="button" styleName="reject" onClick={onClose}>
                {t("forms:cancel")}
              </Button>
              <Button styleName="accept" disabled={submitting}>
                {t("integrations:connect")}
              </Button>
            </ButtonsWrap>
          </Wrapper>
        );
      }}
    </Form>
  );
};

ConnectIntegrationForm.propTypes = {
  partner: shape().isRequired,
  onSubmit: func.isRequired,
  onClose: func.isRequired
};

export default ConnectIntegrationForm;
