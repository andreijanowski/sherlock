import React, { useEffect, useState } from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import { useInView } from "react-intersection-observer";
import { func, bool, string, shape, arrayOf } from "prop-types";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";
import OrderDetailModal from "./OrderDetailModal";
import {
  addProductToCart,
  removeProductToCart,
  setProductsToCart,
  updateProductToCart
} from "../../data/actions/products";

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
  removeProduct,
  resetProducts
}) => {
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
                count
              }
            : item
        )
      );
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

  useEffect(() => {
    if (cartProducts.length) {
      setIsOpen(true);
    }
  }, [cartProducts]);

  useEffect(() => {
    const productsString = window.localStorage.getItem("cart_products");
    if (productsString) {
      try {
        const parsedProducts = JSON.parse(productsString);

        if (parsedProducts.length) {
          resetProducts(parsedProducts);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [resetProducts]);

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
                selected={
                  !!cartProducts.find(item => item.objectID === hit.objectID)
                }
                onChangeCount={onChangeCount}
              />
            ))
          ) : (
            <div>{t("app:noProducts")}</div>
          )}
        </div>
      </div>
      <div className="ais-InfiniteHits-sentinel h-8 opacity-0" ref={ref} />
      <OrderDetailModal
        products={cartProducts}
        onChangeCount={onChangeCount}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        t={t}
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
  removeProduct: func.isRequired,
  resetProducts: func.isRequired
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
  removeProduct: removeProductToCart,
  resetProducts: setProductsToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedHits);
