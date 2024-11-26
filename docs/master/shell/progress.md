## Bash进阶

## bash登陆环境

用户每次使用 Shell，都会开启一个与 Shell 的 Session（对话）。

Session 有两种类型：登录 Session 和非登录 Session，也可以叫做 login shell 和 non-login shell。

这里针对的是linux，在mac上不太一样，mac上都没有/etc/profile.d这个文件夹

```sh
$ cat /etc/profile 
# System-wide .profile for sh(1)

if [ -x /usr/libexec/path_helper ]; then
	eval `/usr/libexec/path_helper -s`
fi

if [ "${BASH-no}" != "no" ]; then
	[ -r /etc/bashrc ] && . /etc/bashrc
fi
```



### 登录 Session

**登录 Session 是用户登录系统以后，系统为用户开启的原始 Session**，通常需要用户输入用户名和密码进行登录。

登录 Session 一般进行整个系统环境的初始化，启动的初始化脚本依次如下。

- `/etc/profile`：所有用户的全局配置脚本。
- `/etc/profile.d`目录里面所有`.sh`文件
- `~/.bash_profile`：用户的个人配置脚本。如果该脚本存在，则执行完就不再往下执行。
- `~/.bash_login`：如果`~/.bash_profile`没找到，则尝试执行这个脚本（C shell 的初始化脚本）。如果该脚本存在，则执行完就不再往下执行。
- `~/.profile`：如果`~/.bash_profile`和`~/.bash_login`都没找到，则尝试读取这个脚本（Bourne shell 和 Korn shell 的初始化脚本）。

Linux 发行版更新的时候，会更新`/etc`里面的文件，比如`/etc/profile`，因此不要直接修改这个文件。如果想修改所有用户的登陆环境，就在`/etc/profile.d`目录里面新建`.sh`脚本。

如果想修改你个人的登录环境，一般是写在`~/.bash_profile`里面。下面是一个典型的`.bash_profile`文件。

```sh
# .bash_profile
PATH=/sbin:/usr/sbin:/bin:/usr/bin:/usr/local/bin
PATH=$PATH:$HOME/bin
SHELL=/bin/bash
MANPATH=/usr/man:/usr/X11/man
EDITOR=/usr/bin/vi
PS1='\h:\w\$ '
PS2='> '
if [ -f ~/.bashrc ]; then
. ~/.bashrc
fi
export PATH
export EDITOR
```

可以看到，这个脚本定义了一些最基本的环境变量，然后执行了`~/.bashrc`。

`bash`命令的`--login`参数，会强制执行登录 Session 会执行的脚本。

```sh
$ bash --login
```

`bash`命令的`--noprofile`参数，会跳过上面这些 Profile 脚本。

```sh
$ bash --noprofile
```

### 非登录 Session

非登录 Session 是用户进入系统以后，手动新建的 Session，这时不会进行环境初始化。比如，在命令行执行`bash`命令，就会新建一个非登录 Session。

非登录 Session 的初始化脚本依次如下。

- `/etc/bash.bashrc`：对全体用户有效。
- `~/.bashrc`：仅对当前用户有效。

对用户来说，`~/.bashrc`通常是最重要的脚本。非登录 Session 默认会执行它，而登陆 Session 一般也会通过调用执行它。由于每次执行 Bash 脚本，都会新建一个非登录 Session，所以`~/.bashrc`也是每次执行脚本都会执行的。

`bash`命令的`--norc`参数，可以禁止在非登录 Session 执行`~/.bashrc`脚本。

```
$ bash --norc
```

`bash`命令的`--rcfile`参数，指定另一个脚本代替`.bashrc`。

```
$ bash --rcfile testrc
```

**.bash_logout**

`~/.bash_logout`脚本在每次退出 Session 时执行，通常用来做一些清理工作和记录工作，比如删除临时文件，记录用户在本次 Session 花费的时间。

如果没有退出时要执行的命令，这个文件也可以不存在。

**启动选项**

为了方便 Debug，有时在启动 Bash 的时候，可以加上启动参数。

- `-n`：不运行脚本，只检查是否有语法错误。
- `-v`：输出每一行语句运行结果前，会先输出该行语句。
- `-x`：每一个命令处理完以后，先输出该命令，再进行下一个命令的处理。

**键盘绑定**

Bash 允许用户定义自己的快捷键。全局的键盘绑定文件默认为`/etc/inputrc`，你可以在主目录创建自己的键盘绑定文件`.inputrc`文件。



## 命令提示符

用户进入 Bash 以后，Bash 会显示一个命令提示符，用来提示用户在该位置后面输入命令。

### 环境变量 PS1

命令提示符通常是美元符号`$`，对于根用户则是井号`#`。这个符号是环境变量`PS1`决定的，执行下面的命令，可以看到当前命令提示符的定义。

```sh
bash-3.2$ echo $PS1
\s-\v\$
```

Bash 允许用户自定义命令提示符，只要改写这个变量即可。改写后的`PS1`，可以放在用户的 Bash 配置文件`.bashrc`里面，以后新建 Bash 对话时，新的提示符就会生效。要在当前窗口看到修改后的提示符，可以执行下面的命令。

```
$ source ~/.bashrc
```

命令提示符的定义，可以包含特殊的转义字符，表示特定内容。

- `\a`：响铃，计算机发出一记声音。
- `\d`：以星期、月、日格式表示当前日期，例如“Mon May 26”。
- **`\h`：本机的主机名。**
- `\H`：完整的主机名。
- `\j`：运行在当前 Shell 会话的工作数。
- `\l`：当前终端设备名。
- `\n`：一个换行符。
- `\r`：一个回车符。
- `\s`：Shell 的名称。
- `\t`：24小时制的`hours:minutes:seconds`格式表示当前时间。
- `\T`：12小时制的当前时间。
- `\@`：12小时制的`AM/PM`格式表示当前时间。
- `\A`：24小时制的`hours:minutes`表示当前时间。
- **`\u`：当前用户名。**
- `\v`：Shell 的版本号。
- `\V`：Shell 的版本号和发布号。
- **`\w`：当前的工作路径。**
- **`\W`：当前目录名。**
- `\!`：当前命令在命令历史中的编号。
- `\#`：当前 shell 会话中的命令数。
- **`\$`：普通用户显示为`$`字符，根用户显示为`#`字符。**
- `\[`：非打印字符序列的开始标志。
- `\]`：非打印字符序列的结束标志。

举例来说，`[\u@\h \W]\$`这个提示符定义，显示出来就是`[user@host ~]$`（具体的显示内容取决于你的系统）。

```
[user@host ~]$ echo $PS1
[\u@\h \W]\$
 liushun@ls  ~  echo $PS1
%{%f%b%k%}$(build_prompt) 
```

**颜色**

默认情况下，命令提示符是显示终端预定义的颜色。Bash 允许自定义提示符颜色。

使用下面的代码，可以设定其后文本的颜色。

- `\033[0;30m`：黑色
- `\033[1;30m`：深灰色
- **`\033[0;31m`：红色**
- `\033[1;31m`：浅红色
- **`\033[0;32m`：绿色**
- `\033[1;32m`：浅绿色
- `\033[0;33m`：棕色
- `\033[1;33m`：黄色
- `\033[0;34m`：蓝色
- `\033[1;34m`：浅蓝色
- `\033[0;35m`：粉红
- `\033[1;35m`：浅粉色
- `\033[0;36m`：青色
- `\033[1;36m`：浅青色
- `\033[0;37m`：浅灰色
- `\033[1;37m`：白色

