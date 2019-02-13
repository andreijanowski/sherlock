import React from "react";
import { logout as logoutAction } from "actions/auth";
import { connect } from "react-redux";
import { func, node } from "prop-types";

const LogoutMenuItem = ({ logout, children }) => (
  <div tabIndex={0} role="button" onClick={logout} onKeyPress={logout}>
    {children}
  </div>
);

LogoutMenuItem.propTypes = {
  logout: func.isRequired,
  children: node.isRequired
};

export default connect(
  null,
  { logout: logoutAction }
)(LogoutMenuItem);
