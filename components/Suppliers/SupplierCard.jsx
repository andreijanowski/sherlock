import React from "react";
import { Box } from "@rebass/grid";
import { shape } from "prop-types";
import { useRouter } from "next/router";
import { useLng } from "utils/hooks";

const SupplierCard = ({ supplier }) => {
  const router = useRouter();
  const lng = useLng();

  return (
    <div>
      <Box
        className="relative w-full cursor-pointer rounded-4 bg-white p-2 shadow-card"
        onClick={() =>
          router.push(
            `/${lng}/app/suppliers/${supplier.id}/products?name=${supplier?.attributes?.name}`
          )
        }
      >
        <img
          src={supplier?.attributes.logo?.url}
          alt="logo"
          className="h-32.5 w-full rounded-4.5"
        />
        <div className="px-3 py-4">
          <div className="mb-2 break-all font-semibold">
            {supplier?.attributes?.name}
          </div>
          <div className="break-all text-sm text-gray-500">
            {supplier?.attributes?.categories?.join(", ")}
          </div>
        </div>
      </Box>
    </div>
  );
};

SupplierCard.propTypes = {
  supplier: shape().isRequired
};

export default SupplierCard;
