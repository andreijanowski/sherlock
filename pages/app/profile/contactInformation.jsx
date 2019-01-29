import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import Form from "sections/profile/contactInformation";
import { connect } from "react-redux";
import { postBusiness, patchBusiness } from "actions/businesses";
import { getInitialValues } from "sections/profile/contactInformation/utils";
import { setCurrentBusiness } from "actions/users";
import ProfileLayout from "sections/profile/Layout";

const namespaces = ["contactInformation", "app"];

class ContactInformation extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  handleSubmit = async ({ email, phone, phoneCountry, website, instagram }) => {
    try {
      const {
        updateBusiness,
        business: { id }
      } = this.props;
      const requestValues = {
        email,
        phone,
        phoneCountryPrefix:
          phoneCountry && phoneCountry.value
            ? phoneCountry.value.prefix
            : undefined,
        phoneCountryCode:
          phoneCountry && phoneCountry.value
            ? phoneCountry.value.code
            : undefined,
        website,
        instagram
      };
      return updateBusiness(id, requestValues);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  render() {
    const {
      t,
      lng,
      business,
      businesses,
      changeCurrentBusiness,
      addBusiness
    } = this.props;
    const initialValues = getInitialValues(business);

    return (
      <ProfileLayout
        {...{
          t,
          lng,
          business,
          businesses,
          changeCurrentBusiness,
          addBusiness,
          currentPage: "contactInformation"
        }}
      >
        <Form {...{ t, initialValues, handleSubmit: this.handleSubmit }} />
      </ProfileLayout>
    );
  }
}

ContactInformation.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  updateBusiness: func.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  addBusiness: func.isRequired,
  businesses: arrayOf(shape())
};

ContactInformation.defaultProps = {
  business: null,
  businesses: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data,
        businesses: state.users.profileBusinesses.data
      }),
      {
        addBusiness: postBusiness,
        updateBusiness: patchBusiness,
        changeCurrentBusiness: setCurrentBusiness
      }
    )(ContactInformation)
  )
);
