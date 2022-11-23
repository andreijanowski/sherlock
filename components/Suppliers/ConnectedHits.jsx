import React, { useEffect } from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { func, bool, string, shape, arrayOf } from "prop-types";
import { useRouter } from "next/router";
import { Box } from "@rebass/grid";

const CustomListItem = ({ hit, className, lng }) => {
  const router = useRouter();

  return (
    <Box
      className={clsx(
        "bg-white cursor-pointer rounded-4 shadow-card w-full p-2 relative",
        className
      )}
      onClick={() =>
        router.push(
          `/${lng}/app/suppliers/${hit.objectID}/products?name=${hit.name}`
        )
      }
    >
      <img
        src={hit.logo?.url}
        alt="logo"
        className="h-32.5 w-full rounded-4.5"
      />
      <div className="px-3 py-4">
        <div className="font-semibold mb-2 break-all">{hit.name}</div>
        <div className="text-sm text-gray-500 break-all">
          {(hit.supplier_categories?.map(item => item.name) || []).join(", ")}
        </div>
      </div>
    </Box>
  );
};

CustomListItem.propTypes = {
  hit: shape().isRequired,
  className: string.isRequired,
  lng: string.isRequired
};

const CustomHits = ({ hits, hasMore, refineNext, t, lng }) => {
  const [ref, inView] = useInView({
    threshold: 0.9
  });

  useEffect(() => {
    if (inView && hasMore && refineNext) {
      refineNext();
    }
  }, [hasMore, inView, refineNext]);

  return (
    <div className="ais-InfiniteHits">
      <div className="w-full min-h-200">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 5xl:grid-cols-9 6xl:grid-cols-10 7xl:grid-cols-11 gap-4 lg:gap-6 4xl:gap-8 ais-InfiniteHits-list">
          {hits.length ? (
            hits.map(hit => (
              <CustomListItem
                className="ais-InfiniteHits-item"
                key={hit.objectID}
                hit={hit}
                lng={lng}
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
  hits: arrayOf(shape()).isRequired,
  hasMore: bool.isRequired,
  refineNext: func.isRequired,
  t: func.isRequired,
  lng: string.isRequired
};

const ConnectedHits = connectInfiniteHits(CustomHits);

export default ConnectedHits;
