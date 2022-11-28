import React, { useCallback, useState } from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayOf, bool, func, shape, string } from "prop-types";
import { Box } from "@rebass/grid";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { ArrowLeftIcon, CartIcon, ClockIcon, FavouriteIcon } from "../Icons";
import OrderDetailModal from "../Products/OrderDetailModal";
import { useDebouncedCallback } from "use-debounce";
import { useLng } from "../../utils/hooks";

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
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const lng = useLng();

  const onSubmit = useCallback(
    query => {
      refine(query);
    },
    [refine]
  );

  const debouncedOnChange = useDebouncedCallback(onSubmit, DEBOUNCE);

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

  const goToOrderHistory = async () => {
    await router.push(`/${lng}/app/suppliers/orders`);
  };

  return (
    <div>
      <div className="my-4 flex flex-col items-center justify-between space-y-4 rounded-6 bg-white py-4 px-6.5 shadow-card md:my-6 lg:flex-row lg:space-y-0">
        <div className="flex items-center space-x-4">
          {hasBack && (
            <Box
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded shadow-card"
              onClick={goBack}
            >
              <ArrowLeftIcon />
            </Box>
          )}
          <div>
            <div className="font-semibold">{label}</div>
            {hasFavourite && (
              <Box
                className="mt-1 flex cursor-pointer items-center space-x-2 text-sm"
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
            className="h-12 rounded border border-gray-300 py-2 px-4 pr-10 focus:outline-none md:min-w-100"
          />
          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center space-x-3 text-gray-500">
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

        <div className="flex flex-shrink-0 space-x-4">
          <ClockIcon
            className="w-5 shrink-0 cursor-pointer text-gray-700"
            onClick={goToOrderHistory}
          />
          <Box
            className="flex cursor-pointer items-center space-x-1 text-gray-700"
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
