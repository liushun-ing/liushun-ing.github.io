# Pytorch Usage

记录一些用到的pytorch函数的用法



## torch.tensor

### 创建

`torch.tensor` 是 PyTorch 中用于创建张量（tensor）的函数。张量是 PyTorch 中表示多维数据的基本数据结构，类似于 NumPy 中的数组。

有多种方式可以使用 `torch.tensor` 创建张量。以下是一些例子：

1. **从列表创建张量：**

    ```python
    import torch

    # 1D tensor from a list
    tensor_1d = torch.tensor([1, 2, 3])

    # 2D tensor from a list of lists
    tensor_2d = torch.tensor([[1, 2, 3], [4, 5, 6]])
    ```

2. **从 NumPy 数组创建张量：**

    ```python
    import numpy as np
    import torch

    numpy_array = np.array([1, 2, 3])
    tensor_from_numpy = torch.tensor(numpy_array)
    ```

3. **指定数据类型：**

    ```python
    import torch

    # Create a tensor with a specific data type
    tensor_float = torch.tensor([1.0, 2.0, 3.0], dtype=torch.float32)
    ```

4. **空张量：**

    ```python
    import torch
    
    # Create an empty tensor
    empty_tensor = torch.tensor([])
    ```

`torch.tensor` 还支持其他参数和选项，例如设备（CPU 或 GPU）、是否要求梯度等。



### 获取数值

**1、单个值**

```python
tensor.item()
```

**2、多值或数组**

```python
tensor.tolist()
```



## torch.eye

`torch.eye(4)` 是使用 PyTorch 创建一个大小为 4x4 的单位矩阵的操作。单位矩阵是一个方阵，其对角线上的元素都是 1，而其它位置的元素都是 0。

具体地说，`torch.eye(4)` 返回一个如下形式的矩阵：

```
1  0  0  0
0  1  0  0
0  0  1  0
0  0  0  1
```

这是一个 4x4 的矩阵，对角线上的元素都是 1，其它位置的元素都是 0。



## torch.utils.data.DataLoader

`DataLoader` 是 PyTorch 中用于加载数据的工具，它可以对数据进行批处理、打乱和并行加载等操作。在你的代码中，使用 `DataLoader` 来创建一个数据加载器，这样你就可以方便地在训练循环中迭代数据批次。

具体到代码片段：

```python
data_loader = DataLoader(dataset, batch_size=batch_size, shuffle=True)
```

这一行代码创建了一个数据加载器，从 `dataset` 中加载数据。参数的含义：

- `dataset`: 加载的数据集对象。
- `batch_size`: 指定每个批次中包含的样本数。在训练神经网络时，通常会选择一个适当的批次大小，以充分利用 GPU 并加速训练。
- `shuffle`: 如果设置为 `True`，数据加载器会在每个 epoch 开始时打乱数据，这有助于模型更好地学习。

使用 `DataLoader` 后，通过迭代数据加载器来访问每个批次的数据。例如：

```python
for g, features, labels in data_loader:
    # 在这里执行训练代码
    pass
```

这样，可以在训练循环中轻松地迭代整个数据集，并在每个步骤中获取一个包含指定批次大小的数据。



**dataset要求**：继承torch.utils.data.Dataset

`Dataset` 是 PyTorch 中用于表示数据集的抽象类，通过继承这个类并实现相应的方法来创建自定义的数据集。

一个 PyTorch 的自定义数据集通常需要满足以下要求：

1. **继承 `torch.utils.data.Dataset` 类：** 数据集类应该继承自 `torch.utils.data.Dataset`，这是 PyTorch 提供的用于表示数据集的基础类。

2. **实现 `__len__` 方法：** 实现 `__len__` 方法以返回数据集的总样本数量。这个方法在使用 `len(dataset)` 时会被调用。

3. **实现 `__getitem__` 方法：** 实现 `__getitem__` 方法以返回一个样本。这个方法在使用 `dataset[i]` 时会被调用。返回值通常是一个包含输入和标签的元组。

以下是一个简单的例子：

```python
import torch
from torch.utils.data import Dataset

class MyDataset(Dataset):
    def __init__(self, data, labels):
        self.data = data
        self.labels = labels

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        sample = {'data': self.data[idx], 'label': self.labels[idx]}
        return sample

# 使用示例
data = torch.randn(100, 3)  # 100个样本，每个样本有3个特征
labels = torch.randint(0, 2, (100,))  # 二分类标签

my_dataset = MyDataset(data, labels)
```

在上面的例子中，`MyDataset` 类接受数据和标签作为参数，并实现了 `__len__` 和 `__getitem__` 方法。这个简单的数据集可以用于创建一个 `DataLoader`，使得可以在训练循环中方便地迭代数据。



## torch.nn.Embedding

`nn.Embedding` 是 PyTorch 中用于创建嵌入层（Embedding Layer）的类。这一层通常用于将整数索引映射到固定大小的密集向量（嵌入向量）。嵌入层在自然语言处理（NLP）和推荐系统等领域广泛使用。

构造函数的基本形式为：

```python
nn.Embedding(num_embeddings, embedding_dim, padding_idx=None)
```

