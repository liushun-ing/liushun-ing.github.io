# bash基础

Bash 是 Unix 系统和 Linux 系统的一种 Shell（命令行环境），是目前绝大多数 Linux 发行版的默认 Shell。



## 简介

### Shell 的含义

学习 Bash，首先需要理解 Shell 是什么。Shell 这个单词的原意是“外壳”，跟 kernel（内核）相对应，比喻内核外面的一层，即用户跟内核交互的对话界面。

首先，Shell 是一个程序，提供一个与用户对话的环境。这个环境只有一个命令提示符，让用户从键盘输入命令，所以又称为命令行环境（command line interface，简写为 CLI）。Shell 接收到用户输入的命令，将命令送入操作系统执行，并将结果返回给用户。

其次，Shell 是一个命令解释器，解释用户输入的命令。它支持变量、条件判断、循环操作等语法，所以用户可以用 Shell 命令写出各种小程序，又称为脚本（script）。这些脚本都通过 Shell 的解释执行，而不通过编译。

最后，Shell 是一个工具箱，提供了各种小工具，供用户方便地使用操作系统的功能。

查看版本

```shell
➜  ~ zsh --version
zsh 5.9 (x86_64-apple-darwin23.0)
```



### shell种类

Shell 有很多种，只要能给用户提供命令行环境的程序，都可以看作是 Shell。

历史上，主要的 Shell 有下面这些。

- Bourne Shell（sh）
- Bourne Again shell（bash）
- C Shell（csh）
- TENEX C Shell（tcsh）
- Korn shell（ksh）
- Z Shell（zsh）
- Friendly Interactive Shell（fish）

Bash 是目前最常用的 Shell。

下面的命令可以查看当前设备的默认 Shell。

```shell
➜  ~ echo $SHELL                      
/bin/zsh
```

当前正在使用的 Shell 不一定是默认 Shell。

```shell
➜  ~ ps 
  PID TTY           TIME CMD
12280 ttys000    0:00.80 /bin/zsh --login -i
51817 ttys001    0:00.15 -zsh
12351 ttys002    0:00.61 /bin/zsh --login -i
12411 ttys003    0:00.66 /bin/zsh --login -i
```

下面的命令可以查看当前的 mac 系统安装的所有 Shell。

```shell
➜  ~ cat /etc/shells
# List of acceptable shells for chpass(1).
# Ftpd will not allow users to connect who are not using
# one of these shells.

/bin/bash
/bin/csh
/bin/dash
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

使用`chsh`命令，可以改变系统的默认 Shell。举例来说，要将默认 Shell 从 Bash 改成 Fish，首先要找出 Fish 可执行文件的位置。

```shell
➜  ~ which bash
/bin/bash
```

然后，使用`chsh`命令切换默认 Shell。

```shell
$ chsh -s /bin/bash
```

上面命令会将当前的默认 Shell 改成 bash。



### 命令行环境

如果是不带有图形环境的 Linux 系统（比如专用于服务器的系统），启动后就直接是命令行环境。

不过，现在大部分的 Linux 发行版，尤其是针对普通用户的发行版，都是图形环境。用户登录系统后，自动进入图形环境，需要自己启动终端模拟器，才能进入命令行环境。

所谓“终端模拟器”（terminal emulator）就是一个模拟命令行窗口的程序，让用户在一个窗口中使用命令行环境，并且提供各种附加功能，比如调整颜色、字体大小、行距等等。

不同 Linux 发行版（准确地说是不同的桌面环境）带有的终端程序是不一样的，比如 KDE 桌面环境的终端程序是 konsole，Gnome 桌面环境的终端程序是 gnome-terminal，用户也可以安装第三方的终端程序。所有终端程序，尽管名字不同，基本功能都是一样的，就是让用户可以进入命令行环境，使用 Shell。



### 进入和退出

进入命令行环境以后，一般就已经打开 Bash 了。如果你的 Shell 不是 Bash，可以输入`bash`命令启动 Bash。

退出 Bash 环境，可以使用`exit`命令，也可以同时按下`Ctrl + d`。

```shell
➜  ~ bash
The default interactive shell is now zsh.
To update your account to use zsh, please run `chsh -s /bin/zsh`.
For more details, please visit https://support.apple.com/kb/HT208050.
bash-3.2$ pwd
/Users/liushun
bash-3.2$ exit
exit
```



## 基本语法

### echo 命令

`echo`命令的作用是在屏幕输出一行文本，可以将该命令的参数原样输出。

如果想要输出的是多行文本，即包括换行符。这时需要把多行文本放在引号里面。

```sh
$ echo "<HTML>
    <HEAD>
          <TITLE>Page Title</TITLE>
    </HEAD>
    <BODY>
          Page body.
    </BODY>
