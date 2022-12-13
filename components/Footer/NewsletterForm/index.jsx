import React, { useCallback, useState } from "react";
import { isEmail } from "validator";

import { client } from "sagas/api";
import { contentTypes } from "consts";
import { useT } from "utils/hooks";
import { LoadingIndicator } from "components";
import {
  StyledButton,
  Caption,
  Container,
  Error,
  Input,
  InputWrapper,
  LoaderWrapper
} from "./styled";

const STATUSES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  FAIL: "fail"
};

const NewsletterForm = () => {
  const t = useT("footer");
  const [status, setStatus] = useState(STATUSES.IDLE);
  const [inputValue, setInputValue] = useState("");

  const onSendCLick = useCallback(async () => {
    setStatus(STATUSES.LOADING);
    try {
      const {
        data: { success }
      } = await client.post(
        "/newsletter-subscription",
        {
          email: inputValue
        },
        {
          headers: {
            "Content-Type": contentTypes.JSON
          }
        }
      );
      setStatus(success ? STATUSES.SUCCESS : STATUSES.FAIL);
    } catch (e) {
      setStatus(STATUSES.FAIL);
    }
  }, [inputValue]);

  const onInputChange = useCallback(e => {
    setInputValue(e.target.value);
  }, []);

  const isEmailInvalid = inputValue ? !isEmail(inputValue) : false;
  const isSendDisabled = !inputValue || isEmailInvalid;

  return (
    <Container>
      {status === STATUSES.SUCCESS ? (
        <Caption>{t("newsletter.success")}</Caption>
      ) : (
        <>
          <InputWrapper isInvalid={isEmailInvalid} mb={2} pb="14px">
            <Input
              type="text"
              value={inputValue}
              onChange={onInputChange}
              placeholder={t("newsletter.email")}
            />
            <StyledButton
              disabled={isSendDisabled}
              onClick={onSendCLick}
              ml={2}
            >
              {t("newsletter.send")}
            </StyledButton>
          </InputWrapper>
          <Caption>{t("newsletter.caption")}</Caption>
          {status === STATUSES.FAIL && <Error>{t("newsletter.fail")}</Error>}
        </>
      )}
      {status === STATUSES.LOADING && (
        <LoaderWrapper>
          <LoadingIndicator isWrapped hasTransparentBackground />
        </LoaderWrapper>
      )}
    </Container>
  );
};

export default NewsletterForm;
