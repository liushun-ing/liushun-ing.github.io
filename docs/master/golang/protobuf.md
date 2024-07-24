# Protobuf3

Protocol Buffer (简称Protobuf) 是Google出品的性能优异、跨语言、跨平台的序列化库。

序列化(serialization、marshalling)的过程是指将数据结构或者对象的状态转换成可以存储(比如文件、内存)或者传输的格式(比如网络)。反向操作就是反序列化(deserialization、unmarshalling)的过程。



## 定义一个消息类型

简单例子

```protobuf
syntax = "proto3";

message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
}
```

- 文件的第一行指定了正在使用proto3语法：如果没有指定这个，编译器会使用proto2。这个指定语法行必须是**文件的非空非注释的第一个行**。
- SearchRequest消息格式有3个字段，在消息中承载的数据分别对应于每一个字段。其中每个字段都有一个名字和一种类型。

> 1 指定字段类型

在上面的例子中，所有字段都是标量类型：两个整型（page_number和result_per_page），一个string类型（query）。当然，也可以为字段指定其他的合成类型，包括枚举（enumerations）或其他消息类型。

> 2 分配标识号

**在消息定义中，每个字段都有唯一的一个数字标识符**。这些标识符是用来在消息的二进制格式中识别各个字段的，一旦开始使用就不能够再改变。注：[1,15]之内的标识号在编码的时候会占用一个字节。[16,2047]之内的标识号则占用2个字节。所以应该为那些频繁出现的消息元素保留 [1,15]之内的标识号。切记：要为将来有可能添加的、频繁出现的标识号预留一些标识号。

最小的标识号可以从1开始，最大到2^29 - 1, or 536,870,911。不可以使用其中的[19000－19999]（ (从FieldDescriptor::kFirstReservedNumber 到 FieldDescriptor::kLastReservedNumber)）的标识号， Protobuf协议实现中对这些进行了预留。如果非要在.proto文件中使用这些预留标识号，编译时就会报警。同样也不能使用早期保留的标识号。

> 3 指定字段规则

所指定的消息字段修饰符必须是如下之一：

- singular：一个格式良好的消息应该有0个或者1个这种字段（但是不能超过1个）。
- repeated：在一个格式良好的消息中，这种字段可以重复任意多次（包括0次），对于 go 就是生成切片。重复的值的顺序会被保留。

在proto3中，repeated的标量域默认情况下使用packed。

> 4 添加更多消息类型

在一个.proto文件中可以定义多个消息类型。如果想定义与SearchResponse消息类型对应的回复消息格式的话，可以将它添加到相同的.proto文件中，如：

```protobuf
message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
}

message SearchResponse {
 ...
}
```

> 5 添加注释

向.proto文件添加注释，可以使用C/C++/java风格的双斜杠（//） 语法格式，如：

```protobuf
message SearchRequest {
  string query = 1;
  int32 page_number = 2;  // Which page number do we want?
  int32 result_per_page = 3;  // Number of results to return per page.
}
```

> 6 保留标识符（Reserved）

如果通过删除或者注释所有域，以后的用户可以重用标识号。可以通过指定保留标识符来确保别人不使用某些标识号，protocol buffer的编译器会警告未来尝试使用这些域标识符的用户

```protobuf
message Foo {
  reserved 2, 15, 9 to 11;
  reserved "foo", "bar";
}
```

注：不要在同一行reserved声明中同时声明域名字和标识号

> 从.proto文件生成了什么？

当用protocol buffer编译器来运行.proto文件时，编译器将生成所选择语言的代码，这些代码可以操作在.proto文件中定义的消息类型，包括获取、设置字段值，将消息序列化到一个输出流中，以及从一个输入流中解析消息。

- 对Java来说，编译器为每一个消息类型生成了一个.java文件，以及一个特殊的Builder类（该类是用来创建消息类接口的）。
- 对go来说，编译器会位每个消息类型生成了一个.pd.go文件。



## 标量数据类型

