# Python Usage



## zip

`zip(a, b)` 是一个内置函数，它将两个可迭代对象 `a` 和 `b` 中对应位置的元素打包成一个元组，并返回一个迭代器。这个迭代器生成的元组依次包含来自输入可迭代对象的对应位置的元素。

例如：

```python
a = [1, 2, 3]
b = ['a', 'b', 'c']

# 使用 zip 将两个列表打包
zipped = zip(a, b)

# 转换为列表查看结果
result = list(zipped)

print(result)
```

这将输出：

```
[(1, 'a'), (2, 'b'), (3, 'c')]
```

在上面的例子中，`zip(a, b)` 将列表 `a` 和 `b` 中对应位置的元素打包成了元组。在实际应用中，`zip` 可以用于同时迭代多个可迭代对象，这在构建例如键值对等数据结构时非常有用。

### map(list, zip(*batch))

`map(list, zip(*batch))` 是一种常见的 Python 代码，用于将一个包含元组的列表（`batch`）转置。这种转置操作通常用于处理数据的批处理，特别是在机器学习和深度学习中。

让我们来解释这段代码的每一部分：

1. `zip(*batch)`: `zip` 函数将多个可迭代对象逐个元素打包成元组，而 `*batch` 语法则将列表 `batch` 中的元素解压缩为单独的参数传递给 `zip` 函数。这样，`zip(*batch)` 将批处理中的元组的第一个元素（所有元组的第一个元素）组合成一个元组，第二个元素组合成一个元组，以此类推。

2. `map(list, ...)`: `map` 函数将一个函数应用于一个或多个可迭代的参数。在这里，`list` 函数被应用于 `zip(*batch)` 的结果，将每个元组转换为列表。

综合起来，`map(list, zip(*batch))` 的效果是将批处理中的元组转置为列表，其中原始批处理中的第 i 个元组的第 j 个元素变成了转置后列表的第 j 个元素。这通常用于重新组织数据的形状，以适应模型的输入或其他操作的需求。

下面是一个简单的示例，以更清晰地说明这个过程：

```python
# 假设有一个包含元组的列表
batch = [(1, 2, 3), (4, 5, 6), (7, 8, 9)]

# 使用 map(list, zip(*batch)) 进行转置
transposed_batch = list(map(list, zip(*batch)))

print(transposed_batch)
```

在这个例子中，`transposed_batch` 将是 `[(1, 4, 7), (2, 5, 8), (3, 6, 9)]`。这样的转置在某些情况下可能很有用，例如，当你希望将批处理中的不同元组的相应元素组合在一起时。



## DataFrame

#### 统计数目

```python
# 统计 'column_name' 列中等于目标值的数量 
count_target = (df['column_name'] == target_value).sum()
```

#### 随机取样

```python
import pandas as pd
# 采样n个数据
# 列 panda.series
sampled_data = df['column_name'].sample(n, random_state=1)
# z
# 全部数据 panda.DataFrame
sampled_df = df.sample(n)
```

#### 拼接

在 pandas 中，你可以使用 `concat` 函数来拼接两个 DataFrame。这个函数可以按行或按列进行拼接，具体取决于传递给 `axis` 参数的值。

以下是一个简单的例子，展示如何按行拼接两个 DataFrame：

```python
import pandas as pd

# 创建两个示例 DataFrame
df1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df2 = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})
# 按行拼接两个 DataFrame
result = pd.concat([df1, df2])
# 打印结果
print(result)
```

这将输出:

```
   A  B
0  1  3
1  2  4
0  5  7
1  6  8
```

在这个例子中，`pd.concat([df1, df2])` 会将 `df2` 添加到 `df1` 的下面，形成一个新的 DataFrame。`axis` 参数默认为 0，表示按行拼接。

如果按列拼接，可以将 `axis` 参数设置为 1：

```python
result = pd.concat([df1, df2], axis=1)
```

这将输出：

```
   A  B  A  B
0  1  3  5  7
1  2  4  6  8
```

在这个例子中，`axis=1` 表示按列拼接两个 DataFrame。



#### 重置索引

在 pandas 中，你可以使用 `reset_index` 方法来重置 DataFrame 的索引。这个方法会生成一个新的 DataFrame，其中包含原始数据框的数据，但索引被重新设置为默认的整数索引。以下是一个简单的例子：

```python
import pandas as pd

# 创建一个示例 DataFrame
data = {'A': [1, 2, 3], 'B': [4, 5, 6]}
df = pd.DataFrame(data)

# 重置索引
df_reset = df.reset_index(drop=True)

# 打印重置索引后的 DataFrame
print(df_reset)
```

在这个例子中，`reset_index(drop=True)` 会生成一个新的 DataFrame `df_reset`，其中包含了原始数据框的数据，但索引被重新设置为默认的整数索引，并通过 `drop=True` 参数移除了原始索引列。

如果想在原始 DataFrame 上直接修改索引，而不生成一个新的 DataFrame，你可以使用 `inplace=True` 参数：

```python
df.reset_index(drop=True, inplace=True)
```



#### 深拷贝

`df.copy()` 是 pandas 中用于复制 DataFrame 的方法。这个方法会创建 DataFrame 的一个深拷贝，即复制了原始数据和索引，而不与原始数据框共享任何内存。

```python
# 创建 DataFrame 的副本
df_copy = df.copy()
```

