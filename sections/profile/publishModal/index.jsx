import {
  Button,
  Paragraph,
  BlueText,
  ItalicText,
  BoldText,
  LoadingIndicator
} from "components";
import { Box } from "@rebass/grid";
import { func, string, shape } from "prop-types";
import { Wrapper, Header, H2 } from "./styled";
import Step from "./Step";
import { generatePublishModalItems } from "../utils";

const PublishModal = ({
  t,
  lng,
  close,
  publish,
  business,
  businessGroups,
  businessMenus,
  businessPictures,
  businessProducts,
  businessOpenPeriods
}) => {
  const steps = business
    ? generatePublishModalItems({
        t,
        business,
        businessGroups,
        businessMenus,
        businessPictures,
        businessProducts,
        businessOpenPeriods
      })
    : [];
  return (
    <Wrapper>
      <Header>
        <Box width={1}>
          <H2>{t("publishModal:header")}</H2>
        </Box>
        <Box width={1 / 6} />
      </Header>
      <Paragraph>
        {t("publishModal:paragraph.0")}
        <BlueText>
          <ItalicText>
            <BoldText>{t("publishModal:paragraph.1")}</BoldText>
          </ItalicText>
        </BlueText>
        {t("publishModal:paragraph.2")}
      </Paragraph>
      {steps.map((s, index) => (
        <Step {...{ ...s, index, t, lng, close }} key={s.name} />
      ))}
      {business ? (
        <Button
          styleName="blue"
          onClick={() => {
            publish();
            close();
          }}
        >
          {t("publishModal:publish")}
        </Button>
      ) : (
        <LoadingIndicator />
      )}
    </Wrapper>
  );
};

PublishModal.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  close: func.isRequired,
  publish: func.isRequired,
  business: shape().isRequired,
  businessGroups: shape(),
  businessMenus: shape(),
  businessPictures: shape(),
  businessProducts: shape(),
  businessOpenPeriods: shape()
};

PublishModal.defaultProps = {
  businessGroups: null,
  businessMenus: null,
  businessPictures: null,
  businessProducts: null,
  businessOpenPeriods: null
};

export default PublishModal;
