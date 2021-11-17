# Nginx入门
Nginx的使用比较简单，就是几条命令。

常用到的命令如下：

```bash
nginx -s stop 快速关闭Nginx, 可能不保存相关信息，并迅速终止web服务
nginx -s quit 平稳关闭Nginx，保存相关信息，有安排的结束web服务
nginx -s reload 因改变了Nginx相关配置，需要重新加载配置而重载
nginx -s reopen 重新打开日志文件 
nginx -c filename 为Nginx指定一个配置文件 ，来代替缺省的
nginx -t 不运行，仅仅测试配置文件 。nginx将检查配置文件的语法的正确性，并尝试打开配置文件所引用到的文件。
nginx -v 显示nginx的版本。
nginx -V 显示nginx的版本，编译器版本和配置参数。
```

如果不想每次都敲命令，可以在nginx安装目录下新增一个启动批处理文件 **startup.bat**,双击即可运行。内容如下：：
```bat
@echo off
rem 如果启动前已经启动nginx并记录下pid文件，会kill指定进程
nginx.exe -s stop

rem 测试配置文件语法正确性
nginx.exe -t -c conf/nginx.conf

rem 显示版本信息
nginx.exe -v

rem 按照指定配置去启动nginx
nginx.exe -c conf/nginx.conf
```

如果运行在Linux下，写一个shell脚本，大同小异。
