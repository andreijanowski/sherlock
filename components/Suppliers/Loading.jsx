import React from "react";
import { arrayOf, bool, node, oneOf } from "prop-types";
import { connectStateResults } from "react-instantsearch-dom";
import { PulseLoader } from "react-spinners";
import { theme } from "utils/theme";

const Loading = ({ searching, children }) => (
  <div className="flex flex-col justify-end">
    {searching && (
      <div className="flex-1 flex items-center justify-center">
        <PulseLoader color={`rgb(${theme.colors.blue})`} />
      </div>
    )}
    <div className={searching ? "hidden" : "block"}>{children}</div>
  </div>
);

Loading.propTypes = {
  searching: bool.isRequired,
  children: oneOf([arrayOf(node), node]).isRequired
};

const ConnectedLoading = connectStateResults(Loading);

export default ConnectedLoading;