- `num_embeddings`: 表示嵌入层中的嵌入矩阵的行数，即不同索引的个数（例如，不同单词的个数）。
- `embedding_dim`: 表示嵌入向量的维度，即每个索引映射到的向量的长度。
- `padding_idx`: 可选参数，如果指定了这个参数，那么在嵌入矩阵中，对应于这个索引的行将被填充为零。

示例用法：

```python
import torch
import torch.nn as nn

# 创建一个嵌入层，用于将单词索引映射到长度为 10 的嵌入向量
embedding_layer = nn.Embedding(num_embeddings=100, embedding_dim=10)

# 输入一个整数索引，获取对应的嵌入向量
word_index = torch.tensor([5])
embedding_vector = embedding_layer(word_index)
```

这将创建一个嵌入层，其中嵌入矩阵的行数为 100（`num_embeddings=100`），每个嵌入向量的维度为 10（`embedding_dim=10`）。然后，通过输入整数索引，可以获取对应的嵌入向量。在实际应用中，这些嵌入向量可以用于表示单词、用户、商品等，以便在神经网络中进行学习。



## 余弦相似度

用于计算两个向量的相似性

> torch.nn.functional.cosine_similarity(*x1*, *x2*, *dim=1*, *eps=1e-8*) → [Tensor](https://pytorch.org/docs/stable/tensors.html#torch.Tensor)

Returns cosine similarity between `x1` and `x2`, computed along dim. `x1` and `x2` must be broadcastable to a common shape. `dim` refers to the dimension in this common shape. Dimension `dim` of the output is squeezed (see [`torch.squeeze()`](https://pytorch.org/docs/stable/generated/torch.squeeze.html#torch.squeeze)), resulting in the output tensor having 1 fewer dimension.

- Parameters

  **x1** ([*Tensor*](https://pytorch.org/docs/stable/tensors.html#torch.Tensor)) – First input.

  **x2** ([*Tensor*](https://pytorch.org/docs/stable/tensors.html#torch.Tensor)) – Second input.

  **dim** ([*int*](https://docs.python.org/3/library/functions.html#int)*,* *optional*) – Dimension along which cosine similarity is computed. Default: 1

  **eps** ([*float*](https://docs.python.org/3/library/functions.html#float)*,* *optional*) – Small value to avoid division by zero. Default: 1e-8

```python
input1 = torch.randn(100, 128)
input2 = torch.randn(100, 128)
output = F.cosine_similarity(input1, input2)
print(output)
```





## 评价矩阵

使用 [torchmetrics](https://lightning.ai/docs/torchmetrics/latest/pages/quickstart.html)

```bash
pip install torchmetrics
```

基本使用方法：

```python
from torchmetrics.classification import BinaryPrecision
from torchmetrics.classification import BinaryRecall
from torchmetrics.classification import BinaryF1Score
from torchmetrics.classification import BinaryAUROC

# 计算 precision
precision_metrics = BinaryPrecision().to(device)
precision= precision_metrics(output, labels)

# 计算 recall
recall_metrics = BinaryRecall().to(device)
recall = recall_metrics(output, labels)

# 计算F1
f1_metrics = BinaryF1Score().to(device)
f1 = f1_metrics(output, labels)

# 计算AUC
metric = BinaryAUROC(thresholds=None).to(device)
auc = metric(output, labels)

```







## 常用API

```python
def threshold_tensor(input_tensor, threshold=0.5):
    """
    将小数张量进行阈值处理，大于阈值的元素变成 1，小于等于阈值的元素变成 0。

    :param input_tensor: 输入的小数张量
    :type input_tensor: torch.Tensor
    :param threshold: 阈值，默认为0.5
    :type threshold: float
    :return: 处理后的二值张量
    :rtype: torch.Tensor
    """
    binary_tensor = torch.where(input_tensor > threshold, 1.0, 0.0)
    return binary_tensor


def count_equal_elements(tensor1, tensor2):
    """
    计算两个张量中相等元素的数量。

    :param tensor1: 第一个张量
    :type tensor1: torch.Tensor
    :param tensor2: 第二个张量
    :type tensor2: torch.Tensor
    :return: 相等元素的数量
    :rtype: int
    """
    equal_elements = torch.eq(tensor1, tensor2)
    count = torch.sum(equal_elements).item()
    return count


def count_elements_equal_to_value(tensor1, tensor2, value):
    """
    计算两个张量中等于特定值的相等元素的数量。

    :param tensor1: 第一个张量
    :type tensor1: torch.Tensor
    :param tensor2: 第二个张量
    :type tensor2: torch.Tensor
    :param value: 特定的值
    :type value: float
    :return: 等于特定值的相等元素的数量
    :rtype: int
    """
    equal_to_value = (tensor1 == value) & (tensor2 == value)
    count = torch.sum(equal_to_value).item()
    return count


def count_values_equal_to(tensor, value):
    """
    统计张量中等于特定值的元素的数量。

    :param tensor: 输入的张量
    :type tensor: torch.Tensor
    :param value: 特定的值
    :type value: float
    :return: 等于特定值的元素的数量
    :rtype: int
    """
    equal_to_value = torch.eq(tensor, value)
    count = torch.sum(equal_to_value).item()
    return count
```
