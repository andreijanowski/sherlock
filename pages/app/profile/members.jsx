import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import AppLayout from "layout/App";
import Form from "sections/profile/members";
import { connect } from "react-redux";
import { postMember, patchMember, deleteMember } from "actions/members";
import {
  generateMenuItems,
  prepareBusinessesList
} from "sections/profile/utils";
import { setCurrentBusiness } from "actions/users";

const namespaces = ["members", "app"];

class Members extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  handleSubmit = async members => {
    try {
      const {
        addMember,
        updateMember,
        business: { id: businessId }
      } = this.props;
      const { id, email, role } = members[0];
      if (id) {
        return updateMember(id, { email, role });
      }
      return addMember({ email, role }, businessId);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  removeMember = async id => {
    try {
      const { removeMember } = this.props;
      return removeMember(id);
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
    const { t, lng, members, business, businesses } = this.props;
    const businessesList = prepareBusinessesList(businesses);
    return (
      <AppLayout
        {...{
          mainIcon: "profile",
          header: t("header"),
          t,
          lng,
          withMenu: true,
          menuItems: generateMenuItems(t, "inviteYourTeam"),
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
        <Form
          {...{
            t,
            members,
            handleSubmit: this.handleSubmit,
            removeMember: this.removeMember
          }}
        />
      </AppLayout>
    );
  }
}

Members.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  addMember: func.isRequired,
  updateMember: func.isRequired,
  removeMember: func.isRequired,
  members: arrayOf(shape()),
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape())
};

Members.defaultProps = {
  members: null,
  business: null,
  businesses: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        members: state.members.data,
        business: state.users.currentBusiness.data,
        businesses: state.users.profileBusinesses.data
      }),
      {
        addMember: postMember,
        updateMember: patchMember,
        removeMember: deleteMember,
        changeCurrentBusiness: setCurrentBusiness
      }
    )(Members)
  )
);
