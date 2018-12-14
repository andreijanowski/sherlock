import { H2, Paragraph, BlueText, BoldText, ItalicText } from "components";
import { ServicesWrapper, MainWrapper, More, Brand } from "./styled";
import List from "./list";

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
    <Brand src="/static/brand1.png" size="184px" top="134px" left="580px" />
    <Brand src="/static/brand2.png" size="160px" top="188px" left="-740px" />
    <Brand src="/static/brand3.png" size="184px" top="530px" left="-780px" />
    <Brand src="/static/brand4.png" size="160px" top="550px" left="-570px" />
    <Brand src="/static/brand5.png" size="160px" top="580px" left="-270px" />
    <Brand src="/static/brand6.png" size="136px" top="80px" left="410px" />
    <Brand src="/static/brand7.png" size="120px" top="280px" left="480px" />
    <Brand src="/static/brand8.png" size="184px" top="430px" left="500px" />
    <Brand src="/static/brand9.png" size="120px" top="300px" left="-550px" />
    <Brand src="/static/brand10.png" size="160px" top="580px" left="280px" />
    <Brand src="/static/brand11.png" size="136px" top="80px" left="-560px" />
    <Brand src="/static/brand12.png" size="120px" top="420px" left="-630px" />
  </MainWrapper>
);

export default Services;