一个标量消息字段可以含有一个如下的类型——该表格展示了定义于.proto文件中的类型，以及与之对应的、在自动生成的访问类中定义的类型：

| .proto Type | Notes                                                        | C++ Type | Java Type  | Go Type |
| ----------- | ------------------------------------------------------------ | -------- | ---------- | ------- |
| double      |                                                              | double   | double     | float64 |
| float       |                                                              | float    | float      | float32 |
| int32       | 使用变长编码，对于负值的效率很低，如果你的域有可能有负值，请使用sint64替代 | int32    | int        | int32   |
| uint32      | 使用变长编码                                                 | uint32   | int        | uint32  |
| uint64      | 使用变长编码                                                 | uint64   | long       | uint64  |
| sint32      | 使用变长编码，这些编码在负值时比int32高效的多                | int32    | int        | int32   |
| sint64      | 使用变长编码，有符号的整型值。编码时比通常的int64高效。      | int64    | long       | int64   |
| fixed32     | 总是4个字节，如果数值总是比总是比228大的话，这个类型会比uint32高效。 | uint32   | int        | uint32  |
| fixed64     | 总是8个字节，如果数值总是比总是比256大的话，这个类型会比uint64高效。 | uint64   | long       | uint64  |
| sfixed32    | 总是4个字节                                                  | int32    | int        | int32   |
| sfixed64    | 总是8个字节                                                  | int64    | long       | int64   |
| bool        |                                                              | bool     | boolean    | bool    |
| string      | 一个字符串必须是UTF-8编码或者7-bit ASCII编码的文本。         | string   | String     | string  |
| bytes       | 可能包含任意顺序的字节数据。                                 | string   | ByteString | []byte  |



## 默认值

当一个消息被解析的时候，如果被编码的信息不包含一个特定的singular元素，被解析的对象锁对应的域被设置为一个默认值，对于不同类型指定如下：

- 对于strings，默认是一个空string

- 对于bytes，默认是一个空的bytes

- 对于bools，默认是false

- 对于数值类型，默认是0

- 对于枚举，默认是第一个定义的枚举值，必须为0;

