# 普通配置

1、创建html文件
随便找一个html文件，我这里找了一个saas-web项目放在server/nginx/www目录下

2、修改host文件
在 Windows 系统中，hosts文件的位置为：C:\Windows\System32\drivers\etc
添加：
47.108.118.64 newhopescm.com

3、修改nginx.conf文件
通过vim打开配置文件nginx.conf
添加配置
```conf
 ...
  # www.newhopescm.com 
    server {
        listen  80;
        server_name www.newhopescm.com;
        # docker容器 nginx读取文件目录
        root    /usr/share/nginx/html/www.newhopescm.com;

        location / {
            root    /usr/share/nginx/html/www.newhopescm.com;
            index   index.html index.htm index.php;
        }
    }
```
4、重启docker
```bash
docker restart nginx-test
```

5、访问www.newhopescm.com:8080