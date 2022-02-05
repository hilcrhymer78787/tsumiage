const withPWA = require("next-pwa");
module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: false,
  pwa: {
    dest: "public", // swの出力ディレクトリ
    // runtimeCaching: []
  },
});