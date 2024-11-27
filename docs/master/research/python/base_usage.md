# Base Usage

## numpy

### 统计个数

将ndarray与标量值进行比较将返回以布尔值（True，False）作为元素的ndarray。可以将<，==，！=等进行比较。

```python
import numpy as np

a = np.arange(12).reshape((3, 4))
print(a)
#[[ 0  1  2  3]
#[ 4  5  6  7]
#[ 8  9 10 11]]
print(a < 4)
#[[ True  True  True  True]
#[False False False False]
#[False False False False]]
```

使用np.count_nonzero()获得True的数量，即满足条件的元素的数量

print(np.count_nonzero(a < 4)) # 5

True 被视为 1，False 被视为 0，因此也可以使用 np.sum()。然而， np.count_nonzero() 更快。

print(np.sum(a < 4))





## other

### sorted

`sorted(['89', '78'], key=len)`的排序结果中，'89'在前面是因为`key=len`参数指定了按照字符串的长度来进行排序，而'89'的长度为2，而'78'的长度为2，因此它们的长度相等。在这种情况下，按照**原始顺序**进行排序，因此'89'在'78'之前。

如果你想按照字符串的大小来进行排序，而不是长度，可以省略`key=len`，因为字符串默认会按照字典顺序进行比较，即按照字符的ASCII码值进行比较。这样，'78'会在'89'之前。例如：

```python
sorted(['89', '78'])
```

这将按照字符串的大小进行排序，而不是长度。

这种数字字符串，最好转换为数字在排序（这个在ubuntu和windows文件排序上有差别，有坑-_-）

```python
a = sorted(['89', '78'], key=lambda x: int(x))
```



### 向下取整

在 Python 中，可以使用 `math.floor()` 函数或者 `int()` 类型转换来实现向下取整操作。以下是这两种方法的示例：

1. 使用 `math.floor()` 函数：

```python
import math

value = 7.8
result = math.floor(value)

print(result)  # 输出：7
```

2. 使用 `int()` 类型转换：

```python
value = 7.8
result = int(value)

print(result)  # 输出：7
```

这两种方法都会将浮点数向下取整到最接近的整数。



### 字符串转数组

```python
x = '[1, 2, 3]'
x = ast.literal_eval(x)
# x = [1, 2, 3]
```





