import React, { useEffect } from "react";
import {
  connectInfiniteHits,
  connectStateResults
} from "react-instantsearch-dom";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { func, bool, string, shape } from "prop-types";
import { PulseLoader } from "react-spinners";
import { theme } from "utils/theme";

const CustomListItem = props => {
  const { hit, className } = props;

  return (
    <div
      className={clsx(
        "bg-white rounded-4 shadow-card min-w-64 max-w-64 mr-4 mb-4 p-2",
        className
      )}
    >
      <img
        src={hit.logo?.url}
        alt="logo"
        className="h-32.5 w-full rounded-4.5"
      />
      <div className="px-3 py-4">
        <div className="font-semibold mb-2 break-all">{hit.name}</div>
        <div className="text-sm text-gray-500 break-all">
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

const CustomHits = ({ hits, hasMore, refineNext, searching, t }) => {
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
      {searching ? (
        <div className="flex justify-center">
          <PulseLoader color={`rgb(${theme.colors.blue})`} />
        </div>
      ) : (
        <div ref={ref} className="w-full flex flex-wrap ais-InfiniteHits-list">
          {Object.values(hits).length ? (
            Object.values(hits).map(hit => (
              <CustomListItem
                className="ais-InfiniteHits-item"
                key={hit.objectID}
                hit={hit}
              />
            ))
          ) : (
            <div>{t("app:noSuppliers")}</div>
          )}
          <li className="ais-InfiniteHits-sentinel hidden" />
        </div>
      )}
    </div>
  );
};

CustomHits.propTypes = {
  hits: shape().isRequired,
  hasMore: bool.isRequired,
  refineNext: func.isRequired,
  searching: bool.isRequired,
  t: func.isRequired
};

const ConnectedHits = connectStateResults(connectInfiniteHits(CustomHits));

export default ConnectedHits;
