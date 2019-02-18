import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import CateringLayout from "sections/catering/Layout";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/users";
import { SingleDatePicker } from "react-dates";
import YearCalendarStyles from "sections/catering/yearCalendarStyles";

const namespaces = ["catering", "app"];

class YearPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  state = {
    date: null,
    focused: true
  };

  render() {
    const { t, lng, business, businesses, changeCurrentBusiness } = this.props;
    const { date, focused } = this.state;
    return (
      <CateringLayout
        {...{
          t,
          lng,
          business,
          businesses,
          changeCurrentBusiness
        }}
      >
        <YearCalendarStyles />
        <SingleDatePicker
          date={date}
          onDateChange={d => this.setState({ date: d })}
          focused={focused}
          onFocusChange={p => this.setState({ focused: p.focused })}
          id="your_unique_id"
        />
      </CateringLayout>
    );
  }
}

YearPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape())
};

YearPage.defaultProps = {
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
        changeCurrentBusiness: setCurrentBusiness
      }
    )(YearPage)
  )
);
