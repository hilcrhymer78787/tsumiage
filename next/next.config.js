const withPWA = require("next-pwa");
module.exports = withPWA({
    //   buildExcludes: [/.*\.js\.map/],
    trailingSlash: true,
    reactStrictMode: true,
    swcMinify: false,
    pwa: {
        dest: "public", // swの出力ディレクトリ
        // runtimeCaching: []
    },
});