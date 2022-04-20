import fs from "fs";

const Sitemap = () => null;

Sitemap.getInitialProps = async ({ ctx }) => {
  const { res } = ctx;
  const baseUrl = {
    development: "https://localhost:3000",
    production: "https://business.foodetective.com"
  }[process.env.NODE_ENV];

  const staticPages = fs
    .readdirSync("pages")
    .filter(
      staticPage =>
        !["_app.jsx", "_document.jsx", "_error.jsx", "sitemap.xml.js"].includes(
          staticPage
        )
    )
    .map(staticPagePath => `${baseUrl}/${staticPagePath.replace(".jsx", "")}`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${staticPages
        .map(
          url => `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `
        )
        .join("")}
    </urlset>
  `;

  if (res) {
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  }

  return {
    props: { sitemap }
  };
};

export default Sitemap;
