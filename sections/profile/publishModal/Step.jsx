import { Box } from "@rebass/grid";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { number, string, bool, func } from "prop-types";
import { Link } from "components";
import {
  StepWrapper,
  StepNumber,
  StepTip,
  StepName,
  StepStatus
} from "./styled";

const Step = ({ t, lng, index, tip, name, isValid, route, close }) => (
  <StepWrapper>
    <StepNumber>
      {t("publishModal:step")} {index + 1}
    </StepNumber>
    <Box>
      <StepTip>{tip}</StepTip>
      <Link {...{ lng, route }}>
        <StepName onClick={close}>{name}</StepName>
      </Link>
    </Box>
    <Box>
      <StepStatus isChecked={isValid}>
        <Icon icon={["fa", "check"]} />
      </StepStatus>
    </Box>
  </StepWrapper>
);

Step.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  route: string.isRequired,
  index: number.isRequired,
  tip: string.isRequired,
  name: string.isRequired,
  isValid: bool.isRequired,
  close: func.isRequired
};

export default Step;
