const setAuthCookies = (res, data) => {
  const { accessToken, expiresIn, createdAt, refreshToken } = data;
  const maxAge =
    Number(expiresIn) * 1000 + Number(createdAt) * 1000 - Date.now();
  res.cookie("accessToken", accessToken, { httpOnly: true });
  res.cookie("refreshToken", refreshToken, { httpOnly: true });
  res.cookie("accessTokenExpiresIn", expiresIn);
  res.cookie("accessTokenCreatedAt", createdAt);
  res.cookie("isAuthenticated", true);
  res.cookie("isAuthorized", true, { maxAge });
};

module.exports = setAuthCookies;
