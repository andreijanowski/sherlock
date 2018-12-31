import { func } from "prop-types";
import { Paragraph, BlueText, BoldText } from "components";
import { PromotionWrapper } from "./styled";

const PromotionBoard = ({ t }) => (
  <PromotionWrapper>
    <Paragraph mb={0}>
      {t("plans.promotion.startFirstLine")}
      <BlueText>
        <BoldText>{t("plans.promotion.promotionPlan")}</BoldText>
      </BlueText>
      {t("plans.promotion.startLastLine")}
    </Paragraph>
    <Paragraph mb={0}>
      {t("plans.promotion.endFirstLine")}
      <BoldText>{t("plans.promotion.leftInStock")}</BoldText>
      {t("plans.promotion.endLastLine")}
    </Paragraph>
  </PromotionWrapper>
);

PromotionBoard.propTypes = {
  t: func.isRequired
};

export default PromotionBoard;
