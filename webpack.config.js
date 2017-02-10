var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var SRC_PATH = path.resolve(__dirname, 'src');
var PUBLIC_PATH = path.resolve(__dirname, 'public');
var VIEW_PATH = path.resolve(__dirname, 'views');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var autoprefixer = require('autoprefixer');
var precss = require('precss');


var IS_DEV = process.env.NODE_ENV !== 'production';

// 删除目录下的文件函数
var removeFiles = function (path) {
    var folder_exists = fs.existsSync(path);
    if (folder_exists == true) {
        var dirList = fs.readdirSync(path);
        dirList.forEach(function (fileName) {
            fs.unlinkSync(path + fileName);
        });
    } else {
        throw new Error('要删除的文件目录不存在');
    }
};
// 生产线先删除编译后冗余的 js 和 css
if (!IS_DEV) {
    try {
        removeFiles(PUBLIC_PATH + '/js/');
        removeFiles(PUBLIC_PATH + '/css/');
        fs.unlinkSync(VIEW_PATH + '/index.html');
    } catch (e) {
        console.log('---------------' + e + '---------------');
    }
}

var plugins = [
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: function () {
                return [precss, autoprefixer];
            }
        }
    }),
    //压缩打包的文件，包括JS以外的文件
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new HtmlWebpackPlugin({
        inject: true,
        filename: '../views/index.html',
        template: path.join(SRC_PATH, 'index.html'),
        chunks: ['index']  // 会自动添加 script 标签,引入这些文件
    }),
    new ExtractTextPlugin('css/[name][hash:5].css'),
    new webpack.DefinePlugin({
        'process.env.NODE.ENV': "development"
    })
];
// 测试环境需要在根目录下生成index.html，正式环境index.html移出去了
IS_DEV && plugins.push(
    new HtmlWebpackPlugin({//给dev-server使用
        inject: true,
        filename: 'index.html',
        template: path.join(SRC_PATH, 'index.html'),
        chunks: ['index']
    })
);

module.exports = {
    entry: {
        index: [path.join(SRC_PATH, 'index.js')]//使用[]包裹，这样入口文件可以被模块化加载
    },
    output: {
        path: PUBLIC_PATH,
        publicPath: '',
        filename: 'js/[name][hash:5].js'
    },
    plugins: plugins,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'//配置已写至配置文件中
            },
            // less,还是不要用css-loader转码了，想用在开启
            {
                test: /\.less$/,
                include: /src/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!postcss-loader',
                    publicPath: '../'
                })
            },
            // images,此处不要使用hash，因为有HTML文件引用
            {test: /\.(png|gif|jpg|ico)$/, loader: 'url-loader?limit=1024&name=images/[name].[ext]'}
        ]
    }
};