import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration = {
  mode: (process.env.NODE_ENV as 'production' | 'development' | undefined) ?? 'development',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@services': path.resolve(__dirname, './src/services/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
      '@modules': path.resolve(__dirname, './src/modules/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

export default config;
