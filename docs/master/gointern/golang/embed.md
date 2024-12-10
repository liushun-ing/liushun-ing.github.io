# embed包

embed是在Go 1.16中新加入的包。它通过`//go:embed`指令，可以在编译阶段将静态资源文件打包进编译好的程序中，并提供访问这些文件的能力。

`//go:embed` 指令只能用在包一级的全局变量中，不能用在函数或方法级别。



## 前因

Go语言在打包二进制文件的时候默认不会包含配置文件的联同编译和打包。往往把二进制文件换个地方，就因为缺少静态文件资源而无法运行。

但是在Go1.16起，Go语言自身正式支持了将静态资源打包进二进制文件的特性。它有以下优点

- **能够将静态资源打包到二进制包中，部署过程更简单**。传统部署要么需要将静态资源与已编译程序打包在一起上传，或者使用`docker`和`dockerfile`自动化前者，这是很麻烦的。
- **确保程序的完整性**。在运行过程中损坏或丢失静态资源通常会影响程序的正常运行。
- **静态资源访问没有io操作，速度会非常快**。



## 场景

- **Go模版**：模版文件必须可用于二进制文件（模版文件需要对二进制文件可用）。对于Web服务器二进制文件或那些通过提供init命令的CLI应用程序，这是一个相当常见的用例。
- **静态web服务**：有时，静态文件（如index.html或其他HTML，JavaScript和CSS文件之类的静态文件）需要使用golang服务器二进制文件进行传输，以便用户可以运行服务器并访问这些文件。
- **数据库迁移**：另一个使用场景是通过嵌入文件被用于数据库迁移脚本。



## 基本用法

`Go embed`的使用非常简单，首先导入`embed`包，再通过`//go:embed` 文件名 将对应的文件或目录结构导入到对应的变量上。

> 特别注意：embed这个包一定要导入，如果导入不使用的话，使用 _ 导入即可。

嵌入的这个基本概念是通过在代码里添加一个特殊的注释实现的，Go会根据这个注释知道要引入哪个或哪几个文件。注释的格式是：

```go
//go:embed FILENAME(S)
```

`embed`可以嵌入的静态资源文件支持三种数据类型：字符串、字节数组、embed.FS文件类型

| 数据类型 | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| []byte   | 表示数据存储为二进制格式，如果只使用[]byte和string需要以import (_ "embed")的形式引入embed标准库 |
| string   | 表示数据被编码成utf8编码的字符串，因此不要用这个格式嵌入二进制文件比如图片，引入embed的规则同[]byte |
| embed.FS | 表示存储多个文件和目录的结构，[]byte和string只能存储单个文件 |



### 嵌入到字符串

```go
package main

import (
	_ "embed"
	"fmt"
)

//go:embed test.txt
var hello string

func main() {
	fmt.Println(hello)
}
```

当嵌入的文件名包含空格时，需要用引号将文件名括起来，如`//go:embed "hello world.txt"`

同时，需要注意，嵌入的字符串不能初始化，也就是hello不能有初始化。



### 嵌入到字节数组

```go
//go:embed test.txt
var helloByte []byte
```



### 嵌入到embed.FS

使用embed.FS类型，可以读取一个嵌入到embed.FS类型变量中的目录和文件树，这个变量是只读的，所以是线程安全的。

embed.FS结构主要有3个对外方法，如下：

```go
// Open 打开要读取的文件，并返回文件的fs.File结构.
func (f FS) Open(name string) (fs.File, error)

// ReadDir 读取并返回整个命名目录
func (f FS) ReadDir(name string) ([]fs.DirEntry, error)

// ReadFile 读取并返回name文件的内容.
func (f FS) ReadFile(name string) ([]byte, error)
```



#### 单个文件

```go
//go:embed test.txt
var fs embed.FS

func main() {
	file, err := fs.ReadFile("test.txt")
	if err != nil {
		return
	}
	fmt.Println(string(file))
}
```



#### 多个文件

```go
//go:embed files
var f embed.FS

func main() {
	dirEntries, err := f.ReadDir("files")
	if err != nil {
		return
	}
	for _, entry := range dirEntries {
		file, err := f.ReadFile(path.Join("files", entry.Name()))
		if err != nil {
			return
		}
		fmt.Println(entry.Name(), string(file))
	}
}
```

还可以嵌入多个目录

```go
//go:embed dir1
//go:embed dir2
var f embed.FS
```



#### patterns

还支持基于patterns的匹配，`patterns` 支持文件名、目录名以及 `path.Match` 所支持的路径通配符。

`path.Match` 函数签名如下：

