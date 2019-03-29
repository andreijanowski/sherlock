import { PureComponent } from "react";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from "react-stripe-elements";
import { Flex, Box } from "@rebass/grid";
import { Button, H3, BlueText, Opacity } from "components";
import { shape, func } from "prop-types";
import { theme } from "utils/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label, Input } from "./styled";

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
  handleSubmit = () => {
    const { stripe, updateSubscription } = this.props;
    if (stripe) {
      stripe.createSource({ type: "card" }).then(payload => {
        if (payload.error) {
          console.log("error", payload);
        } else if (payload.source) {
          console.log("success", payload);
          updateSubscription(payload.source.id);
        }
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    const { t } = this.props;
    return (
      <Flex width={1} flexDirection="column">
        <Box width={1}>
          <H3>{t("addCard")}</H3>
        </Box>
        <Flex flexWrap="wrap" mx={-2}>
          <Box as="label" width={1} mb={3} px={2}>
            <Label mb={1}>{t("cardNumber")}</Label>
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
        <Flex
          mt={3}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <BlueText>
              <FontAwesomeIcon icon={["fa", "lock"]} />
            </BlueText>
            <Opacity value={0.4}>{` ${t("secureCreditCardPayment")}`}</Opacity>
          </Box>
          <Box>
            <Button onClick={this.handleSubmit} styleName="blue">
              {t("upgradeMyPlan")}
            </Button>
          </Box>
        </Flex>
      </Flex>
    );
  }
}

Form.propTypes = {
  stripe: shape().isRequired,
  t: func.isRequired,
  updateSubscription: func.isRequired
};

export default injectStripe(Form);
