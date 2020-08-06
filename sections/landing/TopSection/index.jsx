import { func, string } from "prop-types";
import { Button } from "components";
import { Flex, Box } from "@rebass/grid";
import { API_URL, APP_URL } from "consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { H1Styled, ParagraphStyled, Image } from "./styled";

const TopSection = ({ t, lng }) => (
  <Box mb={[1, 1]} mt={[2, 80]} width={1}>
    <Flex alignItems="center" flexWrap="wrap" m="auto" width={1050}>
      <Box width={[1, 1 / 2]}>
        <H1Styled>{`${t("topSection.header.start")}${t(
          "topSection.header.end"
        )}`}</H1Styled>
        <ParagraphStyled>{t("topSection.paragraph")}</ParagraphStyled>
        <Flex
          alignItems="center"
          flexWrap="wrap"
          justifyContent={["center", "start"]}
        >
          <Box width={["auto"]} mr={16} my={2}>
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
                window.location.href = `${API_URL}/users/sign_up?locale=${lng}&redirect_url=${APP_URL}/instant-login?plan=essential`;
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
      <Box width={[1, 1 / 2]}>
        <Image />
      </Box>
    </Flex>
  </Box>
);

TopSection.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default TopSection;
