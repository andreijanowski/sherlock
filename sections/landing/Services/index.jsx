import { func, string } from "prop-types";
import { Box } from "@rebass/grid";

import {
  BlueText,
  H2Styled,
  ParagraphStyled
} from "sections/common/sharedStyled";
import { ServicesWrapper } from "./styled";
import List from "./list";

const Services = ({ t, id }) => (
  <ServicesWrapper px={3} flexWrap="wrap">
    <H2Styled id={id}>{t("services.header")}</H2Styled>
    <Box width={[1, 3 / 4]}>
      <ParagraphStyled big>
        {t("services.paragraph.start")}
        <BlueText>
          {t("services.paragraph.firstKeyword")}
          {t("services.paragraph.middle")}
          {t("services.paragraph.secondKeyword")}
        </BlueText>
        {t("services.paragraph.end")}
      </ParagraphStyled>
    </Box>
    <List {...{ t }} />
  </ServicesWrapper>
);

Services.propTypes = {
  t: func.isRequired,
  id: string.isRequired
};

export default Services;
