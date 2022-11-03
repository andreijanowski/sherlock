import React, { useEffect, useMemo, useState } from "react";
import { shape, string } from "prop-types";
import { PulseLoader } from "react-spinners";
import Categories from "./Categories";
import { theme } from "../../utils/theme";

const SupplierCategories = ({ searchClient, lng }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const index = searchClient.initIndex("SupplierCategory_staging");

    setLoading(true);
    index
      .search("", {
        hitsPerPage: 1000
      })
      .then(({ hits }) => {
        setCategories(hits);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchClient]);

  const supplierCategories = useMemo(
    () => [
      "",
      ...categories.map(item => item[`name_${lng}`]).filter(item => !!item)
    ],
    [lng, categories]
  );

  console.log("searchClient", searchClient);
  return (
    <div>
      <div>
        {loading ? (
          <div className="flex-1 flex items-center justify-center py-3">
            <PulseLoader color={`rgb(${theme.colors.blue})`} />
          </div>
        ) : (
          <Categories
            categories={supplierCategories}
            attribute="supplier_categories.name"
          />
        )}
      </div>
    </div>
  );
};

SupplierCategories.propTypes = {
  lng: string.isRequired,
  searchClient: shape().isRequired
};

export default SupplierCategories;
