import { func, oneOfType, shape, any } from "prop-types";
import { ServicesWrapper, BlueText, H2Styled, ParagraphStyled } from "./styled";
import List from "./list";

const Services = ({ t, servicesRef }) => (
  <ServicesWrapper ref={servicesRef}>
    <H2Styled>{t("services.header")}</H2Styled>
    <ParagraphStyled>
      {t("services.paragraph.start")}
      <BlueText>
        {t("services.paragraph.firstKeyword")}
        {t("services.paragraph.middle")}
        {t("services.paragraph.secondKeyword")}
      </BlueText>
    </ParagraphStyled>
    <ParagraphStyled>{t("services.paragraph.end")}</ParagraphStyled>
    <List {...{ t }} />
  </ServicesWrapper>
);

Services.propTypes = {
  t: func.isRequired,
  servicesRef: oneOfType([func, shape({ current: any })]).isRequired
};

export default Services;