举例来说，如果要将提示符设为红色，可以将`PS1`设成下面的代码。

```
PS1='\[\033[0;31m\]<\u@\h \W>\$'
```

但是，上面这样设置以后，用户在提示符后面输入的文本也是红色的。为了解决这个问题， 可以在结尾添加另一个特殊代码`\[\033[00m\]`，表示将其后的文本恢复到默认颜色。

```
PS1='\[\033[0;31m\]<\u@\h \W>\$\[\033[00m\]'
```

除了设置前景颜色，Bash 还允许设置背景颜色。

- `\033[0;40m`：蓝色
- `\033[1;44m`：黑色
- `\033[0;41m`：红色
- `\033[1;45m`：粉红
- `\033[0;42m`：绿色
- `\033[1;46m`：青色
- `\033[0;43m`：棕色
- `\033[1;47m`：浅灰色

下面是一个带有红色背景的提示符。

```
PS1='\[\033[0;41m\]<\u@\h \W>\$\[\033[0m\] '
```

### PS2,PS3,PS4

除了`PS1`，Bash 还提供了提示符相关的另外三个环境变量。

环境变量`PS2`是命令行折行输入时系统的提示符，默认为`>`。

```sh
 liushun@ls  ~  echo "e      
dquote> 
dquote> d            
dquote> 
dquote> "
```

环境变量`PS3`是使用`select`命令时，系统输入菜单的提示符：`#?`。

```sh
 liushun@liushun  ~/Documents/GoWorkspace/src/MyLearn/sh  ./geth.sh                                                 
Which environment do you want to start your geth on?
1) bsc-prod-primary  3) eth-prod-primary  5) bsc-dev
2) bsc-prod-backup   4) eth-prod-backup   6) eth-dev
#? 7
Invalid environment.

```

环境变量`PS4`默认为`+`。它是使用 Bash 的`-x`参数执行脚本时，每一行命令在执行前都会先打印出来，并且在行首出现的那个提示符。



## 归档和备份

### gzip

gzip 程序用来压缩文件，原文件的压缩版（添加`gz`后缀名）**会替代原文件**。gunzip 程序用来还原压缩版本。

```
$ gzip test.txt
$ gunzip test.txt.gz
```

`gzip`的参数如下。

- -c 把输出写入到标准输出，并且保留原始文件。也有可能用 -stdout 和 -to-stdout 选项来指定。
- -d 解压缩。正如 gunzip 命令一样。也可以用 -decompress 或者 -uncompress 选项来指定.
- -f 强制压缩，即使原始文件的压缩文件已经存在了，也要执行。也可以用 -force 选项来指定。
- -h 显示用法信息。也可用 -help 选项来指定。
- -l 列出每个被压缩文件的压缩数据。也可用 -list 选项。
- -r 若命令的一个或多个参数是目录，则递归地压缩目录中的文件。也可用 -recursive 选项来指定。
- -t 测试压缩文件的完整性。也可用 -test 选项来指定。
- -v 显示压缩过程中的信息。也可用 -verbose 选项来指定。
- -number 设置压缩指数。number 是一个在1（最快，最小压缩）到9（最慢，最大压缩）之间的整数。 数值1和9也可以各自用 -fast 和 -best 选项来表示。默认值是整数6。

```sh
# 查看解压缩后的内容
gunzip -c test.txt.gz | less
```



### bzip2

`bzip2`程序与`gzip`程序相似，但是使用了不同的压缩算法，舍弃了压缩速度，实现了更高的压缩级别。在大多数情况下，它的工作模式等同于`gzip`。 由`bzip2`压缩的文件，用扩展名`.bz2`表示。

```sh
$ bzip2 foo.txt
$ bunzip2 foo.txt.bz2
```

gzip程序的所有选项（除了`-r`），bzip2 程序同样也支持。同样有 bunzip2 和 bzcat 程序来解压缩文件。bzip2 文件也带有 bzip2recover 程序，其会 试图恢复受损的 .bz2 文件。



### zip

`zip`程序既是压缩工具，也是一个打包工具，读取和写入.zip文件。

```sh
$ zip options zipfile file...
```

它的用法如下。

```sh
# 将指定目录压缩成zip文件
$ zip -r playground.zip playground
```

`zip`与`tar`命令有一个相反之处。如果压缩文件已存在，其将被更新而不是被替代。这意味着会保留此文件包，但是会添加新文件，同时替换匹配的文件。

解压使用`unzip`命令。

```
$ unzip ../playground.zip
```

`unzip`命令的参数如下。

- `-l` 列出文件包中的内容而不解压
- `-v` 显示冗余信息
- `-p` 输出发送到标准输出

```sh
$ unzip -p ls-etc.zip | less
```



### tar

`tar`是tape archive的简称，原来是一款制作磁带备份的工具，现在主要用于打包。一个 tar 包可以由一组独立的文件，一个或者多个目录，或者两者混合体组成。

`tar`程序的语法如下。

```sh
$ tar mode[options] pathname...
```

tar支持以下模式。

- c 表示create，为文件和／或目录列表创建归档文件。
- x 抽取归档文件。
- r 追加具体的路径到归档文件的末尾。
- t 列出归档文件的内容。

支持的参数如下。

- f 表示file，用来指定生成的文件。

模式和参数可以写在一起，而且不需要开头的短横线。注意，必须首先指定模式，然后才是其它的选项。

```sh
# 创建子目录的tar包
$ tar cf playground.tar playground
# 查看tar包内容
$ tar tf playground.tar
# 查看更详细的列表信息
$ tar tvf playground.tar
# 还原归档文件
$ tar xf playground.tar
# 还原单个文件
$ tar xf archive.tar pathname
# 还原文件到指定目录
$ tar xvf archive.tar -C /home/me/
# 追加文件
$ tar rf archive.tar file.txt
# 验证归档文件内容是否正确
$ tar tvfW archive.tar
# 支持通配符
$ tar xf ../playground2.tar --wildcards 'home/me/playground/\*.txt'
```

注意，`tar`命令还原的时候，总是还原为相对路径。如果归档的时候，保存的是绝对路径，那么还原的时候，这个绝对路径会整个变成相对路径。

`find`命令可以与`tar`命令配合使用。

```sh
$ find playground -name 'file.txt' -exec tar rf playground.tar '{}' '+'
```

上面的命令先用`find`程序找到所有名为`file.txt`的文件，然后使用追加模式（`r`）的`tar`命令，把匹配的文件添加到归档文件`playground.tar`里面。

这种`tar`和`find`的配合使用，可以创建逐渐增加的目录树或者整个系统的备份。通过`find`命令匹配新于某个时间戳的文件，我们就能够创建一个归档文件，其只包含新于上一个 tar 包的文件。

tar支持压缩功能。

```sh
# 打成gzip压缩包
$ tar czvf assets.tar.gz dist
# 打成bz2压缩包
$ tar cvfj assets.tar.bz2 dist
# 解压 tar.gz 文件
$ tar xzv archive.tar.gz
$ tar xvf archive.tar.gz
# 解压bz2压缩包
$ tar xvf archive.tar.bz2
# 显示gzip压缩包内容
$ tar tvf archive.tar.gz
# 显示bz2压缩包内容
$ tar tvf archive.tar.bz2
# 从gzip压缩包取出单个文件
$ tar zxvf archive.tar.gz file.txt
# 从bz2压缩包取出单个文件
$ tar jxvf archive.tar.bz2 file.txt
# 按通配符取出文件
$ tar zxvf archive.tar.gz --wildcards '*.php'
$ tar jxvf archive.tar.bz2 --wildcards '*.php'
# 追加文件到压缩包
$ tar rvf archive.tar.gz xyz.txt
$ tar rvf archive.tar.bz2 xyz.txt
```



