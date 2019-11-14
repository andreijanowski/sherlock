const clearAuthCookies = res => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("accessTokenExpiresIn");
  res.clearCookie("accessTokenCreatedAt");
  res.clearCookie("isAuthenticated");
  res.clearCookie("isAuthorized");
};

module.exports = clearAuthCookies;
