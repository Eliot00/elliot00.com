# Usage

## 2020-11-28更新

**Django已移除，最后可运行的Django+Next版本为bc94f7fc974c9f39e37f18a230059c580297a36a**

**本地调试：**

注意开发环境调试，先检查本地环境变量`NODE_ENV`，不能为`production`。同时参考`Docker`官网安装`Docker`。

```shell script
cd 项目根目录/config/compose/develop/
docker-compose up
```

浏览器访问`http://localhost`即可，按`Ctrl-C`可停止容器运行，`docker-compose down`删除容器。