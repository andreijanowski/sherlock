import React, { useCallback, useState } from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayOf, bool, func, shape, string } from "prop-types";
import debounce from "debounce";
import { Box } from "@rebass/grid";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import {
  ArrowLeftIcon,
  CartIcon,
  ClockIcon,
  HeartIcon,
  FavouriteIcon
} from "../Icons";
import OrderDetailModal from "../Products/OrderDetailModal";

const DEBOUNCE = 300;

const CustomFilter = React.forwardRef((props, myRef) => {
  const {
    currentRefinement,
    refine,
    label,
    placeholder,
    backUrl,
    t,
    cartProducts,
    hasFavourite,
    hasBack,
    onAddToFavorite
  } = props;
  const [value, setValue] = useState(currentRefinement);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

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

  const goBack = async () => {
    if (backUrl) {
      await router.push(backUrl);
    } else {
      await router.back();
    }
  };

  return (
    <div>
      <div className="py-4 px-6.5 rounded-6 shadow-card flex-col space-y-4 flex lg:flex-row lg:space-y-0 justify-between bg-white items-center my-4 md:my-6">
        <div className="flex space-x-4 items-center">
          {hasBack && (
            <Box
              className="shadow-card w-10 h-10 rounded flex items-center justify-center cursor-pointer"
              onClick={goBack}
            >
              <ArrowLeftIcon />
            </Box>
          )}
          <div>
            <div className="font-semibold">{label}</div>
            {hasFavourite && (
              <Box
                className="flex space-x-2 mt-1 text-sm items-center cursor-pointer"
                onClick={onAddToFavorite}
              >
                <div>{t("app:addToFavourite")}</div>
                <FavouriteIcon />
              </Box>
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
            className="py-2 px-4 border border-gray-300 h-12 rounded md:min-w-100 pr-10 focus:outline-none"
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
          <HeartIcon className="text-gray-700 w-5 shrink-0 cursor-pointer" />
          <Box
            className="text-gray-700 cursor-pointer flex space-x-1 items-center"
            onClick={() => setIsOpen(true)}
          >
            <CartIcon className="w-5 shrink-0" />
            {cartProducts.length > 0 && <div>{cartProducts.length}</div>}
          </Box>
        </div>
      </div>
      <OrderDetailModal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        t={t}
      />
    </div>
  );
});

CustomFilter.propTypes = {
  label: string.isRequired,
  placeholder: string.isRequired,
  refine: func.isRequired,
  currentRefinement: string.isRequired,
  backUrl: string,
  t: func.isRequired,
  cartProducts: arrayOf(shape()).isRequired,
  hasFavourite: bool.isRequired,
  hasBack: bool.isRequired,
  onAddToFavorite: func
};

CustomFilter.defaultProps = {
  backUrl: "",
  onAddToFavorite: () => {}
};

const ConnectedFilter = connectSearchBox(CustomFilter);

const mapStateToProps = state => {
  const products = state.getIn(["products", "selectedProducts"]);

  return {
    cartProducts: products.size ? products.toJS() : []
  };
};

export default connect(mapStateToProps)(ConnectedFilter);
