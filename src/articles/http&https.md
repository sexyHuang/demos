# Http&Https
## Http

基于 **TCP/IP通信协议** 进行数据传输
属于 **应用层** 的 **面向对象的协议**  
http协议定义了 **“请求/响应”模型**

### request
```http
[请求类型] [资源路径] [协议版本(HTTP/1.1)]
Host: [服务器地址]
...more...
```
### response header 
```http
HTTP/1.1 200 OK  <!--[协议版本] [状态码]  -->
Content-Length: 3059
Server: GWS/2.0
Date: Sat, 11 Jan 2003 02:44:04 GMT
Content-Type: text/html
Cache-control: private
Set-Cookie: PREF=ID=73d4aef52e57bae9:TM=1042253044:LM=1042253044:S=SMCc_HRPCQiqy
X9j; expires=Sun, 17-Jan-2038 19:14:07 GMT; path=/; domain=.google.com
Connection: keep-alive
```

### 状态码
> 1xx 信息，收到请求，需要请求者继续操作  
  2xx 成功，操作被成功接收并处理 
  3xx 重定向，需进一步操作
  4xx 客户端错误，请求包含语法错误或无法完成请求
  5xx 服务器错误，服务器在处理请求的过程中发生错误

### 工作流程
1. 客户端和服务器建立TCP socket连接
2. 发送HTTP请求
3. 服务器接收请求并返回HTTP响应（解释请求、定位资源、写入TCP socket返回）
4. 释放TCP连接
5. 客户端解释HTML内容（检查状态、读取数据）

