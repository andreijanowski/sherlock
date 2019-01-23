import { string, node } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { H2, Paragraph, Link, Wordmark } from "components";
import { LeftBox, SherlockMark, BackToLandingPage, RightBox } from "./styled";

const SingleActionView = ({
  lng,
  children,
  actionTitle,
  actionDescription
}) => (
  <Flex width={1}>
    <LeftBox width={1 / 2}>
      <SherlockMark>
        <Wordmark inline />
      </SherlockMark>
      <Box alignSelf="center">
        <Link lng={lng} route="/">
          <BackToLandingPage>
            <FontAwesomeIcon icon="arrow-left" size="xs" />
          </BackToLandingPage>
        </Link>
        <H2>{actionTitle}</H2>
        {actionDescription.type ? (
          actionDescription
        ) : (
          <Paragraph>{actionDescription}</Paragraph>
        )}
      </Box>
    </LeftBox>
    <RightBox width={1 / 2}>
      <Box alignSelf="center" pr={80} width={1 / 1}>
        {children}
      </Box>
    </RightBox>
  </Flex>
);

SingleActionView.propTypes = {
  children: node.isRequired,
  lng: string.isRequired,
  actionTitle: string.isRequired,
  actionDescription: node.isRequired
};

export default SingleActionView;
