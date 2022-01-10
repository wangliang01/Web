# Nginx反向代理配置
1、修改配置
只要在nginx.conf中加一行代码即可实现反向代理
```conf
 ...
  # www.newhopescm.com 
    server {
        listen  80;
        server_name www.newhopescm.com;
        # docker容器 nginx读取文件目录
        root    /usr/share/nginx/html/www.newhopescm.com;

        location / {
            # 设置反向代理
            proxy_pass https://www.baidu.com;
            root    /usr/share/nginx/html/www.newhopescm.com;
            index   index.html index.htm index.php;
        }
    }
```
2、重启docker
```bash
docker restart nginx-test
```