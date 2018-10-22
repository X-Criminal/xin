##配置less
  安装 less less-loader 

    webpack.config 添加 
    {
            test: /\.less?$/,
            loaders: [
                'style-loader',
                'css-loader',
                'less-loader?{"sourceMap":false}'
              ],
            exclude: node_modules/
        }
    
