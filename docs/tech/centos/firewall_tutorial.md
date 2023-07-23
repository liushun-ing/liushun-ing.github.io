# centos防火墙操作

### 一、防火墙的开启、关闭、禁用命令

（1）设置开机启用防火墙：`systemctl enable firewalld.service`

（2）设置开机禁用防火墙：`systemctl disable firewalld.service`

（3）启动防火墙：`systemctl start firewalld`

（4）关闭防火墙：`systemctl stop firewalld`

（5）检查防火墙状态：`systemctl status firewalld `

### 二、使用firewall-cmd配置端口

（1）查看防火墙状态：`firewall-cmd --state`

（2）重新加载配置：`firewall-cmd --reload`

（3）查看开放的端口：`firewall-cmd --list-ports`

（4）开启防火墙端口：`firewall-cmd --zone=public --add-port=8081/tcp --permanent`

　　命令含义：

　　–zone #作用域

　　–add-port=9200/tcp #添加端口，格式为：端口/通讯协议，批量开放格式为：–add-port=9200-9300/tcp

　　–permanent #永久生效，没有此参数重启后失效

　　**注意：添加端口后，必须用命令firewall-cmd --reload重新加载一遍才会生效**

（5）关闭防火墙端口：`firewall-cmd --zone=public --remove-port=8081/tcp --permanent`