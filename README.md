# react+antd后台管理系统

## 技术栈
**前端：react+react-router+redux+axios等**
<br/>
**后端：php(tp5)+mysql**

## 文件目录架构
```
|——   src/
|———— api/        ajax相关
|———— assets/     公用资源
|———— components/ 非路由组件
|———— config/     配置
|———— pages/      路由组件
|———— store/      存储数据的仓库
|———— utils/      工具模块
|———— App.js      应用根组件
|———— index.js    入口js
|——   mixapi/     后端文件夹
```

## 演示地址
[81.68.232.225](http://81.68.232.225 "myspace")

## 如何运行
### 本地开发环境：
1. 前端
    - npm install
    - npm start
2. 后端
    - 打开wamp或phpstudy，这里以wamp为例
    - 找到安装路径的www目录(D:\wamp64\www)，把mixapi文件夹放进去
    - 因为本地配置跨域端口8888，,所以需要配置虚拟主机，找到httpd-vhost.conf文件，在结尾追加如下代码
    ```
    <VirtualHost *:8888>
        ServerName www.mixapi.com
        DocumentRoot D:/wamp64/www/mixapi
        <Directory  "D:/wamp64/www/mixapi/">
        </Directory>
    </VirtualHost>
    ```
    - 接着打开httpd.conf文件,搜索Listen,在Listen 0.0.0.0:80后面加一行Listen 0.0.0.0:8888
    - 然后进入mysql管理后台，点击导入，选择mixapi文件夹下的mixapi.sql即可