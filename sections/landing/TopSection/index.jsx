import { Button, FoodetectiveLogo, H1, BlueText, Paragraph } from "components";
import { Flex, Box } from "@rebass/grid";
import { Content, LogoWrapper } from "./styled";

const TopSection = ({ t }) => (
  <Flex flexDirection="column" mt={4} px={4} width={1}>
    <Box alignSelf="flex-end">
      <Button styleName="login">{t("common:login")}</Button>
    </Box>
    <Content>
      <LogoWrapper>
        <FoodetectiveLogo {...{ t }} />
      </LogoWrapper>
      <H1>
        {t("topSection.header.start")}
        <BlueText>{t("topSection.header.end")}</BlueText>
      </H1>
      <Paragraph>{t("topSection.paragraph")}</Paragraph>
      <Flex flexDirection="row">
        <Box mr={2}>
          <Button styleName="blue">{t("topSection.getStartedForFree")}</Button>
        </Box>
        <Box mr={2}>
          <Button styleName="blue">{t("topSection.addYourBusiness")}</Button>
        </Box>
        <Box>
          <Button styleName="blue">{t("topSection.addManager")}</Button>
        </Box>
      </Flex>
    </Content>
  </Flex>
);

export default TopSection;
