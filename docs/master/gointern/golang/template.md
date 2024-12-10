# Template

在平时经常会使用`fmt.Sprintf`函数来进行字符串格式化，但它只适用于处理小字符串的情况，而且需要使用格式化动词来指定类型，无法做到参数命名，不支持复杂情况下的处理，而这就是模板引擎所需要解决的问题，比如在直接挂到后端的静态`HTML`页面就需要用到模板引擎。社区里面有很多优秀的第三方模板引擎库，比如`pongo2` ,`sprig`，`jet`，不过本文要讲述的主角是go内置的模板引擎库`text/template`.



## 快速开始

```go
package main

import (
	"fmt"
	"html/template"
	"os"
)

func main() {
	tmpl := `this is first template: {{.message}}`

	parse, err := template.New("text-template").Parse(tmpl)
	if err != nil {
		fmt.Println(err)
		return
	}

	data := map[string]string{
		"message": "hello world",
	}
	err = parse.Execute(os.Stdout, data)
	if err != nil {
		fmt.Println(err)
		return
	}
}
```

在案例代码中，`tmpl`是一个模板字符串，字符串中的`{{ .message }}`是模板引擎的模板参数。首先通过`*Template.Parse`方法解析模板字符串，解析成功后再通过`*Template.Execute`方法将`data`数据应用于模板中，最后输出到传入的`Writer`中也就是`os.Stdout`。

在以后模板引擎的使用中，基本上都是这三步：

1. 获取模板
2. 解析模板，
3. 将数据应用到模板中



## 模版语法

### 参数

go通过两对花括号`{{ }}`，来在模板中表示这是一个模板参数，通过`.`来表示根对象，根对象就是传入的`data`。就像是访问一个类型的成员变量一样，通过`.`符号衔接变量名就可以在模板中访问对应的值，例如

```go
{{ .data }}
```

前提与之同名的成员变量存在，否则就会报错。对于传入的`data`，一般是结构体或者`map`，也可以是基本类型，比如数字字符串，这时`.`所代表的根对象就是其自身。在花括号内，不一定非得去访问根对象来获取值，也可以是基本类型的字面量，例如

```go
{{ 1 }}
{{ 3.14 }}
{{ "jack" }}
```

不管什么类型，最终都会通过`fmt.Sprintf("%s", val)`来获取其字符串表现形式，看下面的例子。

```go
func main() {
	out := os.Stdout

	tmpl := "data-> {{ . }}\n"

	datas := []any{
		"hello world!",
		6379,
		3.1415926,
		[]any{1, "2*2", 3.6},
		map[string]any{"data": "hello world!"},
		struct {
			Data string
		}{Data: "hello world!"},
	}

	for _, data := range datas {
		err := ExecTmpl(out, tmpl, data)
		if err != nil {
			panic(err)
		}
	}
}

func ExecTmpl(writer io.Writer, tmpl string, data any) error {
	parsedTmpl, err := template.New("template").Parse(tmpl)
	if err != nil {
		return err
	}
	return parsedTmpl.Execute(writer, data)
}
```

输出如下

```text
data-> hello world!          
data-> 6379                  
data-> 3.1415926             
data-> [1 2*2 3.6]           
data-> map[data:hello world!]
data-> {hello world!}   
```

可以看到其输出形式跟直接使用`fmt.Sprintf`一致。对于结构体和map，可以通过字段名来访问其值，如下所示

```go
tmpl := "data-> {{ .Data }}\n"

datas := []any{
  map[string]any{"Data": "hello world!"},
  struct {
    Data string
  }{Data: "hello world!"},
}
```

输出如下

```text
data-> hello world!
data-> hello world!
```

对于切片和`map`，虽然并没有提供特定语法来访问某一个索引的值，但可以通过函数调用的方式来实现，如下所示

```go
tmpl := "data-> {{ index . 1 }}\n"
datas := []any{
  []any{"first", "second"},
  map[int]any{1: "first"},
}
```

输出

```text
data-> second
data-> first 
```

如果是多维切片，可以通过如下方式来访问对应下标的值，等同于`s[i][j][k]`

```text
{{ index . i j k }}
```

对于嵌套的结构体或map，可以使用`.k1.k2.k3`这种方式访问，例如

```text
{{ .person.father.name }}
```

在使用模板参数时，可以在参数前后加上`-`符号来消除参数前后的空白，看个例子

```go
tmpl := `{{ .x }} {{- .op -}} {{ .y }}`
// 10>2
```

