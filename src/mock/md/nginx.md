### Nginx



##### 应用

- 静态网站，仅有静态资源

  注意root配置

- 负载均衡

  - 什么是负载均衡

  将请求按照一定的规则分发到不同的服务器进行执行

  - 负载均衡策略

    - 轮询(默认)--------均匀分配请求

    ```
    upstream serverName {
    	server  127.0.0.1:9100;
    	server  127.0.0.1:9200;
    }
    ```

    - 权重--------按比例分配请求

    ```
    upstream serverName {
    	server  127.0.0.1:9100  weight=3;
    	server  127.0.0.1:9200  weight=1;
    }
    ```

    - ip_hash--------通过对于客户端ip进行hash计算来指定访问一台服务器，这个可以解决会话session丢失的问题

    ```
    upstream serverName {
    	ip_hash;
    	server  127.0.0.1:9100;
    	server  127.0.0.1:9200;
    }
    ```

    - 最少连接--------web请求会被分配到连接最少的服务器上

    ```
    upstream serverName {
    	least_conn;
    	server  127.0.0.1:9100;
    	server  127.0.0.1:9200;
    }
    ```

    