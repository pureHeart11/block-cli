# 自动化构建基础代码

## 全局安装

```sh
npm install wpt-block-cli -g  --registry http://npm.wpt.la
```

## 使用

> 可以使用 wblock，也可以使用缩写 wb

- npm 命令行界面

  wblock add 文件路径

  ![Image text](https://cdn.weipaitang.com/static/20210709bb30ae41-65de-ae4165de-fc8f-ff1ce1ceca63-W940H152/w/640) ![Image text](https://cdn.weipaitang.com/static/20210709a15a8f8c-1dd8-8f8c1dd8-ec74-9c8d7fe3fcec-W1236H370/w/640)

- npm 命令行直接执行

  wblock add 文件路径 -t 模板类型

  ```
  wblock add src/pages/test -t WForm
  wblock add src/pages/test --type WForm
  ```

- 支持本地自定义模板，规则如下

  - 当前项目根目录创建 wblock 目录，目录结构：

    ![Image text](https://cdn.weipaitang.com/static/202107091718fec1-7b87-fec17b87-f8e5-408d736118d5-W213H530/w/640)

  - template 用于渲染的模板库（可放单个文件或文件夹）

    ```js
    // 模板例子
    import React, { useState, useEffect } from 'react';
    import { Button, Badge } from 'antd';
    const Index = () => {
      return <div> 自定义渲染模板 </div>;
    };
    export default Index;
    ```

  - 接着执行 第一步命令：wblock add 文件路径

    ![Image text](https://cdn.weipaitang.com/static/20210709dd3bf21e-bf72-f21ebf72-b981-4f06dd71c034-W1230H388)

    至此，自定义模板创建成功！

## type

- FilterTable: 内置 FilterTable 的表格筛选页
- Middle-FilterTable: 中台表格筛选页
- WForm：内置 WForm 的表单页

## 配置

```sh
#老鸟走法
npm root -g
cd /usr/local/lib/node_modules/wpt-block-cli
```

## 本地调试

在 npm 库执行 npm link,将 npm 模块链接到对应的运行项目中去，接着去项目执行 npm link wpt-block-cli。验证完以后，重新执行 npm install wpt-block-cli -g --registry http://npm.wpt.la