</HTML>"
```

`-n`参数

默认情况下，`echo`输出的文本末尾会有一个回车符。`-n`参数可以取消末尾的回车符，使得下一个提示符紧跟在输出内容的后面。

`-e`参数

`-e`参数会解释引号（双引号和单引号）里面的特殊字符（比如换行符`\n`）。如果不使用`-e`参数，即默认情况下，引号会让特殊字符变成普通字符，`echo`不解释它们，原样输出。

### 命令格式

命令行环境中，主要通过使用 Shell 命令，进行各种操作。Shell 命令基本都是下面的格式。

```shell
$ command [ arg1 ... [ argN ]]
```

上面代码中，`command`是具体的命令或者一个可执行文件，`arg1 ... argN`是传递给命令的参数，它们是可选的。

有些参数是命令的配置项，这些配置项一般都以一个连词线开头，比如`-l`。同一个配置项往往有长和短两种形式，比如`-l`是短形式，`--list`是长形式，它们的作用完全相同。短形式便于手动输入，长形式一般用在脚本之中，可读性更好，利于解释自身的含义。

Bash 单个命令一般都是一行，用户按下回车键，就开始执行。有些命令比较长，写成多行会有利于阅读和编辑，这时可以在每一行的结尾加上反斜杠，Bash 就会将下一行跟当前行放在一起解释。

```shell
$ echo foo bar
# 等同于
$ echo foo \
bar
```

### 空格

Bash 使用空格（或 Tab 键）区分不同的参数。

```shell
$ command foo bar
```

上面命令中，`foo`和`bar`之间有一个空格，所以 Bash 认为它们是两个参数。

如果参数之间有多个空格，Bash 会自动忽略多余的空格。

### 分号

分号（`;`）是命令的结束符，使得一行可以放置多个命令，上一个命令执行结束后，再执行第二个命令。

```shell
$ clear; ls
```

注意，使用分号时，第二个命令总是接着第一个命令执行，不管第一个命令执行成功或失败。

### 命令的组合符`&&`和`||`

除了分号，Bash 还提供两个命令组合符`&&`和`||`，允许更好地控制多个命令之间的继发关系。

```shell
$ Command1 && Command2
```

上面命令的意思是，只有`Command1`命令运行成功，则继续运行`Command2`命令。

```shell
$ Command1 || Command2
```

上面命令的意思是，只有`Command1`命令运行失败，则继续运行`Command2`命令。

### type 命令

Bash 本身内置了很多命令，同时也可以执行外部程序。怎么知道一个命令是内置命令，还是外部程序呢？

`type`命令用来判断命令的来源。

```sh
➜  ~ type echo                 
echo is a shell builtin
➜  ~ type ls  
ls is an alias for ls -G
➜  ~ type ls -G
```

上面代码中，`type`命令告诉我们，`echo`是内部命令。命令类型：别名（alias），关键词（keyword），函数（function），内置命令（builtin）和文件（file）

`type`命令本身也是内置命令。

```sh
➜  ~ type type 
type is a shell builtin
```

如果要查看一个命令的所有定义，可以使用`type`命令的`-a`参数。

```sh
➜  ~ type -a echo
echo is a shell builtin
echo is /bin/echo
➜  ~ type -a ls  
ls is an alias for ls -G
ls is /bin/ls
```

上面代码表示，`echo`命令即是内置命令，也有对应的外部程序。



## 模式扩展

Shell 接收到用户输入的命令以后，会根据空格将用户的输入，拆分成一个个词元（token）。然后，Shell 会扩展词元里面的特殊字符，扩展完成后才会调用相应的命令。

这种特殊字符的扩展，称为模式扩展（globbing）。其中有些用到通配符，又称为通配符扩展（wildcard expansion）。Bash 一共提供八种扩展。

- 波浪线扩展
- `?` 字符扩展
- `*` 字符扩展
- 方括号扩展
- 大括号扩展
- 变量扩展
- 子命令扩展
- 算术扩展

Bash 是先进行扩展，再执行命令。因此，扩展的结果是由 Bash 负责的，与所要执行的命令无关。命令本身并不存在参数扩展，收到什么参数就原样执行。

`globbing`这个词，来自于早期的 Unix 系统有一个`/etc/glob`文件，保存扩展的模板。后来 Bash 内置了这个功能，但是这个名字就保留了下来。模式扩展与正则表达式的关系是，模式扩展早于正则表达式出现，可以看作是原始的正则表达式。它的功能没有正则那么强大灵活，但是优点是简单和方便。

Bash 允许用户关闭扩展。

```sh
$ set -o noglob
# 或者
$ set -f
```

下面的命令可以重新打开扩展。

```sh
$ set +o noglob
# 或者
$ set +f
```

### 波浪线扩展

波浪线`~`会自动扩展成当前用户的主目录。

```sh
➜  ~ echo ~
/Users/liushun
```

`~/dir`表示扩展成主目录的某个子目录，`dir`是主目录里面的一个子目录名。

```sh
➜  ~ echo ~/go 
/Users/liushun/go
```

`~user`表示扩展成用户`user`的主目录。

```sh
➜  ~ echo ~root
/var/root
```

上面例子中，Bash 会根据波浪号后面的用户名，返回该用户的主目录。如果`~user`的`user`是不存在的用户名，则波浪号扩展不起作用。

`~+`会扩展成当前所在的目录，等同于`pwd`命令。

```sh
➜  ~ echo ~+/go
/Users/liushun/go
```



### `?` 字符扩展

`?`字符代表文件路径里面的任意单个字符，不包括空字符。比如，`Data???`匹配所有`Data`后面跟着三个字符的文件名。如果匹配多个字符，就需要多个`?`连用。

`?` 字符扩展属于文件名扩展，只有文件确实存在的前提下，才会发生扩展。如果文件不存在，扩展就不会发生。

```
➜  ~ echo hell~.go
hell~.go
```

扩展没发生，原样输出。



### `*` 字符扩展

`*`字符代表文件路径里面的任意数量的字符，包括零个字符。

注意，`*`不会匹配隐藏文件（以`.`开头的文件）。

```
➜  ~ echo .*      
.CFUserTextEncoding .DS_Store .TranslationPlugin .Trash .bash_history .bash_profile .cache .config .cups .dlv .docker .erlang.cookie .gitconfig .goctl .gradle .ipython .jetbrains.vmoptions.sh .jzero .lesshst .m2 .matplotlib .minio .mysql_history .npm .npmrc .oh-my-zsh .profile .rediscli_history .ssh .viminfo .vscode .zcompdump-liushun-5.9 .zcompdump-liushun-5.9.zwc .zprofile .zprofile.pysave .zsh_history .zsh_sessions .zshrc .zshrc.pre-oh-my-zsh
➜  ~ echo *   
Applications Desktop Documents Downloads Library Movies Music Pictures Postman Public ScreenPal default.etcd dump.rdb go logs nacos
```

**`*`字符扩展也属于文件名扩展，只有文件确实存在的前提下才会扩展**。如果文件不存在，就会原样输出。

`*`只匹配当前目录，不会匹配子目录。文本文件在子目录，必须写成`*/*.xxx`。有几层子目录，就必须写几层星号。

Bash 4.0 引入了一个参数`globstar`，当该参数打开时，允许`**`匹配零个或多个子目录。因此，`**/*.txt`可以匹配顶层的文本文件和任意深度子目录的文本文件。



### 方括号扩展

方括号扩展的形式是`[...]`，只有**文件确实存在的前提下才会扩展**。如果文件不存在，就会原样输出。括号之中的任意一个字符。比如，`[aeiou]`可以匹配五个元音字母中的任意一个。

方括号扩展属于文件名匹配，即扩展后的结果必须符合现有的文件路径。如果不存在匹配，就会保持原样，不进行扩展。

```sh
➜  ~ echo [ab].txt
zsh: no matches found: [ab].txt
```

方括号扩展变体：`[^...]`。它们表示匹配不在方括号里面的字符。比如，`[^abc]`表示匹配除了`a`、`b`、`c`以外的字符。

```sh
➜  ~ ls [^ab].txt
zsh: no matches found: [^ab].txt
```



### [start-end] 扩展

方括号扩展有一个简写形式`[start-end]`，表示匹配一个连续的范围。比如，`[a-c]`等同于`[abc]`，`[0-9]`匹配`[0123456789]`。

下面是一些常用简写的例子。

- `[a-z]`：所有小写字母。
- `[a-zA-Z]`：所有小写字母与大写字母。
- `[a-zA-Z0-9]`：所有小写字母、大写字母与数字。
- `[abc]*`：所有以`a`、`b`、`c`字符之一开头的文件名。
- `program.[co]`：文件`program.c`与文件`program.o`。
- `BACKUP.[0-9][0-9][0-9]`：所有以`BACKUP.`开头，后面是三个数字的文件名。

这种简写形式有一个否定形式`[^start-end]`，表示匹配不属于这个范围的字符。



### 大括号扩展

大括号扩展`{...}`表示分别扩展成大括号里面的所有值，各个值之间使用逗号分隔。比如，`{1,2,3}`扩展成`1 2 3`。

```sh
➜  ~ echo {1,2,4}
1 2 4
```

**注意，大括号扩展不是文件名扩展**。它会扩展成所有给定的值，而不管是否有对应的文件存在。

```
➜  ~ ls [123].txt
zsh: no matches found: [123].txt
➜  ~ ls {1,2,3}.txt
ls: 1.txt: No such file or directory
ls: 2.txt: No such file or directory
ls: 3.txt: No such file or directory
```

上面例子中，即使不存在对应的文件，`{1,2,3}`依然扩展成三个文件名，导致`ls`命令报了三个错误。

另一个需要注意的地方是，大括号内部的逗号前后不能有空格。否则，大括号扩展会失效，会被认为是参数。

逗号前面可以没有值，表示扩展的第一项为空。

```sh
$ cp a.log{,.bak} # 等同于
$ cp a.log a.log.bak
```

大括号可以嵌套。

```sh
➜  ~ echo {j{p,pe}g,png}jpg
jpgjpg jpegjpg pngjpg
```

大括号可以用于多字符的模式，方括号不行（只能匹配单字符）。

```sh
$ echo {cat,dog}
cat dog
```

**由于大括号扩展`{...}`不是文件名扩展，所以它总是会扩展的**。这与方括号扩展`[...]`完全不同，如果匹配的文件不存在，方括号就不会扩展。



### {start..end} 扩展

大括号扩展有一个简写形式`{start..end}`，表示扩展成一个连续序列。比如，`{a..z}`可以扩展成26个小写英文字母。

```sh
➜  ~ echo {a..c}
a b c
```

这种简写形式支持逆序。

```sh
➜  ~ echo {5..1}
5 4 3 2 1
```

注意，如果遇到无法理解的简写，大括号模式就会原样输出，不会扩展。

```sh
➜  ~ echo {a1..3c}
{a1..3c}
```

这种简写形式可以嵌套使用，形成复杂的扩展。

```sh
➜  ~ echo .{mp{3..4},m4{a,b,p,v}}
.mp3 .mp4 .m4a .m4b .m4p .m4v
```

这个写法的另一个常见用途，是直接用于`for`循环。

```sh
➜  ~ for i in {1..4}
do
  echo $i
