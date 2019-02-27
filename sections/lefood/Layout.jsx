import { func, string, node } from "prop-types";
import AppLayout from "layout/App";
import {
  Button,
  ButtonWithImageText,
  ButtonWithImageIconWrapper
} from "components";
import { Orders, Time, Price, Menu, Clock, Location, Pause } from "icons";
import { Flex, Box } from "@rebass/grid";

const CateringLayout = ({ t, lng, children }) => (
  <AppLayout
    {...{
      mainIcon: "catering",
      header: t("header"),
      t,
      lng
    }}
  >
    <Flex width={1} mt={3} mb={2}>
      <Box pr={3}>
        <Button styleName="withImage" onClick={() => console.log("click")}>
          <ButtonWithImageIconWrapper>
            <Orders />
          </ButtonWithImageIconWrapper>
          <ButtonWithImageText>Orders</ButtonWithImageText>
        </Button>
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
        </Button>
      </Box>
      <Box pr={3}>
        <Button styleName="withImage" onClick={() => console.log("click")}>
          <ButtonWithImageIconWrapper>
            <Menu />
          </ButtonWithImageIconWrapper>
          <ButtonWithImageText>Menu</ButtonWithImageText>
        </Button>
      </Box>
      <Box pr={3}>
        <Button styleName="withImage" onClick={() => console.log("click")}>
          <ButtonWithImageIconWrapper>
            <Clock />
          </ButtonWithImageIconWrapper>
          <ButtonWithImageText>Ordering Hours</ButtonWithImageText>
        </Button>
      </Box>
      <Box pr={3}>
        <Button styleName="withImage" onClick={() => console.log("click")}>
          <ButtonWithImageIconWrapper>
            <Location />
          </ButtonWithImageIconWrapper>
          <ButtonWithImageText>Delivery Area</ButtonWithImageText>
        </Button>
      </Box>
      <Box pr={3}>
        <Button styleName="withImage" red onClick={() => console.log("click")}>
          <ButtonWithImageIconWrapper>
            <Pause />
          </ButtonWithImageIconWrapper>
        </Button>
      </Box>
    </Flex>
    {children}
  </AppLayout>
);

CateringLayout.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  children: node.isRequired
};

export default CateringLayout;
