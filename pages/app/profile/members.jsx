import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import Form from "sections/profile/members";
import { connect } from "react-redux";
import { postMember, patchMember, deleteMember } from "actions/members";
import { postBusiness } from "actions/businesses";
import { setCurrentBusiness } from "actions/users";
import ProfileLayout from "sections/profile/Layout";

const namespaces = ["members", "app", "publishModal"];

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
      addBusiness
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
        addBusiness: postBusiness,
        addMember: postMember,
        updateMember: patchMember,
        removeMember: deleteMember,
        changeCurrentBusiness: setCurrentBusiness
      }
    )(Members)
  )
);
