# Docoder

node版本:v16.18.1

## 技术栈

- vite
- react
- zustand
- unocss + scss
- typescript
- pixi-react

## 目录结构

```text
- src
  - assets 静态资源
  - components 组件
    - PlayerSprites 存放人物精灵
    - EnemySprites 存放敌人精灵
    - ItemSprites 存放物品精灵
    - MapSprites 存放地图精灵
  - constants 常量
  - contexts 全局状态
  - utils 工具
- types 类型
```

## commit规范

```text
        'build', // 编译相关修改，例如发布版本、项目构建或者依赖的改动
        'feat', // 添加新功能
        'fix', // 修复bug
        'update', // 更新某功能
        'refactor', // 重构
        'docs', // 文档
        'chore', // 构建过程或辅助工具的变动，如添加依赖等
        'style', // 不影响代码运行的变动
        'revert', // 回滚到上一个版本
        'perf', // 性能优化
        'test' // 单元测试、集成测试等
```

## 全局状态

```text
- isPlay 是否开始游戏
- isEnd 是否结束游戏
- score 分数
- speed 速度系数
```
