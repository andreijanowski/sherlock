const bodyParser = require("body-parser");
const qs = require("qs");
const axiosClient = require("./axiosClient");

function apiMiddleware(server) {
  // the middleware for authorized API calls
  // used as a safe proxy between a client (browser) and our backend API
  const parser = bodyParser.raw({ type: "application/vnd.api+json" });
  server.use("/api", parser, (req, res) => {
    const { url, method, body, query } = req;
    axiosClient({
      method,
      url: `/${url}`,
      headers: {
        Authorization: `Bearer ${req.cookies.accessToken}`
      },
      paramsSerializer: params =>
        qs.stringify(params, { arrayFormat: "brackets" }),
      data: body,
      params: query
    })
      .then(d => {
        res.send(d.data);
      })
      .catch(err => {
        res.status(err.response.status);
        res.send(err.response.data);
      });
  });
}

module.exports = apiMiddleware;
