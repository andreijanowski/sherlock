import { PureComponent } from "react";
import { bool, func, string, node, number } from "prop-types";
import AppLayout from "layout/App";
import {
  Button,
  ButtonWithImageText,
  ButtonWithImageIconWrapper,
  Link
} from "components";
import { Orders, Time, Price, Menu, Clock, Location, Pause } from "icons";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Router } from "routes";
import StopOrdersModal from "./StopOrdersModal";
import FinishOrdersModal from "./FinishOrdersModal";

class CateringLayout extends PureComponent {
  state = {
    isStopOrdersModalVisible: false,
    isFinishOrdersModalVisible: false
  };

  setStopOrdersModalVisibility = isVisible =>
    this.setState({
      isStopOrdersModalVisible: isVisible
    });

  setFinishOrdersModalVisibility = isVisible =>
    this.setState({
      isFinishOrdersModalVisible: isVisible
    });

  setOrdersAvailability = isAvailable => {
    const { updateBusiness, currentBusinessId } = this.props;
    updateBusiness(currentBusinessId, { visibleInLefood: isAvailable });
  };

  render() {
    const {
      t,
      lng,
      page,
      visibleInLefood,
      pendingOrdersLength,
      children
    } = this.props;
    const { isStopOrdersModalVisible, isFinishOrdersModalVisible } = this.state;
    const canEditBusinessData = !visibleInLefood && pendingOrdersLength === 0;
    return (
      <AppLayout
        {...{
          mainIcon: "catering",
          header: t(page),
          t,
          lng
        }}
      >
        <Flex width={1} mt={3} mb={2}>
          <Box pr={3}>
            <Link route="/app/lefood/orders/" lng={lng}>
              <Button
                as="a"
                styleName="withImage"
                active={page === "orders"}
                onClick={() => console.log("click")}
              >
                <ButtonWithImageIconWrapper>
                  <Orders />
                </ButtonWithImageIconWrapper>
                <ButtonWithImageText>{t("orders")}</ButtonWithImageText>
              </Button>
            </Link>
          </Box>
          <Box pr={3}>
            <Button styleName="withImage" onClick={() => console.log("click")}>
              <ButtonWithImageIconWrapper>
                <Time />
              </ButtonWithImageIconWrapper>
              <ButtonWithImageText>45 min</ButtonWithImageText>
            </Button>
          </Box>
          <Box pr={3}>
            <Button styleName="withImage" onClick={() => console.log("click")}>
              <ButtonWithImageIconWrapper>
                <Price />
              </ButtonWithImageIconWrapper>
              <ButtonWithImageText>$9.99</ButtonWithImageText>
            </Button>
          </Box>
          <Box pr={3}>
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
                onClick={() => this.setFinishOrdersModalVisibility(true)}
              >
                <ButtonWithImageIconWrapper>
                  <Menu />
                </ButtonWithImageIconWrapper>
                <ButtonWithImageText>{t("menu")}</ButtonWithImageText>
              </Button>
            )}
          </Box>
          <Box pr={3}>
            {canEditBusinessData ? (
              <Link route="/app/lefood/ordering-hours/" lng={lng}>
                <Button
                  as="a"
                  styleName="withImage"
                  active={page === "orderingHours"}
                  onClick={() => console.log("click")}
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
                onClick={() => this.setFinishOrdersModalVisibility(true)}
              >
                <ButtonWithImageIconWrapper>
                  <Clock />
                </ButtonWithImageIconWrapper>
                <ButtonWithImageText>{t("orderingHours")}</ButtonWithImageText>
              </Button>
            )}
          </Box>
          <Box pr={3}>
            {canEditBusinessData ? (
              <Link route="/app/lefood/delivery-area/" lng={lng}>
                <Button
                  as="a"
                  styleName="withImage"
                  active={page === "deliveryArea"}
                  onClick={() => console.log("click")}
                >
                  <ButtonWithImageIconWrapper>
                    <Location />
                  </ButtonWithImageIconWrapper>
                  <ButtonWithImageText>{t("deliveryArea")}</ButtonWithImageText>
                </Button>
              </Link>
            ) : (
              <Button
                styleName="withImage"
                active={page === "deliveryArea"}
                onClick={() => this.setFinishOrdersModalVisibility(true)}
              >
                <ButtonWithImageIconWrapper>
                  <Location />
                </ButtonWithImageIconWrapper>
                <ButtonWithImageText>{t("deliveryArea")}</ButtonWithImageText>
              </Button>
            )}
          </Box>
          <Box pr={3}>
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
                  this.setOrdersAvailability(true);
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
            open: isStopOrdersModalVisible,
            onClose: () => this.setStopOrdersModalVisibility(false),
            stopOrders: () => {
              this.setOrdersAvailability(false);
              this.setStopOrdersModalVisibility(false);
            },
            t
          }}
        />
        <FinishOrdersModal
          {...{
            open: isFinishOrdersModalVisible,
            onClose: () => this.setFinishOrdersModalVisibility(false),
            t
          }}
        />
      </AppLayout>
    );
  }
}

CateringLayout.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  page: string.isRequired,
  children: node.isRequired,
  visibleInLefood: bool.isRequired,
  pendingOrdersLength: number.isRequired,
  updateBusiness: func.isRequired,
  currentBusinessId: string.isRequired
};

export default CateringLayout;
