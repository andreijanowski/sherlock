import { PureComponent } from "react";
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  injectStripe,
  PostalCodeElement
} from "react-stripe-elements";
import { Box, Flex } from "@rebass/grid";
import { func, shape } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BlueText, StyledButton, LoadingIndicator, Opacity } from "components";
import { theme } from "utils/theme";
import { Container, Input, Label, Line } from "./styled";

const style = {
  base: {
    fontSize: theme.fontSizes[0],
    color: theme.colors.martinique,
    fontFamily: "Source Code Pro, monospace",
    "::placeholder": {
      color: theme.colors.manatee
    }
  },
  invalid: {
    color: theme.colors.red
  }
};

class Form extends PureComponent {
  state = {
    loading: false
  };

  handleSubmit = () => {
    const {
      stripe,
      updateSubscription,
      notificationError,
      getBusinessSetupIntent
    } = this.props;
    if (stripe) {
      this.setState({ loading: true });
      getBusinessSetupIntent().then(({ status, rawData, errors }) => {
        if (status === 200) {
          stripe
            .handleCardSetup(rawData.data.attributes.clientSecret)
            .then(({ error, setupIntent }) => {
              if (setupIntent) {
                updateSubscription(setupIntent.id);
                this.setState({ loading: true });
              } else {
                this.setState({ loading: false });
                notificationError({ message: error.message });
              }
            });
        } else {
          this.setState({ loading: false });
          if (errors && errors.length) {
            notificationError({ message: errors[0].title });
          }
        }
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    const { t } = this.props;
    const { loading } = this.state;
    return (
      <Flex width={1} flexDirection="column">
        {loading && <LoadingIndicator />}
        <Container>
          <Flex flexWrap="wrap" mx={-2} my={4}>
            <Box as="label" width={1} mb={3} px={2}>
              <Label mb={1}>{t("addCard")}</Label>
              <Input as={CardNumberElement} style={style} />
            </Box>
            <Box as="label" width={1 / 3} px={2}>
              <Label mb={1}>{t("expirationDate")}</Label>
              <Input as={CardExpiryElement} style={style} />
            </Box>
            <Box as="label" width={1 / 3} px={2}>
              <Label mb={1}>{t("ccv")}</Label>
              <Input as={CardCVCElement} style={style} />
            </Box>
            <Box as="label" width={1 / 3} px={2}>
              <Label mb={1}>{t("postalCode")}</Label>
              <Input as={PostalCodeElement} style={style} />
            </Box>
          </Flex>
        </Container>
        <Line />
        <Container>
          <Flex
            mt={4}
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <BlueText>
                <FontAwesomeIcon icon={["fa", "lock"]} />
              </BlueText>
              <Opacity value={0.4}>{` ${t(
                "secureCreditCardPayment"
              )}`}</Opacity>
            </Box>
            <Box>
              <StyledButton onClick={this.handleSubmit} styleName="blue">
                {t("upgradeMyPlan")}
              </StyledButton>
            </Box>
          </Flex>
        </Container>
      </Flex>
    );
  }
}

Form.propTypes = {
  stripe: shape().isRequired,
  t: func.isRequired,
  updateSubscription: func.isRequired,
  getBusinessSetupIntent: func.isRequired,
  notificationError: func.isRequired
};

export default injectStripe(Form);
