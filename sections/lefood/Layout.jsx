import { PureComponent } from "react";
import { func, string, node, number, shape } from "prop-types";
import AppLayout from "layout/App";
import {
  Button,
  ButtonWithImageText,
  ButtonWithImageIconWrapper,
  Link,
  InfoBar,
  ItalicText,
  Select,
  AutosizeInput,
  ConnectWithStripe,
  LoadingIndicator,
  RawCheckbox,
  H2
} from "components";
import {
  Orders,
  Time,
  Price,
  Menu,
  Clock,
  Location,
  Pause,
  ExpandIcon,
  Reservations
} from "icons";
import { normalizePrice } from "utils/normalizers";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Router } from "routes";
import { convertToCents } from "utils/price";
import prepareBusinessesList from "utils/prepareBusinessesList";
import Tippy from "@tippy.js/react";
import StopOrdersModal from "./StopOrdersModal";
import FinishOrdersModal from "./FinishOrdersModal";
import StripeCurrencyModal from "./StripeCurrencyModal";
import { Orange } from "./styled";

const averageDeliveryTimeList = t => [
  {
    value: 0,
    label: t("notSpecified")
  },
  {
    value: 15,
    label: "15 min"
  },
  {
    value: 30,
    label: "30 min"
  },
  {
    value: 45,
    label: "45 min"
  },
  {
    value: 60,
    label: "1 h"
  },
  {
    value: 75,
    label: "1 h 15 min"
  },
  {
    value: 90,
    label: "1 h 30 min"
  },
  {
    value: 105,
    label: "1 h 45 min"
  },
  {
    value: 120,
    label: "2 h"
  }
];

const calcProfileCompletedPercents = ({
  dishesLength,
  deliveriesLength,
  orderPeriodsLength,
  allowPickup
}) => {
  let profileCompletedSteps = 0;
  if (dishesLength) {
    profileCompletedSteps += 1;
  }
  if (deliveriesLength || allowPickup) {
    profileCompletedSteps += 1;
  }
  if (orderPeriodsLength) {
    profileCompletedSteps += 1;
  }
  const profileCompletedPercents = [0, 33, 67, 100];
  return profileCompletedPercents[profileCompletedSteps];
};

class LefoodLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      minAmountForDeliveryCents: 0,
      isStopOrdersModalVisible: false,
      isFinishOrdersModalVisible: false,
      isCurrencyModalVisible:
        props.business && !props.business.get("stripeCurrency")
    };
  }

  componentDidMount() {
    this.updateMinAmountForDeliveryCents();
  }

  componentDidUpdate(prevProps) {
    const { business: prevBusiness } = prevProps;
    const { business } = this.props;
    if (
      (prevBusiness && prevBusiness.get("minAmountForDeliveryCents")) !==
      (business && business.get("minAmountForDeliveryCents"))
    ) {
      this.updateMinAmountForDeliveryCents();
    }
    if (!prevBusiness && business) {
      this.updateCurrencyModalVisibility();
    }
  }

  updateMinAmountForDeliveryCents = () => {
    const { business } = this.props;
    this.setState({
      minAmountForDeliveryCents: normalizePrice(
        business && business.get("minAmountForDeliveryCents")
      )
    });
  };

  updateCurrencyModalVisibility = () => {
    const { business } = this.props;
    this.setState({
      isCurrencyModalVisible: business && !business.get("stripeCurrency")
    });
  };

  setStopOrdersModalVisibility = isVisible =>
    this.setState({
      isStopOrdersModalVisible: isVisible
    });

  setFinishOrdersModalVisibility = isVisible =>
    this.setState({
      isFinishOrdersModalVisible: isVisible
    });

  setCurrencyModalVisibility = isVisible =>
    this.setState({ isCurrencyModalVisible: isVisible });

  updateBusiness = values => {
    const {
      updateBusiness,
      currentBusinessId,
      changeCurrentBusiness
    } = this.props;
    updateBusiness(currentBusinessId, values)
      .then(() => {
        if (values.stripeCurrency) {
          changeCurrentBusiness(currentBusinessId);
        }
      })
      .catch(() => {
        if (values.minAmountForDeliveryCents) {
          this.updateMinAmountForDeliveryCents();
        }
      });
  };

  render() {
    const {
      t,
      lng,
      page,
      children,
      dishesLength,
      deliveriesLength,
      orderPeriodsLength,
      business,
      currentBusinessId,
      businesses,
      changeCurrentBusiness
    } = this.props;
    const {
      minAmountForDeliveryCents,
      isStopOrdersModalVisible,
      isFinishOrdersModalVisible,
      isCurrencyModalVisible
    } = this.state;
    const profileCompletedPercents =
      page === "orders"
        ? calcProfileCompletedPercents({
            dishesLength,
            deliveriesLength,
            orderPeriodsLength,
            allowPickup: business && business.get("allowPickup")
          })
        : 100;

    const currentAverageDeliveryTime = averageDeliveryTimeList(t).find(
      i => i.value === (business && business.get("averageDeliveryTime"))
    ) || { value: undefined };
    return (
      <AppLayout
        {...{
          mainIcon: "leFood",
          header: t(page),
          t,
          lng
        }}
      >
        {!business || business.get("stripeUserId") === undefined ? (
          <>
            <LoadingIndicator />
            {console.log("Layout indicator")}
          </>
        ) : (
          <>
            <Box width={[1, 1 / 2]} mb={3}>
              <Select
                value={{
                  value: currentBusinessId,
                  label:
                    (business && business.get("name")) ||
                    t("app:manageProfile.unnamedBusiness"),
                  src: business && business.getIn(["logo", "url"])
                }}
                withImage
                items={prepareBusinessesList(t, businesses)}
                onChange={b => changeCurrentBusiness(b.value)}
              />
            </Box>
            {business.get("stripeCurrency") ? (
              <>
                {business.get("stripeUserId") ? (
                  <>
                    {profileCompletedPercents !== 100 && (
                      <InfoBar
                        info={
                          // eslint-disable-next-line react/jsx-wrap-multilines
                          <span>
                            {`${t("completeYourProfile")} `}
                            <ItalicText>
                              <Orange>
                                <Link route="/app/lefood/menu/" lng={lng}>
                                  <Orange as="a">{`(${t("menu")}`}</Orange>
                                </Link>
                                {", "}
                                <Link
                                  route="/app/lefood/ordering-hours/"
                                  lng={lng}
                                >
                                  <Orange as="a">{t("orderingHours")}</Orange>
                                </Link>
                                {` ${t("and")} `}
                                <Link
                                  route="/app/lefood/delivery-area/"
                                  lng={lng}
                                >
                                  <Orange as="a">{t("deliveryArea")}</Orange>
                                </Link>
                                {` ${t("or")} ${t("allowPickup")}`})
                              </Orange>
                            </ItalicText>
                            {` ${t("toSeeAnyNewOrders")}`}.
                          </span>
                        }
                        complete={`${profileCompletedPercents}% ${t(
                          "complete"
                        )}`}
                      />
                    )}
                    <Flex width={1} mt={3} flexWrap="wrap">
                      <Box pr={3} mb={2}>
                        <Link route="/app/lefood/orders/" lng={lng}>
                          <Button
                            as="a"
                            styleName="withImage"
                            active={page === "orders"}
                          >
                            <ButtonWithImageIconWrapper>
                              <Orders />
                            </ButtonWithImageIconWrapper>
                            <ButtonWithImageText>
                              {t("orders")}
                            </ButtonWithImageText>
                          </Button>
                        </Link>
                      </Box>
                      <Tippy content={t("averageDeliveryTime")}>
                        <Box pr={3} mb={2}>
                          <Select
                            items={averageDeliveryTimeList(t)}
                            value={currentAverageDeliveryTime}
                            onChange={({ value }) =>
                              this.updateBusiness({
                                averageDeliveryTime: value
                              })
                            }
                            ButtonComponent={p => (
                              <Button styleName="withImage" {...p}>
                                <ButtonWithImageIconWrapper>
                                  <Time />
                                </ButtonWithImageIconWrapper>
                                <ButtonWithImageText>
                                  {currentAverageDeliveryTime
                                    ? currentAverageDeliveryTime.label
                                    : "-"}
                                </ButtonWithImageText>
                                <Box pr={3}>
                                  <ExpandIcon />
                                </Box>
                              </Button>
                            )}
                          />
                        </Box>
                      </Tippy>
                      <Tippy content={t("minAmountForDelivery")}>
                        <Box pr={3} mb={2}>
                          <Button styleName="withImage">
                            <ButtonWithImageIconWrapper
                              onClick={() =>
                                this.setCurrencyModalVisibility(true)
                              }
                            >
                              <Price />
                            </ButtonWithImageIconWrapper>
                            <ButtonWithImageText>
                              <AutosizeInput
                                value={minAmountForDeliveryCents}
                                onChange={e => {
                                  this.setState({
                                    minAmountForDeliveryCents: normalizePrice(
                                      e.target.value
                                    )
                                  });
                                }}
                                onBlur={() =>
                                  this.updateBusiness({
                                    minAmountForDeliveryCents: convertToCents(
                                      minAmountForDeliveryCents
                                    )
                                  })
                                }
                              />
                              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                              <span
                                onClick={() =>
                                  this.setCurrencyModalVisibility(true)
                                }
                                role="dialog"
                              >
                                {business.get("stripeCurrency")}
                              </span>
                            </ButtonWithImageText>
                          </Button>
                        </Box>
                      </Tippy>
                      <Box pr={3} mb={2}>
                        <Link route="/app/lefood/menu/" lng={lng}>
                          <Button
                            as="a"
                            styleName="withImage"
                            active={page === "menu"}
                            onClick={() => null}
                          >
                            <ButtonWithImageIconWrapper>
                              <Menu />
                            </ButtonWithImageIconWrapper>
                            <ButtonWithImageText>
                              {t("menu")}
                            </ButtonWithImageText>
                          </Button>
                        </Link>
                      </Box>
                      <Box pr={3} mb={2}>
                        <Link route="/app/lefood/ordering-hours/" lng={lng}>
                          <Button
                            as="a"
                            styleName="withImage"
                            active={page === "orderingHours"}
                          >
                            <ButtonWithImageIconWrapper>
                              <Clock />
                            </ButtonWithImageIconWrapper>
                            <ButtonWithImageText>
                              {t("orderingHours")}
                            </ButtonWithImageText>
                          </Button>
                        </Link>
                      </Box>
                      <Box pr={3} mb={2}>
                        <Link route="/app/lefood/delivery-area/" lng={lng}>
                          <Button
                            as="a"
                            styleName="withImage"
                            active={page === "deliveryArea"}
                          >
                            <ButtonWithImageIconWrapper>
                              <Location />
                            </ButtonWithImageIconWrapper>
                            <ButtonWithImageText>
                              {t("deliveryArea")}
                            </ButtonWithImageText>
                          </Button>
                        </Link>
                      </Box>
                      <Box pr={3} mb={2}>
                        <Link route="/app/lefood/orders-history/" lng={lng}>
                          <Button
                            as="a"
                            styleName="withImage"
                            active={page === "ordersHistory"}
                          >
                            <ButtonWithImageIconWrapper>
                              <Reservations />
                            </ButtonWithImageIconWrapper>
                            <ButtonWithImageText>
                              {t("ordersHistory")}
                            </ButtonWithImageText>
                          </Button>
                        </Link>
                      </Box>
                      <Box pr={4}>
                        <RawCheckbox
                          hasCloserText
                          label={t("allowPickup")}
                          input={{
                            onChange: () =>
                              this.updateBusiness({
                                allowPickup: !business.get("allowPickup")
                              }),
                            value: business.get("allowPickup")
                          }}
                        />
                      </Box>
                      <Box pr={3} mb={2}>
                        {business.get("visibleInLefood") ? (
                          <Button
                            styleName="withImage"
                            red
                            onClick={() =>
                              this.setStopOrdersModalVisibility(true)
                            }
                          >
                            <ButtonWithImageIconWrapper>
                              <Pause />
                            </ButtonWithImageIconWrapper>
                          </Button>
                        ) : (
                          <Button
                            styleName="withImage"
                            greenHaze
                            onClick={() => {
                              this.updateBusiness({
                                visibleInLefood: true
                              });
                              Router.pushRoute(`/${lng}/app/lefood/orders/`);
                            }}
                          >
                            <ButtonWithImageIconWrapper>
                              <FontAwesomeIcon icon={["fa", "play"]} />
                            </ButtonWithImageIconWrapper>
                          </Button>
                        )}
                      </Box>
                    </Flex>
                    {children}
                    <StopOrdersModal
                      {...{
                        isOpen: isStopOrdersModalVisible,
                        onClose: () => this.setStopOrdersModalVisibility(false),
                        stopOrders: () => {
                          this.updateBusiness({ visibleInLefood: false });
                          this.setStopOrdersModalVisibility(false);
                        },
                        t
                      }}
                    />
                    <FinishOrdersModal
                      {...{
                        isOpen: isFinishOrdersModalVisible,
                        onClose: () =>
                          this.setFinishOrdersModalVisibility(false),
                        t
                      }}
                    />
                  </>
                ) : (
                  <ConnectWithStripe {...{ t }} />
                )}
              </>
            ) : (
              <Flex
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                pt={6}
              >
                <H2 textAlign="center">{t("stripeCurrencyNotSet")}</H2>
                <Box>
                  <Button
                    onClick={() => this.setCurrencyModalVisibility(true)}
                    styleName="blue"
                  >
                    {t("setStripeCurrency")}
                  </Button>
                </Box>
              </Flex>
            )}
            {isCurrencyModalVisible && (
              <StripeCurrencyModal
                {...{
                  isOpen: true,
                  stripeCurrency: business.get("stripeCurrency"),
                  setStripeCurrency: values => {
                    this.updateBusiness({
                      stripeCurrency: values.stripeCurrency.value
                    });
                    this.setCurrencyModalVisibility(false);
                  },
                  onClose: () => this.setCurrencyModalVisibility(false),
                  t
                }}
              />
            )}
          </>
        )}
      </AppLayout>
    );
  }
}

LefoodLayout.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  page: string.isRequired,
  children: node.isRequired,
  updateBusiness: func.isRequired,
  business: shape(),
  businesses: shape(),
  changeCurrentBusiness: func.isRequired,
  currentBusinessId: string,
  dishesLength: number,
  deliveriesLength: number,
  orderPeriodsLength: number
};

LefoodLayout.defaultProps = {
  dishesLength: 0,
  deliveriesLength: 0,
  orderPeriodsLength: 0,
  currentBusinessId: "",
  business: null,
  businesses: null
};

export default LefoodLayout;
