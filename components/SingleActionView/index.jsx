import { string, node } from "prop-types";
import { Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Wordmark, FoodetectiveLogo } from "components";
import {
  H2Styled,
  ParagraphStyled,
  LeftBox,
  SherlockMark,
  BackToLandingPage,
  RightBox,
  Wrapper,
  BackWrapper,
  LogoMobileWrapper,
  RightBoxChildrenWrapper
} from "./styled";

const SingleActionView = ({
  lng,
  children,
  actionTitle,
  actionDescription
}) => (
  <Wrapper>
    <LeftBox width={[1, 1, 1 / 2]}>
      <SherlockMark>
        <Wordmark inline />
      </SherlockMark>
      <Box alignSelf="center" width={1}>
        <BackWrapper>
          <Link lng={lng} route="/">
            <BackToLandingPage>
              <FontAwesomeIcon icon="arrow-left" size="xs" />
            </BackToLandingPage>
          </Link>
          <LogoMobileWrapper>
            <FoodetectiveLogo />
          </LogoMobileWrapper>
        </BackWrapper>
        <H2Styled textAlign="center">{actionTitle}</H2Styled>
        {actionDescription && actionDescription.type ? (
          actionDescription
        ) : (
          <ParagraphStyled>{actionDescription}</ParagraphStyled>
        )}
      </Box>
    </LeftBox>
    <RightBox width={[1, 1, 1 / 2]} justifyContent="center">
      <RightBoxChildrenWrapper alignSelf="center" pr={[0, 0, 80]} width={1}>
        {children}
      </RightBoxChildrenWrapper>
    </RightBox>
  </Wrapper>
);

SingleActionView.propTypes = {
  children: node.isRequired,
  lng: string.isRequired,
  actionTitle: string.isRequired,
  actionDescription: node.isRequired
};

export default SingleActionView;
