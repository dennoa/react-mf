const rules = [
  {
    test: /\.(ts|js)x?$/i,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
      },
    },
  },
];

export default rules;