```go
func Match(pattern, name string) (matched bool, err error) 
```

对于匹配 `path.Match` 规则如下：

**功能说明**

- `path.Match` 函数的功能是：报告参数 `name` 是否符合指定的 shell 模式（`pattern`）。
- 这个函数要求模式与整个 `name` 完全匹配，而不是仅匹配其中的一个子串。

**模式语法**

- **pattern**：由一个或多个 `term` 构成。
- **term**：可以是以下几种类型：
  - `*` 匹配任意序列的非`/`字符。
  - `?` 匹配任意单个非`/`字符。
  - `[character-range]` 定义一个字符类，必须是非空的。在字符类内部，如果以 `^` 开头（`[^character-range]`），则表示取反，否定后续的字符范围。
  - 单个字符 `c`，可以直接匹配字符 `c`（当 `c` 不是 `*`、`?`、`\`、`[` 中的一个时）。
  - `\\c` 用于转义匹配字符 `c`，`\\` 用于转义（例如 `\\`、`\*`、`\?` 等）。
- **character-range**：
  - 单个字符 `c`，直接匹配字符 `c`（当 `c` 不是 `\\`、`-`、`]` 中的一个时）。
  - `\\c` 用于转义匹配字符 `c`。
  - `lo-hi` 匹配从 `lo` 到 `hi` 之间的任意字符（包括 `lo` 和 `hi`）。



**总结**

`//go:embed patterns` 指令的 `patterns` 参数，不支持嵌入空目录，并且也不支持嵌入符号链接（`symbolic links`），即软链接。也不能匹配一些特殊符号：`" * < > ?  ' | / \ `。

`patterns` 指定为目录时，该目录下的所有文件都会被嵌入到变量中。但是以 `.` 或 `_` 开头的文件是会被忽略的。如果想要嵌入 `.` 或 `_` 开头的文件，可以让 `patterns` 以 `all:` 前缀开头，如 `//go:embed all:files`。也可以使用通配符 `*`，如 `//go:embed testdata/*`，不过 `*` 不具有递归性，子目录下的 `.` 或 `_` 开头文件不会被嵌入。

比如：

- `image` 不会嵌入 `image/.tempfile` 文件。
- `image/*` 会嵌入 `image/.tempfile` 文件。
- 以上二者都不会嵌入 `image/dir/.tempfile`。
- `all:image` 则会同时嵌入 `image/.tempfile` 和 `image/dir/.tempfile` 两个文件。

注意，使用 `//go:embed` 嵌入带有路径的文件时，目录分隔符采用正斜杠 `/`，如 `//go:embed file/hello1.txt`，即使是 Windows 系统也是如此。

`patterns` 支持使用双引号 `"` 或者反引号 `` `的方式应用到嵌入的文件名、目录名或者 `pattern` 上，这对名称中带有 `空格` 或 `特殊字符` 很有用。

此外，诸如 `.bzr`、`.hg`、`.git`、`.svn` 这几个版本控制管理目录，始终都不会被嵌入，`embed` 相关代码中会做检查。



## 应用

1、http web使用

```go
import (
   "embed"
   "net/http"
)

//go:embed static
var static embed.FS

func main() {
   http.ListenAndServe(":8080", http.FileServer(http.FS(static)))
}
```

`http.FS`这个函数，把`embed.FS`类型的`static`转换为`http.FileServer`函数可以识别的`http.FileSystem`类型。

2、HTML模版使用

```go
import (
   "embed"
   "html/template"
   "net/http"
)

//go:embed templates
var tmpl embed.FS

func main() {
   t, _ := template.ParseFS(tmpl, "templates/*.tmpl")
   http.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {
      t.ExecuteTemplate(rw,"index.tmpl",map[string]string{"title":"Golang Embed 测试"})
   })
   http.ListenAndServe(":8080",nil)
}
```

`template`包提供了`ParseFS`函数，可以直接从一个`embed.FS`中加载模板，然后用于`HTTP Web`中。

3、gin

```go
import (
   "embed"
   "github.com/gin-gonic/gin"
   "html/template"
)

//go:embed templates
var tmpl embed.FS

//go:embed static
var static embed.FS

func main() {
   r:=gin.Default()
   r.StaticFS("/",http.FS(static))
   t, _ := template.ParseFS(tmpl, "templates/*.tmpl")
   r.SetHTMLTemplate(t)
   r.GET("/", func(ctx *gin.Context) {
      ctx.HTML(200,"index.tmpl",gin.H{"title":"Golang Embed 测试"})
   })
   r.Run(":8080")
}
```

