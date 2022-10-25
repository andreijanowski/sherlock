import React, { useEffect } from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { func, bool, string, shape } from "prop-types";

const CustomListItem = props => {
  const { hit, className } = props;

  return (
    <div className={clsx("bg-white rounded-xl shadow-card p-3", className)}>
      <div className="h-30 flex justify-center items-center shadow-card rounded-lg overflow-hidden p-4">
        <img src={hit.logo?.url} alt="logo" className="max-h-24 w-full" />
      </div>
      <div className="px-3 py-4">
        <div className="font-semibold mb-2 break-all">{hit.name}</div>
        <div className="text-sm text-gray-700 break-all">
          {(hit.supplier_categories.map(item => item.name) || []).join(", ")}
        </div>
      </div>
    </div>
  );
};

CustomListItem.propTypes = {
  hit: shape().isRequired,
  className: string.isRequired
};

const CustomHits = ({ hits, hasMore, refineNext }) => {
  const [ref, inView] = useInView({
    threshold: 0.9
  });

  useEffect(() => {
    if (inView && hasMore) {
      refineNext();
    }
  }, [hasMore, inView, refineNext]);

  return (
    <div className="ais-InfiniteHits">
      <div
        ref={ref}
        className="w-full rounded-xl shadow-card bg-white p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ais-InfiniteHits-list"
      >
        {Object.values(hits).length ? (
          Object.values(hits).map(hit => (
            <CustomListItem
              className="ais-InfiniteHits-item"
              key={hit.objectID}
              hit={hit}
            />
          ))
        ) : (
          <div>No Suppliers</div>
        )}
        <li className="ais-InfiniteHits-sentinel hidden" />
      </div>
    </div>
  );
};

CustomHits.propTypes = {
  hits: shape().isRequired,
  hasMore: bool.isRequired,
  refineNext: func.isRequired
};

const ConnectedHits = connectInfiniteHits(CustomHits);

export default ConnectedHits;
