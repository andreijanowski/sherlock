import { func, shape, arrayOf, string } from "prop-types";
import { H3, Paragraph } from "components";
import Product from "./Product";

const MustTry = ({
  t,
  products = [
    {
      photo: "https://images.unsplash.com/photo-1543363136-3fdb62e11be5",
      name: "Gratineé d'oignons"
    },
    {
      photo: "https://images.unsplash.com/photo-1543364195-bfe6e4932397",
      name: "Les Salades de Saison"
    },
    {
      photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      name: "Langoustinnes Bretonnes Raidies"
    }
  ]
}) => (
  <>
    <H3 mt={4}>{t("mustTry")}</H3>
    <Paragraph app>{t("mustTryTip")}</Paragraph>
    {products.map(p => (
      <Product {...{ ...p, t, key: p.name }} />
    ))}
  </>
);
MustTry.propTypes = {
  t: func.isRequired,
  products: arrayOf(
    shape({ photo: string.isRequired, name: string.isRequired })
  ).isRequired
};

export default MustTry;
