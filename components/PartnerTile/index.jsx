import { shape, arrayOf, oneOfType, func } from "prop-types";

import { Container, ContentWrapper, Image, Link, StyledButton } from "./styled";

const PartnerTile = ({ partner, t }) => {
  const isActive = partner.get("active");
  const buttonLabel = isActive
    ? t("app:manageIntegrations.connect")
    : t("app:manageIntegrations.integrated");

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
        <Link href={partner.get("websiteUrl")}>{partner.get("name")}</Link>
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
