# Nginx动静结合

如果有一个需求：

> 当访问某些页面，如果nginx服务器对应目录中有这些文件，则直接返回，没有，则代理到指定服务器

修改nginx.conf

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
            proxy_pass http://192.168.0.104:8080;
            root    /usr/share/nginx/html/www.newhopescm.com;
            index   index.html index.htm index.php;
        }
    }

```

另外，配置反向代理还要注意一些其他的配置
```conf
proxy_set_header HOST $http_host;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

proxy_http_version 1.1;
proxy_connect_timeout 60s;
proxy_read_timeout 60s;
proxy_send_timeout 60s;
proxy_buffering on;
pxory_buffer_size 8k;
proxy_buffers 8 8k;
```