import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import Form from "sections/profile/members";
import { connect } from "react-redux";
import { postMember, patchMember, deleteMember } from "actions/members";
import { postBusiness, patchBusiness } from "actions/businesses";
import { fetchProfileBusiness } from "actions/users";
import { setCurrentBusiness } from "actions/app";
import ProfileLayout from "sections/profile/Layout";

const namespaces = ["members", "app", "publishModal", "forms"];

class Members extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  handleSubmit = members => {
    const { addMember, updateMember, businessId } = this.props;
    const { id, email, role } = members[0];
    if (id) {
      return updateMember(id, { email, role });
    }
    if (email && role) {
      return addMember({ email, role }, businessId);
    }
    return null;
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
      businessId,
      businessGroups,
      businessMenus,
      businessPictures,
      businessProducts,
      businessOpenPeriods,
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
          businessId,
          businessGroups,
          businessMenus,
          businessPictures,
          businessProducts,
          businessOpenPeriods,
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
  members: shape(),
  business: shape(),
  businessId: string,
  businessGroups: shape(),
  businessMenus: shape(),
  businessPictures: shape(),
  businessProducts: shape(),
  businessOpenPeriods: shape(),
  changeCurrentBusiness: func.isRequired,
  getProfileBusiness: func.isRequired,
  businesses: shape()
};

Members.defaultProps = {
  members: null,
  business: null,
  businessId: "",
  businessGroups: null,
  businessMenus: null,
  businessPictures: null,
  businessProducts: null,
  businessOpenPeriods: null,
  businesses: null
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
        return {
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          businessGroups: businessData && businessData.get("groups"),
          businessMenus: businessData && businessData.get("menus"),
          businessPictures: businessData && businessData.get("pictures"),
          businessProducts: businessData && businessData.get("products"),
          businessOpenPeriods: businessData && businessData.get("openPeriods"),
          businesses: state.getIn([
            "users",
            "profileBusinesses",
            "data",
            "businesses"
          ]),
          members: state.getIn(["members", "data", "members"]),
          lng: (i18n && i18n.language) || "en"
        };
      },
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