需要注意的是，在花括号中，`-`符号与参数必须相隔一个空格，也就说必须是`{{- . -}}`这种格式。



### 注释

模板语法支持注释，注释并不会在最终的模板中生成，其语法如下

```go
{{/* this is a comment */}}
```

注释符号`/*`和`*/`必须与花括号相邻，它们之间不能有其它字符，空白也不能有，否则将无法正常解析。只有一种情况例外，那就是消除空白符的时候

```go
{{- /* this is a comment */ -}}
```



### 变量

在模板中也可以声明变量，通过`$`符号来表示这是一个变量，并通过`:= `来进行赋值，就跟go代码一样，例子如下。

```go
{{ $name := .Name }}
{{ $val := index . 1 }}
{{ $val := index .dict key }}
// 整型赋值
{{ $numer := 1 }}
// 浮点数赋值
{{ $float := 1.234}}
// 字符串赋值
{{ $name := "jack" }}
```

在后续使用时，通过`$`衔接变量名来访问该变量的值，比如

```go
tmpl := `{{ $name := .name }} {{- $name }}`
```

变量必须先声明才能使用，否则将会提示`undefined variable`，并且也要在作用域内才能使用。



### 函数

模板自身的语法其实并不多，大多数功能都是通过函数来实现的，函数调用的格式为函数名后衔接参数列表，以空格为分隔符，如下所示

```go
{{ funcname arg1 arg2 arg3 ... }}
```

例如之前用到的`index`函数

```go
{{ index .s 1 }}
```

用于比较是否相等的函数`eq`函数

```go
{{ eq 1 2 }}
```

每一个`*Template`都有一个`FuncsMap`，用于记录函数的映射

```go
type FuncMap map[string]any
```

在创建模板时从`text/template.builtins`获取默认的函数映射表，下面是内置的所有函数

| 函数名     | 作用                   | 示例                    |
| ---------- | ---------------------- | ----------------------- |
| `and`      | 与运算                 | `{{ and true false }}`  |
| `or`       | 或运算                 | `{{ or true false }}`   |
| `not`      | 取反运算               | `{{ not true }}`        |
| `eq`       | 是否相等               | `{{ eq 1 2 }}`          |
| `ne`       | 是否不相等             | `{{ ne 1 2 }}`          |
| `lt`       | 小于                   | `{{ lt 1 2 }}`          |
| `le`       | 小于等于               | `{{ le 1 2 }}`          |
| `gt`       | 大于                   | `{{ gt 1 2 }}`          |
| `ge`       | 大于等于               | `{{ ge 1 2 }}`          |
| `len`      | 返回长度               | `{{ len .slice }}`      |
| `index`    | 获取目标指定索引的元素 | `{{ index . 0 }}`       |
| `slice`    | 切片，等价于s[1:2:3]   | `{{ slice . 1 2 3 }}`   |
| `html`     | HTML转义               | `{{ html .name }}`      |
| `js`       | js转义                 | `{{ js .name }}`        |
| `print`    | fmt.Sprint             | `{{ print . }}`         |
| `printf`   | fmt.Sprintf            | `{{ printf "%s" .}}`    |
| `println`  | fmt.Sprintln           | `{{ println . }}`       |
| `urlquery` | url query转义          | `{{ urlquery .query }}` |

除了这些之外，还有一个比较特殊的内置函数`call`，它是用于直接调用通过在`Execute`时期传入的`data`中的函数，例如下面的模板

```text
{{ call .string 1024 }}
```

传入的数据如下

```go
map[string]any{
    "string": func(val any) string { return fmt.Sprintf("%v: 2048", val) },
}
```

那么在模板中就会生成`1024: 2048`，但是如果传的参数是一个合法的方法名，他会直接将她按作调用方法解析，从而报错。

这是自定义函数的途径之一，不过通常建议使用`*Template.Funcs`方法来添加自定义函数，因为后者可以作用全局，不需要绑定到根对象中。

```go
func (t *Template) Funcs(funcMap FuncMap) *Template
```

自定义函数的返回值一般有两个，第一个是需要用到的返回值，第二个是`error`。例如有如下自定义函数

```go
t := template.New("text-template")
t.Funcs(
  template.FuncMap{
    "add": func(val any) (string, error) { return fmt.Sprintf("%v + 1", val), nil },
  },
)
```

然后在模板中直接使用

```go
{{ add 1024 }} # 1024 + 1
```



### 管道

这个管道与`chan`是两个东西，官方文档里面称其为`pipeline`，任何能够产生数据的操作都称其为`pipeline`。下面的模板操作都属于管道操作

