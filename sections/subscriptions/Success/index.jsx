import { func } from "prop-types";
import { H2, Paragraph, Button } from "components";
import { SuccesWrapper } from "../styled";
import Cake from "./Cake";

const SuccessSection = ({ t, goToPlans }) => (
  <SuccesWrapper>
    <Cake />
    <H2 mt={3}>{t("success")}</H2>
    <Paragraph>{t("successMessage")}</Paragraph>
    <Button styleName="blue" onClick={goToPlans}>
      {t("goBackToPlans")}
    </Button>
  </SuccesWrapper>
);

SuccessSection.propTypes = {
  t: func.isRequired,
  goToPlans: func.isRequired
};

export default SuccessSection;
