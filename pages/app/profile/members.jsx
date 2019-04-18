import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import Form from "sections/profile/members";
import { connect } from "react-redux";
import { postMember, patchMember, deleteMember } from "actions/members";
import { postBusiness, patchBusiness } from "actions/businesses";
import { fetchProfileBusiness } from "actions/users";
import { setCurrentBusiness } from "actions/app";
import ProfileLayout from "sections/profile/Layout";

const namespaces = ["members", "app", "publishModal", "forms"];

class Members extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  handleSubmit = members => {
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
  };

  removeMember = id => {
    const { removeMember } = this.props;
    return removeMember(id);
  };

  render() {
    const {
      t,
      lng,
      members,
      business,
      businesses,
      changeCurrentBusiness,
      addBusiness,
      updateBusiness,
      getProfileBusiness
    } = this.props;
    return (
      <ProfileLayout
        {...{
          t,
          lng,
          business,
          businesses,
          changeCurrentBusiness,
          addBusiness,
          updateBusiness,
          getProfileBusiness,
          currentPage: "inviteYourTeam"
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
      </ProfileLayout>
    );
  }
}

Members.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  addMember: func.isRequired,
  updateMember: func.isRequired,
  removeMember: func.isRequired,
  addBusiness: func.isRequired,
  updateBusiness: func.isRequired,
  members: arrayOf(shape()),
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  getProfileBusiness: func.isRequired,
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
        addBusiness: postBusiness,
        updateBusiness: patchBusiness,
        addMember: postMember,
        updateMember: patchMember,
        removeMember: deleteMember,
        changeCurrentBusiness: setCurrentBusiness,
        getProfileBusiness: fetchProfileBusiness
      }
    )(Members)
  )
);
