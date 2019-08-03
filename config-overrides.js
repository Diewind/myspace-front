const { override, fixBabelImports,addLessLoader } = require('customize-cra');

module.exports = override(
    // 针对antd进行按需打包,使用import来打包(使用babel-plugin-import)
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,//自动打包相关的样式
    }),
    // 配置antd主题,使用less-loader对源码中的less的变量进行重新指定
    addLessLoader({
        javascriptEnabled:true,
        modifyVars:{
            '@primary-color':'#3f51b5',// 全局主色
            '@link-color': '#3f51b5', // 链接色
            '@success-color': '#52c41a', // 成功色
            '@warning-color': '#faad14', // 警告色
            '@error-color': '#f5222d', // 错误色
            '@font-size-base': '14px', // 主字号
            '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
            '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
            '@text-color-secondary' : 'rgba(0, 0, 0, .45)', // 次文本色
            '@disabled-color' : 'rgba(0, 0, 0, .25)', // 失效色
            '@border-radius-base': '4px', // 组件/浮层圆角
            '@border-color-base': '#d9d9d9', // 边框色
            '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // 浮层阴影
        },
    })
);