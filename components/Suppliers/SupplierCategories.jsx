import React, { useEffect, useMemo, useRef, useState } from "react";
import { SUPPLIER_CATEGORIES } from "sections/integrations/utils";
import clsx from "clsx";
import { connectRefinementList } from "react-instantsearch-dom";

const SuppliersCategories = ({ refine }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const items = useMemo(() => SUPPLIER_CATEGORIES.map((item) => item === "" ? ({
    label: 'All',
    value: ''
  }) : ({
    label: item.split("_").map((item) => `${item[0].toUpperCase()}${item.slice(1)}`).join(' '),
    value: item
  })), []);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

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

  const handleChange = (value) => {
    setSelectedCategory(value);
    refine(value)
  }
  return (
    <div className="carousel my-6 mx-auto relative">
      <div className="overflow-hidden px-10">
        <div className="flex justify-between absolute top h-full left-0 right-0">
          <button
            onClick={movePrev}
            className="text-gray-700 h-full text-center disabled:cursor-not-allowed disabled:opacity-0.5 z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('prev')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="text-gray-700 text-center disabled:cursor-not-allowed disabled:opacity-0.5 z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('next')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  "carousel-item text-center relative snap-start py-3 px-4 text-gray-700 text-sm whitespace-nowrap cursor-pointer",
                  selectedCategory === item.value ? 'bg-blue-700 text-white rounded-lg' : ''
                )}
                onClick={() => handleChange(item.value)}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
};

export default connectRefinementList(SuppliersCategories);