## 异步任务

Bash脚本有时候需要同时执行多个任务。通常这涉及到启动一个脚本，依次，启动一个或多个子脚本来执行额外的任务，而父脚本继续运行。然而，当一系列脚本 以这种方式运行时，要保持父子脚本之间协调工作，会有一些问题。也就是说，若父脚本或子脚本依赖于另一方，并且 一个脚本必须等待另一个脚本结束任务之后，才能完成它自己的任务，这应该怎么办？

bash 有一个内置命令，能帮助管理诸如此类的异步执行的任务。wait 命令导致一个父脚本暂停运行，直到一个 特定的进程（例如，子脚本）运行结束。

首先我们将演示一下 wait 命令的用法。为此，我们需要两个脚本，一个父脚本：

```sh
#!/bin/bash
# async-parent : Asynchronous execution demo (parent)
echo "Parent: starting..."
echo "Parent: launching child script..."
source ./sync_c.sh &
pid=$!
echo "Parent: child (PID= $pid) launched."
echo "Parent: continuing..."
sleep 2
echo "Parent: pausing to wait for child to finish..."
wait $pid
echo "Parent: child is finished. Continuing..."
echo "Parent: parent is done. Exiting."
```

和一个子脚本：

```sh
#!/bin/bash
# async-child : Asynchronous execution demo (child)
echo "Child: child is running..."
sleep 5
echo "Child: child is done. Exiting."
```

在这个例子中，我们看到该子脚本是非常简单的。真正的操作通过父脚本完成。在父脚本中，子脚本被启动， 并被放置到后台运行。子脚本的进程 ID 记录在 pid 变量中，这个变量的值是 $! shell 参数的值，它总是 包含放到后台执行的最后一个任务的进程 ID 号。

父脚本继续，然后执行一个以子进程 PID 为参数的 wait 命令。这就导致父脚本暂停运行，直到子脚本退出， 意味着父脚本结束。

当执行后，父子脚本产生如下输出：

```
Parent: starting...
Parent: launching child script...
Parent: child (PID= 48310) launched.
Parent: continuing...
Child: child is running...
Parent: pausing to wait for child to finish...
Child: child is done. Exiting.
Parent: child is finished. Continuing...
Parent: parent is done. Exiting.
```



## 文件操作

### CP

`cp`命令用于将文件（或目录）拷贝到目的地。

```sh
# 拷贝单个文件
$ cp source dest
# 拷贝多个文件
$ cp source1 source2 source3 dest
# -i 目的地有同名文件时会提示确认
$ cp -i file1 file2
# -r 递归拷贝，将dir1拷贝到dir2，完成后dir2生成一个子目录dir1
# dir2如果不存在，将被创建
# 拷贝目录时，该参数是必需的
$ cp -r dir1 dir2
# -u --update 只拷贝目的地没有的文件，或者比目的地同名文件更新的文件
$ cp -u *.html destination
```

其他参数

- `-a` 拷贝时保留所有属性，包括所有者与权限
- `-v` 显示拷贝的详细信息



### mv

`mv`命令用于将源文件移动到目的地。

```sh
# 移动单个文件
$ mv item1 item2
# 移动多个文件
$ mv file1 file2 dir1
# 将dir1拷贝进入dir2，完成后dir2将多出一个子目录dir1
# 如果dir2不存在，将会被创建
$ mv dir1 dir2
```

参数

- `-i` 覆盖已经存在的文件时，会提示确认
- `-u` 只移动目的地不存在的文件，或比目的地更新的文件



### rm

`rm`命令用于删除文件。

参数。

- `-i` 文件存在时，会提示确认。
- `-r` 递归删除一个子目录
- `-f` 如果删除不存在的文件，不报错
- `-v` 删除时展示详细信息



### ln

`ln`命令用于建立链接文件。

```sh
# 新建硬链接
$ ln file link
# 新建软链接
$ ln -s item link
参数：
	-i 交互模式。
	-s 软链接(符号链接)。如果不加 “-s” 选项，则建立硬链接文件
	-d 允许超级用户制作目录的硬链接。
	-b 删除，覆盖以前建立的链接
	-f 强制。如果目标文件已经存在，则删除目标文件后再建立链接文件
```

（1）软链接
软链接是Linux中常用的命令，它的功能是某一文件在另外一个位置建立一个同步的链接，相当于C语言中的指针，建立的链接直接指向源文件所在的地址，软链接不会另外占用资源，当同一文件需要在多个位置被用到的时候，就会使用到软连接。

（2）硬链接
硬链接在是另外一个位置创建源文件的链接文件，相当于复制了一份，占用资源会倍增。硬链接一旦创建，源文件和链接文件任何一方修改文件都会同步修改。

<img src="./progress.assets/ln.png" alt="screenshot2024-10-20 10.09.57" style="zoom: 33%;" />



## 文件系统

### ls

`ls`目录可以显示指定目录的内容。不加参数时，显示当前目录的内容。`ls`命令也可以显示指定文件是否存在。

```sh
$ ls foo.txt
foo.txt
```

`-l`参数可以显示文件的详细信息。

```sh
$ ls -l test.txt                                                       
-rw-r--r--  1 liushun  staff  13  9  6 13:27 test.txt
```

上面命令输出结果的第一栏，是文件的类型和权限。

文件类型分为以下几种。

- `-` 普通文件
- `d` 目录
- `l` 符号链接。注意，对于符号链接文件，剩余的文件属性总是”rwxrwxrwx”。
- `c` 字符设备文件，指按照字节流处理数据的设备，比如调制解调器。
- `b` 块设备文件，指按照数据块处理数据的设备，比如硬盘。

其他参数的用法。

```sh
# 显示多个目录的内容
$ ls ~ /usr
# -a --all 显示隐藏文件
$ ls -a
# -A 与-a类似，但是不显示当前目录和上一级目录两个点文件
$ ls -A
# -l 显示详细信息
$ ls -l
# -1 单列显示，每行只显示一个文件，只展示一个名字
$ ls -1
# -d 显示当前目录本身，而不是它的内容
# 通常与-l配合使用，列出一个目录本身的详细信息
$ ls -dl # drwx------+ 16 liushun  staff  512 10 20 10:14 .
# -F 目录名之后添加斜杠，可执行文件后面添加星号
$ ls -F
# -h 与-l配合使用，将文件大小显示为人类可读的格式
# -t 按文件修改时间排序，修改晚的排在前面
$ ls -t
# -s 按文件大小排序，
# --reverse 显示结果倒序排列
$ ls -lt --reverse
```



### stat

`stat`命令是加强版的`ls`命令，可以显示一个文件的详细信息。

```sh
tat test.txt             
16777231 18289095 -rw-r--r-- 1 liushun staff 0 13 "Oct 20 10:14:52 2024" "Sep  6 13:27:02 2024" "Oct 20 10:14:51 2024" "Sep  6 13:27:02 2024" 4096 8 0 test.txt
```



### touch

