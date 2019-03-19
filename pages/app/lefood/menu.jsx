import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, arrayOf, shape, bool } from "prop-types";
import LefoodLayout from "sections/lefood/Layout";
import Menu from "sections/lefood/menu";
import { connect } from "react-redux";
import { postDish, deleteDish } from "actions/dishes";
import { postPicture } from "actions/pictures";
import { convertToCents } from "utils/price";

const namespaces = ["lefood", "app", "forms"];

class MenuPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  addDish = values => {
    const {
      addDish,
      currentBusiness: { id }
    } = this.props;
    return addDish(
      {
        ...values,
        pricePerItemCents: convertToCents(values.pricePerItemCents)
      },
      id
    );
  };

  removeDish = id => {
    const { removeDish } = this.props;
    removeDish(id);
  };

  addPicture = (picture, id) => {
    const { addPicture } = this.props;
    addPicture("dish", id, picture);
  };

  render() {
    const { t, lng, dishes, loading } = this.props;
    return (
      <LefoodLayout
        {...{
          t,
          lng,
          page: "menu"
        }}
      >
        <Menu
          {...{
            t,
            dishes,
            loading,
            addDish: this.addDish,
            removeDish: this.removeDish,
            addPicture: this.addPicture
          }}
        />
      </LefoodLayout>
    );
  }
}

MenuPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  dishes: arrayOf(shape()).isRequired,
  currentBusiness: shape(),
  addDish: func.isRequired,
  removeDish: func.isRequired,
  addPicture: func.isRequired,
  loading: bool.isRequired
};

MenuPage.defaultProps = {
  currentBusiness: {}
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        loading:
          (!state.dishes.isFailed && !state.dishes.isSucceeded) ||
          state.dishes.isFetching,
        dishes: state.dishes.data,
        currentBusiness: state.users.currentBusiness.data
      }),
      {
        addDish: postDish,
        removeDish: deleteDish,
        addPicture: postPicture
      }
    )(MenuPage)
  )
);
