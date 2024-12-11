# go.work

随着go 1.18版本的正式发布，多模块工作区也被引入（WorkSpaces），多模块工作区能够使开发者能够更容易地同时处理多个模块的工作， 如：方便进行依赖的代码调试(打断点、修改代码)、排查依赖代码 bug 。方便同时进行多个仓库/模块并行开发调试。



## 起因

本地有两个项目，分别是两个 module：example1 和 example2。

在 example1 的 bar.go 中有如下代码：

```go
package example1

func Bar() {
    println("This is package example1")
}
```

接着，在 example2 模块中 main.go 中有如下内容：

```go
package main

import (
    "github.com/test/example1"
)

func main() {
    example1.Bar()
}
```

这时候，如果运行 go mod tidy，肯定会报错，因为 example1 包根本没有提交到 github 上，找不到。

```bash
$ go mod tidy
....
fatal: repository 'https://github.com/test/example1/' not found
```

当然可以提交 example1 到 github，但每修改一次 example1，就需要提交（而且每次提交之后需要在 example2 中 go get 最新版本），否则 example2 中就没法使用上最新的。

针对这种情况，可以通过 replace 来解决，即在 example2 中的 go.mod 增加如下 replace：

```bash
module github.com/test/example2

go 1.19

require github.com/test/example1 v1.0.0

replace github.com/test/example1 => ../example1
```

当都开发完成时，需要手动删除 replace，并执行 go mod tidy 后提交，否则别人使用就报错了。

这还是挺不方便的，如果本地有多个 module，每一个都得这么处理。



## 工作区模式

针对上面的这个问题，Michael Matloob 提出了 Workspace Mode（工作区模式）。并在 Go1.18 中发布了。

*注意*：工作区不只是 go work 相关命令，Go 其他命令也会涉及工作区内容，比如 go run、go build 等。

初始化 workspace：

```bash
$ cd ~/test
$ go work init example1 example2
$ tree
.
├── example2
│   ├── go.mod
│   └── main.go
├── go.work
└── example1
    ├── bar.go
    └── go.mod
```

注意几点：

- 多个子模块应该在一个目录下（或其子目录）。比如这里的 test 目录；（这不是必须的，但更好管理，否则 go work init 需要提供正确的子模块路径）
- go work init 需要在 example1 目录执行；
- go work init 之后跟上需要本地开发的子模块目录名；

```go
go 1.23

use (
    ./example1
    ./example2
)
```

注意：实际项目中，多个模块之间可能还依赖其他模块，建议在 go.work 所在目录执行 `go work sync`。

注意，go.work 不需要提交到 Git 中，因为它只是你本地开发使用的。

当开发完成，应该先提交 example1 包到 GitHub，然后在 example2 下面执行 go get：

```bash
$ go get -u github.com/test/example1@latest
```

然后禁用 workspace（通过 GOWORK=off 禁用），再次运行 example2 模块，是否正确：

```bash
$ cd ~/test/example2
$ GOWORK=off go run main.go
```



在同时使用go.work和go.mod的`replaces`功能时，分别指定不同的代码仓库路径，go.work优先级高于go.mod中定义

```go
//go.mod 中定义替换为本地仓库 example
replace ( 
    github.com/link1st/example => ./example 
)

//go.work 中定义替换为本地仓库 example1
replace ( 
    github.com/link1st/example => ./example1 
)
```

在代码构建时，使用的是go.work指定的example1仓库代码，go.work优先级别更高



#### `go work`支持命令

- `go work init` 初始化工作区文件，用于生成go.work工作区文件

> 初始化并写入一个新的go.work到当前路径下，可以指定需要添加的代码模块
>
> eg: go work init ./hello 将本地仓库hello添加到工作区
>
> hello仓库必须是go mod依赖管理的仓库

- `go work use`添加新的模块到工作区

> eg:
>
> go work use ./example  添加一个模块到工作区
>
> go work use ./example ./example1 添加多个模块到工作区
>
> go work use -r ./example 递归./example目录到当前工作区
>
> 删除命令: go work edit -dropuse=./example 功能

- `go work sync`将工作区的构建列表同步到工作区模块，go.work 文件中会列出多个模块路径，当在这些模块的 go.mod 文件中修改了依赖版本后，运行 go work sync 会更新工作空间中其他模块的依赖信息，保证一致性。
- `go env GOWORK`查看环境变量，查看当前工作区文件路径，可以排查工作区文件是否设置正确，go.work路径找不到可以使用GOWORK指定

