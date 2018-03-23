const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
  source: path.join(__dirname, '../source'),
  assets: path.join(__dirname, '../source/assets/'),
  scss: path.join(__dirname, '../source/scss/'),
  fonts: path.join(__dirname, '../source/assets/fonts/'),
  images: path.join(__dirname, '../source/assets/img'),
  javascript: path.join(__dirname, '../source/js'),
  svg: path.join(__dirname, '../source/assets/svg'),
  build: path.join(__dirname, '../build'),
};

const outputFiles = require('./output-files').outputFiles;

const NODE_ENV = process.env.NODE_ENV || 'development';
const SERVER_RENDER = process.env.SERVER_RENDER === 'true';
const IS_DEVELOPMENT = NODE_ENV === 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

// ----------
// PLUGINS
// ----------

// Shared plugins
const plugins = [
  // Extracts CSS to a file
  new ExtractTextPlugin(outputFiles.css),
  // Injects env variables to our app
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      SERVER_RENDER: JSON.stringify(SERVER_RENDER) === 'true',
    },
  }),
];

if (IS_DEVELOPMENT) {
  // Shared development plugins
  plugins.push(
    // Enables pretty names instead of index
    new webpack.NamedModulesPlugin()
  );
}

// ----------
// RULES
// ----------

// Shared rules
const rules = [
  // Babel loader
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
  // SVG are imported as react components
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [
              {
                removeTitle: true,
              },
            ],
            floatPrecision: 3,
          },
        },
      },
    ],
    include: paths.svg,
  },
  // Images
  {
    test: /\.(png|gif|jpg|svg)$/,
    include: paths.images,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'client/assets/[name]-[hash].[ext]',
        },
      },
    ],
  },
  // Fonts
  {
    test: /\.(eot|ttf|woff|woff2)$/,
    include: paths.fonts,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'client/fonts/[name]-[hash].[ext]',
        },
      },
    ],
  },
];

// Almost the same rule is used in both development and production
// only diffence is source map param and ExtractTextPlugin
// so we are using this method to avoid redundant code
const getSassRule = () => {
  const autoprefixerOptions = {
    browsers: [
      'last 3 version',
      'ie >= 10',
    ],
  };

  const sassLoaders = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: IS_DEVELOPMENT,
        minimize: IS_PRODUCTION,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: IS_DEVELOPMENT,
        plugins: () => [
          autoprefixer(autoprefixerOptions),
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: { sourceMap: IS_DEVELOPMENT },
    },
  ];

  if (IS_PRODUCTION || SERVER_RENDER) {
    return {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        use: sassLoaders,
      }),
    };
  }

  return {
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader',
      },
    ].concat(sassLoaders),
  };
};

// Add SASS rule to common rules
rules.push(getSassRule());


// For both production and server ExtractTextPlugin is used
if (IS_PRODUCTION || SERVER_RENDER) {
  rules.push(
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true,
            },
          },
          'postcss-loader',
        ],
      }),
    }
  );
} else {
  rules.push(
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
          options: { sourceMap: true },
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true },
        },
      ],
    }
  );
}

// ----------
// RESOLVE
// ----------

const resolve = {
  extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
  modules: [
    path.join(__dirname, '../node_modules'),
    paths.javascript,
    paths.assets,
    paths.scss,
  ],
};

// ----------
// CLI STATS
// ----------

const stats = {
  colors: true,
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
};

module.exports = {
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  NODE_ENV,
  SERVER_RENDER,
  outputFiles,
  paths,
  plugins,
  resolve,
  rules,
  stats,
};