```text
{{ 1 }}
{{ eq 1 2 }}
{{ $name }}
{{ .name }}
```

熟悉linux的应该都知道管道运算符`|`，就是将前一个执行的输出当作后一个执行的输入，模板中也支持这样的写法。管道操作在模板中经常出现，例如

```text
{{ $name := 1 }}{{ $name | print | printf "%s+1=?" }} # 1+1=?
```

在`with`，`if`，`range`中也会频繁用到。



### with

通过`with`语句可以控制变量和根对象的作用域，格式如下

```text
{{ with pipeline }} 
	text 
{{ end }}
```

`with`会检查管道操作返回的值，如果值为空的话，中间的`text`模板就不会生成。如果想要处理空的情况，可以使用`with else`，格式如下

```text
{{ with pipeline }} 
	text1 
{{ else }} 
	text2 
{{ end }}
```

如果管道操作返回的值为空，那么就会执行`else`这块的逻辑。

在`with`语句中声明的变量，其作用域仅限于`with`语句内

```go
{{ $name := "mike" }}
{{ with $name := "jack"  }} 
	{{- $name -}}
{{ end }}
{{- $name -}}
// jackmike
```

通过`with`语句还可以在作用域内改写根对象，如下

```go
{{ with .name }}
	name: {{- .second }}-{{ .first -}}
{{ end }}
map[string]any{
    "name": map[string]any{
        "first":  "jack",
        "second": "bob",
    },
}
```

这样在`with`语句内部，根对象`.`已经变成了`.name`。



### 条件

条件语句的格式如下所示

```go
{{ if pipeline }}
	text1
{{ else if pipeline }}
	text2
{{ else }}
	text3
{{ end }}
```

例子

```go
{{ if eq .lang "en" }}
	{{- .content.en -}}
{{ else if eq .lang "zh" }}
	{{- .content.zh -}}
{{ else }}
	{{- .content.fallback -}}
{{ end }}
```



### 迭代

迭代语句的格式如下，`range`所支持的`pipeline`必须是数组，切片，`map`，以及`channel`。结合`else`使用（可选），当长度为0时，就会执行`else`块的内容。

```go
{{ range pipeline }}
	loop body
{{ else }}
	fallback
{{ end }}
```

除此之外，还支持`break`，`continue`这类操作，比如

```go
{{ range pipeline }}
	{{ if pipeline }}
		{{ break }}
	{{ end }}
	{{ if pipeline }}
		{{ continue }}
	{{ end }}
	loop body
{{ end }}
```

迭代的例子。

```go
{{ range $index, $val := . }}
	{{- if eq $index 0 }}
		{{- continue -}}
	{{ end -}}
	{{- $index}}: {{ $val }} 
{{ end }}
```



### 嵌套

一个模板中可以定义有多个模板，比如

```go
{{ define "t1" }} t1 {{ end }}
{{ define "t2" }} t2 {{ end }}
```

这些定义的模板在并不会生成在最终的模板中，除非在加载时指定了名称或者通过`template`语句手动指定。

```go
func (t *Template) ExecuteTemplate(wr io.Writer, name string, data any) error
```

例子

```go
func main() {
	out := os.Stdout

	tmpl :=
		`{{ define "t1" }}
    {{- with .t1 }}
    	{{- .data -}}
    {{ end -}}
{{ end }}
{{ define "t2" }}
    {{- with .t2 }}
    	{{- .data -}}
    {{ end}}
{{ end -}}`

	datas := []any{
		map[string]any{
			"t1": map[string]any{"data": "template body 1"},
			"t2": map[string]any{"data": "template body 2"},
		},
	}

	name := "t1"

	for _, data := range datas {
		err := ExecTmpl(out, tmpl, name, data)
		if err != nil {
			panic(err)
		}
	}
}

func ExecTmpl(writer io.Writer, tmpl string, name string, data any) error {
	t := template.New("template")
	parsedTmpl, err := t.Parse(tmpl)
	if err != nil {
		return err
	}
	return parsedTmpl.ExecuteTemplate(writer, name, data)
}
```

输出`template body 1`，这样2就不会加载

或者也可以手动指定模板

```go
{{ define "t1" }}
    {{- with .t1 }}
    	{{- .data -}}
    {{ end -}}
{{ end }}
{{ define "t2" }}
    {{- with .t2 }}
    	{{- .data -}}
    {{ end}}
{{ end -}}
{{ template "t2" .}}
```

那么在解析时是否指定模板名称，t2都会加载



### 关联

