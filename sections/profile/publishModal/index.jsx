import { Button, Paragraph, BlueText, ItalicText, BoldText } from "components";
import { Box } from "@rebass/grid";
import { func, string } from "prop-types";
import { Wrapper, Header, H2 } from "./styled";
import Step from "./Step";
import { generatePublishModalItems } from "../utils";

// TODO: When API will be ready add validation checks.
// Line below is just a mock used for dev purposes
const validation = [true, true, false, false, false, false];

const PublishModal = ({ t, lng, close }) => {
  const steps = generatePublishModalItems(t, validation);
  return (
    <Wrapper>
      <Header>
        <Box mb={3} width={["auto", 1 / 6]}>
          <Button styleName="blue" onClick={close}>
            {t("publishModal:cancel")}
          </Button>
        </Box>
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
      <Button styleName="blue" onClick={close}>
        {t("publishModal:publish")}
      </Button>
    </Wrapper>
  );
};

PublishModal.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  close: func.isRequired
};

export default PublishModal;
