const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'main.js',
		publicPath: path.resolve(__dirname, 'public')
	},
	module: {
		rules: [
			{
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
	    },
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
      	test:/\.css$/,
      	use:['style-loader','css-loader']
		  }
		]
	},
	serve: {
	  content: path.resolve(__dirname, "public")
	},
}