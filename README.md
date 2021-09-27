# 自动化构建基础代码

## 全局安装

```sh
npm install xxx-block-cli -g  --registry http://npm.xxx.la
```

## 使用

> 可以使用 wblock，也可以使用缩写 wb

- npm 命令行界面

  wblock add 文件路径

- npm 命令行直接执行

  wblock add 文件路径 -t 模板类型

  ```
  wblock add src/pages/test -t WForm
  wblock add src/pages/test --type WForm
  ```

- 支持本地自定义模板，规则如下

  - 当前项目根目录创建 wblock 目录，目录结构：

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
    至此，自定义模板创建成功！

## 配置

```sh
#老鸟走法
npm root -g
cd /usr/local/lib/node_modules/xxx-block-cli
```

## 本地调试

在 npm 库执行 npm link,将 npm 模块链接到对应的运行项目中去，接着去项目执行 npm link xxx-block-cli。验证完以后，重新执行 npm install xxx-block-cli -g --registry http://npm.xxx.la
