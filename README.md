# USTB-gym-frontend

[![wakatime](https://wakatime.com/badge/user/b2ca97db-bce2-4b9b-8588-23c0de16890a/project/335ba54a-435b-4a13-97c2-cc0a1103e456.svg)](https://wakatime.com/badge/user/b2ca97db-bce2-4b9b-8588-23c0de16890a/project/335ba54a-435b-4a13-97c2-cc0a1103e456)
![Chrome](https://img.shields.io/badge/Chrome%20114%2B-Pass-brightgreen?logo=googlechrome&logoColor=white)
![vue](https://img.shields.io/badge/Vue-3.3.2-inactive?logo=vuedotjs)

北科软件工程课设项目 **体育场馆预约管理系统** 前端代码

！！Demo页需要使用**http**协议访问，使用https无法与后端API服务器通讯

后端代码 [WitchElaina/ustb-gym-backend](https://github.com/WitchElaina/ustb-gym-backend)

Docker 镜像 https://hub.docker.com/r/witchelaina/ustb-gym-frontend

## !配置

`src/config.js` 目录下配置 API 服务器地址

## Dev and Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:5173
npm run dev

# build for production with minification
npm run build

# serve static file built by `npm run build`
npm run preview
```

## 部署

应该首先部署后端服务器并在`config.js`中配置，参考 [WitchElaina/ustb-gym-backend](https://github.com/WitchElaina/ustb-gym-backend#%E9%83%A8%E7%BD%B2).

### 使用 Docker (Recommended)

使用 Docker 拉取镜像

```bash
docker pull witchelaina/ustb-gym-frontend
```

运行容器

```bash
docker run -d -p 4173:<your-host-port-here> --name ustb-gym-frontend witchelaina/ustb-gym-frontend
```

这将运行一个静态文件服务器部署你的页面，可以通过 `http://localhost:<your-host-port-here>` 访问

### 其他静态文件服务器

`npm run build` 后将 `dist` 目录下的文件部署到你的静态文件服务器即可。
