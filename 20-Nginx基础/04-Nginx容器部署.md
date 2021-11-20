# Nginx容器部署

```bash
# 创建www目录
mkdir -p /server/nginx/www
# 创建日志目录
mkdir -p /server/nginx/logs
# 创建配置目录
mkdir -p /server/nginx/conf
```

拷贝容器内Nginx默认配置文件到本地当前目录下的conf目录，容器ID可以查看docker ps命令

```bash
# 拷贝配置文件
docker cp 688ea36ae2dc:/etc/nginx/nginx.conf ~/server/nginx/conf
# 停用镜像
docker stop 688ea36ae2dc
# 删除镜像
docker rm 688ea36ae2dc
# 映射容器目录
docker run -d -p 8080:80 --name nginx-test -v ~/server/nginx/www:/usr/share/nginx/html -v ~/server/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v ~/server/nginx/logs:/var/log/nginx nginx
# 查看运行容器
docker ps
```

访问：
```
http://47.108.118.64:8080
```

结果报403,这是因为我们只有一个www空目录，没有index.html文件