done
1
2
3
4
```

如果整数前面有前导`0`，扩展输出的每一项都有前导`0`。

```sh
➜  ~ echo {01..5}
01 02 03 04 05
```

这种简写形式还可以使用第二个双点号（`start..end..step`），用来指定扩展的步长。

```sh
➜  ~ echo {0..8..2}
0 2 4 6 8
```

多个简写形式连用，会有循环处理的效果。

```sh
➜  ~ echo {a..c}{1..3}
a1 a2 a3 b1 b2 b3 c1 c2 c3
```



### 变量扩展

Bash 将美元符号`$`开头的词元视为变量，将其扩展成变量值

```sh
➜  ~ echo $SHELL
/bin/zsh
```

变量名除了放在美元符号后面，也可以放在`${}`里面。

```sh
➜  ~ echo ${SHELL}
/bin/zsh
```



### 子命令扩展

`$(...)`可以扩展成另一个命令的运行结果，该命令的所有输出都会作为返回值。

```sh
➜  ~ echo $(date)
2024年10月13日 星期日 17时17分07秒 CST
```

上面例子中，`$(date)`返回`date`命令的运行结果。

还有另一种较老的语法，子命令放在反引号之中，也可以扩展成命令的运行结果。

```sh
➜  ~ echo `date`
2024年10月13日 星期日 17时17分24秒 CST
```

`$(...)`可以嵌套，比如`$(ls $(pwd))`。

```sh
➜  ~ echo $(ls $(pwd))  
Applications Desktop Documents Downloads Library Movies Music Pictures Postman Public ScreenPal default.etcd dump.rdb go logs nacos
```



### 算术扩展

`$((...))`可以扩展成整数运算的结果

```sh
➜  ~ echo $((2 + 2))
4
```



### 字符类

`[[:class:]]`表示一个字符类，扩展成某一类特定字符之中的一个。常用的字符类如下。

- `[[:alnum:]]`：匹配任意英文字母与数字
- `[[:alpha:]]`：匹配任意英文字母
- `[[:blank:]]`：空格和 Tab 键。
- `[[:cntrl:]]`：ASCII 码 0-31 的不可打印字符。
- `[[:digit:]]`：匹配任意数字 0-9。
- `[[:graph:]]`：A-Z、a-z、0-9 和标点符号。
- `[[:lower:]]`：匹配任意小写字母 a-z。
- `[[:print:]]`：ASCII 码 32-127 的可打印字符。
- `[[:punct:]]`：标点符号（除了 A-Z、a-z、0-9 的可打印字符）。
- `[[:space:]]`：空格、Tab、LF（10）、VT（11）、FF（12）、CR（13）。
- `[[:upper:]]`：匹配任意大写字母 A-Z。
- `[[:xdigit:]]`：16进制字符（A-F、a-f、0-9）。

请看下面的例子。

```sh
➜  ~ echo [[:upper:]]*
Applications Desktop Documents Downloads Library Movies Music Pictures Postman Public ScreenPal
```

上面命令输出所有大写字母开头的文件名。

字符类的第一个方括号后面，可以加上`^`，表示否定。比如，`[^[:digit:]]`匹配所有非数字。

```sh
➜  ~ echo [^[:digit:]]*
Applications Desktop Documents Downloads Library Movies Music Pictures Postman Public ScreenPal default.etcd dump.rdb go logs nacos
```

字符类也属于文件名扩展，如果没有匹配的文件名，字符类就会原样输出.



## 引号和转义

Bash 只有一种数据类型，就是字符串。不管用户输入什么数据，Bash 都视为字符串。因此，字符串相关的引号和转义，对 Bash 来说就非常重要。

### 转义

某些字符在 Bash 里面有特殊含义（比如`$`、`&`、`*`）。

```sh
➜  ~ echo $date

