import { func, string } from "prop-types";
import { Button, BlueText } from "components";
import { Flex, Box } from "@rebass/grid";
import { API_URL } from "consts";
import { H1Styled } from "./styled";
import YoutubeVideo from "./YoutubeVideo";
import { ParagraphStyled } from "../sharedStyled";

const TopSection = ({ t, lng }) => (
  <Box mb={[1, 140]} mt={[2, 80]} width={1}>
    <Flex alignItems="center" flexWrap="wrap" m={[-2, -3]}>
      <Box width={[1, 1 / 2]} p={[2, 3]}>
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
            onClick={() => {
              window.location.href = `${API_URL}users/sign_up?locale=${lng}&plan=basic`;
            }}
          >
            {t("topSection.getStartedForFree")}
          </Button>
        </Box>
      </Box>
      <Box width={[1, 1 / 2]} p={[2, 3]}>
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
