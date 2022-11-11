import React, { useEffect, useMemo, useState } from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import { useInView } from "react-intersection-observer";
import { func, bool, string, shape } from "prop-types";
import ProductCard from "./ProductCard";
import OrderDetailModal from "./OrderDetailModal";

const ProductsGrid = ({ hits, hasMore, refineNext, t, lng, supplier }) => {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0.9
  });

  useEffect(() => {
    if (inView && hasMore && refineNext) {
      refineNext();
    }
  }, [hasMore, inView, refineNext]);

  useEffect(() => {
    setProducts(
      hits.map(item => ({
        ...item,
        count: 1
      }))
    );
  }, [hits]);

  const increase = productId => {
    const product = products.find(item => item.objectID === productId);
    if (!product) {
      return;
    }
    setProducts(
      products.map(item =>
        item.objectID === productId
          ? {
              ...item,
              count: product.count + 1
            }
          : item
      )
    );
  };

  const decrease = productId => {
    const product = products.find(item => item.objectID === productId);
    if (!product) {
      return;
    }
    if (product.count === 1) {
      setSelectedProductIds(
        selectedProductIds.filter(item => item !== productId)
      );
      return;
    }

    setProducts(
      products.map(item =>
        item.objectID === productId
          ? {
              ...item,
              count: product.count - 1
            }
          : item
      )
    );
  };

  const onAddProduct = productId => {
    setSelectedProductIds([...selectedProductIds, productId]);
  };

  useEffect(() => {
    if (selectedProductIds.length) {
      setIsOpen(true);
    }
  }, [selectedProductIds]);

  const selectedProducts = useMemo(
    () =>
      selectedProductIds.map(item =>
        products.find(product => product.objectID === item)
      ),
    [products, selectedProductIds]
  );

  return (
    <div className="ais-InfiniteHits">
      <div className="w-full min-h-200">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 5xl:grid-cols-9 6xl:grid-cols-10 7xl:grid-cols-11 gap-4 lg:gap-6 4xl:gap-8 ais-InfiniteHits-list">
          {products.length ? (
            products.map(hit => (
              <ProductCard
                className="ais-InfiniteHits-item"
                key={hit.objectID}
                product={hit}
                lng={lng}
                onAdd={onAddProduct}
                selected={selectedProductIds.includes(hit.objectID)}
                increase={increase}
                decrease={decrease}
              />
            ))
          ) : (
            <div>{t("app:noProducts")}</div>
          )}
        </div>
      </div>
      <div className="ais-InfiniteHits-sentinel h-8 opacity-0" ref={ref} />
      <OrderDetailModal
        products={selectedProducts}
        increase={increase}
        decrease={decrease}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        supplier={supplier}
      />
    </div>
  );
};

ProductsGrid.propTypes = {
  hits: shape().isRequired,
  hasMore: bool.isRequired,
  refineNext: func.isRequired,
  t: func.isRequired,
  lng: string.isRequired,
  supplier: shape().isRequired
};

const ConnectedHits = connectInfiniteHits(ProductsGrid);

export default ConnectedHits;
