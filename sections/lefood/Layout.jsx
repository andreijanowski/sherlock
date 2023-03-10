import React, { useEffect, useState, useCallback } from "react";
import { func, string, node, number, shape, bool } from "prop-types";
import AppLayout from "layout/App";
import { connect } from "react-redux";
import { Flex, Box } from "@rebass/grid";
import Tippy from "@tippy.js/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  StyledButton,
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
  StripeSetupModal,
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
import StripeCurrencyModal from "components/StripeSetupModal/StripeCurrencyModal";
import { checkIsBusinessStripeLoading } from "utils/businessUtils";
import StopOrdersModal from "./StopOrdersModal";
import FinishOrdersModal from "./FinishOrdersModal";
import { Orange, SplitFee, OutlineFreeBox } from "./styled";

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

const FULL_PROFILE_PERCENTS = 100;

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
  const profileCompletedPercents = [0, 33, 67, FULL_PROFILE_PERCENTS];
  return profileCompletedPercents[profileCompletedSteps];
};

const UNFINISHED_STATES = [
  "waiting_for_approval",
  "waiting_for_payment",
  "paid",
  "in_preparation",
  "in_delivery"
];

const LefoodLayout = ({
  business,
  t,
  lng,
  page,
  children,
  dishesLength,
  deliveriesLength,
  orderPeriodsLength,
  currentBusinessId,
  updateBusiness,
  connectedWithOrkestro,
  ratio,
  integrateWithOrkestro,
  disconnectFromOrkestro,
  changeCurrentBusiness,
  hasUnfinishedOrders,
  isFetching
}) => {
  const isCurrencySetUp = business && business.get("stripeCurrency");
  const isStripeSetUp = business && business.get("stripeUserId");

  const [minAmountForDeliveryCents, setMinAmountForDeliveryCents] = useState(
    normalizePrice(business && business.get("minAmountForDeliveryCents"))
  );
  const [isStopOrdersModalVisible, setStopOrdersModalVisible] = useState(false);
  const [isFinishOrdersModalVisible, setFinishOrdersModalVisible] =
    useState(false);
  const [isCurrencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [isStripeSetupModalVisible, setStripeSetupModalVisible] =
    useState(false);

  useEffect(() => {
    setMinAmountForDeliveryCents(
      normalizePrice(business && business.get("minAmountForDeliveryCents"))
    );
  }, [business]);

  const showStopOrdersModal = useCallback(() => {
    setStopOrdersModalVisible(true);
  }, []);
  const hideStopOrdersModal = useCallback(() => {
    setStopOrdersModalVisible(false);
  }, []);

  const showFinishOrdersModal = useCallback(() => {
    setFinishOrdersModalVisible(true);
  }, []);
  const hideFinishOrdersModal = useCallback(() => {
    setFinishOrdersModalVisible(false);
  }, []);

  const showCurrencyModal = useCallback(() => {
    setCurrencyModalVisible(true);
  }, []);
  const hideCurrencyModal = useCallback(() => {
    setCurrencyModalVisible(false);
  }, []);

  const showStripeSetupModal = useCallback(() => {
    setStripeSetupModalVisible(true);
  }, []);
  const hideStripeSetupModal = useCallback(() => {
    setStripeSetupModalVisible(false);
  }, []);

  const onUpdateBusiness = useCallback(
    async values => {
      try {
        await updateBusiness(currentBusinessId, values, true);
        if (values.stripeCurrency) {
          changeCurrentBusiness(currentBusinessId);
        }
      } catch (e) {
        if (values.minAmountForDeliveryCents) {
          setMinAmountForDeliveryCents(values.minAmountForDeliveryCents);
        }
      }
    },
    [changeCurrentBusiness, currentBusinessId, updateBusiness]
  );

  const toggleOrkestroIntegration = useCallback(() => {
    if (business.get("visibleInLefood") || hasUnfinishedOrders) {
      showFinishOrdersModal();
      return;
    }
    const newConnectedValue = !connectedWithOrkestro;
    if (newConnectedValue) {
      integrateWithOrkestro(currentBusinessId);
    } else {
      disconnectFromOrkestro(currentBusinessId);
    }
  }, [
    business,
    hasUnfinishedOrders,
    connectedWithOrkestro,
    showFinishOrdersModal,
    integrateWithOrkestro,
    currentBusinessId,
    disconnectFromOrkestro
  ]);

  const onAverageDeliveryTimeChange = useCallback(
    ({ value }) =>
      onUpdateBusiness({
        averageDeliveryTime: value
      }),
    [onUpdateBusiness]
  );

  const onMinAmountForDeliveryChange = useCallback(({ target: { value } }) => {
    setMinAmountForDeliveryCents(normalizePrice(value));
  }, []);

  const onMinAmountForDeliveryClick = useCallback(e => e.stopPropagation(), []);

  const onMinAmountForDeliveryBlur = useCallback(
    () =>
      onUpdateBusiness({
        minAmountForDeliveryCents: convertToCents(minAmountForDeliveryCents)
      }),
    [minAmountForDeliveryCents, onUpdateBusiness]
  );

  const onPickupChange = useCallback(
    () =>
      onUpdateBusiness({
        allowPickup: !business.get("allowPickup")
      }),
    [business, onUpdateBusiness]
  );

  const checkStripeSetup = useCallback(() => {
    if (!isCurrencySetUp) return false;
    if (!isStripeSetUp) {
      showStripeSetupModal();
      return false;
    }
    return true;
  }, [isCurrencySetUp, isStripeSetUp, showStripeSetupModal]);

  const onShowInLefoodClick = useCallback(async () => {
    if (!checkStripeSetup()) return;
    await onUpdateBusiness({
      visibleInLefood: true
    });
    Router.pushRoute(`/${lng}/app/lefood/orders/`);
  }, [checkStripeSetup, lng, onUpdateBusiness]);

  const onStopOrders = useCallback(async () => {
    await onUpdateBusiness({ visibleInLefood: false });
    hideStopOrdersModal();
  }, [hideStopOrdersModal, onUpdateBusiness]);

  const onRatioChange = useCallback(
    ({ value }) =>
      onUpdateBusiness({
        deliveryPriceParticipationRatio: value
      }),
    [onUpdateBusiness]
  );

  const onSetStripeCurrency = useCallback(
    async ({ stripeCurrency: { value } }) => {
      await onUpdateBusiness({
        stripeCurrency: value
      });
      hideCurrencyModal();
    },
    [hideCurrencyModal, onUpdateBusiness]
  );

  const onActiveCheckboxToggle = useCallback(
    (_currentBusinessId, values) => {
      if (!checkStripeSetup()) return;
      updateBusiness(currentBusinessId, values, true);
    },
    [checkStripeSetup, currentBusinessId, updateBusiness]
  );

  const onAutoAcceptChange = useCallback(
    () =>
      onUpdateBusiness({
        autoAcceptOrders: !business.get("autoAcceptOrders")
      }),
    [business, onUpdateBusiness]
  );

  const profileCompletedPercents =
    page === "orders"
      ? calcProfileCompletedPercents({
          dishesLength,
          deliveriesLength,
          orderPeriodsLength,
          allowPickup: business && business.get("allowPickup")
        })
      : FULL_PROFILE_PERCENTS;

  const currentAverageDeliveryTime = averageDeliveryTimeList(t).find(
    i => i.value === (business && business.get("averageDeliveryTime"))
  ) || { value: undefined };

  const currentSplitRatio =
    ratio && splitRatioList.find(item => item.value === ratio).label;

  const isBusinessLoading = checkIsBusinessStripeLoading(business);

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
                    updateBusiness: onActiveCheckboxToggle,
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
          {profileCompletedPercents !== FULL_PROFILE_PERCENTS && (
            <InfoBar
              info={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <span>
                  {`${t("completeYourProfile")} `}
                  <ItalicText>
                    <Orange>
                      <Link route="/app/app-manager/" lng={lng}>
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
                <StyledButton
                  as="a"
                  styleName="withImage"
                  active={page === "orders"}
                  gradient
                >
                  <ButtonWithImageIconWrapper>
                    <Orders />
                  </ButtonWithImageIconWrapper>
                  <ButtonWithImageText>{t("orders")}</ButtonWithImageText>
                </StyledButton>
              </Link>
            </Box>
            <Tippy content={t("averageDeliveryTime")}>
              <OutlineFreeBox pr={3} mb={2}>
                <Select
                  items={averageDeliveryTimeList(t)}
                  value={currentAverageDeliveryTime}
                  onChange={onAverageDeliveryTimeChange}
                  ButtonComponent={p => (
                    <StyledButton styleName="withImage" {...p} gradient>
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
                    </StyledButton>
                  )}
                />
              </OutlineFreeBox>
            </Tippy>
            <Tippy content={t("minAmountForDelivery")}>
              <Box pr={3} mb={2}>
                <StyledButton
                  styleName="withImage"
                  onClick={showCurrencyModal}
                  gradient
                >
                  <ButtonWithImageIconWrapper>
                    <Price />
                  </ButtonWithImageIconWrapper>
                  <ButtonWithImageText>
                    <AutosizeInput
                      onClick={onMinAmountForDeliveryClick}
                      value={minAmountForDeliveryCents}
                      onChange={onMinAmountForDeliveryChange}
                      onBlur={onMinAmountForDeliveryBlur}
                    />
                    {business.get("stripeCurrency")}
                  </ButtonWithImageText>
                </StyledButton>
              </Box>
            </Tippy>
            <Box pr={3} mb={2}>
              <Link route="/app/lefood/ordering-hours/" lng={lng}>
                <StyledButton
                  as="a"
                  styleName="withImage"
                  active={page === "orderingHours"}
                  gradient
                >
                  <ButtonWithImageIconWrapper>
                    <Clock />
                  </ButtonWithImageIconWrapper>
                  <ButtonWithImageText>
                    {t("orderingHours")}
                  </ButtonWithImageText>
                </StyledButton>
              </Link>
            </Box>
            <Box pr={3} mb={2}>
              <Link route="/app/lefood/delivery-area/" lng={lng}>
                <StyledButton
                  as={connectedWithOrkestro ? "button" : "a"}
                  styleName="withImage"
                  active={page === "deliveryArea"}
                  disabled={connectedWithOrkestro}
                  gradient
                >
                  <ButtonWithImageIconWrapper>
                    <Location />
                  </ButtonWithImageIconWrapper>
                  <ButtonWithImageText>{t("deliveryArea")}</ButtonWithImageText>
                </StyledButton>
              </Link>
            </Box>
            <Box pr={3} mb={2}>
              <Link route="/app/lefood/orders-history/" lng={lng}>
                <StyledButton
                  as="a"
                  styleName="withImage"
                  active={page === "ordersHistory"}
                  gradient
                >
                  <ButtonWithImageIconWrapper>
                    <Reservations />
                  </ButtonWithImageIconWrapper>
                  <ButtonWithImageText>
                    {t("ordersHistory")}
                  </ButtonWithImageText>
                </StyledButton>
              </Link>
            </Box>
            <Box pr={4}>
              <RawCheckbox
                hasCloserText
                label={t("autoAcceptOrders")}
                input={{
                  onChange: onAutoAcceptChange,
                  value: business.get("autoAcceptOrders")
                }}
              />
            </Box>
            <Box pr={4}>
              <RawCheckbox
                hasCloserText
                label={t("allowPickup")}
                input={{
                  onChange: onPickupChange,
                  value: business.get("allowPickup")
                }}
              />
            </Box>
            <Box pr={4}>
              <RawCheckbox
                hasCloserText
                label={t("deliverWithOrkestro")}
                input={{
                  onChange: toggleOrkestroIntegration,
                  value: connectedWithOrkestro
                }}
              />
            </Box>
            <Box pr={3} mb={2}>
              {business.get("visibleInLefood") ? (
                <StyledButton
                  styleName="withImage"
                  red
                  onClick={showStopOrdersModal}
                >
                  <ButtonWithImageIconWrapper>
                    <Pause />
                  </ButtonWithImageIconWrapper>
                </StyledButton>
              ) : (
                <StyledButton
                  styleName="withImage"
                  greenHaze
                  onClick={onShowInLefoodClick}
                >
                  <ButtonWithImageIconWrapper>
                    <FontAwesomeIcon icon={["fa", "play"]} />
                  </ButtonWithImageIconWrapper>
                </StyledButton>
              )}
            </Box>
            {ratio && currentSplitRatio !== undefined && (
              <Box pr={3} mb={2}>
                <Flex alignItems="center" width="1">
                  <SplitFee>Split Fee</SplitFee>
                  <Select
                    value={{
                      value: ratio || "0.0",
                      label: currentSplitRatio
                    }}
                    onChange={onRatioChange}
                    items={splitRatioList}
                  />
                </Flex>
              </Box>
            )}
          </Flex>
          {children}
          {isStopOrdersModalVisible && (
            <StopOrdersModal
              {...{
                isOpen: true,
                onClose: hideStopOrdersModal,
                stopOrders: onStopOrders,
                t
              }}
            />
          )}
          {isFinishOrdersModalVisible && (
            <FinishOrdersModal
              {...{
                isOpen: true,
                onClose: hideFinishOrdersModal,
                t
              }}
            />
          )}
          {isCurrencyModalVisible && (
            <StripeCurrencyModal
              {...{
                isFetching,
                isOpen: true,
                stripeCurrency: business.get("stripeCurrency"),
                setStripeCurrency: onSetStripeCurrency,
                onClose: hideCurrencyModal,
                t
              }}
            />
          )}
          {isStripeSetupModalVisible && (
            <StripeSetupModal onClose={hideStripeSetupModal} />
          )}
        </CurrencyGuard>
      )}
    </AppLayout>
  );
};

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
  ratio: string,
  hasUnfinishedOrders: bool.isRequired,
  isFetching: bool
};

LefoodLayout.defaultProps = {
  dishesLength: 0,
  deliveriesLength: 0,
  orderPeriodsLength: 0,
  currentBusinessId: "",
  business: null,
  ratio: "0.0",
  isFetching: false
};

export default connect(
  state => {
    const isFetching = state.getIn(["users", "currentBusiness", "isFetching"]);
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

    const orders = state.getIn(["orders", "data", "orders"]);

    const hasUnfinishedOrders = !!(
      orders &&
      orders.find(order =>
        UNFINISHED_STATES.includes(order.getIn(["attributes", "state"]))
      )
    );

    return {
      isFetching,
      connectedWithOrkestro: isConnectedWithOrkestro,
      ratio,
      busData: business,
      hasUnfinishedOrders
    };
  },
  {
    integrateWithOrkestro: connectPartnerWithOrkestro,
    disconnectFromOrkestro: disconnectPartnerFromOrkestro,
    patchBusiness
  }
)(LefoodLayout);