➜  ~ echo \$date
$date
```

上面例子中，输出`$date`不会有任何结果，因为`$`是一个特殊字符。

如果想要原样输出这些特殊字符，就必须在它们前面加上反斜杠，使其变成普通字符。这就叫做“转义”（escape）。

反斜杠除了用于转义，还可以表示一些不可打印的字符。

- `\a`：响铃
- `\b`：退格
- `\n`：换行
- `\r`：回车
- `\t`：制表符

如果想要在命令行使用这些不可打印的字符，可以把它们放在引号里面，然后使用`echo`命令的`-e`参数。

```sh
➜  ~ echo a\tb
atb
➜  ~ echo a\\tb
a	b
➜  ~ echo -e "a\tb"
a	b
```

由于反斜杠可以对换行符转义，使得 Bash 认为换行符是一个普通字符，从而可以将一行命令写成多行。

```sh
$ mv \
/path/to/foo \
/path/to/bar
# 等同于
$ mv /path/to/foo /path/to/bar
```

**上面例子中，如果一条命令过长，就可以在行尾使用反斜杠，将其改写成多行。这是常见的多行命令的写法。**



### 单引号

Bash 允许字符串放在单引号或双引号之中，加以引用。

单引号用于保留字符的字面含义，各种特殊字符在单引号里面，都会变为普通字符，比如星号（`*`）、美元符号（`$`）、反斜杠（`\`）等。

```sh
➜  ~ echo '$((2+2))'
$((2+2))
```

单引号使得 Bash 扩展、变量引用、算术运算和子命令，都失效了。如果不使用单引号，它们都会被 Bash 自动扩展。

由于反斜杠在单引号里面变成了普通字符，所以如果单引号之中，还要使用单引号，不能使用转义，需要在外层的单引号前面加上一个美元符号（`$`），然后再对里层的单引号转义。

不过，更合理的方法是改在双引号之中使用单引号。

```sh
➜  ~ echo $'it\'s'
it's
➜  ~ echo "it's"
it's
```



### 双引号

双引号比单引号宽松，可以保留大部分特殊字符的本来含义，但是三个字符除外：美元符号（`$`）、反引号（`` `）和反斜杠（`\`）。也就是说，这三个字符在双引号之中，会被 Bash 自动扩展。

```sh
$ echo "*"
*
```

上面例子中，通配符`*`放在双引号之中，就变成了普通字符，会原样输出。这一点需要特别留意，双引号里面不会进行文件名扩展。

```sh
➜  ~ echo "$SHELL"
/bin/zsh
➜  ~ echo "`date`"
2024年10月13日 星期日 17时32分18秒 CST
```

上面例子中，美元符号和反引号在双引号中，都保持特殊含义。美元符号用来引用变量，反引号则是执行子命令。

```sh
➜  ~ echo "I'd say: \"hello! \""
I'd say: "hello! "
➜  ~ echo "I'd say: \"hello!\"" 
zsh: event not found: \
# 注意感叹号不能乱用
```

上面例子中，反斜杠在双引号之中保持特殊含义，用来转义。所以，可以使用反斜杠，在双引号之中插入双引号，或者插入反斜杠本身。

由于双引号将换行符解释为普通字符，所以可以利用双引号，在命令行输入多行文本。

```sh
➜  ~ echo "hello
world"
hello
world
```

上面命令中，Bash 正常情况下会将换行符解释为命令结束，但是换行符在双引号之中就是普通字符，所以可以输入多行。`echo`命令会将换行符原样输出，显示的时候正常解释为换行。

双引号的另一个常见的使用场合是，文件名包含空格。这时就必须使用双引号，将文件名放在里面。

```sh
$ ls "two words.txt"
```

上面命令中，`two words.txt`是一个包含空格的文件名，否则就会被 Bash 当作两个文件。双引号会原样保存多余的空格。

双引号还有一个作用，就是保存原始命令的输出格式。

```sh
➜  ~ echo $(cal)
十月 2024 日 一 二 三 四 五 六 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
➜  ~ echo "$(cal)"

      十月 2024         
日 一 二 三 四 五 六  
       1  2  3  4  5  
 6  7  8  9 10 11 12  
