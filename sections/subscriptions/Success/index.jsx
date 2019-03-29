import { func, string } from "prop-types";
import { H2, Paragraph, Button } from "components";
import { Router } from "routes";
import { SuccesWrapper } from "../styled";
import Cake from "./Cake";

const SuccessSection = ({ t, lng }) => (
  <SuccesWrapper>
    <Cake />
    <H2 mt={3}>{t("success")}</H2>
    <Paragraph>{t("successMessage")}</Paragraph>
    <Button
      styleName="blue"
      onClick={() => Router.pushRoute(`/${lng}/app/profile/basic-information/`)}
    >
      {t("successButton")}
    </Button>
  </SuccesWrapper>
);

SuccessSection.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default SuccessSection;
