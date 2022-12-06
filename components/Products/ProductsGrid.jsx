import React, { useEffect, useState } from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import { useInView } from "react-intersection-observer";
import { func, bool, string, shape, arrayOf } from "prop-types";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";
import {
  addProductToCart,
  removeProductToCart,
  updateProductToCart
} from "actions/products";
import ProductDetailModal from "./ProductDetailModal";

const ProductsGrid = ({
  hits,
  hasMore,
  refineNext,
  t,
  lng,
  supplier,
  cartProducts,
  addProduct,
  updateProduct,
  removeProduct
}) => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  const [ref, inView] = useInView({
    threshold: 0.9
  });

  useEffect(() => {
    if (inView && hasMore && refineNext) {
      refineNext();
    }
  }, [hasMore, inView, refineNext]);

  useEffect(() => {
    setProducts(prev =>
      hits.map(item => ({
        ...item,
        count:
          prev.find(product => product.objectID === item.objectID)?.count || 1
      }))
    );
  }, [hits]);

  useEffect(() => {
    setProducts(prev =>
      prev.map(item => ({
        ...item,
        count:
          cartProducts.find(
            selectedProduct => selectedProduct.objectID === item.objectID
          )?.count || item.count
      }))
    );
  }, [cartProducts]);

  const onChangeCount = (productId, count) => {
    const product = products.find(item => item.objectID === productId);
    if (product) {
      setProducts(
        products.map(item =>
          item.objectID === productId
            ? {
                ...item,
                count: count > 0 ? count : 1
              }
            : item
        )
      );
      if (selectedProduct?.objectID === productId) {
        setSelectedProduct({
          ...selectedProduct,
          count: count > 0 ? count : 1
        });
      }
    }
    if (count === 0) {
      removeProduct(productId);
    } else {
      updateProduct(productId, count);
    }
  };

  const onAddProduct = product => {
    addProduct({
      ...product,
      supplier
    });
  };

  const onChangeSelectedProduct = product => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  return (
    <div className="ais-InfiniteHits">
      <div className="min-h-200 w-full">
        <div className="ais-InfiniteHits-list grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 4xl:gap-8 5xl:grid-cols-9 6xl:grid-cols-10 7xl:grid-cols-11">
          {products.length ? (
            products.map(hit => (
              <ProductCard
                className="ais-InfiniteHits-item"
                key={hit.objectID}
                product={hit}
                lng={lng}
                onAdd={onAddProduct}
                selected={
                  !!cartProducts.find(item => item.objectID === hit.objectID)
                }
                onChangeCount={onChangeCount}
                onClick={onChangeSelectedProduct}
              />
            ))
          ) : (
            <div>{t("app:noProducts")}</div>
          )}
        </div>
      </div>
      <div className="ais-InfiniteHits-sentinel h-8 opacity-0" ref={ref} />
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        selected={
          !!cartProducts.find(
            item => item.objectID === selectedProduct?.objectID
          )
        }
        onChangeCount={onChangeCount}
        onAdd={onAddProduct}
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
  supplier: shape().isRequired,
  cartProducts: arrayOf(shape()).isRequired,
  addProduct: func.isRequired,
  updateProduct: func.isRequired,
  removeProduct: func.isRequired
};

const ConnectedHits = connectInfiniteHits(ProductsGrid);

const mapStateToProps = state => {
  const products = state.getIn(["products", "selectedProducts"]);

  return {
    cartProducts: products.size ? products.toJS() : []
  };
};

const mapDispatchToProps = {
  addProduct: addProductToCart,
  updateProduct: updateProductToCart,
  removeProduct: removeProductToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedHits);