13 14 15 16 17 18 19  
20 21 22 23 24 25 26  
27 28 29 30 31   
```

上面例子中，如果`$(cal)`不放在双引号之中，`echo`就会将所有结果以单行输出，丢弃了所有原始的格式。



### Here 文档

Here 文档（here document）是一种输入多行字符串的方法，它的格式分成开始标记（`<< token`）和结束标记（`token`）。开始标记是两个小于号 + Here 文档的名称，名称可以随意取，后面必须是一个换行符；结束标记是单独一行顶格写的 Here 文档名称，如果不是顶格，结束标记不起作用。两者之间就是多行字符串的内容。

Here 文档内部会发生变量替换和通配符扩展，但是双引号和单引号都失去语法作用，变成了普通字符。

```sh
➜  ~ foo='hello'    
➜  ~ cat << _e_     
heredoc> $foo         
heredoc> "$foo"       
heredoc> '$foo'
heredoc> _e_
hello
"hello"
'hello'
```

如果不希望发生变量替换和通配符扩展，可以把 Here 文档的开始标记放在单引号之中。

```sh
➜  ~ cat << '_e_'
$foo
"$foo"
'$foo'
_e_
$foo
"$foo"
'$foo'
```

Here 文档的本质是重定向，它将字符串重定向输出给某个命令，相当于包含了`echo`命令。Here 文档相当于`echo`命令的重定向。

```sh
$ command << token  
string
token # 等同于
$ echo string | command
```

所以，Here 字符串只适合那些可以接受标准输入作为参数的命令，对于其他命令无效，比如`echo`命令就不能用 Here 文档作为参数。

```sh
$ echo << _example_
hello
_example_
➜  ~ echo echo 1  
echo 1
```

上面例子不会有任何输出，因为 Here 文档对于`echo`命令无效。可以看到对于echo来说后面跟的全都是算作字符串

此外，Here 文档也不能作为变量的值，只能用于命令的参数。

> **变体**

Here 文档还有一个变体，叫做 **Here 字符串（Here string**），使用三个小于号（`<<<`）表示。它的作用是将字符串通过标准输入，传递给命令。

有些命令直接接受给定的参数，与通过标准输入接受参数，结果是不一样的。所以才有了这个语法，使得将字符串通过标准输入传递给命令更方便，比如`cat`命令接受标准输入传入的字符串。

```sh
$ cat <<< 'hi there'# 等同于
$ hi there
$ echo 'hi there' | cat
➜  ~ cat 'hi there'
cat: hi there: No such file or directory
```

上面的第一种语法使用了 Here 字符串，要比第二种语法看上去语义更好，也更简洁。如果直接将字符串放在命令后面，会被当作文件名。



## Bash变量

Bash 变量分成环境变量和自定义变量两类。

环境变量是 Bash 环境自带的变量，进入 Shell 时已经定义好了，可以直接使用。它们通常是系统定义好的，也可以由用户从父 Shell 传入子 Shell。`env`命令或`printenv`命令，可以显示所有环境变量。

很多环境变量很少发生变化，而且是只读的，可以视为常量。由于它们的变量名全部都是大写，所以传统上，如果用户要自己定义一个常量，也会使用全部大写的变量名。

注意，Bash 变量名区分大小写，`HOME`和`home`是两个不同的变量。

查看单个环境变量的值，可以使用`printenv`命令或`echo`命令。

```sh
$ printenv PATH
$ echo $PATH
```

注意，`printenv`命令后面的变量名，不用加前缀`$`。

自定义变量是用户在当前 Shell 里面自己定义的变量，必须先定义后使用，而且仅在当前 Shell 可用。一旦退出当前 Shell，该变量就不存在了。

`set`命令可以显示所有变量（包括环境变量和自定义变量），以及所有的 Bash 函数。



### 创建变量

用户创建变量的时候，变量名必须遵守下面的规则。

- 字母、数字和下划线字符组成。
- 第一个字符必须是一个字母或一个下划线，不能是数字。
- 不允许出现空格和标点符号。

变量声明的语法如下。`variable=value`，等号左边是变量名，右边是变量。注意，等号两边不能有空格。如果变量的值包含空格，则必须将值放在引号中。Bash 没有数据类型的概念，所有的变量值都是字符串。

下面是一些自定义变量的例子。

```sh
a=z                     # 变量 a 赋值为字符串 z
b="a string"            # 变量值包含空格，就必须放在引号里面
c="a string and $b"     # 变量值可以引用其他变量的值
d="\t\ta string\n"      # 变量值可以使用转义字符
e=$(ls -l foo.txt)      # 变量值可以是命令的执行结果
f=$((5 * 7))            # 变量值可以是数学运算的结果
```

变量可以重复赋值，后面的赋值会覆盖前面的赋值。



### 读变量

读取变量的时候，直接在变量名前加上`$`就可以了。

```sh
$ foo=bar
$ echo $foo
$ bar
```

每当 Shell 看到以`$`开头的单词时，就会尝试读取这个变量名对应的值。如果变量不存在，Bash 不会报错，而会输出空字符。

读取变量的时候，变量名也可以使用花括号`{}`包围，比如`$a`也可以写成`${a}`。这种写法可以用于变量名与其他字符连用的情况。



### 删除变量

`unset`命令用来删除一个变量。

```sh
unset NAME
```

这个命令不是很有用。因为不存在的 Bash 变量一律等于空字符串，所以即使`unset`命令删除了变量，还是可以读取这个变量，值为空字符串。所以，删除一个变量，也可以将这个变量设成空字符串。

```sh
$ foo=''
$ foo=
```

上面两种写法，都是删除了变量`foo`。由于不存在的值默认为空字符串，所以后一种写法可以在等号右边不写任何值。



### 输出变量，export 命令

用户创建的变量仅可用于当前 Shell，子 Shell 默认读取不到父 Shell 定义的变量。为了把变量传递给子 Shell，需要使用`export`命令。这样输出的变量，对于子 Shell 来说就是环境变量。

`export`命令用来向子 Shell 输出变量。

```sh
NAME=foo
export NAME
```

上面命令输出了变量`NAME`。变量的赋值和输出也可以在一个步骤中完成。

```sh
export NAME=value
```

上面命令执行后，当前 Shell 及随后新建的子 Shell，都可以读取变量`$NAME`。子 Shell 如果修改继承的变量，不会影响父 Shell。

```sh
➜  ~ export foo=bar
➜  ~ bash

The default interactive shell is now zsh.
To update your account to use zsh, please run `chsh -s /bin/zsh`.
For more details, please visit https://support.apple.com/kb/HT208050.
bash-3.2$ echo $foo
bar
bash-3.2$ foo=baz
bash-3.2$ echo $foo
baz
bash-3.2$ exit
exit
➜  ~ echo $foo     
bar
```



### 特殊变量

Bash 提供一些特殊变量。这些变量的值由 Shell 提供，用户不能进行赋值。

（1）`$?`

`$?`为上一个命令的退出码，用来判断上一个命令是否执行成功。返回值是`0`，表示上一个命令执行成功；如果是非零，上一个命令执行失败。

```sh
$ ls doesnotexist
ls: doesnotexist: No such file or directory
$ echo $?
1
```

上面例子中，`ls`命令查看一个不存在的文件，导致报错。`$?`为1，表示上一个命令执行失败。

（2）`$$`

`$$`为当前 Shell 的进程 ID。

```sh
$ echo $$
10662
```

这个特殊变量可以用来命名临时文件。

```sh
LOGFILE=/tmp/output_log.$$
```

（3）`$_`

`$_`为上一个命令的最后一个参数。

```sh
$ grep dictionary /usr/share/dict/wordsdictionary
$ echo $_
/usr/share/dict/words
```

（4）`$!`

`$!`为最近一个后台执行的异步命令的进程 ID。

```sh
$ firefox &[1] 11064
$ echo $!
11064
```

上面例子中，`firefox`是后台运行的命令，`$!`返回该命令的进程 ID。

（5）`$0`

`$0`为当前 Shell 的名称（在命令行直接执行时）或者脚本名（在脚本中执行时）。

```sh
➜  ~ echo $0  
-zsh
```

（6）`$-`

`$-`为当前 Shell 的启动参数。

```sh
➜  ~ echo $-
569JNRXZghiklms
```

（7）`$@`和`$#`

