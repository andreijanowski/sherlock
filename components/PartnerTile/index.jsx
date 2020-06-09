import { shape, arrayOf, oneOfType, func, node } from "prop-types";

import { Container, ContentWrapper, Image, Link, StyledButton } from "./styled";

const UpdatedLink = ({ partner, children }) => (
  <Link
    href={partner.get("websiteUrl")}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </Link>
);

UpdatedLink.propTypes = {
  partner: oneOfType([arrayOf(), shape()]).isRequired,
  children: node.isRequired
};

const PartnerTile = ({ partner, t }) => {
  const isActive = partner.get("active");
  const buttonLabel = isActive ? (
    <UpdatedLink partner={partner}>
      {t("app:manageIntegrations.connect")}
    </UpdatedLink>
  ) : (
    t("app:manageIntegrations.integrated")
  );

  return (
    <Container
      mb={3}
      width={["100%", null, null, null, "49%"]}
      alignItems="center"
    >
      <Image src={partner.getIn(["logo", "url"])} />
      <ContentWrapper
        alignItems="center"
        justifyContent="space-between"
        p={[3, 4]}
        flex={1}
      >
        <UpdatedLink partner={partner}>{partner.get("name")}</UpdatedLink>
        <StyledButton styleName={!isActive ? "signUp" : "navyBlue"}>
          {buttonLabel}
        </StyledButton>
      </ContentWrapper>
    </Container>
  );
};

PartnerTile.propTypes = {
  partner: oneOfType([arrayOf(), shape()]).isRequired,
  t: func.isRequired
};

PartnerTile.defaultValue = {
  partner: null
};

export default PartnerTile;
