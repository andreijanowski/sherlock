import { func, string } from "prop-types";
import { Button } from "components";
import { Flex, Box } from "@rebass/grid";
import { API_URL, APP_URL } from "consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { H1Styled, ParagraphStyled, Image } from "./styled";

const TopSection = ({ t, lng }) => (
  <Box mb={[30, 170]} width={1}>
    <Flex
      alignItems="start"
      flexWrap="wrap"
      m="auto"
      width={[1, 1, 1, 1150]}
      px={3}
    >
      <Box width={[1, 1, 1, 1 / 2]} p={[3, 0]} pt={[30, 110]}>
        <H1Styled>{`${t("topSection.header.start")}${t(
          "topSection.header.end"
        )}`}</H1Styled>
        <ParagraphStyled>{t("topSection.paragraph")}</ParagraphStyled>
        <Flex
          alignItems="center"
          flexWrap="wrap"
          justifyContent={["center", "start"]}
        >
          <Box width={["auto"]} mr={[0, 16]} my={2}>
            <Button
              styleName="signUpCTA"
              onClick={() => {
                window.location.href = `${API_URL}/users/sign_up?locale=${lng}&redirect_url=${APP_URL}/instant-login?plan=essential`;
              }}
            >
              {t("topSection.getStartedForFree")}
              <FontAwesomeIcon
                icon={["fa", "chevron-right"]}
                style={{ marginLeft: 8 }}
              />
            </Button>
          </Box>
          <Box width={["auto"]} my={2}>
            <Button
              styleName="signUpContactSales"
              onClick={() => {
                window.location.href = `https://share.hsforms.com/1UW67s4YOTTKvC2NIum5X0w3cpmu`;
              }}
            >
              {t("topSection.contactSales")}
              <FontAwesomeIcon
                icon={["fa", "chevron-right"]}
                style={{ marginLeft: 8 }}
              />
            </Button>
          </Box>
        </Flex>
      </Box>
      <Box width={[1, 1, 1, 1 / 2]} pt={[30, 70]} pl={[1, 1, 1, 80]}>
        <Image src="/static/img/topsection/dashboard.png" />
      </Box>
    </Flex>
  </Box>
);

TopSection.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default TopSection;
