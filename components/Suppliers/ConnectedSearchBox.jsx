import React, { useState } from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { func, string } from "prop-types";
import { CartIcon, ClockIcon, HeartIcon } from "../Icons";

const CustomSearchBox = React.forwardRef((props, myRef) => {
  const { currentRefinement, refine, t } = props;
  const [state, setState] = useState({
    name: currentRefinement
  });

  const handleChange = evt => {
    const { target } = evt;

    setState({
      ...state,
      [target.name]: target.type === "checkbox" ? target.checked : target.value
    });
  };

  const handleSubmit = objValues => {
    refine(objValues.name);
  };

  return (
    <div className="py-2 px-4 rounded-lg shadow-card flex justify-between bg-white items-center my-6">
      <div className="font-semibold">{t("app:allSuppliers")}</div>
      <div className="relative">
        <input
          ref={myRef}
          id="name"
          name="name"
          placeholder="Search product, brand or category"
          defaultValue={currentRefinement}
          onChange={handleChange}
          size="small"
          className="py-2 px-4 border border-gray-300 h-12 rounded min-w-100 pr-10 focus:outline-none"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={() => handleSubmit(state)}
        />
      </div>

      <div className="flex space-x-4 flex-shrink-0">
        <ClockIcon className="text-gray-700 w-5 shrink-0" />
        <HeartIcon className="text-gray-700 w-5 shrink-0" />
        <CartIcon className="text-gray-700 w-5 shrink-0" />
      </div>
    </div>
  );
});

CustomSearchBox.propTypes = {
  t: func.isRequired,
  refine: func.isRequired,
  currentRefinement: string.isRequired
};

const ConnectedSearchBox = connectSearchBox(CustomSearchBox);

export default ConnectedSearchBox;
