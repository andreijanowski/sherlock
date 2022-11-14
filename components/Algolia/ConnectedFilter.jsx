import React, { useCallback, useState } from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { func, string } from "prop-types";
import debounce from "debounce";
import { Box } from "@rebass/grid";
import { useRouter } from "next/router";
import {
  ArrowLeftIcon,
  CartIcon,
  ClockIcon,
  HeartIcon,
  FavouriteIcon
} from "../Icons";

const DEBOUNCE = 300;

const CustomFilter = React.forwardRef((props, myRef) => {
  const { currentRefinement, refine, label, placeholder, backUrl, t } = props;
  const [value, setValue] = useState(currentRefinement);
  const router = useRouter();

  const onSubmit = useCallback(
    query => {
      refine(query);
    },
    [refine]
  );

  const debouncedOnChange = useCallback(debounce(onSubmit, DEBOUNCE), [
    onSubmit
  ]);

  const clearSearch = useCallback(() => {
    setValue("");
    debouncedOnChange("");
  }, [debouncedOnChange]);

  const handleChange = useCallback(
    ({ target }) => {
      setValue(target.value);
      debouncedOnChange(target.value);
    },
    [debouncedOnChange]
  );

  return (
    <div className="py-2 px-4 rounded-lg shadow-card flex justify-between bg-white items-center my-6">
      <div className="flex space-x-4 items-center">
        {backUrl && (
          <Box
            className="shadow-card w-10 h-10 rounded flex items-center justify-center cursor-pointer"
            onClick={() => router.push(backUrl)}
          >
            <ArrowLeftIcon />
          </Box>
        )}
        <div>
          <div className="font-semibold">{label}</div>
          {backUrl && (
            <div className="flex space-x-2 mt-1 text-sm items-center">
              <div>{t("app:addToFavourite")}</div>
              <FavouriteIcon />
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        <input
          ref={myRef}
          value={value}
          placeholder={placeholder}
          defaultValue={currentRefinement}
          onChange={handleChange}
          className="py-2 px-4 border border-gray-300 h-12 rounded min-w-100 pr-10 focus:outline-none"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 flex items-center space-x-3">
          {value && (
            <FontAwesomeIcon
              icon={faTimes}
              onClick={clearSearch}
              className="cursor-pointer"
            />
          )}
          <FontAwesomeIcon icon={faSearch} className="cursor-pointer" />
        </div>
      </div>

      <div className="flex space-x-4 flex-shrink-0">
        <ClockIcon className="text-gray-700 w-5 shrink-0" />
        <HeartIcon className="text-gray-700 w-5 shrink-0" />
        <CartIcon className="text-gray-700 w-5 shrink-0" />
      </div>
    </div>
  );
});

CustomFilter.propTypes = {
  label: string.isRequired,
  placeholder: string.isRequired,
  refine: func.isRequired,
  currentRefinement: string.isRequired,
  backUrl: string,
  t: func.isRequired
};

CustomFilter.defaultProps = {
  backUrl: ""
};

const ConnectedFilter = connectSearchBox(CustomFilter);

export default ConnectedFilter;
