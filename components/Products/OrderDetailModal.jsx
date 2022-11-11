import React, { useRef } from "react";
import Modal from "react-responsive-modal";
import { arrayOf, bool, func, shape } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { CartIcon } from "../Icons";

const OrderDetailModal = ({
  isOpen,
  onClose,
  products,
  increase,
  decrease
}) => {
  const ref = useRef(null);

  const closeIcon = (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 8L8 14"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8L14 14"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div>
      <div ref={ref} />
      <Modal
        open={isOpen}
        onClose={onClose}
        classNames={{
          overlay:
            "bg-transparent right-0 left-auto w-118 top-0 p-0 overflow-visible",
          modal:
            "right-0 absolute top-0 h-screen w-118 p-0 bg-white shadow-card"
        }}
        container={ref.current}
        closeIconSvgPath={closeIcon}
      >
        <div className="flex flex-col h-screen flex-auto py-5">
          <div className="px-5">
            <div className="font-bold text-xl mb-5">My cart</div>

            <div className="font-semibold text-gray-900 text-lg">Bakus</div>
            <div className="text-gray-500 mb-4">Wine Cellar</div>
          </div>

          <div className="flex-1 px-5 overflow-auto">
            {products.map(product => (
              <div key={product.objectID} className="flex space-x-4 mb-4">
                <div className="">
                  <img
                    src={product?.image?.url}
                    alt="logo"
                    className="min-w-33 max-w-33 w-full rounded-4.5"
                  />
                </div>
                <div>
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-gray-500 text-sm">
                    {product.description?.slice(0, 100)}
                  </div>
                  <div className="rounded-full h-10 w-23 my-3 flex space-x-2 items-center justify-center border border-gray-900 text-gray-900">
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="cursor-pointer text-sm cursor-pointer"
                      onClick={() => decrease(product.objectID)}
                    />
                    <div>{product.count}</div>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="cursor-pointer text-sm cursor-pointer"
                      onClick={() => increase(product.objectID)}
                    />
                  </div>
                  <div className="flex">
                    <div>{product.price_per_unit_cents || 0}€/</div>
                    <div>{product.units}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute w-full bottom-0 left-0 h-21 flex items-center justify-center space-x-3 shadow-card bg-white">
            <div className="text-gray-900 text-xl font-semibold">
              Finalize my order
            </div>
            <CartIcon className="w-6 text-gray-900" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

OrderDetailModal.propTypes = {
  products: arrayOf(shape()).isRequired,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  increase: func.isRequired,
  decrease: func.isRequired
};

export default OrderDetailModal;