`touch`用来设置或更新文件的访问，更改，和修改时间。然而，如果一个文件名参数是一个不存在的文件，则会创建一个空文件。

如果该文件已经存在，就会把它的修改时间设置为当前时间。



### file

`file`命令显示指定文件的类型。

```sh
$ file test.txt 
test.txt: ASCII text
```



### chmod

`chmod`命令用于更改文件的权限，是“change mode”的缩写。

```
$ chmod 600 foo.txt
```

`chmod`还可以接受四个缩写，为不同的对象单独设置权限。

- `u` 所有者“user”的简写
- `g` 用户组“group”的缩写
- `o` 其他所有人“others”的简写
- `a` 所有人“all”的简写

```sh
# 为所有者添加可执行权限
$ chmod u+x foo.txt
# 删除所有者的可执行权限
$ chmod u-x foo.txt
# 为所有人添加可执行权限，等价于 a+x
$ chmod +x foo.txt
# 删除其他人的读权限和写权限。
$ chmod o-rw foo.txt
# 设定用户组和其他人的权限是读权限和写权限
$ chmod go=rw foo.txt
# 为所有者添加执行权限，设定用户组和其他人为读权限和写权限，多种设定用逗号分隔
$ chmod u+x,go=rw foo.txt
```

添加权限。

- +x 添加执行权限
- +r 设置读权限
- +w 设置写权限
- +rwx 设置所有读、写和执行权限。

删除权限只需将`+`更改为`-`，就可以删除任何已设置的指定权限。可以使用`-R`（或`--recursive`）选项来递归地操作目录和文件。

设置精确权限，可以使用`=`代替`+`或`-`来实现此操作。如果想为用户、组或其他用户设置不同的权限，可以使用逗号将不同表达式分开（例如`ug=rwx,o=rx`）。

由于一共有3种可能的权限。也可以使用八进制数代替符号来设置权限。通过这种方式设置的权限最多使用3个八进制数。第1个数定义用户权限，第2个数定义组权限，第3个数定义其他权限。这3个数中的每一个都通过添加想要的权限设置来构造：读 (4)、写 (2) 和执行 (1)。

比如600，就表示用户具有读写权限，组和其他没有权限。



### umask

`umask`用来查看和设置权限掩码。

```sh
$ umask
022
```

命令显示当前系统之中，默认的文件掩码是`022`，转为二进制就是`000 010 010`。9位分别代表文件三种使用对象的三类权限。只要对应位置上是`1`，就表示关闭该项权限，所以`010`就表示关闭读权限。

新建文件时，通常不会带有执行权限，也就是说，新建文件的默认权限是`rw-rw-rw-`。如果文件掩码是`0022`，那么用户组和其他人的写权限也会被拿掉。

```sh
$ ls -l test.txt 
-rw-r--r--  1 liushun  staff  13 10 20 10:24 test.txt
```

`umask`后面跟着参数，就表示设置权限掩码。

```sh
$ umask 0000
```

上面命令将权限掩码设为`0000`，实际上就是关闭了权限掩码。

`umask`命令设置的掩码值只能在当前Shell会话中生效，若当前Shell会话结束后，则必须重新设置。



### du

`du`命令用于查看指定目录的大小。

```sh
$ du -hs /path/to/directory
```

显示第一层子目录的大小。

```
$ du -h -d 1
 45M	./WechatWorkspace
 64K	./docker
2.0G	./VscodeWorkspace
495M	./IdeaWorkspace
1.3G	./Programs
256M	./PycharmWorkspace
597M	./master
6.5G	./GoWorkspace
7.5M	./internalship
 11G	.
```

参数的含义。

- `-h` 表示人类可读的格式
- `-s` 表示总结信息，否则会显示该目录内所有文件和子目录的信息。



### find

搜索一个给定目录（以及它的子目录），来查找文件。

```sh
usage: find [-H | -L | -P] [-EXdsx] [-f path] path ... [expression]
       find [-H | -L | -P] [-EXdsx] -f path [path ...] [expression]
```

```sh
# 输出当前目录的所有子目录和文件（含子目录）
$ find .
# 显示当前目录的文件总数
$ find . | wc -l # 440484
# 当前目录的子目录总数
$ find . -type d | wc -l # 69113
# 当前目录的文件总数（不含子目录）
$ find . -type f | wc -l # 371222
# 当前目录的文件名匹配“*.JPG”且大于1M的文件总数
$ find . -type f -name "\*.JPG" -size +1M | wc -l
```

`-type`参数支持的文件类型。

- `b` 块设备文件
- `c` 字符设备文件
- `d` 目录
- `f` 普通文件
- `l` 符号链接

`-size`参数支持的文件大小类型。

- b 512 个字节块。如果没有指定单位，则这是默认值。
- c 字节
- w 两个字节的字
- k 千字节
- M 兆字节
- G 千兆字节

这个很强大，超多参数可以参考，还可以正则匹配。



## 硬件操作

### df

`df`命令查看硬盘信息。

```sh
$ df -h
Filesystem        Size    Used   Avail Capacity iused ifree %iused  Mounted on
/dev/disk3s1s1   228Gi    13Gi    86Gi    14%    394k  902M    0%   /
devfs            201Ki   201Ki     0Bi   100%     696     0  100%   /dev
/dev/disk3s6     228Gi   1.0Gi    86Gi     2%       1  902M    0%   /System/Volumes/VM
/dev/disk3s2     228Gi    11Gi    86Gi    12%    1.1k  902M    0%   /System/Volumes/Preboot
/dev/disk3s4     228Gi   633Mi    86Gi     1%     267  902M    0%   /System/Volumes/Update
/dev/disk1s2     500Mi   6.0Mi   482Mi     2%       1  4.9M    0%   /System/Volumes/xarts
/dev/disk1s1     500Mi   6.1Mi   482Mi     2%      29  4.9M    0%   /System/Volumes/iSCPreboot
/dev/disk1s3     500Mi   1.1Mi   482Mi     1%     102  4.9M    0%   /System/Volumes/Hardware
/dev/disk3s5     228Gi   115Gi    86Gi    58%    2.0M  902M    0%   /System/Volumes/Data
map auto_home      0Bi     0Bi     0Bi   100%       0     0     -   /System/Volumes/Data/home
/dev/disk3s1     228Gi    13Gi    86Gi    14%    404k  902M    0%   /System/Volumes/Update/mnt1
```



### free

`free`命令查看内存占用情况。mac的zsh上没这个指令,linux上才有

```sh
[root@ip-172-31-23-171 ~]# free
               total        used        free      shared  buff/cache   available
Mem:        15985008     9510064      149716        8852     6325228     6129812
Swap:              0           0           0
```



### mount

`mount`不带参数时，显示当前挂载的文件系统。

```sh
➜  ~ mount
/dev/disk3s1s1 on / (apfs, sealed, local, read-only, journaled)
devfs on /dev (devfs, local, nobrowse)
/dev/disk3s6 on /System/Volumes/VM (apfs, local, noexec, journaled, noatime, nobrowse)
/dev/disk3s2 on /System/Volumes/Preboot (apfs, local, journaled, nobrowse)
/dev/disk3s4 on /System/Volumes/Update (apfs, local, journaled, nobrowse)
/dev/disk1s2 on /System/Volumes/xarts (apfs, local, noexec, journaled, noatime, nobrowse)
/dev/disk1s1 on /System/Volumes/iSCPreboot (apfs, local, journaled, nobrowse)
/dev/disk1s3 on /System/Volumes/Hardware (apfs, local, journaled, nobrowse)
/dev/disk3s5 on /System/Volumes/Data (apfs, local, journaled, nobrowse, protect)
map auto_home on /System/Volumes/Data/home (autofs, automounted, nobrowse)
/dev/disk3s1 on /System/Volumes/Update/mnt1 (apfs, sealed, local, journaled, nobrowse)
```

