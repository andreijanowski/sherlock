import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import CateringLayout from "sections/catering/Layout";
import EditCateringForm from "sections/catering/edit";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/users";
import { Router } from "routes";

const namespaces = ["catering", "app", "forms"];

class EditCateringPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  componentDidMount() {
    const { editedCatering, lng } = this.props;
    if (!editedCatering) {
      Router.pushRoute(`/${lng}/app/catering/month`);
    }
  }

  handleFormSubmit = (values, id) => {
    console.log(values, id);
    // patch
  };

  render() {
    const {
      t,
      lng,
      business,
      businesses,
      changeCurrentBusiness,
      editedCatering
    } = this.props;
    return (
      <CateringLayout
        {...{
          t,
          lng,
          business,
          businesses,
          changeCurrentBusiness,
          isAddActionHidden: true
        }}
      >
        {editedCatering && (
          <EditCateringForm
            {...{ t, editedCatering, handleFormSubmit: this.handleFormSubmit }}
          />
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
  businesses: arrayOf(shape())
};

EditCateringPage.defaultProps = {
  business: null,
  businesses: null,
  editedCatering: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data,
        businesses: state.users.profileBusinesses.data,
        editedCatering: state.caterings.editedCatering
      }),
      {
        changeCurrentBusiness: setCurrentBusiness
      }
    )(EditCateringPage)
  )
);