`$@`和`$#`表示脚本的参数数量。



### 变量的默认值

Bash 提供四个特殊语法，跟变量的默认值有关，目的是保证变量不为空。

```sh
${varname:-word}
```

上面语法的含义是，如果变量`varname`存在且不为空，则返回它的值，否则**返回`word`**。它的目的是返回一个默认值，比如`${count:-0}`表示变量`count`不存在时返回`0`。

```sh
${varname:=word}
```

上面语法的含义是，如果变量`varname`存在且不为空，则返回它的值，否则**将它设为`word`，并且返回`word`**。它的目的是设置变量的默认值，比如`${count:=0}`表示变量`count`不存在时返回`0`，且将`count`设为`0`。

```sh
${varname:+word}
```

上面语法的含义是，如果变量名存在且不为空，则返回`word`，**否则返回空值**。它的目的是测试变量是否存在，比如`${count:+1}`表示变量`count`存在时返回`1`（表示`true`），否则返回空值。

```sh
➜  ~ echo ${varname:?message}  
zsh: varname: message
➜  ~ echo ${varname:?}       
zsh: varname: parameter not set
```

上面语法的含义是，如果变量`varname`存在且不为空，**则返回它的值，否则打印出`varname: message`，并中断脚本的执行**。如果省略了`message`，则输出默认的信息“parameter not set.”。它的目的是防止变量未定义。

上面四种语法如果用在脚本中，变量名的部分可以用到数字`1`到`9`，表示脚本的参数。

```sh
filename=${1:?"filename missing."}
```

上面代码出现在脚本中，`1`表示脚本的第一个参数。如果该参数不存在，就退出脚本并报错。



### declare 命令

`declare`命令可以声明一些特殊类型的变量，为变量设置一些限制，比如声明只读类型的变量和整数类型的变量。

```sh
declare OPTION VARIABLE=value
```

`declare`命令的主要参数（OPTION）如下。

- `-a`：声明数组变量。
- `-f`：输出所有函数定义。
- `-i`：声明整数变量。
- `-l`：声明变量为小写字母，会自动转换。
- `-p`：查看变量信息。
- `-r`：声明只读变量。
- `-u`：声明变量为大写字母。
- `-x`：该变量输出为环境变量，`-x`参数等同于`export`命令，可以输出一个变量为子 Shell 的环境变量。

`declare`命令如果用在函数中，声明的变量只在函数内部有效，等同于`local`命令。

不带任何参数时，`declare`命令输出当前环境的所有变量，包括函数在内，等同于不带有任何参数的`set`命令。



### readonly 命令

`readonly`命令等同于`declare -r`，用来声明只读变量，不能改变变量值，也不能`unset`变量。

```sh
 liushun@liushun  ~  readonly foo=1
 liushun@liushun  ~  foo=2                            
zsh: read-only variable: foo
```

上面例子中，更改只读变量`foo`会报错，命令执行失败。

`readonly`命令有三个参数。

- `-f`：声明的变量为函数名。
- `-p`：打印出所有的只读变量。
- `-a`：声明的变量为数组。



### let 命令

`let`命令声明变量时，可以直接执行算术表达式。

```sh
$ let foo=1+2
$ echo $foo
3
```

上面例子中，`let`命令可以直接计算`1 + 2`。

`let`命令的参数表达式如果包含空格，就需要使用引号。

```sh
$ let "foo = 1 + 2"
```

`let`可以同时对多个变量赋值，赋值表达式之间使用空格分隔。

```sh
$ let "v1 = 1" "v2 = v1++"
$ echo $v1,$v2
2,1
```



## 字符串操作

### 长度

```sh
 liushun@liushun  ~  foo=hello
 liushun@liushun  ~  echo ${#foo}
5
```

大括号`{}`是必需的，否则 Bash 会将`$#`理解成脚本的参数个数，将变量名理解成文本。

```sh
$ echo $#myvar
0myvar
```



### 子字符串

```sh
${varname:offset:length}
```

这种语法不能直接操作字符串，只能通过变量来读取字符串，并且不会改变原始字符串。变量前面的美元符号可以省略。

```sh
# 报错
$ echo ${"hello":2:3}
```

如果省略`length`，则从位置`offset`开始，一直返回到字符串的结尾。

```sh
 liushun@liushun  ~  echo ${foo:2:3} 
llo
```

如果`offset`为负值，表示从字符串的末尾开始算起。注意，负数前面必须有一个空格， 以防止与`${variable:-word}`的变量的设置默认值语法混淆。

```sh
 liushun@liushun  ~  echo ${foo: -2:3}
lo
 liushun@liushun  ~  echo ${foo: -2:-3}
zsh: substring expression: 2 < 3
 ✘ liushun@liushun  ~  echo ${foo: -2:-1}
l
 liushun@liushun  ~  echo ${foo: -2:-2}

 liushun@liushun  ~  echo ${foo: -2:0} 

 liushun@liushun  ~  echo ${foo: -2:1}
l
 liushun@liushun  ~  echo ${foo: -2:3}
lo
```



### 搜索和替换

**（1）字符串头部的模式匹配。**

以下两种语法可以检查字符串开头，是否匹配给定的模式。如果匹配成功，就删除匹配的部分，返回剩下的部分。原始变量不会发生变化.。如果匹配不成功，则返回原始字符串。

```sh
# 如果 pattern 匹配变量 variable 的开头，
# 删除最短匹配（非贪婪匹配）的部分，返回剩余部分
${variable#pattern}
# 如果 pattern 匹配变量 variable 的开头，
# 删除最长匹配（贪婪匹配）的部分，返回剩余部分
${variable##pattern}
```

匹配模式`pattern`可以使用`*`、`?`、`[]`等通配符。

```sh
 liushun@liushun  ~  echo ${myPath#/*/} 
cam/book/long.file.name
 liushun@liushun  ~  echo ${myPath##/*/}
long.file.name
```

上面例子中，匹配的模式是`/*/`，其中`*`可以匹配任意数量的字符，所以最短匹配是`/home/`，最长匹配是`/home/cam/book/`。

