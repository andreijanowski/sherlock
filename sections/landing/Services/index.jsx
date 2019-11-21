import { func, oneOfType, shape, any } from "prop-types";
import { BoldText, ItalicText } from "components";
import { ServicesWrapper, More, WhiteText } from "./styled";
import { H2Styled, ParagraphStyled } from "../sharedStyled";
import List from "./list";

const Services = ({ t, servicesRef }) => (
  <ServicesWrapper ref={servicesRef}>
    <H2Styled white>{t("services.header")}</H2Styled>
    <ParagraphStyled white>
      {t("services.paragraph.start")}
      <WhiteText>
        <BoldText>
          <ItalicText>{t("services.paragraph.firstKeyword")}</ItalicText>
        </BoldText>
      </WhiteText>
      {t("services.paragraph.middle")}
      <WhiteText>
        <BoldText>
          <ItalicText>{t("services.paragraph.secondKeyword")}</ItalicText>
        </BoldText>
      </WhiteText>
      {t("services.paragraph.end")}
    </ParagraphStyled>
    <List {...{ t }} />
    <More>{t("services.more")}</More>
  </ServicesWrapper>
);

Services.propTypes = {
  t: func.isRequired,
  servicesRef: oneOfType([func, shape({ current: any })]).isRequired
};

export default Services;
