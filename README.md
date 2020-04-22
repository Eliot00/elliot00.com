# Usage

**本地调试：**

注意开发环境调试，先检查本地环境变量`NODE_ENV`，不能为`production`。同时参考`Docker`官网安装`Docker`。

```shell script
cd 项目根目录/config/compose/develop/
docker-compose up
```

浏览器访问`http://localhost`即可，按`Ctrl-C`可停止容器运行，`docker-compose down`删除容器。

# TODO List

- [x] 侧边栏目录 2020/04/21
- [x] API教程与普通文章标记 2020/04/21
- [x] React与REST framework重写博客 2020/04/21
- [x] antd学习 2020/04/21
- [x] TypeScript学习 2020/04/21
- [x] Next.js服务端渲染 2020/04/21
- [ ] 首页侧边友链卡片
- [ ] 首页侧边联系方式轮播图
- [ ] API字段筛选
- [ ] 创作界面