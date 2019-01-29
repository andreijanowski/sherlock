import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import AppLayout from "layout/App";
import Form from "sections/profile/contactInformation";
import { connect } from "react-redux";
import { patchBusiness } from "actions/businesses";
import { getInitialValues } from "sections/profile/contactInformation/utils";
import {
  generateMenuItems,
  prepareBusinessesList
} from "sections/profile/utils";
import { setCurrentBusiness } from "actions/users";

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

  handleBusinessChange = b => {
    const { changeCurrentBusiness } = this.props;
    changeCurrentBusiness(b.value);
  };

  render() {
    const { t, lng, business, businesses } = this.props;
    const initialValues = getInitialValues(business);
    const businessesList = prepareBusinessesList(businesses);

    return (
      <AppLayout
        {...{
          mainIcon: "profile",
          header: t("header"),
          t,
          lng,
          withMenu: true,
          menuItems: generateMenuItems(t, "contactInformation"),
          select: {
            value: {
              value: business && business.id,
              label: business && business.name,
              src: business && business.logo.url
            },
            items: businessesList,
            handleChange: this.handleBusinessChange
          }
        }}
      >
        <Form {...{ t, initialValues, handleSubmit: this.handleSubmit }} />
      </AppLayout>
    );
  }
}

ContactInformation.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  updateBusiness: func.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
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
        updateBusiness: patchBusiness,
        changeCurrentBusiness: setCurrentBusiness
      }
    )(ContactInformation)
  )
);