`mount`带参数时，用于将设备文件挂载到挂载点，`-t`参数用来指定文件系统类型。

**umount**

`umount`命令用来卸载设备。

```sh
$ umount [设备名]
$ umount /dev/hdc
```



## 命名管道

在大多数类似 Unix 的操作系统中，有可能创建一种特殊类型的文件，叫做命名管道。命名管道用来在 两个进程之间建立连接，也可以像其它类型的文件一样使用。

命令管道的行为类似于文件，但实际上形成了**先入先出（FIFO）的缓冲。和普通（未命令的）管道一样， 数据从一端进入，然后从另一端出现**。通过命令管道，有可能像这样设置一些东西：

```
process1 > named_pipe
```

和

```
process2 < named_pipe
```

表现出来就像这样：

```
process1 | process2
```

设置一个命名管道

使用 mkfifo 命令能够创建命令管道：

```sh
$ mkfifo pipe1
$ ls -l pipe1  
prw-r--r--  1 liushun  staff  0 10 20 12:50 pipe1
```

这里我们使用 mkfifo 创建了一个名为 pipe1 的命名管道。使用 ls 命令，我们查看这个文件， 看到位于属性字段的第一个字母是 “p”，表明它是一个命名管道。

使用命名管道

为了演示命名管道是如何工作的，将需要两个终端窗口（或用两个虚拟控制台代替）。 在第一个终端中，输入一个简单命令，并把命令的输出重定向到命名管道：

```
$ ls -l > pipe1
```

按下 Enter 按键之后，命令将会挂起。这是因为在管道的另一端没有任何接受数据。当这种现象发生的时候， 据说是管道阻塞了。一旦绑定一个进程到管道的另一端，该进程开始从管道中读取输入的时候，这种情况会消失。 使用第二个终端窗口，输入这个命令。

```sh
$ cat < pipe1 
total 8
drwx------@   4 liushun  staff   128  9 23 21:37 Applications
drwx------@   7 liushun  staff   224 10 17 10:42 Desktop
drwx------+  16 liushun  staff   512 10 20 10:14 Documents
drwx------@  16 liushun  staff   512 10 17 13:31 Downloads
drwx------@ 104 liushun  staff  3328  9 24 20:19 Library
drwx------    5 liushun  staff   160  4 10  2024 Movies
drwx------+   6 liushun  staff   192  3 10  2024 Music
drwx------+   5 liushun  staff   160  3 10  2024 Pictures
drwxr-xr-x@   3 liushun  staff    96  4 15  2024 Postman
drwxr-xr-x+   5 liushun  staff   160  3 10  2024 Public
drwxr-xr-x    4 liushun  staff   128  9 24 20:20 ScreenPal
drwx------    3 liushun  staff    96  8 10 17:28 default.etcd
-rw-r--r--    1 liushun  staff   100  9  1 16:15 dump.rdb
drwxr-xr-x    3 liushun  staff    96  9  6 17:36 go
drwxr-xr-x    4 liushun  staff   128  7 16 17:10 logs
drwxr-xr-x    4 liushun  staff   128  7 16 17:10 nacos
prw-r--r--    1 liushun  staff     0 10 20 12:48 pipe1
```

然后产自第一个终端窗口的目录列表出现在第二个终端中，并作为来自 cat 命令的输出。在第一个终端 窗口中的 ls 命令一旦它不再阻塞，会成功地结束。



## 进程管理

### ps

`ps`命令用来列出进程信息。

```sh
$ ps
	PID TTY           TIME CMD
72215 ttys000    0:01.76 -zsh
45118 ttys001    0:07.12 -zsh
12351 ttys002    0:03.31 /bin/zsh --login -i
12411 ttys003    0:10.01 /bin/zsh --login -i
46581 ttys005    0:00.60 /bin/zsh --login -i
```

不带任何参数时，`ps`只列出与当前Session相关的进程。输出结果中，`PID`是进程ID、`TTY`是进程的终端号（如果显示`?`，则表示进程没有终端），`TIME`是消耗的CPU时间，`CMD`是触发进程的命令。

`x`参数列出所有进程的详细信息，包括不在当前Session的信息。

```sh
ps x   
  PID   TT  STAT      TIME COMMAND
  575   ??  S      9:56.72 /usr/sbin/distnoted agent
  576   ??  S      4:40.03 /usr/sbin/cfprefsd agent
...
```

输出结果，会多出`STAT`一栏，表示状态。它的各种值如下。

- `R` 正在运行或准备运行
- `S` 正在睡眠，即没有运行，正在等待一个事件唤醒
- `D` 不可中断睡眠。进程正在等待 I/O，比如磁盘驱动器的I/O
- `T` 已停止，即进程停止运行
- `Z` “僵尸”进程。即这是一个已经终止的子进程，但父进程还没有清空它（没有把子进程从进程表中删除）
- `<` 高优先级进程。这可能会授予一个进程更多重要的资源，给它更多的 CPU 时间。
- `N` 低优先级进程。一个低优先级进程（一个“好”进程）只有当其它高优先级进程执行之后，才会得到处理器时间。

`aux`参数可以显示更多信息。

```sh
$ ps aux 
USER               PID  %CPU %MEM      VSZ    RSS   TT  STAT STARTED      TIME COMMAND
_windowserver      368  23.2  0.7 415379072 120864   ??  Ss    71024  1841:00.04 /System/Library/PrivateFrameworks/SkyLig
liushun          34285   9.2  0.2 410272800  40416   ??  S    三09上午 207:24.90 /Applications/Xmind.app/Contents/Framewo
```

输出结果包含的列的含义如下。

- `USER` 用户ID，表示进程的所有者
- `%CPU` 百分比表示的 CPU 使用率
- `%MEM` 百分比表示的内存使用率
- `VSZ` 虚拟内存大小
- `RSS` 进程占用的物理内存的大小，以千字节为单位。
- `START` 进程运行的起始时间。若超过24小时，则用天表示。



### top

`top`命令可以查看机器的当前状态。

```sh
$ top
top - 05:11:56 up 79 days, 20:18,  2 users,  load average: 0.11, 0.07, 0.09
Tasks: 198 total,   1 running, 197 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.7 us,  0.0 sy,  0.0 ni, 98.6 id,  0.5 wa,  0.0 hi,  0.2 si,  0.0 st
MiB Mem :  15610.4 total,    154.7 free,   9308.2 used,   6147.5 buff/cache
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   5965.4 avail Mem 

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND                           
3320879 root      20   0   12.7g   8.8g  20232 S  11.3  57.4 376:02.79 geth-linux                         
3387071 root      20   0  224036   3648   2860 R   0.3   0.0   0:00.02 top         
```

它的输出结果分为两部分，最上面是系统概要，下面是进程列表，以 CPU 的使用率排序。



### jobs

`jobs`命令用来查看后台任务。

```
$ jobs
[1]+ Running            xlogo &
```

输出结果之中，每个后台任务会有一个编号。上面结果中，`xlogo`的编号是`1`，`+`表示正在运行。