```sh
 liushun@liushun  ~  phone="555-456-1414"
 liushun@liushun  ~  echo ${phone/5?4/-}
55-56-1414
```

如果要将头部匹配的部分，替换成其他内容，采用下面的写法。

```sh
# 模式必须出现在字符串的开头${variable/#pattern/string}
foo=JPG.JPG
liushun@liushun  ~  echo ${foo/#JPG/jpg}
jpg.JPG
```

上面例子中，被替换的`JPG`必须出现在字符串头部，所以返回`jpg.JPG`。

**（2）字符串尾部的模式匹配。**

以下两种语法可以检查字符串结尾，是否匹配给定的模式。如果匹配成功，就删除匹配的部分，返回剩下的部分。原始变量不会发生变化。

```sh
# 如果 pattern 匹配变量 variable 的结尾，
# 删除最短匹配（非贪婪匹配）的部分，返回剩余部分
${variable%pattern}
# 如果 pattern 匹配变量 variable 的结尾，
# 删除最长匹配（贪婪匹配）的部分，返回剩余部分
${variable%%pattern}
```

如果要将尾部匹配的部分，替换成其他内容，采用下面的写法。

```
# 模式必须出现在字符串的结尾
${variable/%pattern/string}
```

**（3）任意位置的模式匹配。**

以下两种语法可以检查字符串内部，是否匹配给定的模式。如果匹配成功，就删除匹配的部分，换成其他的字符串返回。原始变量不会发生变化。

```sh
# 如果 pattern 匹配变量 variable 的一部分，
# 最长匹配（贪婪匹配）的那部分被 string 替换，但仅替换第一个匹配
${variable/pattern/string}
# 如果 pattern 匹配变量 variable 的一部分，
# 最长匹配（贪婪匹配）的那部分被 string 替换，所有匹配都替换
${variable//pattern/string}
```

上面两种语法都是最长匹配（贪婪匹配）下的替换，区别是前一个语法仅仅替换第一个匹配，后一个语法替换所有匹配。

```sh
 liushun@liushun  ~   ppppath=/home/cam/foo/foo.name
 liushun@liushun  ~  echo ${ppppath/foo/bar}
/home/cam/bar/foo.name
 liushun@liushun  ~  echo ${ppppath//foo/bar}
/home/cam/bar/bar.name
```

模式部分可以使用通配符。

```sh
$ phone="555-456-1414"
$ echo ${phone/5?4/-}
55-56-1414
```

如果省略了`string`部分，那么就相当于匹配的部分替换成空字符串，即删除匹配的部分。



## Bash的算术运算

### 算术表达式

`((...))`语法可以进行整数的算术运算。`((...))`会自动忽略内部的空格。

```sh
$ ((foo = 5 + 5))
$ echo $foo
10
```

这个语法不返回值，命令执行的结果根据算术运算的结果而定。只要算术结果不是`0`，命令就算执行成功。

```sh
$ (( 3 + 2 ))
$ echo $?
0
```

如果要读取算术运算的结果，需要在`((...))`前面加上美元符号`$((...))`，使其变成算术表达式，返回算术运算的值。

`((...))`语法支持的算术运算符如下。

- `+`：加法
- `-`：减法
- `*`：乘法
- `/`：除法（整除）
- `%`：余数
- `**`：指数
- `++`：自增运算（前缀或后缀）
- `--`：自减运算（前缀或后缀）

注意，除法运算符的返回结果总是整数。`$((...))`内部可以用圆括号改变运算顺序。`$((...))`结构可以嵌套。

```sh
 liushun@liushun  ~  echo $((5/2))           
2
$ echo $(($((5**2)) * 3))
75
 liushun@liushun  ~  echo $((1.5 + 1))
2.5
```

`$((...))`的圆括号之中，不需要在变量名之前加上`$`，不过加上也不报错。

```sh
 liushun@liushun  ~  echo $(($number+1))
3
 liushun@liushun  ~  echo $((number+1)) 
3
```

如果在`$((...))`里面使用字符串，Bash 会认为那是一个变量名。如果不存在同名变量，Bash 就会将其作为空值，因此不会报错。

```sh
$ foo=hello
$ hello=3
$ echo $(( foo + 2 ))
5
```

### 数值的进制

Bash 的数值默认都是十进制，但是在算术表达式中，也可以使用其他进制。

- `number`：没有任何特殊表示法的数字是十进制数（以10为底）。
- `0xnumber`：十六进制数。
- `base#number`：`base`进制的数。

下面是一些例子。

```sh
$ echo $((0xff))
255
$ echo $((2#11111111))
255
```

### 位运算

`$((...))`支持以下的二进制位运算符。

- `<<`：位左移运算，把一个数字的所有位向左移动指定的位。
- `>>`：位右移运算，把一个数字的所有位向右移动指定的位。
- `&`：位的“与”运算，对两个数字的所有位执行一个`AND`操作。
- `|`：位的“或”运算，对两个数字的所有位执行一个`OR`操作。
- `~`：位的“否”运算，对一个数字的所有位取反。
- `!`：逻辑“否”运算
- `^`：位的异或运算（exclusive or），对两个数字的所有位执行一个异或操作。

### 逻辑运算

`$((...))`支持以下的逻辑运算符。

- `<`：小于
- `>`：大于
- `<=`：小于或相等
- `>=`：大于或相等
- `==`：相等
- `!=`：不相等
- `&&`：逻辑与
- `||`：逻辑或
- `expr1?expr2:expr3`：三元条件运算符。若表达式`expr1`的计算结果为非零值（算术真），则执行表达式`expr2`，否则执行表达式`expr3`。

### 赋值运算

算术表达式`$((...))`可以执行赋值运算。

```sh
$ echo $((a=1))
1
$ echo $a
1
```

上面例子中，`a=1`对变量`a`进行赋值。这个式子本身也是一个表达式，返回值就是等号右边的值。

`$((...))`支持的赋值运算符，有以下这些。

- `parameter = value`：简单赋值。
- `parameter += value`：等价于`parameter = parameter + value`。
- `parameter -= value`：等价于`parameter = parameter – value`。
- `parameter *= value`：等价于`parameter = parameter * value`。
- `parameter /= value`：等价于`parameter = parameter / value`。
- `parameter %= value`：等价于`parameter = parameter % value`。
- `parameter <<= value`：等价于`parameter = parameter << value`。
- `parameter >>= value`：等价于`parameter = parameter >> value`。
- `parameter &= value`：等价于`parameter = parameter & value`。
- `parameter |= value`：等价于`parameter = parameter | value`。
- `parameter ^= value`：等价于`parameter = parameter ^ value`。

