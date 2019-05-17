import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, arrayOf } from "prop-types";
import CateringLayout from "sections/catering/Layout";
import EditCateringForm from "sections/catering/edit";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { Router } from "routes";
import { timeToNumber, LoadingIndicator } from "components";
import { patchCatering } from "actions/caterings";
import fileToBase64 from "utils/fileToBase64";
import { convertToCents } from "utils/price";

const namespaces = ["catering", "app", "forms"];

class EditCateringPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = {
    sending: false
  };

  componentDidMount() {
    const { editedCatering, lng } = this.props;
    if (!editedCatering) {
      Router.pushRoute(`/${lng}/app/catering/month`);
    }
  }

  handleFormSubmit = async ({ menu, currency, priceCents, ...values }, id) => {
    const { updateCatering, lng } = this.props;
    const updatedCatering = {
      ...values,
      from: timeToNumber(values.from),
      to: timeToNumber(values.to)
    };
    if (menu && menu.name) {
      updatedCatering.menu = await fileToBase64(menu);
    }
    if (currency && currency.value) {
      updatedCatering.currency = currency.value;
    }
    if (priceCents) {
      updatedCatering.priceCents = convertToCents(priceCents);
    }
    this.setState({ sending: true });
    updateCatering(id, updatedCatering)
      .then(() => Router.pushRoute(`/${lng}/app/catering/month`))
      .catch(() => this.setState({ sending: false }));
  };

  render() {
    const {
      t,
      lng,
      business,
      businessId,
      businesses,
      changeCurrentBusiness,
      editedCatering
    } = this.props;
    const { sending } = this.state;
    const showForm = !sending && editedCatering;
    return (
      <CateringLayout
        {...{
          t,
          lng,
          business,
          businessId,
          businesses,
          changeCurrentBusiness,
          isAddActionHidden: true
        }}
      >
        {showForm ? (
          <EditCateringForm
            {...{
              t,
              lng,
              editedCatering,
              handleFormSubmit: this.handleFormSubmit
            }}
          />
        ) : (
          <LoadingIndicator />
        )}
      </CateringLayout>
    );
  }
}

EditCateringPage.propTypes = {
  editedCatering: shape(),
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  updateCatering: func.isRequired,
  businesses: arrayOf(shape()),
  businessId: string
};

EditCateringPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  editedCatering: null
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
        return {
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          businesses: state.getIn(["users", "profileBusinesses", "data"]),
          editedCatering: state.getIn(["caterings", "editedCatering"])
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness,
        updateCatering: patchCatering
      }
    )(EditCateringPage)
  )
);
