import { useState } from "react";
import { FormInput, H3, Button, LoadingIndicator, Paragraph } from "components";
import { Form as FinalForm } from "react-final-form";
import { func, shape, string } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { required } from "utils/validators";
import isServer from "utils/isServer";
import { Form, StyledButton } from "./styled";

const WidgetForm = ({
  t,
  initialValues,
  apiKey,
  setEditedWidgetId,
  addWidget
}) => {
  const [isSending, setIsSending] = useState(false);

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={addWidget}
      subscription={{
        handleSubmit: true,
        form: true
      }}
      render={({ handleSubmit, form: { reset } }) => {
        const resetForm = (shouldRemoveData = true) => {
          setIsSending(false);
          if (shouldRemoveData) {
            setEditedWidgetId(null);
            reset();
          }
        };
        const editMode = Object.entries(initialValues).length !== 0;
        return (
          <Form
            onSubmit={e => {
              const promise = handleSubmit(e);
              if (promise && promise.then) {
                setIsSending(true);
                promise.then(() => resetForm()).catch(() => resetForm(false));
              } else if (editMode) {
                resetForm();
              }
            }}
          >
            {isSending ? (
              <LoadingIndicator />
            ) : (
              <>
                {apiKey && (
                  <>
                    <H3>{t("widgetScript")}</H3>
                    <Paragraph>{t("widgetScriptDescription")}</Paragraph>
                    <Flex>
                      <Box width={1} mb={3}>
                        <StyledButton fluid styleName="hanPurple" as="div">
                          {`<script>var s=document.createElement('script');s.onload=function(){window.foodetectiveWidget.init("${apiKey}","YOUR_WRAPPER_ID_HERE");};s.src="${!isServer &&
                            window.location
                              .origin}/static/widget/entry.js";document.head.appendChild(s);</script>`}
                        </StyledButton>
                      </Box>
                    </Flex>
                  </>
                )}
                <H3>{editMode ? t("editWidget") : t("addWidget")}</H3>
                <Flex>
                  <Box width={1}>
                    <FormInput
                      name="domains"
                      validate={required(t)}
                      label={t("domainsLabel")}
                      placeholder={t("domainsPlaceholder")}
                    />
                  </Box>
                </Flex>
                <Flex mx={-3}>
                  <Box mb={3} width={editMode ? 1 / 2 : 1} px={3}>
                    <Button fluid styleName="blue" type="submit">
                      {editMode ? t("editWidget") : t("addWidget")}
                    </Button>
                  </Box>
                  {editMode && (
                    <Box mb={3} width={1 / 2} px={3}>
                      <Button
                        fluid
                        styleName="blue"
                        onClick={() => resetForm(true)}
                      >
                        {t("addNewWidget")}
                      </Button>
                    </Box>
                  )}
                </Flex>
              </>
            )}
          </Form>
        );
      }}
    />
  );
};

WidgetForm.propTypes = {
  t: func.isRequired,
  addWidget: func.isRequired,
  setEditedWidgetId: func.isRequired,
  initialValues: shape({}).isRequired,
  apiKey: string.isRequired
};

export default WidgetForm;