如果在表达式内部赋值，可以放在圆括号中，否则会报错。

```
$ echo $(( a<1 ? (a+=1) : (a-=1) ))
```

### 求值运算

逗号`,`在`$((...))`内部是求值运算符，执行前后两个表达式，并返回后一个表达式的值。

```sh
$ echo $((foo = 1 + 2, 3 * 4))
12
$ echo $foo
3
```

上面例子中，逗号前后两个表达式都会执行，然后返回后一个表达式的值`12`。

### expr 命令

`expr`命令支持算术运算，可以不使用`((...))`语法。

`expr`命令支持变量替换。

`expr`命令不支持非整数参数。

```sh
 liushun@liushun  ~  expr 3 + 2
5
 liushun@liushun  ~  expr $foo + 25
28
 liushun@liushun  ~  expr 3.5 + 2
expr: not a decimal number: '3.5'
```



## Bash 行操作

Bash 内置了 Readline 库，具有这个库提供的很多“行操作”功能，比如命令的自动补全，可以大大加快操作速度。

这个库默认采用 Emacs 快捷键，也可以改成 Vi 快捷键，`set -o vi`。

下面的命令可以改回 Emacs 快捷键。`set -o emacs`

如果想永久性更改编辑模式（Emacs / Vi），可以将命令写在`~/.inputrc`文件，这个文件是 Readline 的配置文件。

```sh
set editing-mode vi
```

本节介绍的快捷键都属于 Emacs 模式.

Bash 默认开启这个库，但是允许关闭。`--noediting`参数关闭了 Readline 库，启动的 Bash 就不带有行操作功能。

```sh
$ bash --noediting
```

### 快捷键

Readline 提供快速移动光标的快捷键。

- `Ctrl + a`：移到行首。
- `Ctrl + b`：向行首移动一个字符，与左箭头作用相同。
- `Ctrl + e`：移到行尾。
- `Ctrl + f`：向行尾移动一个字符，与右箭头作用相同。
- `Ctrl + l`快捷键可以清除屏幕，即将当前行移到屏幕的第一行

### 操作历史

Bash 会保留用户的操作历史，即用户输入的每一条命令都会记录。退出当前 Shell 的时候，Bash 会将用户在当前 Shell 的操作历史写入`~/.bash_history`文件。

环境变量`HISTFILE`总是指向这个文件。

```sh
 liushun@liushun  ~  echo $HISTFILE
/Users/liushun/.zsh_history
```

`!e`表示找出操作历史之中，最近的那一条以`e`开头的命令，然后加载到命令行，可以选择回车执行

```sh
 liushun@liushun  ~  !e
 liushun@liushun  ~  echo $HISTFILE
/Users/liushun/.zsh_history
```

**history 命令**

`history`命令能显示操作历史，即`.bash_history`文件的内容。

```sh
 2481  expr 3 + 2
 2482  expr $foo + 25
 2483  expr 3.5 + 2
 2484  history
 2485  llllll
 2486  echo $((foo = 1 + 2, 3 * 4))
 2487  echo $HISTFILE
```

如果想搜索某个以前执行的命令，可以配合`grep`命令搜索操作历史。

```sh
 ~/ history | grep prin    
 1114  git commit -m "chore: delete print"
 2394  printenv PATH
 2395  printenv SHELL
 2493  printenv HISTTIMEFORMAT
 2500  printenv HISTTIMEFORMAT
```



## 目录堆栈

为了方便用户在不同目录之间切换，Bash 提供了目录堆栈功能。

### cd -

Bash 可以记忆用户进入过的目录。默认情况下，只记忆前一次所在的目录，`cd -`命令可以返回前一次的目录。

### pushd，popd

如果希望记忆多重目录，可以使用`pushd`命令和`popd`命令。它们用来操作目录堆栈。

`pushd`命令的用法类似`cd`命令，可以进入指定的目录。

```
$ pushd dirname
```

上面命令会进入目录`dirname`，并将该目录放入堆栈。

第一次使用`pushd`命令时，会将当前目录先放入堆栈，然后将所要进入的目录也放入堆栈，位置在前一个记录的上方。以后每次使用`pushd`命令，都会将所要进入的目录，放在堆栈的顶部。

`popd`命令不带有参数时，会移除堆栈的顶部记录，并进入新的堆栈顶部目录（即原来的第二条目录）。

这两个命令的参数如下。

**（1）-n 参数**

`-n`的参数表示仅操作堆栈，不改变目录。

```
$ popd -n
```

上面的命令仅删除堆栈顶部的记录，不改变目录，执行完成后还停留在当前目录。

**（2）整数参数**

这两个命令还可以接受一个整数作为参数，该整数表示堆栈中指定位置的记录（从0开始），作为操作对象。这时不会切换目录。

```sh
# 从栈顶算起的3号目录（从0开始），移动到栈顶
$ pushd +3
# 从栈底算起的3号目录（从0开始），移动到栈顶
$ pushd -3
# 删除从栈顶算起的3号目录（从0开始）
$ popd +3
# 删除从栈底算起的3号目录（从0开始）
$ popd -3
```

上面例子的整数编号都是从0开始计算，`popd +0`是删除第一个目录，`popd +1`是删除第二个，`popd -0`是删除最后一个目录，，`popd -1`是删除倒数第二个。

**（3）目录参数**

`pushd`可以接受一个目录作为参数，表示将该目录放到堆栈顶部，并进入该目录。

```
$ pushd dir
```

`popd`没有这个参数。

### dirs 命令

`dirs`命令可以显示目录堆栈的内容，一般用来查看`pushd`和`popd`操作后的结果。

```
$ dirs
```

它有以下参数。

- `-c`：清空目录栈。
- `-l`：用户主目录不显示波浪号前缀，而打印完整的目录。
- `-p`：每行一个条目打印目录栈，默认是打印在一行。
- `-v`：每行一个条目，每个条目之前显示位置编号（从0开始）。
- `+N`：`N`为整数，表示显示堆顶算起的第 N 个目录，从零开始。
- `-N`：`N`为整数，表示显示堆底算起的第 N 个目录，从零开始。