- 对于消息类型（message），域没有被设置，确切的消息是根据语言确定的，详见[generated code guide](https://developers.google.com/protocol-buffers/docs/reference/overview?hl=zh-cn)。

对于可重复域的默认值是空（通常情况下是对应语言中空列表）。

注：对于标量消息域，一旦消息被解析，就无法判断域释放被设置为默认值（例如，例如boolean值是否被设置为false）还是根本没有被设置。你应该在定义你的消息类型时非常注意。例如，比如你不应该定义boolean的默认值false作为任何行为的触发方式。也应该注意如果一个标量消息域被设置为标志位，这个值不应该被序列化传输。



## 枚举

当需要定义一个消息类型的时候，可能想为一个字段指定某“预定义值序列”中的一个值。例如，假设要为每一个SearchRequest消息添加一个 corpus字段，而corpus的值可能是UNIVERSAL，WEB，IMAGES，LOCAL，NEWS，PRODUCTS或VIDEO中的一个。 其实可以很容易地实现这一点：通过向消息定义中添加一个枚举（enum）并且为每个可能的值定义一个常量就可以了。

在下面的例子中，在消息格式中添加了一个叫做Corpus的枚举类型——它含有所有可能的值 ——以及一个类型为Corpus的字段：

```protobuf
message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
  enum Corpus {
    UNIVERSAL = 0;
    WEB = 1;
    IMAGES = 2;
    LOCAL = 3;
    NEWS = 4;
    PRODUCTS = 5;
    VIDEO = 6;
  }
  Corpus corpus = 4;
}
```

这是生成的 go 代码：

```go
type SearchRequest_Corpus int32

const (
	SearchRequest_UNIVERSAL SearchRequest_Corpus = 0
	SearchRequest_WEB       SearchRequest_Corpus = 1
	SearchRequest_IMAGES    SearchRequest_Corpus = 2
	SearchRequest_LOCAL     SearchRequest_Corpus = 3
	SearchRequest_NEWS      SearchRequest_Corpus = 4
	SearchRequest_PRODUCTS  SearchRequest_Corpus = 5
	SearchRequest_VIDEO     SearchRequest_Corpus = 6
)

type SearchRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Query         string	`protobuf:"bytes,1,opt,name=query,proto3" json:"query,omitempty"`
	PageNumber    int32		`protobuf:"varint,2,opt,name=page_number,json=pageNumber,proto3" json:"page_number,omitempty"`
	ResultPerPage int32		`protobuf:"varint,3,opt,name=result_per_page,json=resultPerPage,proto3" json:"result_per_page,omitempty"`
	Corpus        SearchRequest_Corpus		`protobuf:"varint,4,opt,name=corpus,proto3,enum=SearchRequest_Corpus" json:"corpus,omitempty"`
}
```

Corpus枚举的第一个常量映射为0：每个枚举类型必须将其第一个类型映射为0，这是因为：

- 必须有一个0值，可以用这个0值作为默认值。
- 这个零值必须为第一个元素，为了兼容proto2语义，枚举类的第一个值总是默认值。

可以通过将不同的枚举常量指定位相同的值。如果这样做需要将allow_alias设定位true，否则编译器会在别名的地方产生一个错误信息。

```protobuf
enum EnumAllowingAlias {
  option allow_alias = true;
  UNKNOWN = 0;
  STARTED = 1;
  RUNNING = 1;
}
enum EnumNotAllowingAlias {
  UNKNOWN = 0;
  STARTED = 1;
  // RUNNING = 1;  // Uncommenting this line will cause a compile error inside Google and a warning message outside.
}
```

枚举常量必须在32位整型值的范围内。因为enum值是使用可变编码方式的，对负数不够高效，因此不推荐在enum中使用负数。如上例所示，可以在 一个消息定义的内部或外部定义枚举——这些枚举可以在.proto文件中的任何消息定义里重用。当然也可以在一个消息中声明一个枚举类型，而在另一个不同 的消息中使用它——采用MessageType.EnumType的语法格式。

当对一个使用了枚举的.proto文件运行protocol buffer编译器的时候，生成的代码中将有一个对应的enum（对Java或C++来说），或者一个特殊的EnumDescriptor类（对 Python来说），它被用来在运行时生成的类中创建一系列的整型值符号常量（symbolic constants）。

在反序列化的过程中，无法识别的枚举值会被保存在消息中，虽然这种表示方式需要依据所使用语言而定。在那些支持开放枚举类型超出指定范围之外的语言中（例如C++和Go），未识别的值会被表示成所支持的整型。在使用封闭枚举类型的语言中（Java），使用枚举中的一个类型来表示未识别的值，并且可以使用所支持整型来访问。在其他情况下，如果解析的消息被序列号，未识别的值将保持原样。



## 使用其他消息类型

你可以将其他消息类型用作字段类型。例如，假设在每一个SearchResponse消息中包含Result消息，此时可以在相同的.proto文件中定义一个Result消息类型，然后在SearchResponse消息中指定一个Result类型的字段，如：

```protobuf
message SearchResponse {
  repeated Result results = 1;
}

message Result {
  string url = 1;
  string title = 2;
  repeated string snippets = 3;
}
```



## 导入定义

可以通过导入（importing）其他.proto文件中的定义来使用它们。

```protobuf
import "myproject/other_protos.proto";
```

**默认情况下你只能使用直接导入的.proto文件中的定义，不具备依赖的传递引入**，这种情况就需要使用 public 关键字

**公开导入（import public）**

- import public 不仅在当前文件中引用另一个 .proto 文件，还将被导入文件的定义向其他导入当前文件的 .proto 文件公开。
- 这意味着如果有一个文件 A.proto 使用 import public 引入 B.proto，并且文件 C.proto 引入了 A.proto，那么 C.proto 也可以直接访问 B.proto 中的定义，而无需显式地导入 B.proto。

```protobuf
// B.proto
message MessageB {
    string name = 1;
}

// A.proto
import public "B.proto";
message MessageA {
    MessageB message_b = 1;
}

// C.proto
import "A.proto"; // No need to import "B.proto"
message MessageC {
    MessageA message_a = 1;
    MessageB message_b = 2; // Can use MessageB directly
}
```

- **简化依赖管理**：通过 import public，可以简化多层次的依赖关系。只需在一个公共文件中导入依赖，然后其他文件可以通过导入这个公共文件间接获得这些依赖。
- **提高可读性**：使得文件间的关系更加清晰，可以避免在每个文件中重复导入同样的依赖。



## 嵌套类型

可以在其他消息类型中定义、使用消息类型，在下面的例子中，Result消息就定义在SearchResponse消息内，如：

```protobuf
message SearchResponse {
  message Result {
    string url = 1;
    string title = 2;
    repeated string snippets = 3;
  }
  repeated Result results = 1;
}
```

如果想在它的父消息类型的外部重用这个消息类型，需要以Parent.Type的形式使用它，如：

```protobuf
message SomeOtherMessage {
  SearchResponse.Result result = 1;
}
```

当然，也可以将消息嵌套任意多层，如：

```protobuf
message Outer {       // Level 0
  message MiddleAA {  // Level 1
    message Inner {   // Level 2
      int64 ival = 1;
      bool  booly = 2;
    }
  }
  message MiddleBB {  // Level 1
    message Inner {   // Level 2
      int32 ival = 1;
      bool  booly = 2;
    }
  }
}
```



## 映射（Maps）

如果你希望创建一个关联映射，protocol buffer提供了一种快捷的语法：

```protobuf
map<key_type, value_type> map_field = N;
```

其中key_type可以是任意Integer或者string类型（所以，除了floating和bytes的任意标量类型都是可以的）value_type可以是任意类型。

例如，如果希望创建一个project的映射，每个Project使用一个string作为key，可以像下面这样定义：

```protobuf
map<string, Project> projects = 3;
```

- Map的字段可以是repeated。
- 序列化后的顺序和map迭代器的顺序是不确定的
- 当为.proto文件产生生成文本格式的时候，map会按照 key 的顺序排序，数值化的key会按照数值排序。
- 从序列化中解析或者融合时，如果有重复的key则后一个key不会被使用，当从文本格式中解析map时，如果存在重复的key。



## 包（Packages）

可以为.proto文件新增一个可选的package声明符，用来防止不同的消息类型有命名冲突。如：

package foo.bar; message Open { ... }

在其他的消息格式定义中可以使用包名+消息名的方式来定义域的类型，如：

```protobuf
message Foo {
  ...
  required foo.bar.Open open = 1;
  ...
}
```

- 对于Go，包可以被用做Go包名称，除非你显式的提供一个option go_package在你的.proto文件中。



## 定义服务

如果想要将消息类型用在RPC(远程方法调用)系统中，可以在.proto文件中定义一个RPC服务接口，protocol buffer编译器将会根据所选择的不同语言生成服务接口代码及存根。如，想要定义一个RPC服务并具有一个方法，该方法能够接收 SearchRequest并返回一个SearchResponse，此时可以在.proto文件中进行如下定义：

```protobuf
service SearchService {
  rpc Search (SearchRequest) returns (SearchResponse);
}
```

最直观的使用protocol buffer的RPC系统是gRPC，一个由谷歌开发的语言和平台中的开源的PRC系统，gRPC在使用protocl buffer时非常有效，如果使用特殊的protocol buffer插件可以直接从.proto文件中产生相关的RPC代码。



## JSON 映射

Proto3 支持JSON的编码规范，使他更容易在不同系统之间共享数据，在下表中逐个描述类型。

如果JSON编码的数据丢失或者其本身就是null，这个数据会在解析成protocol buffer的时候被表示成默认值。如果一个字段在protocol buffer中表示为默认值，在转化成JSON的时候编码的时候忽略掉以节省空间。

| proto3                 | JSON          | JSON示例                                | 注意                                                         |
| ---------------------- | ------------- | --------------------------------------- | ------------------------------------------------------------ |
| message                | object        | {“fBar”: v, “g”: null, …}               | 产生JSON对象，消息字段名可以被映射成lowerCamelCase形式，并且成为JSON对象键，null被接受并成为对应字段的默认值 |
| enum                   | string        | “FOO_BAR”                               | 枚举值的名字在proto文件中被指定                              |
| map                    | object        | {“k”: v, …}                             | 所有的键都被转换成string                                     |
| repeated V             | array         | [v, …]                                  | null被视为空列表                                             |
| bool                   | true, false   | true, false                             |                                                              |
| string                 | string        | “Hello World!”                          |                                                              |
| bytes                  | base64 string | “YWJjMTIzIT8kKiYoKSctPUB+”              |                                                              |
| int32, fixed32, uint32 | number        | 1, -10, 0                               | JSON值会是一个十进制数，数值型或者string类型都会接受         |
| int64, fixed64, uint64 | string        | “1”, “-10”                              | JSON值会是一个十进制数，数值型或者string类型都会接受         |
| float, double          | number        | 1.1, -10.0, 0, “NaN”, “Infinity”        | JSON值会是一个数字或者一个指定的字符串如”NaN”,”infinity”或者”-Infinity”，数值型或者字符串都是可接受的，指数符号也可以接受 |
| Any                    | object        | {“@type”: “url”, “f”: v, … }            | 如果一个Any保留一个特上述的JSON映射，则它会转换成一个如下形式：{"@type": xxx, "value": yyy}否则，该值会被转换成一个JSON对象，@type字段会被插入所指定的确定的值 |
| Timestamp              | string        | “1972-01-01T10:00:20.021Z”              | 使用RFC 339，其中生成的输出将始终是Z-归一化啊的，并且使用0，3，6或者9位小数 |
| Duration               | string        | “1.000340012s”, “1s”                    | 生成的输出总是0，3，6或者9位小数，具体依赖于所需要的精度，接受所有可以转换为纳秒级的精度 |
| Struct                 | object        | { … }                                   | 任意的JSON对象，见struct.proto                               |
| Wrapper types          | various types | 2, “2”, “foo”, true, “true”, null, 0, … | 包装器在JSON中的表示方式类似于基本类型，但是允许nulll，并且在转换的过程中保留null |
| FieldMask              | string        | “f.fooBar,h”                            | 见fieldmask.proto                                            |
| ListValue              | array         | [foo, bar, …]                           |                                                              |
| Value                  | value         |                                         | 任意JSON值                                                   |
| NullValue              | null          |                                         | JSON null                                                    |



## 生成你的类

可以通过定义好的.proto文件来生成Java,Python,C++, Ruby, JavaNano, Objective-C,或者C# 代码，需要基于.proto文件运行protocol buffer编译器protoc。

通过如下方式调用protocol编译器：

```
protoc --proto_path=IMPORT_PATH --go_out=DST_DIR path/to/file.proto
```

- IMPORT_PATH声明了一个.proto文件所在的解析import具体目录。如果忽略该值，则使用当前目录。如果有多个目录则可以多次调用--proto_path，它们将会顺序的被访问并执行导入。-I=IMPORT_PATH是--proto_path的简化形式。
- 当然也可以提供一个或多个输出路径： 
  - --go_out 在目标目录 DST_DIR 中产生Go代码，可以在GO代码生成参考中查看更多。

生成 go 文件的时候，需要指定 `go_package`

```protobuf
syntax = "proto3";

package example; // 这个是在 proto 文件中使用的包名

// 这里必须指定包路径，且必须包含一个. 和/
// The import path must contain at least one period ('.') or forward slash ('/') character.
option go_package="./a;example"; // 这个是生成的代码中的包名,在 a 文件夹下，生成一个 go 文件，包名是 example

message SearchRequest {
  string query = 1;
  repeated int32 page_number = 2;
  int32 result_per_page = 3;
}
```



