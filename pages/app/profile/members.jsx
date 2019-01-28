import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import AppLayout from "layout/App";
import Form from "sections/profile/members";
import { connect } from "react-redux";
import { postMember, patchMember, deleteMember } from "actions/members";

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
      const { addMember, updateMember, slug } = this.props;
      const { id, email, role } = members[0];
      if (id) {
        return updateMember(id, { email, role });
      }
      return addMember({ email, role }, slug);
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

  render() {
    const { t, lng, slug, members } = this.props;
    return (
      <AppLayout
        {...{
          mainIcon: "profile",
          header: t("header"),
          t,
          lng,
          slug
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
  slug: string.isRequired,
  addMember: func.isRequired,
  updateMember: func.isRequired,
  removeMember: func.isRequired,
  members: arrayOf(shape())
};

Members.defaultProps = {
  members: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        members: state.members.data
      }),
      {
        addMember: postMember,
        updateMember: patchMember,
        removeMember: deleteMember
      }
    )(Members)
  )
);
