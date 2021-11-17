# Nginx安装

这里使用docker安装Nginx

## 1、查看可用的Nginx版本
访问镜像库地址： https://hub.docker.com/_/nginx?tab=tags。
![nginx](https://www.runoob.com/wp-content/uploads/2016/06/docker-nginx1.png)

你也可以在下拉列表中找到你想要的版本：
![nginx版本](https://www.runoob.com/wp-content/uploads/2016/06/docker-nginx2.png)

此外，我们还可以用`docker search nginx`命令来查看可用版本：

```bash
docker search nginx
```

## 2、拉取最新的Nginx镜像

```bash
docker pull nginx:latest
```
![nginx:latest](https://www.runoob.com/wp-content/uploads/2016/06/docker-nginx3.png)

## 3、查看本地镜像
使用以下命令来查看是否已安装了nginx:

```bash
docker images
```
![docker images](https://www.runoob.com/wp-content/uploads/2016/06/docker-nginx4.png)

以上图中可以看到我们已经安装了最新版本(latest)的nginx镜像

## 4、运行容器
安装完成后，我们可以使用以下命令运行nginx容器：

```bash
docker run --name nginx-test -p 8080:80 -d nginx
```

> 参数说明：
* --name nginx-test:容器名称。
* -p 8080:80: 端口进行映射，将本地8080端口映射到容器内部80端口。
* -d nginx: 设置容器在后台一直运行。

## 5、安装成功
最后我们可以通过浏览器可以直接访问8080端口的nginx服务：

![](https://www.runoob.com/wp-content/uploads/2016/06/docker-nginx6.png)