### fg

`fg`命令用于将后台任务切换到前台。

```
$ fg %1
```

`fg`命令之后，跟随着一个百分号和工作序号，用来指定切换哪一个后台任务。如果只有一个后台任务，那么`fg`命令可以不带参数。

### bg

`bg`命令用于将一个暂停的前台任务，转移到后台。只有暂停的任务，才能使用`bg`命令，因为正在运行的任务，命令行是无法输入的。

```
$ bg %1
```

`Ctrl + z`可以暂停正在运行的前台任务。



### kill

`kill`命令用于杀死进程。它的参数是进程ID。

`kill`命令的实质是操作系统向进程发送信号。在使用 Ctrl-c 的情况下，会发送一个叫做 INT（中断）的信号；当使用 Ctrl-z 时，则发送一个叫做 TSTP（终端停止）的信号。

```
$ kill [-signal] PID
```

下面是常见信号。

- HUP：编号1，表示挂起。发送这个信号到前台程序，程序会终止。许多守护进程也使用这个信号，来重新初始化。这意味着，当发送这个信号到一个守护进程后， 这个进程会重新启动，并且重新读取它的配置文件。Apache 网络服务器守护进程就是一个例子。
- **INT：编号2，中断。实现和`Ctrl-c`一样的功能，由终端发送。通常，它会终止一个程序。**
- **KILL：编号9，杀死。**进程可能选择忽略这个信号。所以，操作系统不发送该信号到目标进程，而是**内核立即终止这个进程**。当一个进程以这种方式终止的时候，**它没有机会去做些“清理”工作**，或者是保存劳动成果。因为这个原因，把 KILL 信号看作杀手锏，当其它终止信号失败后，再使用它。
- TERM：编号15，终止。这是 kill 命令发送的默认信号。如果程序仍然“活着”，可以接受信号，那么这个信号终止。
- CONT：编号18，继续。在停止一段时间后，进程恢复运行。
- STOP：编号19，停止。这个信号导致进程停止运行，而没有终止。像 KILL 信号，它不被 发送到目标进程，因此它不能被忽略。
- QUIT：编号3，退出
- SEGV：编号11，段错误。如果一个程序非法使用内存，就会发送这个信号。也就是说，程序试图写入内存，而这个内存空间是不允许此程序写入的。
- TSTP：编号20，终端停止。当按下 Ctrl-z 组合键后，终端发送这个信号。不像 STOP 信号， TSTP 信号由目标进程接收，且可能被忽略。
- WINCH：编号28，改变窗口大小。当改变窗口大小时，系统会发送这个信号。 一些程序，像 top 和 less 程序会响应这个信号，按照新窗口的尺寸，刷新显示的内容。

`-l`参数可以列出所有信号。

```sh
$ kill -l
HUP INT QUIT ILL TRAP ABRT EMT FPE KILL BUS SEGV SYS PIPE ALRM TERM URG STOP TSTP CONT CHLD TTIN TTOU IO XCPU XFSZ VTALRM PROF WINCH INFO USR1 USR2
```



**pstree**

```sh
[root@ip-172-31-23-171 ~]# pstree
systemd─┬─2*[agetty]
        ├─amazon-ssm-agen───10*[{amazon-ssm-agen}]
        ├─atd
        ├─auditd───{auditd}
        ├─chronyd
        ├─dbus-broker-lau───dbus-broker
        ├─geth-linux───29*[{geth-linux}]
        ├─gssproxy───5*[{gssproxy}]
        ├─irqbalance───{irqbalance}
        ├─lsmd
        ├─nginx───8*[nginx]
        ├─rngd───4*[{rngd}]
        ├─sshd─┬─sshd───sshd───bash
        │      └─sshd───sshd───bash───pstree
        ├─systemd───(sd-pam)
        ├─systemd-homed
        ├─systemd-inhibit───acpid
        ├─systemd-journal
        ├─systemd-logind
        ├─systemd-network
        ├─systemd-resolve
        ├─systemd-udevd
        └─systemd-userdbd───3*[systemd-userwor]
```



## 重定向

### 输入输出

| 命令            | 说明                                               |
| :-------------- | :------------------------------------------------- |
| command > file  | 将输出重定向到 file。                              |
| command < file  | 将输入重定向到 file。                              |
| command >> file | 将输出以追加的方式重定向到 file。                  |
| n > file        | 将文件描述符为 n 的文件重定向到 file。             |
| n >> file       | 将文件描述符为 n 的文件以追加的方式重定向到 file。 |
| n >& m          | 将输出文件 m 和 n 合并。                           |
| n <& m          | 将输入文件 m 和 n 合并。                           |
| << tag          | 将开始标记 tag 和结束标记 tag 之间的内容作为输入。 |

一般情况下，每个 Unix/Linux 命令运行时都会打开三个文件：

- 标准输入文件(stdin)：stdin的文件描述符为0，Unix程序默认从stdin读取数据。
- 标准输出文件(stdout)：stdout 的文件描述符为1，Unix程序默认向stdout输出数据。
- 标准错误文件(stderr)：stderr的文件描述符为2，Unix程序会向stderr流中写入错误信息。

**>**

`>`用来将标准输出重定向到指定文件。

```sh
$ ls -l /usr/bin > ls-output.txt
```

如果重定向后的指定文件已经存在，就会被覆盖，不会有任何提示。

如果命令没有任何输出，那么重定向之后，得到的是一个长度为`0`的文件。因此，`>`具有创建新文件或改写现存文件、将其改为长度`0`的作用。

```sh
 复制代码$ > ls-output.txt
```

**>>**

`>>`用来将标准输出重定向追加到指定文件。

```sh
$ ls -l /usr/bin >> ls-output.txt
```

**2>**

`2>`用来将标准错误重定向到指定文件。

```sh
$ ls -l /bin/usr 2> ls-error.txt
```

标准输出和标准错误，可以重定向到同一个文件。

```sh
$ ls -l /bin/usr > ls-output.txt 2>&1 # 将2合并到1，然后输出到1
# 或者
$ ls -l /bin/usr &> ls-output.txt
# 追加到同一个文件
$ ls -l /bin/usr &>> ls-output.txt
```

如果不希望输出错误信息，可以将它重定向到一个特殊文件`/dev/null`。

```sh
$ ls -l /bin/usr 2> /dev/null
```

**|**

`|`用于将一个命令的标准输出，重定向到另一个命令的标准输入。

```
$ ls -l /usr/bin | less
```

不要将`>`与`|`混淆。

```
$ ls > less
```

上面命令会在当前目录，生成一个名为`less`的文本文件。

**tee**

`tee`命令用于同时将标准输出重定向到文件，以及另一个命令的标准输入。

```sh
$ ls /usr/bin | tee ls.txt | grep zip
```

### 命令替换

命令替换（command substitution）指的是将一个命令的输出，替换进入另一个命令。`$(command)`表示命令替换，另一种写法是使用反引号。

```sh
$ echo $(ls)# 或者
$ echo `ls`
echo `ls`          
Applications Desktop Documents Downloads Library Movies Music Pictures Postman Public ScreenPal default.etcd dump.rdb go logs nacos pipe1
$ ls -l $(which cp)# 或者
$ ls -l `which cp`
```

### basename

`basename`命令清除 一个路径名的开头部分，只留下一个文件的基本名称。

```sh
$ basename docker/compose/Docker
Docker
```



## 系统信息

### uname

