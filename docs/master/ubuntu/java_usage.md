# Java Usage

## 运行

**启动java程序**

（1）直接启动，控制台退出则关掉应用

```bash
java -jar xxx.jar
```

（2）后台启动，控制台退出不会关掉应用

```bash
nohup java -jar xxx.jar &
```

（3）后台启动并且输出日志，控制台退出不会关掉应用

```bash
nohup java -jar xxx.jar >> ./register.log 2>&1 &
```
（3）后台启动(加内存)并且输出日志，控制台退出不会关掉应用

```bash
nohup java -jar -Xms1024m -Xmx2048m xxx.jar >> ./register.log 2>&1 &
```
**关闭程序**

查询java应用程序

```bash
ps -uf|grep java
-u只列出当前用户的j
```

强制杀掉进程

```bash
kill -9 xxx
```



## 打包普通maven项目

使用idea自带的build artifacts不好使，他会报错

在`pom.xml`中加入如下配置

```xml
<build>
  <finalName>extractor</finalName>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-shade-plugin</artifactId>
      <version>3.2.1</version>
      <executions>
        <execution>
          <phase>package</phase>
          <goals>
            <goal>shade</goal>
          </goals>
          <configuration>
            <filters>
              <filter>
                <artifact>*:*</artifact>
                <excludes>
                  <exclude>META-INF/*.SF</exclude>
                  <exclude>META-INF/*.DSA</exclude>
                  <exclude>META-INF/*.RSA</exclude>
                </excludes>
              </filter>
            </filters>
            <transformers>
              <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                <mainClass>org.example.Main</mainClass>  <!--这里运行类！ -->
              </transformer>
            </transformers>
          </configuration>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>
```

