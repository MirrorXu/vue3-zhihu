# vue3-zhihu
- 仿知乎网站
- 技术栈： vue@3 + TypeScript 
- 使用@vue/vli脚手架创建

## npm scripts
``` bash
npm install
npm run serve
npm run build
# Lints and fixes files
npm run lint 
```
## 工具版本
- node@12.5.0
- @vue/cli@4.5.4
- vite@2.8.5


## git commit 提交规定
项目配置了 commitlint 来校验commit message，确保能够贵方提交代码：
- 格式：`<type>[optional scope]: <description> ` => `<类型>[可选 范围]: <描述>`
- type-类型：
    - feat： 新功能
    - fix： 功能修复
    - build: 用于修改项目构建系统，例如修改依赖库、外部接口或者升级 Node 版本等；
    - chore: 用于对非业务性代码进行修改，例如修改构建流程或者工具配置等；
    - ci: 用于修改持续集成流程，例如修改 Travis、Jenkins 等工作流配置；
    - docs: 用于修改文档，例如修改 README 文件、API 文档等；
    - style: 用于修改代码的样式，例如调整缩进、空格、空行等；
    - refactor: 用于重构代码，例如修改代码结构、变量名、函数名等但不修改功能逻辑；
    - perf: 用于优化性能，例如提升代码的性能、减少内存占用等；
    - test: 用于修改测试用例，例如添加、删除、修改代码的测试用例等。

## 项目文档
- [文档：http://docs.vikingship.xyz](http://docs.vikingship.xyz)
- [接口文档：http://api.vikingship.xyz/public/swagger/index.html](http://api.vikingship.xyz/public/swagger/index.html)

## vue2中的存在的一些问题
- 组件间的复用逻辑经常需要mixin来实现，阅读组件的时候会对一些变量觉得莫名其妙
- 

## 编辑器插件推荐
- vue2：vetur   
- vue3：volar

## 生命周期钩子
![img.png](./readme_imgs/img.png)


## 样式库选型
- bootStrap
- tailwindcss

## 有趣的接口
- [Dog API](https://dog.ceo/dog-api/breeds-list)


