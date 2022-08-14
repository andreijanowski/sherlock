import React from "react";
import { func, oneOfType, shape, any } from "prop-types";
import { Box } from "@rebass/grid";
import { Paragraph, H2 } from "components";
import { WidgetExample } from "./styled";

const Widget = ({ t, widgetRef }) => (
  <Box mb={4} ref={widgetRef}>
    <H2>{t("widget.header")}</H2>
    <Paragraph>{t("widget.paragraph")}</Paragraph>
    <WidgetExample />
  </Box>
);

Widget.propTypes = {
  t: func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  widgetRef: oneOfType([func, shape({ current: any })]).isRequired
};

export default Widget;
