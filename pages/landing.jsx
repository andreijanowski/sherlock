import React, { PureComponent } from "react";
import requireAuth from "lib/requireAuth";
import { compose } from "redux";
import { connect } from "react-redux";
import { func, string, shape } from "prop-types";
import { Footer } from "components";
import {
  Navigation,
  TopSection,
  Services,
  DevelopersAndApi,
  Features,
  Plans,
  InstallApp
} from "sections/landing";
import { withTranslation } from "i18n";
import {
  TopSectionWrapper,
  LandingWrapper,
  NavigationWrapper,
  ProductsWrapper,
  DevelopersAndApiWrapper,
  FeaturesWrapper,
  PlansWrapper,
  FooterWrapper,
  InstallAppWrapper
} from "sections/landing/sharedStyled";
import { planLoginPath } from "utils/plans";
import { fetchPlans } from "actions/plans";

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

  componentDidMount() {
    const { getPlans } = this.props;
    getPlans();
  }

  getLng = () => {
    const { i18n } = this.props;

    return (i18n && i18n.language) || "en";
  };

  scrollTo = section => {
    window.scrollTo({
      top: this[`${section}Ref`].current.offsetTop - 100,
      behavior: "smooth"
    });
  };

  handleChangeBillngPeriod = () =>
    this.setState(({ billingInterval }) => ({
      billingInterval: billingInterval === "month" ? "year" : "month"
    }));

  handlePlanChoose = ({ label } = {}) => {
    const href = planLoginPath({ lng: this.getLng(), planName: label });

    window.location.href = href;
  };

  render() {
    const {
      servicesRef,
      developersAndApiRef,
      scrollTo,
      featuresRef,
      plansRef
    } = this;
    const { t, i18n, plans } = this.props;
    const { billingInterval } = this.state;
    const lng = this.getLng();

    return (
      <LandingWrapper width={1} alignItems="center" flexDirection="column">
        <NavigationWrapper>
          <Navigation {...{ t, lng, scrollTo }} />
        </NavigationWrapper>
        <TopSectionWrapper>
          <TopSection {...{ t, lng }} />
        </TopSectionWrapper>
        <ProductsWrapper>
          <Services {...{ t, servicesRef }} />
        </ProductsWrapper>
        <DevelopersAndApiWrapper>
          <DevelopersAndApi {...{ t, lng, developersAndApiRef }} />
        </DevelopersAndApiWrapper>
        <FeaturesWrapper>
          <Features {...{ t, lng, featuresRef }} />
        </FeaturesWrapper>
        <PlansWrapper>
          <Plans
            {...{
              t,
              plans,
              plansRef,
              lng: (i18n && i18n.language) || "en",
              billingInterval,
              handleChangeBillngPeriod: this.handleChangeBillngPeriod,
              onPlanChoose: this.handlePlanChoose
            }}
          />
        </PlansWrapper>
        <InstallAppWrapper>
          <InstallApp {...{ t }} />
        </InstallAppWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </LandingWrapper>
    );
  }
}

Home.propTypes = {
  t: func.isRequired,
  i18n: shape({ language: string.isRequired }).isRequired,
  getPlans: func.isRequired,
  plans: shape()
};

Home.defaultProps = {
  plans: null
};

export default compose(
  requireAuth(false),
  withTranslation(namespaces),
  connect(
    state => {
      const plans = state.getIn(["plans", "data"]);
      return {
        plans
      };
    },
    { getPlans: fetchPlans }
  )
)(Home);
