module.exports = {
  devServer: {
    proxy: "http://localhost:3000",
  },
  publicPath: "",

  transpileDependencies: ["vuetify"],
};
