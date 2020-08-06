import React, { PureComponent } from "react";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { Footer } from "components";
import {
  Navigation,
  TopSection,
  Services,
  DevelopersAndApi,
  Features,
  Plans
} from "sections/landing";
import { withTranslation } from "i18n";
import {
  TopSectionWrapper,
  LandingWrapper,
  NavigationWrapper
} from "sections/landing/sharedStyled";
import { Flex } from "@rebass/grid";

const namespaces = ["landing", "plans", "common"];

class Home extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  constructor(props) {
    super(props);
    this.servicesRef = React.createRef();
    this.developersAndApiRef = React.createRef();
    this.featuresRef = React.createRef();
    this.plansRef = React.createRef();
    this.state = {
      billingInterval: "month"
    };
  }

  scrollTo = section => {
    window.scrollTo({
      top: this[`${section}Ref`].current.offsetTop,
      behavior: "smooth"
    });
  };

  handleChangeBillngPeriod = () =>
    this.setState(({ billingInterval }) => ({
      billingInterval: billingInterval === "month" ? "year" : "month"
    }));

  render() {
    const {
      servicesRef,
      developersAndApiRef,
      scrollTo,
      featuresRef,
      plansRef
    } = this;
    const { t, i18n } = this.props;
    const { billingInterval } = this.state;
    const lng = (i18n && i18n.language) || "en";
    return (
      <LandingWrapper width={1} alignItems="center" flexDirection="column">
        <NavigationWrapper>
          <Navigation {...{ t, lng, scrollTo }} />
        </NavigationWrapper>

        <TopSectionWrapper>
          <TopSection {...{ t, lng }} />
        </TopSectionWrapper>

        <Services {...{ t, servicesRef }} />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            background:
              "linear-gradient(180deg, #00002B 0%, #222F8C 60%, #1A2375 70%, #0D1237 92%, #0A0E2A 95%, #000 100%)"
          }}
        >
          <Flex
            width={1}
            px={3}
            alignItems="flex-start"
            flexDirection="column"
            style={{ maxWidth: "1124px" }}
            mt={[14, 22]}
          >
            <Services {...{ t, servicesRef }} />
          </Flex>
        </div>

        <DevelopersAndApi {...{ t, lng, developersAndApiRef }} />
        <Features {...{ t, lng, featuresRef }} />
        <Plans
          {...{
            t,
            plansRef,
            lng: (i18n && i18n.language) || "en",
            billingInterval,
            handleChangeBillngPeriod: this.handleChangeBillngPeriod
          }}
        />
        <Footer />
      </LandingWrapper>
    );
  }
}

Home.propTypes = {
  t: func.isRequired,
  i18n: shape({ language: string.isRequired }).isRequired
};

export default requireAuth(false)(withTranslation(namespaces)(Home));
