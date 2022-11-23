import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import clsx from "clsx";
import { connectRefinementList } from "react-instantsearch-dom";
import { arrayOf, bool, func, string } from "prop-types";
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

const Categories = ({ refine, categories, disabled, t }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const items = useMemo(
    () =>
      categories.map(item =>
        item === ""
          ? {
              label: t("app:all"),
              value: ""
            }
          : {
              label: item
                .split("_")
                .map(str => `${str[0].toUpperCase()}${str.slice(1)}`)
                .join(" "),
              value: item
            }
      ),
    [categories, t]
  );

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  const moveNext = useCallback(() => {
    if (carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current) {
      setCurrentIndex(prevState => prevState + 1);
    }
  }, [currentIndex]);

  const isDisabled = useCallback(
    direction => {
      if (direction === "prev") {
        return currentIndex <= 0;
      }

      if (direction === "next" && carousel.current !== null) {
        return (
          carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
        );
      }

      return false;
    },
    [currentIndex]
  );

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
    value => {
      setSelectedCategory(value);
      if (!disabled) {
        refine(value);
      }
    },
    [refine, disabled]
  );

  return (
    <div className="carousel relative mx-auto mb-2 w-full">
      <div className="overflow-hidden px-10">
        <div className="top absolute left-0 right-0 flex h-full justify-between">
          <IconButton
            onClick={movePrev}
            icon={faChevronLeft}
            disabled={isDisabled("prev")}
          />
          <IconButton
            onClick={moveNext}
            icon={faChevronRight}
            disabled={isDisabled("next")}
          />
        </div>
        <div
          ref={carousel}
          className="carousel-container relative z-0 flex touch-pan-x snap-x snap-mandatory gap-1 overflow-hidden scroll-smooth"
        >
          {items.map(item => (
            <Box
              key={item.value}
              className={clsx(
                "carousel-item relative cursor-pointer snap-start whitespace-nowrap py-3 px-2 text-center text-sm text-gray-700",
                selectedCategory === item.value
                  ? "font-semibold text-black"
                  : ""
              )}
              onClick={() => handleChange(item.value)}
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
  categories: arrayOf(string).isRequired,
  disabled: bool,
  t: func.isRequired
};

Categories.defaultProps = {
  disabled: false
};

export default connectRefinementList(Categories);
