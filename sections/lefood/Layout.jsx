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
  RawCheckbox
} from "components";
import {
  Orders,
  Time,
  Price,
  Menu,
  Clock,
  Location,
  Pause,
  ExpandIcon
} from "icons";
import { normalizePrice } from "utils/normalizers";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Router } from "routes";
import { convertToCents } from "utils/price";
import prepareBusinessesList from "utils/prepareBusinessesList";
import StopOrdersModal from "./StopOrdersModal";
import FinishOrdersModal from "./FinishOrdersModal";
import StripeCurrencyModal from "./StripeCurrencyModal";
import { Orange, StyledH2 } from "./styled";

const averageDeliveryTimeList = [
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
  averageDeliveryTime
}) => {
  let profileCompletedPercents = 0;
  if (dishesLength) {
    profileCompletedPercents += 25;
  }
  if (deliveriesLength) {
    profileCompletedPercents += 25;
  }
  if (orderPeriodsLength) {
    profileCompletedPercents += 25;
  }
  if (averageDeliveryTime) {
    profileCompletedPercents += 25;
  }
  return profileCompletedPercents;
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
      pendingOrdersLength,
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
    const canEditBusinessData =
      !(business && business.get("visibleInLefood")) &&
      pendingOrdersLength === 0;
    const profileCompletedPercents =
      page === "orders"
        ? calcProfileCompletedPercents({
            dishesLength,
            deliveriesLength,
            orderPeriodsLength,
            averageDeliveryTime: business && business.get("averageDeliveryTime")
          })
        : 100;

    const currentAverageDeliveryTime = averageDeliveryTimeList.find(
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
          <LoadingIndicator />
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
            {business && business.get("approvedForLefood") ? (
              <>
                {business.get("currency") ? (
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
                                    ({`${t("deliveryTime")} `}
                                    <Link route="/app/lefood/menu/" lng={lng}>
                                      <Orange as="a">{t("menu")}</Orange>
                                    </Link>
                                    {", "}
                                    <Link
                                      route="/app/lefood/ordering-hours/"
                                      lng={lng}
                                    >
                                      <Orange as="a">
                                        {t("orderingHours")}
                                      </Orange>
                                    </Link>
                                    {` ${t("and")} `}
                                    <Link
                                      route="/app/lefood/delivery-area/"
                                      lng={lng}
                                    >
                                      <Orange as="a">
                                        {t("deliveryArea")}
                                      </Orange>
                                    </Link>
                                    )
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
                          <Box pr={3} mb={2}>
                            <Select
                              items={averageDeliveryTimeList}
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
                                  {business.get("currency")}
                                </span>
                              </ButtonWithImageText>
                            </Button>
                          </Box>
                          <Box pr={3} mb={2}>
                            {canEditBusinessData ? (
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
                            ) : (
                              <Button
                                styleName="withImage"
                                active={page === "menu"}
                                onClick={() =>
                                  this.setFinishOrdersModalVisibility(true)
                                }
                              >
                                <ButtonWithImageIconWrapper>
                                  <Menu />
                                </ButtonWithImageIconWrapper>
                                <ButtonWithImageText>
                                  {t("menu")}
                                </ButtonWithImageText>
                              </Button>
                            )}
                          </Box>
                          <Box pr={3} mb={2}>
                            {canEditBusinessData ? (
                              <Link
                                route="/app/lefood/ordering-hours/"
                                lng={lng}
                              >
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
                            ) : (
                              <Button
                                styleName="withImage"
                                active={page === "orderingHours"}
                                onClick={() =>
                                  this.setFinishOrdersModalVisibility(true)
                                }
                              >
                                <ButtonWithImageIconWrapper>
                                  <Clock />
                                </ButtonWithImageIconWrapper>
                                <ButtonWithImageText>
                                  {t("orderingHours")}
                                </ButtonWithImageText>
                              </Button>
                            )}
                          </Box>
                          <Box pr={3} mb={2}>
                            {canEditBusinessData ? (
                              <Link
                                route="/app/lefood/delivery-area/"
                                lng={lng}
                              >
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
                            ) : (
                              <Button
                                styleName="withImage"
                                active={page === "deliveryArea"}
                                onClick={() =>
                                  this.setFinishOrdersModalVisibility(true)
                                }
                              >
                                <ButtonWithImageIconWrapper>
                                  <Location />
                                </ButtonWithImageIconWrapper>
                                <ButtonWithImageText>
                                  {t("deliveryArea")}
                                </ButtonWithImageText>
                              </Button>
                            )}
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
                                  Router.pushRoute(
                                    `/${lng}/app/lefood/orders/`
                                  );
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
                            onClose: () =>
                              this.setStopOrdersModalVisibility(false),
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
                    <StyledH2>{t("stripeCurrencyNotSet")}</StyledH2>
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
                      stripeCurrency: business.get("currency"),
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
            ) : (
              <Flex justifyContent="center" pt={6}>
                <StyledH2>
                  {t("notApprovedForLefood", {
                    businessName: business && business.get("name")
                  })}
                </StyledH2>
              </Flex>
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
  pendingOrdersLength: number.isRequired,
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
