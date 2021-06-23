import { PureComponent } from "react";
import { func, string, node, number, shape, bool } from "prop-types";
import AppLayout from "layout/App";
import { connect } from "react-redux";
import { Flex, Box } from "@rebass/grid";
import Tippy from "@tippy.js/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Button,
  ButtonWithImageText,
  ButtonWithImageIconWrapper,
  Link,
  InfoBar,
  ItalicText,
  Select,
  AutosizeInput,
  LoadingIndicator,
  RawCheckbox,
  ServiceStatusCheckbox,
  CurrencyGuard
} from "components";
import {
  Orders,
  Time,
  Price,
  Clock,
  Location,
  Pause,
  ExpandIcon,
  Reservations
} from "icons";
import { normalizePrice } from "utils/normalizers";
import { Router } from "routes";
import { convertToCents } from "utils/price";
import {
  connectPartnerWithOrkestro,
  disconnectPartnerFromOrkestro
} from "actions/integrations";
import { patchBusiness } from "actions/businesses";
import StripeCurrencyModal from "components/CurrencyGuard/StripeCurrencyModal";
import StopOrdersModal from "./StopOrdersModal";
import FinishOrdersModal from "./FinishOrdersModal";
import { Orange, SplitFee } from "./styled";

const splitRatioList = [
  { value: "0.0", label: "0%" },
  { value: "0.25", label: "25%" },
  { value: "0.5", label: "50%" },
  { value: "0.75", label: "75%" },
  { value: "1.0", label: "100%" }
];

const ONE_DAY_IN_MINUTES = 24 * 60;

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
  },
  {
    value: ONE_DAY_IN_MINUTES,
    label: "24 h"
  },
  {
    value: ONE_DAY_IN_MINUTES * 2,
    label: `2 ${t("day", { count: 2 })}`
  },
  {
    value: ONE_DAY_IN_MINUTES * 7,
    label: `1 ${t("week")}`
  },
  {
    value: ONE_DAY_IN_MINUTES * 30,
    label: `1 ${t("month")}`
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
      isCurrencyModalVisible: false
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
  }

  updateMinAmountForDeliveryCents = () => {
    const { business } = this.props;
    this.setState({
      minAmountForDeliveryCents: normalizePrice(
        business && business.get("minAmountForDeliveryCents")
      )
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
    updateBusiness(currentBusinessId, values, true)
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

  handleOrkestroIntegrationChange = value => {
    const {
      integrateWithOrkestro,
      disconnectFromOrkestro,
      currentBusinessId
    } = this.props;
    if (value) {
      integrateWithOrkestro(currentBusinessId);
    } else {
      disconnectFromOrkestro(currentBusinessId);
    }
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
      updateBusiness,
      connectedWithOrkestro,
      ratio
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

    const currentSplitRatio =
      ratio && splitRatioList.find(item => item.value === ratio).label;

    const isBusinessLoading =
      !business || business.get("stripeUserId") === undefined;

    return (
      <AppLayout
        {...{
          mainIcon: "leFood",
          header: (
            <>
              {t(page)}
              {!isBusinessLoading && (
                <Box ml={3}>
                  <ServiceStatusCheckbox
                    {...{
                      t,
                      serviceActivationFieldName: "availableInLefood",
                      business,
                      updateBusiness,
                      businessId: currentBusinessId
                    }}
                  />
                </Box>
              )}
            </>
          ),
          t,
          lng
        }}
      >
        {isBusinessLoading ? (
          <>
            <LoadingIndicator />
          </>
        ) : (
          <CurrencyGuard>
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
                        <Link route="/app/lefood/ordering-hours/" lng={lng}>
                          <Orange as="a">{t("orderingHours")}</Orange>
                        </Link>
                        {` ${t("and")} `}
                        <Link route="/app/lefood/delivery-area/" lng={lng}>
                          <Orange as="a">{t("deliveryArea")}</Orange>
                        </Link>
                        {` ${t("or")} ${t("allowPickup")}`})
                      </Orange>
                    </ItalicText>
                    {` ${t("toSeeAnyNewOrders")}`}.
                  </span>
                }
                complete={`${profileCompletedPercents}% ${t("complete")}`}
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
                    <ButtonWithImageText>{t("orders")}</ButtonWithImageText>
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
                      onClick={() => this.setCurrencyModalVisibility(true)}
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
                        onClick={() => this.setCurrencyModalVisibility(true)}
                        role="dialog"
                      >
                        {business.get("stripeCurrency")}
                      </span>
                    </ButtonWithImageText>
                  </Button>
                </Box>
              </Tippy>
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
                    as={connectedWithOrkestro ? "button" : "a"}
                    styleName="withImage"
                    active={page === "deliveryArea"}
                    disabled={connectedWithOrkestro}
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
              <Box pr={4}>
                <RawCheckbox
                  hasCloserText
                  label={t("deliverWithOrkestro")}
                  input={{
                    onChange: () =>
                      this.handleOrkestroIntegrationChange(
                        !connectedWithOrkestro
                      ),
                    value: connectedWithOrkestro
                  }}
                />
              </Box>
              <Box pr={3} mb={2}>
                {business.get("visibleInLefood") ? (
                  <Button
                    styleName="withImage"
                    red
                    onClick={() => this.setStopOrdersModalVisibility(true)}
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
              {ratio && currentSplitRatio !== undefined && (
                <Box pr={3} mb={2}>
                  <Flex alignItems="center" width="1">
                    <SplitFee>Split Fee</SplitFee>
                    {ratio !== null && (
                      <Select
                        value={{
                          value: ratio || "0.0",
                          label: currentSplitRatio
                        }}
                        onChange={({ value }) =>
                          this.updateBusiness({
                            deliveryPriceParticipationRatio: value
                          })
                        }
                        items={splitRatioList}
                      />
                    )}
                  </Flex>
                </Box>
              )}
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
                onClose: () => this.setFinishOrdersModalVisibility(false),
                t
              }}
            />
          </CurrencyGuard>
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
      </AppLayout>
    );
  }
}

LefoodLayout.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  connectedWithOrkestro: bool.isRequired,
  integrateWithOrkestro: func.isRequired,
  disconnectFromOrkestro: func.isRequired,
  page: string.isRequired,
  children: node.isRequired,
  updateBusiness: func.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  currentBusinessId: string,
  dishesLength: number,
  deliveriesLength: number,
  orderPeriodsLength: number,
  ratio: string
};

LefoodLayout.defaultProps = {
  dishesLength: 0,
  deliveriesLength: 0,
  orderPeriodsLength: 0,
  currentBusinessId: "",
  business: null,
  ratio: "0.0"
};

export default connect(
  state => {
    const isConnectedWithOrkestro = state.getIn([
      "integrations",
      "isConnectedToOrkestro"
    ]);
    const businessData = state.getIn(["users", "currentBusiness", "data"]);
    const business =
      businessData &&
      businessData.get("businesses") &&
      businessData.get("businesses").first();
    const ratio =
      business &&
      business.get("attributes").get("deliveryPriceParticipationRatio");

    return {
      connectedWithOrkestro: isConnectedWithOrkestro,
      ratio,
      busData: business
    };
  },
  {
    integrateWithOrkestro: connectPartnerWithOrkestro,
    disconnectFromOrkestro: disconnectPartnerFromOrkestro,
    patchBusiness
  }
)(LefoodLayout);
