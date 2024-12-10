# Go-http3实践

使用quic-go库来实现http3的服务端-客户端简单程序。



## 本机访问

### 1. 生成私钥

单独生成 RSA 私钥：

```sh
openssl genrsa -out server.key 2048
```

- server.key：包含服务端的私钥。

### 2. 生成自签名证书（带 SAN）

使用生成的私钥，创建自签名证书并将 SAN 信息写入证书中：

```sh
openssl req -x509 -new -key server.key -out server.crt -days 365 -subj "/CN=localhost" -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"
```

- server.crt：包含服务端的自签名证书，带有 SAN。

### 3. 提取公钥证书部分（供客户端使用）

复制一份服务端证书的公钥部分到客户端信任的 ca.pem：

```sh
cp server.crt ca.pem
```

- ca.pem：供客户端信任的根证书，与 server.crt 相同，但仅用于客户端。

**文件结构**

- server.key：服务端私钥，仅供服务端使用。
- server.crt：服务端证书，服务端加载它作为 TLS 证书。
- ca.pem：客户端信任的根证书，客户端加载以验证服务端证书。

**验证 SAN**

确保证书包含 SAN：

```sh
openssl x509 -in server.crt -noout -text | grep -A 1 "Subject Alternative Name"
```

![screenshot2024-11-30 17.10.56](./quicgo.assets/san.png)



### 服务端启动代码

```go
package main

import (
	"log"
	"net/http"

	"github.com/quic-go/quic-go/http3"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Received request: %s %s", r.Method, r.URL.Path)
		w.Write([]byte("Hello from HTTP/3 server with custom CA!"))
	})

	server := &http3.Server{
		Addr:    ":4433",
		Handler: mux,
	}

	log.Println("Starting HTTP/3 server on :4433")
	if err := server.ListenAndServeTLS("server.crt", "server.key"); err != nil {
		log.Fatal(err)
	}
}
```



### 客户端代码

```go
package main

import (
	"crypto/tls"
	"crypto/x509"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/quic-go/quic-go/http3"
)

func main() {
	caCert, err := os.ReadFile("ca.pem")
	if err != nil {
		log.Fatalf("Error reading CA certificate: %v", err)
	}

	caCertPool := x509.NewCertPool()
	if !caCertPool.AppendCertsFromPEM(caCert) {
		log.Fatalf("Failed to add CA certificate to pool")
	}

	tlsConfig := &tls.Config{
		RootCAs: caCertPool,
	}

	client := &http.Client{
		Transport: &http3.Transport{
			TLSClientConfig: tlsConfig,
		},
	}

	resp, err := client.Get("https://localhost:4433/")
	if err != nil {
		log.Fatalf("Error making request: %v", err)
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	log.Printf("Response: %s", string(body))
}

```



### 查看

![screenshot2024-11-30 17.11.26](./quicgo.assets/server.png)

![screenshot2024-11-30 17.11.41](./quicgo.assets/client.png)



## 内网环境

在内网环境下，两台服务之间通过 HTTP/3 通信，可以采用类似的流程，但需要注意以下几点：

- 确保服务端证书中包含目标服务的 **内网 IP 地址** 或 **主机名**，这样客户端可以正确验证服务端证书。
- 两台服务之间的网络连接应允许指定端口的访问（如 4433）。

其他的操作和上面一致，只是在创建自签名证书时有所不同：

**创建自签名证书（添加内网 IP 和主机名到 SAN）**

假设服务的内网地址为 192.168.1.10，主机名为 my-internal-server：

```sh
openssl req -x509 -new -key server.key -out server.crt -days 365 \
-subj "/CN=my-internal-server" \
-addext "subjectAltName=DNS:my-internal-server,IP:192.168.1.10"
```

然后客户端访问的时候需要设置serverName

```go
// 配置 TLS 客户端
tlsConfig := &tls.Config{
  RootCAs:    caCertPool,
  ServerName: "my-internal-server", // 必须与证书中的 CN 或 SAN 字段匹配
}
```

当然也可以不设置主机名：

```sh
openssl req -x509 -new -key server.key -out server.crt -days 365 \
-subj "/CN=192.168.1.10" \
-addext "subjectAltName=IP:192.168.1.10"
```

这样就不用指定主机名了。

这里决定的是代码中你是使用什么连接服务器，如果是ip去连接`https://192.168.1.10:4433/`，就不用指定ServerName。因为这个主机名是个虚拟主机名，他需要根据DNS去解析的。



## 其他知识

### 文件后缀

证书文件的名称通常以 .pem、.crt、.cer 或 .key 结尾，具体使用哪种扩展名主要是基于约定，而非格式上的强制要求。.pem 是一种常见的格式，它可以包含证书、密钥或其他加密材料。

**1. 什么是 .pem**

`.pem` 是一种 **容器格式**，可以存储证书、密钥和其他加密材料。

文件内容通常是 Base64 编码的，格式如下：

```pem
-----BEGIN CERTIFICATE-----

<证书内容>

-----END CERTIFICATE-----

-----BEGIN PRIVATE KEY-----

<私钥内容>

-----END PRIVATE KEY-----
```

.pem 文件可以包含：

- **证书**：服务器证书、客户端证书或根证书。
- **私钥**：与证书配套的私钥。
- **证书链**：多个证书拼接在一个 .pem 文件中。

**2. 其他常见的扩展名**

**扩展名**	**用途**				**内容**

.crt	通常用于证书		仅包含单个证书（可能是 Base64 编码，也可能是二进制 DER 格式）。

.cer	类似于 .crt		    仅包含证书，通常是 DER 格式，也可以是 Base64（与 .crt 基本无区别，扩展名取决于系统偏好）。

.key	通常用于存储私钥	包含私钥，可能是 PEM 或其他格式（如 PKCS#8）。

.p12 / .pfx	包含证书和私钥的二进制文件	PKCS#12 格式，包含证书、私钥和链信息，用于导入和导出证书。

.pem	可以包含证书、私钥或两者的组合	以 Base64 编码格式存储加密材料。

**4. 如何选择扩展名**

如果文件只包含证书：.crt 或 .pem 都可以。.pem 常用于与 OpenSSL 或 QUIC 库结合使用。

如果文件包含私钥：推荐使用 .pem，因为它能同时存储证书和私钥。

如果需要传输私钥和证书的组合：使用 .p12 / .pfx（适合 PKCS#12 格式）。

**5. 格式转换**

可以用 OpenSSL 进行各种格式之间的转换：

**将 .crt 转为 .pem**

```sh
openssl x509 -in server.crt -out server.pem -outform PEM
```

**提取私钥到 .pem**

```sh
openssl rsa -in server.key -out private.pem
```

**转换 .pem 到 .pfx**

```sh
openssl pkcs12 -export -in server.pem -out server.pfx -inkey server.key
```