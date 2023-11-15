# System Usage

## 基本操作

一些ubuntu系统的基本操作



> 修改密码

```bash
passwd
```

然后输入旧密码，和新密码即可



> 查看当前所处目录

```bash
pwd

/data0/shunliu
```



> 创建目录

```bash
mkdir xxx
```



> 包括隐藏文件和详细信息：

```
bashCopy code
ls -a -l
```

这将显示包括隐藏文件在内的所有文件，并提供详细信息，如文件权限、所有者、大小等。



> 删除目录或文件

删除安装python的目录

```bash
rm -rf ~/python3.9
```



> 不小心删了环境变量

可以手动修改配置文件后，关闭当前终端窗口，然后重新打开一个新的终端窗口。每次打开新终端时，它都会加载配置文件，包括 `.bashrc`。



## 编辑文件

**Vim:**

Vim是一个强大的文本编辑器。要使用Vim：

```bash
vim filename
```

在Vim中，按 `i` 进入插入模式，进行编辑。完成编辑后，按 `Esc` 键，然后输入 `:wq` 并按 `Enter` 保存更改并退出。



## 传文件

要将本地文件夹传输到Ubuntu服务器，可以使用一些常见的工具和协议，例如 `scp`（Secure Copy Protocol）。下面是基本方法：（这个针对大的文件夹以及一些不合法的命名可能会失败）

```bash
scp -r -P 22 /path/to/local/folder username@remote_server_ip:/path/on/remote/server
```

- `-r`: 递归地复制整个文件夹。
- `-P`：指定端口号，默认为22。
- `/path/to/local/folder`: 本地文件夹的路径。
- `username`: 远程服务器上的用户名。
- `remote_server_ip`: 远程服务器的IP地址。
- `/path/on/remote/server`: 远程服务器上存储文件夹的路径。



## 安装python

没有sudo权限，可以在没有特权的用户下安装Python。

1. **选择或创建安装目录：**

   首先，选择一个你有写入权限的目录，或者在你的主目录下创建一个新目录来安装Python。例如，你可以在主目录下创建一个名为`python3.9`的目录：

   ```bash
   mkdir ~/python3.9
   ```

2. **下载Python 3.9.2源代码：**

   在终端中执行以下命令，从Python官方网站下载源代码：

   ```bash
   wget https://www.python.org/ftp/python/3.9.2/Python-3.9.2.tgz
   ```

3. **解压缩源代码文件：**

   ```bash
   tar -xf Python-3.9.2.tgz
   ```

4. **进入解压缩后的目录：**

   ```bash
   cd Python-3.9.2
   ```

5. **配置安装路径和编译：**

   ```bash
   ./configure --prefix=/data1/shunliu/Program/python3.9
   make -j$(nproc)
   ```

   这将在你的主目录下创建一个名为`python3.9`的目录，并在其中安装Python。

6. **安装Python 3.9.2：**

   ```bash
   make install
   ```

   这将安装Python到你指定的目录。

7. **添加Python可执行文件路径到PATH：**

   你可能需要将Python的可执行文件路径添加到你的PATH中，这样系统才能找到它。在你的shell配置文件（例如`~/.bashrc`或`~/.zshrc`）中添加以下行：

   ```bash
   export PATH=/data1/shunliu/Program/pyt:$PATH
   ```

   然后运行 `source ~/.bashrc` 或 `source ~/.zshrc` 来使更改生效。

8. **验证安装：**

   ```bash
   python3.9 --version
   ```

   这将显示安装的Python 3.9.2版本号。



## 安装pip

如果你想在非root用户下安装`pip`，并且同时指定安装路径，你可以使用 `--target` 选项。这个选项允许你指定包的安装目录。

以下是步骤：

1. **下载 `get-pip.py` 脚本:**

   在终端中执行以下命令，下载 `get-pip.py` 脚本：

   ```bash
   wget https://bootstrap.pypa.io/get-pip.py
   ```

   如果你没有安装 `wget`，你可以使用 `curl`：

   ```bash
   curl -O https://bootstrap.pypa.io/get-pip.py
   ```

2. **指定安装路径运行脚本:**

   使用 `python` 命令运行 `get-pip.py` 脚本，并指定安装路径。确保使用的是你要安装 `pip` 的 Python 版本，例如，如果你想安装给 Python 3 使用，使用 `python3`：

   ```bash
   python3.9 get-pip.py --target=/data1/shunliu/Program/my_pip
   ```

   这将在 `$HOME/my_pip_installation` 目录中安装 `pip`。

3. **将用户本地 `bin` 目录添加到 `$PATH`：**

   为了能够在任何地方运行 `pip`，确保用户本地的 `bin` 目录在 `$PATH` 中。在 `~/.bashrc` 或 `~/.zshrc` 文件中添加以下行：

   ```bash
   export PATH=$PATH:/data1/shunliu/Program/my_pip
   ```

   使用 `source` 命令或重新启动终端以使更改生效。

4. **验证安装:**

   运行以下命令验证 `pip` 是否已成功安装：

   ```bash
   pip --version
   ```

   如果一切正常，你应该能够看到 `pip` 的版本信息。

5. **切换为清华源**

   ```bash
   pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
   pip config list
   ```




## 安装Anaconda

使用上面的方法安装了python和pip之后，安装一些库的时候会报`_ctype`找不到的错误，网上的解决方式是使用apt-get安装libffi-dev库，但是没有root权限，在实验室服务器上始终没找到办法解决。最后使用anaconda进行环境的自动管理。

使用 `wget` 命令下载并安装 Anaconda。以下是在终端中执行的步骤：

1. **在终端中下载Anaconda脚本:** 打开终端并使用 `wget` 下载Anaconda脚本。请注意，您需要替换 `<版本号>` 为您要下载的Anaconda版本的实际版本号。访问 [Anaconda官方网站](https://www.anaconda.com/products/distribution) 获取最新版本的下载链接。

   ```bash
   wget https://repo.anaconda.com/archive/Anaconda3-<版本号>-Linux-x86_64.sh
   ```

2. **运行安装脚本:** 下载完成后，运行下载的脚本来安装Anaconda。

   ```bash
   bash Anaconda3-<版本号>-Linux-x86_64.sh
   ```

   在这里，同样需要替换 `<版本号>` 为下载的Anaconda版本的实际版本号。

3. **按照安装程序的提示进行操作:** 安装程序将提示您接受许可协议、选择安装位置等。最好使用它的**默认安装位置**，不知道为什么，我切换安装目录他会安装失败。

4. **初始化Anaconda:** 安装完成后，可能需要重新启动终端，或者运行以下命令来初始化Anaconda：

   ```bash
   source ~/.bashrc
   ```

5. **测试Anaconda:** 运行以下命令来测试Anaconda是否正确安装：

   ```bash
   conda --version
   ```

   这应该显示Anaconda的版本号，表明安装成功。