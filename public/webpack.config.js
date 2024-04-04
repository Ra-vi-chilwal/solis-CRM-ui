module.exports = {
    // ... other webpack config settings ...
  
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // ... other rules ...
      ],
    },
  };