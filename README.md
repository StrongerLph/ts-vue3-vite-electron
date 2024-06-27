# Vue 3 + TypeScript + Vite + Electron

## 简介

基于Vue 3 + TypeScript 和 Vite + electron-builder 构建的electron桌面应用开发项目模版。

- 支持eslint+prettier+stylelint代码风格统一
- 支持husky、lint-stage、commitlint 强制代码风格和commit风格
··· 更多工程化配置开发中

## 启动项目

``` bash
# 全局安装 commitizen pnpm
npm install -g commitizen pnpm

# 进入项目根目录
pnpm install

# 本地运行
pnpm run dev

# 打包
pnpm run build

# build 生成 release目录，目录下对应版本号的应用安装包 win下双击.exe文件安装应用
```
