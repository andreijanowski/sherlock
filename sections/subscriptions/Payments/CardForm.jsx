import { PureComponent } from "react";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from "react-stripe-elements";
import { Flex, Box } from "@rebass/grid";
import { Button, BlueText, Opacity, LoadingIndicator } from "components";
import { shape, func, string } from "prop-types";
import { theme } from "utils/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label, Input, Line, Container } from "./styled";

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
      nextPlanName,
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
                updateSubscription(setupIntent.id, nextPlanName);
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
              <Button onClick={this.handleSubmit} styleName="blue">
                {t("upgradeMyPlan")}
              </Button>
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
  notificationError: func.isRequired,
  nextPlanName: string.isRequired
};

export default injectStripe(Form);
