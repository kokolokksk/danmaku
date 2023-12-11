# CatCatDanmaku 

猫猫弹幕库

![pongpongpong](./building.gif)

### 所在频道(无)

QQ频道: 

点击加入QQ频道【[无]()】

QQ群：319833969

CatCatDamaku 功能列表
- 📕 1
- 🌱 2
- ♥ 3
- 🌸 4
- 🐟 5
- 👴 6
- 🕐 7
- 🎗️ 8
- 🪐 9
- 📔 10
- 📗 11
- 📧 12
# TODO
- 

## 使用技术
使用typescript编写的nodejs项目。
- [nestjs](https://github.com/nestjs/nest)
- [typeorm](https://github.com/typeorm/typeorm) 
- [node-sqlite3](https://github.com/TryGhost/node-sqlite3)
- [bot-node-sdk](https://github.com/tencent-connect/bot-node-sdk)

## 目录结构

```
.
├── dist
│   | ...打包后文件
├── package.json
├── README.md
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── bot
│   │   ├── config // 配置文件
│   │   │   ├── dataSource.ts
│   │   │   ├── lalafell.config.ts
│   │   │   └── s.config.ts
│   │   ├── core //插件加载
│   │   │   └── core.ts
│   │   ├── entities // 实体类
│   │   │   └── message.ts
│   │   ├── ext // 消息接口扩展
│   │   │   └── post.ts
│   │   └── plugins // 插件
│   │       ├── ffxiv-fish
│   │       └── role-play
│   └── main.ts // 消息转发
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```
## 部署
```language = bash
npm run build
```
生成dist文件夹

可以使用pm2 进行部署
```language = bash
pm2 start npm --name lalafellBot -- start
```
## 感谢
A 使用了[A](A)数据。

B 使用了[B](B)数据。

C 图片来自[C](C)。