子模板只是在一个模板内部声明多个命名的模板，关联是将外部的多个命名的`*Template`关联起来。然后通过`template`语句来引用指定的模板。

```go
{{ tempalte "templateName" pipeline }}
```

`pipeline`可以根据自己的需求来指定关联模板的根对象，或者也可以直接传入当前模板的根对象。看下面的一段代码例子

```go
func main() {
	tmpl1 := `name: {{ .name }}`

	tmpl2 := `age: {{ .age }}`

	tmpl3 := `Person Info
{{ template "t1" . }}
{{ template "t2" . }}`

	t1, err := template.New("t1").Parse(tmpl1)
	if err != nil {
		panic(err)
	}

	t2, err := template.New("t2").Parse(tmpl2)
	if err != nil {
		panic(err)
	}

	t3, err := template.New("t3").Parse(tmpl3)
	if err != nil {
		panic(err)
	}

	if err := associate(t3, t1, t2); err != nil {
		panic(err)
	}

	err = t3.Execute(os.Stdout, map[string]any{
		"name": "jack",
		"age":  18,
	})
	if err != nil {
		panic(err)
	}
}

func associate(t *template.Template, ts ...*template.Template) error {
	for _, tt := range ts {
		_, err := t.AddParseTree(tt.Name(), tt.Tree)
		if err != nil {
			return err
		}
	}
	return nil
}
```

在上述的地面中，t3关联了t1，和t2，使用`*Template.AddParseTree`方法进行关联。最终的模板生成结果为

```text
Person Info
name: jack
age: 18  
```



### 插槽

通过`block`语句，可以实现类似vue插槽的效果，其目的是为了复用某一个模板而用的。在t1模板中定义插槽

```go
Basic Person Info
name: {{ .name }}
age: {{ .age }}
address: {{ .address }}
{{ block "slot" . }} default content body {{ end }}
```

`block`语句可以指定插槽中的默认内容，在后续其它模板使用插槽时，会覆盖默认的内容。在t2模板中引用t1模板，并使用`define`定义嵌入的内容

```go
{{ template "person" . }}
{{ define "slot" }}
school: {{ .school }}
{{ end }}
```

将两个模板关联以后，传入如下的数据

```go
map[string]any{
    "name":    "jack",
    "age":     18,
    "address": "usa",
    "company": "google",
    "school":  "mit",
}
```

最终输出的结果为

```text
Basic Person Info
name: jack  
age: 18     
address: usa
            
school: mit 
```



## 模版文件

在模板语法的案例中，都是使用的字符串字面量来作为模板，在实际的使用情况中大多数都是将模板放在文件中。

```go
func ParseFS(fsys fs.FS, patterns ...string) (*Template, error) 
```

比如`template.ParseFs`就是从指定的文件系统中加载匹配`pattern`的模板。下面的例子以`embed.FS`作为文件系统，准备三个文件

```txt
# person.tpl
Basic Person Info
name: {{ .name }}
age: {{ .age }}
address: {{ .address }}
{{ block "slot" . }} {{ end }}

# student.txt
{{ template "person.tpl" . }}
{{ define "slot" }}
school: {{ .school }}
{{ end }}

# employee.tpl
{{ template "person.tpl" . }}
{{ define "slot" }}
company: {{ .company }}
{{ end }}
```

代码如下

```go
import (
	"embed"
	"os"
	"text/template"
)

//go:embed *.tpl
var fs embed.FS

func main() {
	data := map[string]any{
		"name":    "jack",
		"age":     18,
		"address": "usa",
		"company": "google",
		"school":  "mit",
	}

	t1, err := template.ParseFS(fs, "person.tpl", "student.tpl")
	if err != nil {
		panic(err)
	}

	t1.Execute(os.Stdout, data)
	
	t2, err := template.ParseFS(fs, "person.tpl", "employee.tpl")
	if err != nil {
		panic(err)
	}
	t2.Execute(os.Stdout, data)
}
```

输出为

```text
Basic Person Info
name: jack       
age: 18          
address: usa     
                 
school: mit      
Basic Person Info
name: jack       
age: 18          
address: usa     
                 
company: google  
```

这是一个很简单的模板文件使用案例，`person.tpl`作为插槽文件，其它两个复用其内容并嵌入自定义的新内容。也可以使用下面两个函数

```go
func ParseGlob(pattern string) (*Template, error)

func ParseFiles(filenames ...string) (*Template, error) 
```

`ParseGlob`基于通配符匹配，`ParseFiles`基于文件名，它们都是使用的本地文件系统。