`uname`命令返回当前机器的信息。

```sh
# 内核的版本
$ uname -r
23.2.0
# CPU 架构
$ uname -m 
arm64
$ uname -a 
Darwin ls.local 23.2.0 Darwin Kernel Version 23.2.0: Wed Nov 15 21:59:33 PST 2023; root:xnu-10002.61.3~2/RELEASE_ARM64_T8112 arm64
```

### service

`service`命令可以查看当前正在运行的服务。mac上没有

```sh
$ service --status-all
 [ + ]  apache2
 [ ? ]  atd
 [ - ]  bootlogd
```

上面代码中，`+`表示正在运行，`-`表示已经停止，`?`表示`service`命令不了解相关信息。



## 文本处理

**cat**

`cat`可以文件的内容，显示在标准输出。

```sh
$ cat test.txt 
hello world!
abd
dahk
wqowie
```

它也可以同时输出多个文件内容。

```
$ cat text1 text2
```

如果调用`cat`命令时没有任何参数，它将读取标准输入，然后显示到标准输出。按下`Ctrl + d`，将会结束`cat`读取标准输入。利用这一点，可以将键盘输入写入指定文件，按下`Ctrl + d`结束输入。

```
$ cat > lazy_dog.txt
```

它的参数如下。

- `-n` 输出结果显示行号
- `-s` 将多个连续的空白行，输出为一行
- `-A` 输出结果中显示控制符，比如Tab键显示为`^I`，行尾显示`$`

**nl**

`nl`命令为文本文件添加行号，显示在标准输出。

```sh
$ nl test.txt 
     1	hello world!
     2	abd
     3	dahk
     4	wqowie
```

**sort**

`sort`命令将文本文件的所有行排序后输出。

```sh
$ sort test.txt  
abd
dahk
hello world!
wqowie
```

- `-b` `--ignore-leading-blanks` 默认情况下，排序用的是每行的第一个字符。这个参数忽略每行开头的空格，从第一个非空白字符开始排序。
- `-f` `--ignore-case` 让排序不区分大小写。
- `-n` `--numeric-sort` 按照数值排序，而不是字符值，用于行首是数值的情况。
- `-r` `--reverse` 按相反顺序排序。结果按照降序排列，而不是升序。
- `-o` `--output=file` 把排好序的输出结果发送到文件，而不是标准输出。
- `-u` 输出结果中删除重复行

**wc**

`wc`命令输出一个文本文件的统计信息（word count），一共有三个值，分别为行数、词数和字节数。

```
$ wc test.txt 
       4       5      29 test.txt
```

如果使用`-l`参数，则只输出行数。

```
wc -l test.txt 
       4 test.txt
```

**head**

`head`命令返回文本文件的头部，默认显示10行。

`-n`参数指定显示的行数。

```sh
$ head -n 5 ls-output.txt
```

**tail**

`tail`命令返回文本文件的尾部，默认显示10行。

`-n`参数指定显示的行数。

```
$ tail -n 5 ls-output.txt
```

`-f`会实时追加显示新增的内容，常用于实时监控日志，按`Ctrl + c`停止。

```
$ tail -100f /var/log/messages
```

**grep**

`grep`程序用于在指定文件之中，搜索符合某个模式的行，并把搜索结果输出到标准输出。

```sh
$ grep keyword foo.txt
```

`grep`程序可以同时搜索多个文件。

```sh
$ grep keyword f*.txt
```

`-l`参数输出匹配的文件名，而不是文件行。

```sh
$ grep -l bzip dirlist*.txt
```

如果想搜索文件名，而不是文件内容，可以使用重定向。

```sh
$ ls /usr/bin | grep zip
```

上面命令会输出`/usr/bin`目录中，文件名中包含子字符串`zip`的所有文件。

参数的含义。

- `-c`或`--count` 输出匹配的数量，而不是匹配的文本行。如果使用了`-v`，则输出不匹配的数量。
- `-h`或`--no-filename` 应用于多文件搜索，不在每行匹配的文本前，输出文件名
- `-i`或`--ignore-case` 忽略大小写
- `-l`或`--files-with-matches` 输出包含匹配项的文件名，而不是文本行本身
- `-L`或`--files-without-match` 类似于`-l`，但输出不包含匹配项的文件名
- `-n`或`--line-number` 每个匹配行之前输出其对应的行号
- `-v`或`--invert-match` 只返回不符合模式的行



## 时间管理

## date 命令

`date`命令用于输出当前时间

```
$ date       
2024年10月20日 星期日 16时30分52秒 CST
```

`date`命令后面用加号（`+`）指定显示的格式。

```sh
$ date +%d_%b_%Y
20_10_2024
$ date +%D      
10/20/24
$ date +%F-%T
2024-10-20-16:31:31
```

完整的格式参数如下。

- %a 星期名的缩写（Sun）
- %A 星期名的全称（Sunday）
- %b 月份的缩写（Jan）
- %B 月份的全称（January）
- %c 日期和时间（Thu Mar 3 23:05:25 2005）
- %C 世纪，就是年份数省略后两位（20）
- %d 一个月的第几天（01）
- %D 日期，等同于`%m/%d/%y`
- %e 一个月的第几天，用空格补零，等同于`%_d`
- %F 完整的日期，等同于`%Y-%m-%d`
- %g last two digits of year of ISO week number (see %G)
- %G year of ISO week number (see %V); normally useful only with %V
- %h 等同于`%b`
- %H 小时（00..23）
- %I 小时（01..12）
- %j day of year (001..366)
- %k hour ( 0..23)
- %l hour ( 1..12)
- %m month (01..12)
- %M minute (00..59)
- %N nanoseconds (000000000..999999999)
- %p locale’s equivalent of either AM or PM; blank if not known
- %P like %p, but lower case
- %r locale’s 12-hour clock time (e.g., 11:11:04 PM)
- %R 24-hour hour and minute; same as %H:%M
- %s seconds since 1970-01-01 00:00:00 UTC
- %S second (00..60)
- %T time; same as %H:%M:%S
- %u day of week (1..7); 1 is Monday
- %U week number of year, with Sunday as first day of week (00..53)
- %V ISO week number, with Monday as first day of week (01..53)
- %w day of week (0..6); 0 is Sunday
- %W week number of year, with Monday as first day of week (00..53)
- %x locale’s date representation (e.g., 12/31/99)
- %X locale’s time representation (e.g., 23:13:48)
- %y last two digits of year (00..99)
- %Y year
- %z +hhmm numeric timezone (e.g., -0400)
- %:z +hh:mm numeric timezone (e.g., -04:00)
- %::z +hh:mm:ss numeric time zone (e.g., -04:00:00)
- %Z alphabetic time zone abbreviation (e.g., EDT)

## cal 命令

`cal`命令用于显示日历。不带有参数时，显示的是当前月份。

```sh
$ cal         
      十月 2024         
日 一 二 三 四 五 六  
       1  2  3  4  5  
 6  7  8  9 10 11 12  
13 14 15 16 17 18 19  
20 21 22 23 24 25 26  
27 28 29 30 31 
$ cal 9 2024
      九月 2024         
日 一 二 三 四 五 六  
 1  2  3  4  5  6  7  
 8  9 10 11 12 13 14  
15 16 17 18 19 20 21  
22 23 24 25 26 27 28  
29 30  
```



## 用户管理

