import React, { useEffect } from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { func, bool, string, shape, arrayOf } from "prop-types";
import { useRouter } from "next/router";
import { Box } from "@rebass/grid";
import { FavouriteIcon } from "../Icons";
import { FavouriteFillIcon } from "../Icons/products";

const CustomListItem = ({
  hit,
  className,
  lng,
  onChangeFavoriteSupplier,
  isFavorite
}) => {
  const router = useRouter();

  const onToggleFavorite = e => {
    e.stopPropagation();
    onChangeFavoriteSupplier(hit.objectID, !isFavorite);
  };

  return (
    <Box
      className={clsx(
        "relative w-full cursor-pointer rounded-4 bg-white p-2 shadow-card",
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
      <Box
        className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-2 bg-gray-100"
        onClick={onToggleFavorite}
      >
        {isFavorite ? (
          <FavouriteFillIcon width={16} className="text-blue-700" />
        ) : (
          <FavouriteIcon width={16} className="text-gray-700" />
        )}
      </Box>
      <div className="px-3 py-4">
        <div className="mb-2 break-all font-semibold">{hit.name}</div>
        <div className="break-all text-sm text-gray-500">
          {(hit.supplier_categories?.map(item => item.name) || []).join(", ")}
        </div>
      </div>
    </Box>
  );
};

CustomListItem.propTypes = {
  hit: shape().isRequired,
  className: string.isRequired,
  lng: string.isRequired,
  onChangeFavoriteSupplier: func.isRequired,
  isFavorite: bool.isRequired
};

const CustomHits = ({
  hits,
  hasMore,
  refineNext,
  t,
  lng,
  onChangeFavoriteSupplier,
  suppliersData
}) => {
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
      <div className="min-h-200 w-full">
        <div className="ais-InfiniteHits-list grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 4xl:gap-8 5xl:grid-cols-9 6xl:grid-cols-10 7xl:grid-cols-11">
          {hits.length ? (
            hits.map(hit => (
              <CustomListItem
                className="ais-InfiniteHits-item"
                key={hit.objectID}
                hit={hit}
                lng={lng}
                onChangeFavoriteSupplier={onChangeFavoriteSupplier}
                isFavorite={suppliersData?.has(hit.objectID)}
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
  lng: string.isRequired,
  onChangeFavoriteSupplier: func.isRequired,
  suppliersData: shape().isRequired
};

const ConnectedHits = connectInfiniteHits(CustomHits);

export default ConnectedHits;
