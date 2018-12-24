import { func } from "prop-types";
import { H2, Paragraph, BlueText, BoldText, ItalicText } from "components";
import { ServicesWrapper, MainWrapper, More } from "./styled";
import List from "./list";
import BackgroundCircle from "./backgroundCircle";

const Services = ({ t }) => (
  <MainWrapper>
    <ServicesWrapper>
      <H2 white>{t("services.header")}</H2>
      <Paragraph white>
        {t("services.paragraph.start")}
        <BlueText>
          <BoldText>
            <ItalicText>{t("services.paragraph.firstKeyword")}</ItalicText>
          </BoldText>
        </BlueText>
        {t("services.paragraph.middle")}
        <BlueText>
          <BoldText>
            <ItalicText>{t("services.paragraph.secondKeyword")}</ItalicText>
          </BoldText>
        </BlueText>
        {t("services.paragraph.end")}
      </Paragraph>
      <List {...{ t }} />
      <More>{t("services.more")}</More>
    </ServicesWrapper>
    <BackgroundCircle size={144} top={134} left={620} color="2, 7, 8" />
    <BackgroundCircle size={120} top={188} left={-740} color="255, 0, 6" />
    <BackgroundCircle size={144} top={530} left={-780} color="41, 34, 174" />
    <BackgroundCircle size={120} top={600} left={-530} color="0, 0, 0" />
    <BackgroundCircle size={120} top={590} left={-270} color="255, 212, 0" />
    <BackgroundCircle size={96} top={80} left={430} color="2, 7, 8" />
    <BackgroundCircle size={80} top={280} left={490} color="255, 93, 13" />
    <BackgroundCircle size={144} top={430} left={520} color="0, 207, 192" />
    <BackgroundCircle size={80} top={300} left={-520} color="10, 175, 241" />
    <BackgroundCircle size={120} top={580} left={280} color="255, 0, 33" />
    <BackgroundCircle size={96} top={80} left={-540} color="86, 173, 199" />
    <BackgroundCircle size={80} top={420} left={-630} color="255, 10, 0" />
  </MainWrapper>
);

Services.propTypes = {
  t: func.isRequired
};

export default Services;
