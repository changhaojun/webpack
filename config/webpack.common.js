const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin= require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const CopyWebpackPlugin = require('copy-webpack-plugin');
const devMode = process.env.NODE_ENV === 'development';

module.exports={
    mode:'development',
    entry:{
        index: './src/page/index/index.js',
        other: './src/page/other/other.js'
    },
    output:{
        filename: 'js/[name].[hash].js',  // 输出文件名称
        path: path.resolve(__dirname,'../dist') // 路径
    },
    module: {
        rules: [
            {
				test: /\.(sa|sc|c)ss$/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
					'sass-loader'
				],
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
				test: /\.(png|svg|jpe*g|gif|mp3|ogg|ttf|woff|woff2|ico)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name() {
								return devMode ? '[path][name].[ext]' : '[hash].[ext]';
							},
							outputPath: devMode ? '' : 'asset/images/'
						}
					}
				]
			}
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
        }),
        new HtmlWebpackPlugin({
            template: './src/page/index/index.html', // 要打包的HTML路径和文件名
            filename: 'index.html', // 输出路径和文件的名称
            chunks: ['index'] // 加载对应的js文件
        }), 
        new HtmlWebpackPlugin({
            template: './src/page/index/index.html',
            filename: 'other.html',
            chunks: ['other']
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, '../src/asset'),
				to: 'asset'
			}
		])
    ]
}