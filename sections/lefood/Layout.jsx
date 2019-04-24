import { PureComponent } from "react";
import { bool, func, string, node, number, shape, arrayOf } from "prop-types";
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
import { Orange } from "./styled";

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
  state = {
    minAmountForDeliveryCents: 0,
    isStopOrdersModalVisible: false,
    isFinishOrdersModalVisible: false
  };

  componentDidMount() {
    this.updateMinAmountForDeliveryCents();
  }

  componentDidUpdate(prevProps) {
    const {
      minAmountForDeliveryCents: prevMinAmountForDeliveryCents
    } = prevProps;
    const { minAmountForDeliveryCents } = this.props;
    if (prevMinAmountForDeliveryCents !== minAmountForDeliveryCents) {
      this.updateMinAmountForDeliveryCents();
    }
  }

  updateMinAmountForDeliveryCents = () => {
    const { minAmountForDeliveryCents } = this.props;
    // without setTimeout AutosizeInput is not working correctly ¯\_(ツ)_/¯
    // setTimeout(
    //   () =>
    this.setState({
      minAmountForDeliveryCents: normalizePrice(minAmountForDeliveryCents)
    });
    //   0
    // );
  };

  setStopOrdersModalVisibility = isVisible =>
    this.setState({
      isStopOrdersModalVisible: isVisible
    });

  setFinishOrdersModalVisibility = isVisible =>
    this.setState({
      isFinishOrdersModalVisible: isVisible
    });

  updateBusiness = values => {
    const { updateBusiness, currentBusinessId } = this.props;
    updateBusiness(currentBusinessId, values).catch(() => {
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
      visibleInLefood,
      pendingOrdersLength,
      children,
      dishesLength,
      deliveriesLength,
      orderPeriodsLength,
      averageDeliveryTime,
      currency,
      stripeUserId,
      business,
      businesses,
      changeCurrentBusiness
    } = this.props;
    const { minAmountForDeliveryCents } = this.state;
    const { isStopOrdersModalVisible, isFinishOrdersModalVisible } = this.state;
    const canEditBusinessData = !visibleInLefood && pendingOrdersLength === 0;
    const profileCompletedPercents =
      page === "orders"
        ? calcProfileCompletedPercents({
            dishesLength,
            deliveriesLength,
            orderPeriodsLength,
            averageDeliveryTime
          })
        : 100;

    const currentAverageDeliveryTime = averageDeliveryTimeList.find(
      i => i.value === averageDeliveryTime
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
        {stripeUserId === undefined ? (
          <LoadingIndicator />
        ) : (
          <>
            <Box width={[1, 1 / 2]}>
              <Select
                value={{
                  value: business && business.id,
                  label:
                    (business && business.name) ||
                    t("app:manageProfile.unnamedBusiness"),
                  src: business && business.logo.url
                }}
                withImage
                items={prepareBusinessesList(t, businesses)}
                onChange={b => changeCurrentBusiness(b.value)}
              />
            </Box>
            {stripeUserId ? (
              <>
                {profileCompletedPercents !== 100 && (
                  <InfoBar
                    info={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <span>
                        {`${t("completeYourProfile")} `}
                        <ItalicText>
                          <Orange>
                            ({`${t("deliveryTime")}, `}
                            <Link route="/app/lefood/menu/" lng={lng}>
                              <Orange as="a">{t("menu")}</Orange>
                            </Link>
                            {", "}
                            <Link route="/app/lefood/ordering-hours/" lng={lng}>
                              <Orange as="a">{t("orderingHours")}</Orange>
                            </Link>
                            {` ${t("and")} `}
                            <Link route="/app/lefood/delivery-area/" lng={lng}>
                              <Orange as="a">{t("deliveryArea")}</Orange>
                            </Link>
                            )
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
                  <Box pr={3} mb={2}>
                    <Select
                      items={averageDeliveryTimeList}
                      value={currentAverageDeliveryTime}
                      onChange={({ value }) =>
                        this.updateBusiness({ averageDeliveryTime: value })
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
                      <ButtonWithImageIconWrapper>
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
                        {currency}
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
                          <ButtonWithImageText>{t("menu")}</ButtonWithImageText>
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
                        <ButtonWithImageText>{t("menu")}</ButtonWithImageText>
                      </Button>
                    )}
                  </Box>
                  <Box pr={3} mb={2}>
                    {canEditBusinessData ? (
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
                      label={t("allowPickup")}
                      input={{
                        onChange: () =>
                          this.updateBusiness({
                            allowPickup: !business.allowPickup
                          }),
                        value: business.allowPickup
                      }}
                    />
                  </Box>
                  <Box pr={3} mb={2}>
                    {visibleInLefood ? (
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
                          this.updateBusiness({ visibleInLefood: true });
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
                    onClose: () => this.setFinishOrdersModalVisibility(false),
                    t
                  }}
                />
              </>
            ) : (
              <ConnectWithStripe {...{ t }} />
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
  visibleInLefood: bool,
  pendingOrdersLength: number.isRequired,
  updateBusiness: func.isRequired,
  business: shape(),
  businesses: arrayOf(shape()),
  changeCurrentBusiness: func.isRequired,
  currentBusinessId: string,
  dishesLength: number,
  deliveriesLength: number,
  orderPeriodsLength: number,
  averageDeliveryTime: number,
  minAmountForDeliveryCents: number,
  currency: string,
  stripeUserId: string
};

LefoodLayout.defaultProps = {
  dishesLength: 0,
  deliveriesLength: 0,
  orderPeriodsLength: 0,
  currency: "",
  visibleInLefood: false,
  currentBusinessId: "",
  averageDeliveryTime: 0,
  minAmountForDeliveryCents: 0,
  stripeUserId: undefined,
  business: null,
  businesses: null
};

export default LefoodLayout;
