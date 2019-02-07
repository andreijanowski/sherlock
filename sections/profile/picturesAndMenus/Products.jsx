import { func, shape, arrayOf, string } from "prop-types";
import { H3, Paragraph, PerfectSquare, DropzoneWithCropper } from "components";
import { Flex, Box } from "@rebass/grid";
import Product from "./Product";

const Products = ({
  t,
  products,
  addProduct,
  updateProduct,
  removeProduct
}) => (
  <>
    <H3 mt={4}>{t("products")}</H3>
    <Paragraph app>{t("productsTip")}</Paragraph>
    {products.map(p => (
      <Product {...{ ...p, t, updateProduct, removeProduct, key: p.id }} />
    ))}
    <Flex m={-2} mb={3}>
      <Box width={1 / 4} p={2}>
        <PerfectSquare width={1}>
          <DropzoneWithCropper
            tip="＋"
            info={t("picturesInfo")}
            errorTipType={t("invalidFiles")}
            errorInfoType={t("validImages")}
            crop={t("app:crop")}
            cancel={t("app:cancel")}
            multiple
            maxWidth={4096}
            maxHeight={4096}
            saveImage={images => addProduct(images)}
          />
        </PerfectSquare>
      </Box>
    </Flex>
  </>
);
Products.propTypes = {
  t: func.isRequired,
  products: arrayOf(
    shape({
      id: string,
      url: string,
      name: string
    })
  ),
  addProduct: func.isRequired,
  updateProduct: func.isRequired,
  removeProduct: func.isRequired
};

Products.defaultProps = {
  products: []
};

export default Products;
