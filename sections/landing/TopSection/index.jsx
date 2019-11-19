import { func, string } from "prop-types";
import { Router } from "routes";
import { Button, BlueText } from "components";
import { Flex, Box } from "@rebass/grid";
import { H1Styled } from "./styled";
import YoutubeVideo from "./YoutubeVideo";
import { ParagraphStyled } from "../sharedStyled";

const TopSection = ({ t, lng }) => (
  <Box mb={[1, 140]} mt={[2, 80]} width={1}>
    <Flex alignItems="center" flexWrap="wrap" m={-2}>
      <Box width={[1, 1 / 2]} p={2}>
        <H1Styled>
          {t("topSection.header.start")}
          <BlueText>{t("topSection.header.end")}</BlueText>
        </H1Styled>
        <ParagraphStyled>{t("topSection.paragraph")}</ParagraphStyled>
        <Box width={[1, "auto"]}>
          <Button
            styleName="blue"
            fluid
            fullHeight
            onClick={() => Router.pushRoute(`/${lng}/register/?plan=basic`)}
          >
            {t("topSection.getStartedForFree")}
          </Button>
        </Box>
      </Box>
      <Box width={[1, 1 / 2]} p={2}>
        <YoutubeVideo />
      </Box>
    </Flex>
  </Box>
);

TopSection.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default TopSection;
