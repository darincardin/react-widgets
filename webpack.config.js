const path = require('path');
var webpack = require('webpack');



module.exports = (env) => {

	return  {
	  mode: 'production',
	
	  resolve: {extensions: ['*','.js','.jsx']  },
	  entry: {index: './index-prod.js'  },
	  externals: {  'react-cookie':'react-cookie', '$': 'jquery', 'react': 'react', 'react-dom' : 'reactDOM','prop-types':'prop-types' },
	  output: { libraryTarget: 'umd', publicPath: '/dist', path: path.resolve(__dirname, 'dist'), filename: '[name].js' },
      plugins:  [ new webpack.ProvidePlugin({ $: "jquery", 	jQuery: "jquery"})  ],
  	 
	  devServer: {
		static: {  directory: path.join(__dirname, 'src/') },
		historyApiFallback: true,
		port: 3100,
	  },
	  module: {
		rules: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
	    	{ test:/\.(s*)css$/, use:['style-loader','css-loader', 'sass-loader']  },	
		    {
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: { loader: 'file-loader', options: { name: '[name].[ext]',  outputPath: 'fonts/'} }
		    }		
		]
	  }
	}

}


