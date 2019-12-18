module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("awesome-typescript-loader"),
        options: {
          reportFiles: ["../**/src/**/*.{ts,tsx}"]
        }
      }
    ]
  });
  config.module.rules.push({
    test: /\.ttf$/,
    use: [
      {
        loader: require.resolve("file-loader")
      }
    ]
  });
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
