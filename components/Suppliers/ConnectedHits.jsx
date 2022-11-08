import React, { useEffect, useMemo } from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { func, bool, string, shape } from "prop-types";

const CustomListItem = ({ hit, className }) => (
  <div className={clsx("bg-white rounded-4 shadow-card w-full p-2", className)}>
    <img src={hit.logo?.url} alt="logo" className="h-32.5 w-full rounded-4.5" />
    <div className="px-3 py-4">
      <div className="font-semibold mb-2 break-all">{hit.name}</div>
      <div className="text-sm text-gray-500 break-all">
        {(hit.supplier_categories.map(item => item.name) || []).join(", ")}
      </div>
    </div>
  </div>
);

CustomListItem.propTypes = {
  hit: shape().isRequired,
  className: string.isRequired
};

const CustomHits = ({ hits, hasMore, refineNext, t, city, country }) => {
  const [ref, inView] = useInView({
    threshold: 0.9
  });

  useEffect(() => {
    if (inView && hasMore && refineNext) {
      refineNext();
    }
  }, [hasMore, inView, refineNext]);

  const filterHits = useMemo(
    () =>
      hits.filter(item => {
        if (item?.countries?.length) {
          return item.countries.includes(country);
        }
        if (item.cities?.length) {
          return item.cities.includes(city);
        }
        return true;
      }),
    [city, country, hits]
  );

  return (
    <div className="ais-InfiniteHits">
      <div className="w-full min-h-200">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 5xl:grid-cols-9 6xl:grid-cols-10 7xl:grid-cols-11 gap-4 lg:gap-6 4xl:gap-8 ais-InfiniteHits-list">
          {filterHits.length ? (
            filterHits.map(hit => (
              <CustomListItem
                className="ais-InfiniteHits-item"
                key={hit.objectID}
                hit={hit}
              />
            ))
          ) : (
            <div>{t("app:noSuppliers")}</div>
          )}
        </div>
      </div>
      <div className="ais-InfiniteHits-sentinel h-8 opacity-0" ref={ref} />
    </div>
  );
};

CustomHits.propTypes = {
  hits: shape().isRequired,
  hasMore: bool.isRequired,
  refineNext: func.isRequired,
  t: func.isRequired,
  city: string,
  country: string
};

CustomHits.defaultProps = {
  city: "",
  country: ""
};

const ConnectedHits = connectInfiniteHits(CustomHits);

export default ConnectedHits;
