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
      "h-full text-center z-10 p-0 m-0 transition-all ease-in-out duration-300 cursor-pointer flex items-center",
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

const Categories = ({ refine, categories }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const items = useMemo(
    () =>
      categories.map(item =>
        item === ""
          ? {
              label: "All",
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
    [categories]
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
  }, []);

  const handleChange = useCallback(
    value => {
      setSelectedCategory(value);
      refine(value);
    },
    [refine]
  );

  return (
    <div className="carousel my-6 mx-auto relative w-full">
      <div className="overflow-hidden px-10">
        <div className="flex justify-between absolute top h-full left-0 right-0">
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
          className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {items.map(item => (
            <Box
              key={item.value}
              className={clsx(
                "carousel-item text-center relative snap-start py-3 px-2 text-gray-700 text-sm whitespace-nowrap cursor-pointer",
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
  categories: arrayOf(string).isRequired
};

export default connectRefinementList(Categories);
