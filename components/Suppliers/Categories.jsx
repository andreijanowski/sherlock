import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import clsx from "clsx";
import { connectRefinementList } from "react-instantsearch-dom";
import { arrayOf, bool, func, shape } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { Box } from "@rebass/grid";

const IconButton = ({ onClick, disabled, ...restProps }) => (
  <Box
    onClick={onClick}
    onPress={() => {}}
    className={clsx(
      "z-10 m-0 flex h-full cursor-pointer items-center p-0 text-center transition-all duration-300 ease-in-out",
      disabled ? "cursor-not-allowed text-gray-300" : "text-gray-700"
    )}
  >
    <FontAwesomeIcon className="h-6 w-6" {...restProps} />
  </Box>
);

IconButton.propTypes = {
  onClick: func.isRequired,
  disabled: bool.isRequired
};

const Categories = ({ items, refine, categories, disabled, t }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const itemsMemoed = useMemo(
    () =>
      [
        {
          label: t("app:all"),
          value: ""
        }
      ].concat(
        categories.map(item => ({
          label: item.label
            .split("_")
            .map(str => `${str[0]?.toUpperCase()}${str.slice(1)}`)
            .join(" "),
          value: item.value
        }))
      ),
    [categories, t]
  );

  const movePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 0.95);
    }
  }, [currentIndex]);

  const moveNext = useCallback(() => {
    if (carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current) {
      setCurrentIndex(prevState => prevState + 0.95);
    }
  }, [currentIndex]);

  const hasLeftOption = useMemo(() => {
    return currentIndex <= 0;
  }, [currentIndex]);

  const hasRightOption = useMemo(() => {
    return (
      carousel.current?.offsetWidth * currentIndex >= maxScrollWidth.current
    );
  }, [currentIndex]);

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, [categories]);

  const handleChange = useCallback(
    item => {
      setSelectedCategory(item.value);
      if (!disabled) {
        refine(item.value);
      }
    },
    [refine, disabled]
  );

  return (
    <div className="carousel relative mx-auto mb-2 w-full">
      <div
        className={clsx(
          "overflow-hidden",
          !hasLeftOption && "pl-8",
          !hasRightOption && "pr-8"
        )}
      >
        <div className="top absolute left-0 right-0 flex h-full justify-between">
          {!hasLeftOption ? (
            <IconButton
              onClick={movePrev}
              icon={faChevronLeft}
              disabled={hasLeftOption}
            />
          ) : (
            <div />
          )}
          {!hasRightOption ? (
            <IconButton
              onClick={moveNext}
              icon={faChevronRight}
              disabled={hasRightOption}
            />
          ) : (
            <div />
          )}
        </div>
        <div
          ref={carousel}
          className="carousel-container relative z-0 flex touch-pan-x snap-x snap-mandatory gap-1 overflow-hidden scroll-smooth"
        >
          {itemsMemoed.map(item => (
            <Box
              key={item.value}
              className={clsx(
                "carousel-item relative cursor-pointer snap-start whitespace-nowrap py-3 px-2 text-center text-sm text-gray-700",
                selectedCategory === item.value
                  ? "font-semibold text-black"
                  : ""
              )}
              onClick={() => handleChange(item)}
            >
              {item.label}
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
};

Categories.propTypes = {
  refine: func.isRequired,
  categories: arrayOf(shape()).isRequired,
  disabled: bool,
  t: func.isRequired
};

Categories.defaultProps = {
  disabled: false
};

export default connectRefinementList(Categories);
