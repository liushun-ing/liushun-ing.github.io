# JSON-RPC API

## 概念

为了让软件应用程序与以太坊区块链交互（通过读取区块链数据或向网络发送交易），它必须连接到以太坊节点。

为此，每种以太坊客户端均实现了 [JSON-RPC 规范](https://github.com/ethereum/execution-apis)，因而应用程序可以依赖一组统一的方法，而与具体节点或客户端实现无关。

[JSON-RPC](https://www.jsonrpc.org/specification) 是一种**无状态的、轻量级远程过程调用 (RPC) 协议**。 它定义了一些数据结构及其处理规则。 它与传输无关，因为这些概念可以在同一进程，通过接口、超文本传输协议或许多不同的消息传递环境中使用。 它使用 JSON (RFC 4627) 作为数据格式。

执行客户端规范：[网页](https://github.com/ethereum/execution-apis)

通俗解释：json-rpc 是基于 json 的跨语言远程调用协议，区块链中的 JSON-RPC API 其实就是基于 JSON-RPC 定义了一些 API 的规范，规定了一个实现需要提供哪些 API，这些 API 的名字，参数，返回值等等是什么。



## 其他应用程序接口

本文章主要处理以太坊**执行客户端**使用的 **JSON-RPC 应用程序接口**。 但是，共识客户端也有一个远程过程调用应用程序接口，允许用户直接从节点查询有关节点的信息、请求信标区块、信标状态和其他与共识相关的信息。 此应用程序接口记录在[信标应用程序接口网页](https://ethereum.github.io/beacon-APIs/#/)上。

内部应用程序接口还用于节点内的客户端间通信——也就是说，它使共识客户端和执行客户端能够交换数据。 这种内部应用程序接口称为“引擎应用程序接口”，其规范见 [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)。



## 编码约定（十六进制）

两种关键数据类型通过 JSON 传递：未格式化的字节数组和数量。 两者都使用十六进制编码传递，但对格式化有不同的要求。

### 数量

当对数量（整数、编号）进行编码时：编码为十六进制（以“0x”为前缀），最紧凑的表示方法（例外：0 应表示为“0x0”）。

以下是一些示例：

- 0x41（十进制中是 65）
- 0x400（十进制中是 1024）
- 错误：0x（后面至少有一位，0 是“0x0”）
- 错误：0x0400（不允许有前导零）
- 错误：ff（必须有前缀 0x）

### 无格式数据

当对无格式数据（字节数组、帐户地址、哈希、字节码数组）进行编码时：编码为十六进制，以“0x”为前缀，每字节两个十六进制数字。

以下是一些示例：

- 0x41（大小为 1，“A”）
- 0x004200（大小为 3，“\0B\0”）
- 0x（大小为 0，“”）
- 错误：0xf0f0f（位数必须是偶数）
- 错误：004200（必须以 0x 为前缀）



## 默认区块参数

以下方法有额外的默认区块参数：

- [eth_getBalance](https://ethereum.org/zh/developers/docs/apis/json-rpc/#eth_getbalance)
- [eth_getCode](https://ethereum.org/zh/developers/docs/apis/json-rpc/#eth_getcode)
- [eth_getTransactionCount](https://ethereum.org/zh/developers/docs/apis/json-rpc/#eth_gettransactioncount)
- [eth_getStorageAt](https://ethereum.org/zh/developers/docs/apis/json-rpc/#eth_getstorageat)
- [eth_call](https://ethereum.org/zh/developers/docs/apis/json-rpc/#eth_call)

当发出作用于以太坊状态的请求时，最后一个默认区块参数决定了区块的高度。

默认区块参数可以使用以下选项：

- `HEX String` - 整数区块号
- `String "earliest"` - 表示最早/创世区块
- `String "latest"` - 最新挖出的区块
- `String "safe"` - 最新且安全的头部区块
- `String "finalized"` - 最新的最终确定的区块
- `String "pending"` - 未决状态/交易

其他的 API 就不说明了，可以查看文档。



## 举例

下面提供了通过向以太坊节点发出 [curl](https://curl.se/) 请求来使用 JSON_RPC 应用程序接口的示例。 每个示例都包括对特定端点、其参数、返回类型的描述，以及应该如何使用它的工作示例。

Curl 请求可能会返回与内容类型相关的错误消息。 这是因为 `--data` 选项将内容类型设置为 `application/x-www-form-urlencoded`。 如果节点确实抱怨此问题，请通过在调用开始时放置 `-H "Content-Type: application/json"` 来手动设置标头。

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```


JsonRPC协议定义了一种简单的**请求**-**响应**模型，通信双方通过发送和接收JSON格式的消息进行交互。

### 请求示例

一个JsonRPC请求由以下几个部分组成：

```json
{
  "jsonrpc": "2.0",
  "method": "methodName",
  "params": [param1, param2, ...],
  "id": 1
}
```

- `jsonrpc`：指定JsonRPC版本，通常为"2.0"。
- `method`：指定要调用的远程方法名。
- `params`：包含要传递给远程方法的参数列表。
- `id`：请求的唯一标识符，用于将请求和响应进行匹配。

### 响应示例

一个JsonRPC响应由以下几个部分组成：

```json
{
  "jsonrpc": "2.0",
  "result": "resultValue",
  "error": { "code": 100, "message": "errorMessage" },
  "id": 1
}
```

- `jsonrpc`：指定JsonRPC版本，通常为"2.0"。
- `result`：包含远程方法调用的结果值。
- `error`：包含错误信息，如果请求执行过程中发生错误。
- `id`：与请求中的标识符相匹配，用于将响应与请求进行匹配。

### 成功和失败响应示例

成功的JsonRPC响应示例：

```json
{
  "jsonrpc": "2.0",
  "result": "Hello, world!",
  "id": 1
}
```

失败的JsonRPC响应示例：

```json
{
  "jsonrpc": "2.0",
  "error": { "code": -32601, "message": "Method not found" },
  "id": 1
}
```

### 参数的数据类型

JsonRPC支持以下基本数据类型作为参数和结果值：

- 字符串（String）
- 数字（Number）
- 布尔值（Boolean）
- 数组（Array）
- 对象（Object）
- 空值（Null）

当参数或者返回结果中包含**字节数组**的时候需要注意，由于JSON是一种文本格式，所以在序列化和反序列化字节数组时，会将其转换为Base64编码的字符串。这种转换会增加数据存储的大小和处理时间。

因此，对于大型字节数组，传递原始二进制数据的方式可能会更高效，而不是通过 JSON 进行编码和解码。在这种情况下，其他二进制传输协议（如gRPC或自定义的二进制协议）可能更适合处理字节数组的传递。