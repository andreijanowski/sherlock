import React, { useEffect, useMemo, useState } from "react";
import { func, shape, string } from "prop-types";
import { PulseLoader } from "react-spinners";
import Categories from "./Categories";
import { theme } from "utils/theme";
import {
  ALGOLIA_ENVIRONMENT,
  ALGOLIA_SUPPLIER_CATEGORY_INDEX_NAME
} from "consts";

const SupplierCategories = ({ searchClient, lng, t }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const index = searchClient.initIndex(
      `${ALGOLIA_SUPPLIER_CATEGORY_INDEX_NAME}_${ALGOLIA_ENVIRONMENT}`
    );

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
    () =>
      categories.map(item => ({
        label: item[`name_${lng}`] ? item[`name_${lng}`] : item.name_en,
        value: item.name
      })),
    [lng, categories]
  );

  return (
    <div>
      <div>
        {loading ? (
          <div className="flex flex-1 items-center justify-center py-3">
            <PulseLoader color={`rgb(${theme.colors.blue})`} />
          </div>
        ) : (
          <Categories
            categories={supplierCategories}
            attribute="supplier_categories.name"
            t={t}
          />
        )}
      </div>
    </div>
  );
};

SupplierCategories.propTypes = {
  lng: string.isRequired,
  searchClient: shape().isRequired,
  t: func.isRequired
};

export default SupplierCategories;
