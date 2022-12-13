import { func } from "prop-types";
import { H2, Paragraph, StyledButton } from "components";
import { SuccesWrapper } from "../styled";
import Cake from "./Cake";

const SuccessSection = ({ t, goToPlans }) => (
  <SuccesWrapper>
    <Cake />
    <H2 mt={3}>{t("success")}</H2>
    <Paragraph>{t("successMessage")}</Paragraph>
    <StyledButton styleName="blue" onClick={goToPlans}>
      {t("goBackToPlans")}
    </StyledButton>
  </SuccesWrapper>
);

SuccessSection.propTypes = {
  t: func.isRequired,
  goToPlans: func.isRequired
};

export default SuccessSection;
