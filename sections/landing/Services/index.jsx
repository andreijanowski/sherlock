import { func, oneOfType, shape, any } from "prop-types";
import { Box } from "@rebass/grid";
import { ServicesWrapper } from "./styled";
import { BlueText, H2Styled, ParagraphStyled } from "../sharedStyled";
import List from "./list";

const Services = ({ t, servicesRef }) => (
  <ServicesWrapper ref={servicesRef} px={3} flexWrap="wrap">
    <H2Styled>{t("services.header")}</H2Styled>
    <Box width={[1, 1 / 2]}>
      <ParagraphStyled>
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
  servicesRef: oneOfType([func, shape({ current: any })]).isRequired
};

export default Services;
