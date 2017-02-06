var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname);
var APP_DIR = path.resolve(__dirname, 'js');

module.exports = {
  entry: [
		'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
		'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
		APP_DIR + '/main.js' // app's entry point
	],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
	module: {
		loaders: [
		{
			test: /\.jsx?$/, // Transform all .js or .jsx files required somewhere within an entry point...
			loaders: ['react-hot-loader','babel-loader'], // ...with the specified loaders...
			include: path.join(__dirname, 'js'), // ... for all files and folders in the project...
			exclude: path.join(__dirname, '/node_modules/') // ...except for the node_modules folder.
		},
		{
			test:	 /\.css$/, // Transform all .css files required somewhere within an entry point...
			loader: 'style-loader!css-loader' // ...with PostCSS
		},
		{
			test: /\.ico$/,
			loader: 'file-loader?name=img/[name].[ext]'
		},
		{
			test: /\.(jpe?g|png|gif|svg)$/i,
			loader: 'file-loader?name=img/[name].[ext]!img-loader?progressive=true'
		},
		{
			test: /fonts.*\.(woff|woff2|ttf|eot|svg)$/i,
			loader: 'file-loader?name=fonts/[name].[ext]'
		}]
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
	plugins: [
	  new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
    hot: true,
    inline: true,
    port: 3000,
    historyApiFallback: true,
	},
};