Linux系统是一个多用户多任务的分时操作系统，任何一个要使用系统资源的用户，都必须首先向系统管理员申请一个账号，然后以这个账号的身份进入系统。

用户的账号一方面可以帮助系统管理员对使用系统的用户进行跟踪，并控制他们对系统资源的访问；另一方面也可以帮助用户组织文件，并为用户提供安全性保护。

每个用户账号都拥有一个唯一的用户名和各自的口令。用户在登录时键入正确的用户名和口令后，就能够进入系统和自己的主目录。

实现用户账号的管理，要完成的工作主要有如下几个方面：

- 用户账号的添加、删除与修改。
- 用户口令的管理。
- 用户组的管理。

每个用户都有一个用户组，系统可以对一个用户组中的所有用户进行集中管理。不同Linux 系统对用户组的规定有所不同，如Linux下的用户属于与它同名的用户组，这个用户组在创建用户时同时创建。用户组的管理涉及用户组的添加、删除和修改。组的增加、删除和修改实际上就是对/etc/group文件的更新。

**id**

`id`命令用于查看指定用户的用户名和组名。

```sh
$ id
uid=501(liushun) gid=20(staff) groups=20(staff),12(everyone),61(localaccounts),79(_appserverusr),80(admin),81(_appserveradm),98(_lpadmin),701(com.apple.sharepoint.group.1),33(_appstore),100(_lpoperator),204(_developer),250(_analyticsusers),395(com.apple.access_ftp),398(com.apple.access_screensharing),399(com.apple.access_ssh),400(com.apple.access_remote_ae)
```

`id`输出结果分为三个部分，分别是UID（用户编号和用户名）、GID（组编号和组名），groups（用户所在的所有组）。

用户帐户的信息，存放在`/etc/passwd`文件里面；用户组的信息，存放在`/etc/group`文件里面。

```sh
# 返回UID
$ id -u [UserName]
501
# 返回GID
$ id -g [UserName]
20
# 返回用户名
$ id -un [UserName]
liushun
# 返回组名
$ id -gn [UserName]
staff
```

上面的命令，如果省略用户名，则返回当前用户的信息。

**su**

`su`命令允许以另一个用户的身份，启动一个新的 shell 会话，或者是以这个用户的身份来发布一个命令。

```sh
$ su otherUser
```

执行上面的命令以后，系统会提示输入密码。通过以后，就以另一个用户身份在执行命令了。

如果不加用户名，则表示切换到root用户。

```sh
$ su
```

`-l`参数表示启动一个需要登录的新的Shell，这意味着工作目录会切换到该用户的主目录。它的缩写形式是`-`。

```sh
$ su -
```

上面命令表示，切换到root用户的身份，且工作目录也切换到root用户的主目录。

`-c`参数表示只以其他用户的身份，执行单个命令，而不是启动一个新的Session。

```sh
$ su -c 'command' # 实例
$ su -c 'ls -l /root/*'
```

**sudo**

`sudo`命令很类似`su`命令，但有几点差别。

- 对于管理员来说，`sudo`命令的可配置性更高
- `sudo`命令通常只用于执行单个命令，而不是开启另一个Session。
- `sudo`命令不要求超级用户的密码，而是用户使自己的密码来认证。

`sudo`的设置在文件`/etc/sudoers`之中。

`-l`参数列出用户拥有的所有权限。

```sh
$ sudo -l                      
Password:
Matching Defaults entries for liushun on ls:
    env_reset, env_keep+=BLOCKSIZE, env_keep+="COLORFGBG COLORTERM", env_keep+=__CF_USER_TEXT_ENCODING,
    env_keep+="CHARSET LANG LANGUAGE LC_ALL LC_COLLATE LC_CTYPE", env_keep+="LC_MESSAGES LC_MONETARY LC_NUMERIC LC_TIME",
    env_keep+="LINES COLUMNS", env_keep+=LSCOLORS, env_keep+=SSH_AUTH_SOCK, env_keep+=TZ, env_keep+="DISPLAY
    XAUTHORIZATION XAUTHORITY", env_keep+="EDITOR VISUAL", env_keep+="HOME MAIL", lecture_file=/etc/sudo_lecture

User liushun may run the following commands on ls:
    (ALL) ALL
```

**chown**

`chown`命令用来更改文件或目录的所有者和用户组。使用这个命令需要超级用户权限。

```
$ chown [owner][:[group]] file
```

下面是一些例子。

```sh
# 更改文件所有者
$ sudo chown bob foo.txt
# 更改文件所有者和用户组
$ sudo chown bob:users foo.txt
# 更改用户组
$ sudo chown :admins foo.txt
# 更改文件所有者和用户组（用户 bob 登录系统时，所属的用户组）
$ sudo chown bob: foo.txt
```

**chgrp**

`chgrp`命令更改用户组，用法与`chown`命令类似。

**useradd**

`useradd`命令用来新增用户。

```sh
$ useradd -G admin -d /home/bill -s /bin/bash -m bill
```

上面命令新增用户`bill`，参数`-G`指定用户所在的组，参数`d`指定用户的主目录，参数`s`指定用户的 Shell，参数`m`表示如果该目录不存在，则创建该目录。

**usermod**

`usermod`命令用来修改用户的各项属性。

```sh
$ usermod -g sales jerry
```

上面的命令修改用户`jerry`属于的主要用户组为`sales`。

```sh
$ usermod -G sales jerry
```

上面的命令修改用户`jerry`属于的次要用户组为`sales`。

**adduser**

`adduser`命令用来将一个用户加入用户组。

```sh
$ sudo adduser username grouptoadd
```

**groupadd**

`groupadd`命令用来新建一个用户组。

```sh
$ sudo groupadd group1
$ sudo adduser foobar group1
```

**groupdel**

`groupdel`命令用来删除一个用户组。

```sh
$ sudo groupdel group1
```

**passwd**

`passwd`命令用于修改密码。

```sh
# 修改自己的密码
$ passwd
# 修改其他用户的密码
$ sudo passwd [user]
```



## shell命令

**命令的类别**

Bash可以使用的命令分成四类。

- 可执行程序
- Shell 提供的命令
- Shell 函数
- 前三类命令的别名

**type, whatis**

`type`命令可以显示命令类型。

```sh
$ type command
```

下面是几个例子。

```sh
$ type ls   
ls is an alias for ls -G
$ type cp
cp is /bin/cp
```

`whatis`命令显示指定命令的描述。

```sh
$ whatis ls
.....
```

**alias, unalias**

`alias`命令用来为命令起别名。

```sh
$ alias foo='cd /usr; ls; cd -'
$ type foo
foo is aliased to `cd /usr; ls ; cd -'
```

注意，默认情况下，别名只在当前Session有效。当前Session结束时，这些别名就会消失。

`alias`命令不加参数时，显示所有有效的别名。

`unalias`命令用来取消别名。

**which**

`which`命令显示可执行程序的路径。

```sh
$ which ls
/bin/ls
```

`which`命令用于Shell内置命令时（比如`cd`），将没有任何输出。

**help，man**

`help`命令用于查看Shell内置命令的帮助信息，`man`命令用于查看可执行命令的帮助信息。

```sh
$ help cd
$ man ls
```

`man`里面的文档一共有8类，如果同一个命令，匹配多个文档，`man`命令总是返回第一个匹配。如果想看指定类型的文档，命令可以采用下面的形式。

```sh
$ man 5 passwd
```

**export**

`export`命令用于将当前进程的变量，输出到所有子进程。