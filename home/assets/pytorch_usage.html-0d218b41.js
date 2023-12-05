import{_ as o,r as p,o as c,c as i,b as n,d as s,e,a as t}from"./app-86b9e8e5.js";const l={},u=t(`<h1 id="pytorch-usage" tabindex="-1"><a class="header-anchor" href="#pytorch-usage" aria-hidden="true">#</a> Pytorch Usage</h1><p>记录一些用到的pytorch函数的用法</p><h2 id="torch-tensor" tabindex="-1"><a class="header-anchor" href="#torch-tensor" aria-hidden="true">#</a> torch.tensor</h2><h3 id="创建" tabindex="-1"><a class="header-anchor" href="#创建" aria-hidden="true">#</a> 创建</h3><p><code>torch.tensor</code> 是 PyTorch 中用于创建张量（tensor）的函数。张量是 PyTorch 中表示多维数据的基本数据结构，类似于 NumPy 中的数组。</p><p>有多种方式可以使用 <code>torch.tensor</code> 创建张量。以下是一些例子：</p><ol><li><p><strong>从列表创建张量：</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> torch

<span class="token comment"># 1D tensor from a list</span>
tensor_1d <span class="token operator">=</span> torch<span class="token punctuation">.</span>tensor<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># 2D tensor from a list of lists</span>
tensor_2d <span class="token operator">=</span> torch<span class="token punctuation">.</span>tensor<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>从 NumPy 数组创建张量：</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> torch

numpy_array <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
tensor_from_numpy <span class="token operator">=</span> torch<span class="token punctuation">.</span>tensor<span class="token punctuation">(</span>numpy_array<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>指定数据类型：</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> torch

<span class="token comment"># Create a tensor with a specific data type</span>
tensor_float <span class="token operator">=</span> torch<span class="token punctuation">.</span>tensor<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">,</span> <span class="token number">3.0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> dtype<span class="token operator">=</span>torch<span class="token punctuation">.</span>float32<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>空张量：</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> torch

<span class="token comment"># Create an empty tensor</span>
empty_tensor <span class="token operator">=</span> torch<span class="token punctuation">.</span>tensor<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p><code>torch.tensor</code> 还支持其他参数和选项，例如设备（CPU 或 GPU）、是否要求梯度等。</p><h3 id="获取数值" tabindex="-1"><a class="header-anchor" href="#获取数值" aria-hidden="true">#</a> 获取数值</h3><p><strong>1、单个值</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>tensor<span class="token punctuation">.</span>item<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>2、多值或数组</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>tensor<span class="token punctuation">.</span>tolist<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="torch-eye" tabindex="-1"><a class="header-anchor" href="#torch-eye" aria-hidden="true">#</a> torch.eye</h2><p><code>torch.eye(4)</code> 是使用 PyTorch 创建一个大小为 4x4 的单位矩阵的操作。单位矩阵是一个方阵，其对角线上的元素都是 1，而其它位置的元素都是 0。</p><p>具体地说，<code>torch.eye(4)</code> 返回一个如下形式的矩阵：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1  0  0  0
0  1  0  0
0  0  1  0
0  0  0  1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个 4x4 的矩阵，对角线上的元素都是 1，其它位置的元素都是 0。</p><h2 id="torch-utils-data-dataloader" tabindex="-1"><a class="header-anchor" href="#torch-utils-data-dataloader" aria-hidden="true">#</a> torch.utils.data.DataLoader</h2><p><code>DataLoader</code> 是 PyTorch 中用于加载数据的工具，它可以对数据进行批处理、打乱和并行加载等操作。在你的代码中，使用 <code>DataLoader</code> 来创建一个数据加载器，这样你就可以方便地在训练循环中迭代数据批次。</p><p>具体到代码片段：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>data_loader <span class="token operator">=</span> DataLoader<span class="token punctuation">(</span>dataset<span class="token punctuation">,</span> batch_size<span class="token operator">=</span>batch_size<span class="token punctuation">,</span> shuffle<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这一行代码创建了一个数据加载器，从 <code>dataset</code> 中加载数据。参数的含义：</p><ul><li><code>dataset</code>: 加载的数据集对象。</li><li><code>batch_size</code>: 指定每个批次中包含的样本数。在训练神经网络时，通常会选择一个适当的批次大小，以充分利用 GPU 并加速训练。</li><li><code>shuffle</code>: 如果设置为 <code>True</code>，数据加载器会在每个 epoch 开始时打乱数据，这有助于模型更好地学习。</li></ul><p>使用 <code>DataLoader</code> 后，通过迭代数据加载器来访问每个批次的数据。例如：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">for</span> g<span class="token punctuation">,</span> features<span class="token punctuation">,</span> labels <span class="token keyword">in</span> data_loader<span class="token punctuation">:</span>
    <span class="token comment"># 在这里执行训练代码</span>
    <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，可以在训练循环中轻松地迭代整个数据集，并在每个步骤中获取一个包含指定批次大小的数据。</p><p><strong>dataset要求</strong>：继承torch.utils.data.Dataset</p><p><code>Dataset</code> 是 PyTorch 中用于表示数据集的抽象类，通过继承这个类并实现相应的方法来创建自定义的数据集。</p><p>一个 PyTorch 的自定义数据集通常需要满足以下要求：</p><ol><li><p><strong>继承 <code>torch.utils.data.Dataset</code> 类：</strong> 数据集类应该继承自 <code>torch.utils.data.Dataset</code>，这是 PyTorch 提供的用于表示数据集的基础类。</p></li><li><p><strong>实现 <code>__len__</code> 方法：</strong> 实现 <code>__len__</code> 方法以返回数据集的总样本数量。这个方法在使用 <code>len(dataset)</code> 时会被调用。</p></li><li><p><strong>实现 <code>__getitem__</code> 方法：</strong> 实现 <code>__getitem__</code> 方法以返回一个样本。这个方法在使用 <code>dataset[i]</code> 时会被调用。返回值通常是一个包含输入和标签的元组。</p></li></ol><p>以下是一个简单的例子：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> torch
<span class="token keyword">from</span> torch<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>data <span class="token keyword">import</span> Dataset

<span class="token keyword">class</span> <span class="token class-name">MyDataset</span><span class="token punctuation">(</span>Dataset<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> data<span class="token punctuation">,</span> labels<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>data <span class="token operator">=</span> data
        self<span class="token punctuation">.</span>labels <span class="token operator">=</span> labels

    <span class="token keyword">def</span> <span class="token function">__len__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">len</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>data<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__getitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> idx<span class="token punctuation">)</span><span class="token punctuation">:</span>
        sample <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">:</span> self<span class="token punctuation">.</span>data<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&#39;label&#39;</span><span class="token punctuation">:</span> self<span class="token punctuation">.</span>labels<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">}</span>
        <span class="token keyword">return</span> sample

<span class="token comment"># 使用示例</span>
data <span class="token operator">=</span> torch<span class="token punctuation">.</span>randn<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>  <span class="token comment"># 100个样本，每个样本有3个特征</span>
labels <span class="token operator">=</span> torch<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 二分类标签</span>

my_dataset <span class="token operator">=</span> MyDataset<span class="token punctuation">(</span>data<span class="token punctuation">,</span> labels<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，<code>MyDataset</code> 类接受数据和标签作为参数，并实现了 <code>__len__</code> 和 <code>__getitem__</code> 方法。这个简单的数据集可以用于创建一个 <code>DataLoader</code>，使得可以在训练循环中方便地迭代数据。</p><h2 id="torch-nn-embedding" tabindex="-1"><a class="header-anchor" href="#torch-nn-embedding" aria-hidden="true">#</a> torch.nn.Embedding</h2><p><code>nn.Embedding</code> 是 PyTorch 中用于创建嵌入层（Embedding Layer）的类。这一层通常用于将整数索引映射到固定大小的密集向量（嵌入向量）。嵌入层在自然语言处理（NLP）和推荐系统等领域广泛使用。</p><p>构造函数的基本形式为：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>nn<span class="token punctuation">.</span>Embedding<span class="token punctuation">(</span>num_embeddings<span class="token punctuation">,</span> embedding_dim<span class="token punctuation">,</span> padding_idx<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>num_embeddings</code>: 表示嵌入层中的嵌入矩阵的行数，即不同索引的个数（例如，不同单词的个数）。</li><li><code>embedding_dim</code>: 表示嵌入向量的维度，即每个索引映射到的向量的长度。</li><li><code>padding_idx</code>: 可选参数，如果指定了这个参数，那么在嵌入矩阵中，对应于这个索引的行将被填充为零。</li></ul><p>示例用法：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> torch
<span class="token keyword">import</span> torch<span class="token punctuation">.</span>nn <span class="token keyword">as</span> nn

<span class="token comment"># 创建一个嵌入层，用于将单词索引映射到长度为 10 的嵌入向量</span>
embedding_layer <span class="token operator">=</span> nn<span class="token punctuation">.</span>Embedding<span class="token punctuation">(</span>num_embeddings<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">,</span> embedding_dim<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span>

<span class="token comment"># 输入一个整数索引，获取对应的嵌入向量</span>
word_index <span class="token operator">=</span> torch<span class="token punctuation">.</span>tensor<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
embedding_vector <span class="token operator">=</span> embedding_layer<span class="token punctuation">(</span>word_index<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将创建一个嵌入层，其中嵌入矩阵的行数为 100（<code>num_embeddings=100</code>），每个嵌入向量的维度为 10（<code>embedding_dim=10</code>）。然后，通过输入整数索引，可以获取对应的嵌入向量。在实际应用中，这些嵌入向量可以用于表示单词、用户、商品等，以便在神经网络中进行学习。</p><h2 id="余弦相似度" tabindex="-1"><a class="header-anchor" href="#余弦相似度" aria-hidden="true">#</a> 余弦相似度</h2><p>用于计算两个向量的相似性</p>`,44),r=n("em",null,"x1",-1),d=n("em",null,"x2",-1),k=n("em",null,"dim=1",-1),m=n("em",null,"eps=1e-8",-1),v={href:"https://pytorch.org/docs/stable/tensors.html#torch.Tensor",target:"_blank",rel:"noopener noreferrer"},b=n("code",null,"x1",-1),h=n("code",null,"x2",-1),_=n("code",null,"x1",-1),y=n("code",null,"x2",-1),g=n("code",null,"dim",-1),f=n("code",null,"dim",-1),x={href:"https://pytorch.org/docs/stable/generated/torch.squeeze.html#torch.squeeze",target:"_blank",rel:"noopener noreferrer"},q=n("code",null,"torch.squeeze()",-1),w=n("p",null,"Parameters",-1),T=n("strong",null,"x1",-1),D={href:"https://pytorch.org/docs/stable/tensors.html#torch.Tensor",target:"_blank",rel:"noopener noreferrer"},P=n("em",null,"Tensor",-1),B=n("strong",null,"x2",-1),L={href:"https://pytorch.org/docs/stable/tensors.html#torch.Tensor",target:"_blank",rel:"noopener noreferrer"},N=n("em",null,"Tensor",-1),z=n("strong",null,"dim",-1),E={href:"https://docs.python.org/3/library/functions.html#int",target:"_blank",rel:"noopener noreferrer"},C=n("em",null,"int",-1),U=n("em",null,",",-1),F=n("em",null,"optional",-1),R=n("strong",null,"eps",-1),S={href:"https://docs.python.org/3/library/functions.html#float",target:"_blank",rel:"noopener noreferrer"},A=n("em",null,"float",-1),V=n("em",null,",",-1),I=n("em",null,"optional",-1),M=t(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>input1 <span class="token operator">=</span> torch<span class="token punctuation">.</span>randn<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span>
input2 <span class="token operator">=</span> torch<span class="token punctuation">.</span>randn<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span>
output <span class="token operator">=</span> F<span class="token punctuation">.</span>cosine_similarity<span class="token punctuation">(</span>input1<span class="token punctuation">,</span> input2<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>output<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="评价矩阵" tabindex="-1"><a class="header-anchor" href="#评价矩阵" aria-hidden="true">#</a> 评价矩阵</h2>`,2),G={href:"https://lightning.ai/docs/torchmetrics/latest/pages/quickstart.html",target:"_blank",rel:"noopener noreferrer"},O=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pip <span class="token function">install</span> torchmetrics
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>基本使用方法：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> torchmetrics<span class="token punctuation">.</span>classification <span class="token keyword">import</span> BinaryPrecision
<span class="token keyword">from</span> torchmetrics<span class="token punctuation">.</span>classification <span class="token keyword">import</span> BinaryRecall
<span class="token keyword">from</span> torchmetrics<span class="token punctuation">.</span>classification <span class="token keyword">import</span> BinaryF1Score
<span class="token keyword">from</span> torchmetrics<span class="token punctuation">.</span>classification <span class="token keyword">import</span> BinaryAUROC

<span class="token comment"># 计算 precision</span>
precision_metrics <span class="token operator">=</span> BinaryPrecision<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">(</span>device<span class="token punctuation">)</span>
precision<span class="token operator">=</span> precision_metrics<span class="token punctuation">(</span>output<span class="token punctuation">,</span> labels<span class="token punctuation">)</span>

<span class="token comment"># 计算 recall</span>
recall_metrics <span class="token operator">=</span> BinaryRecall<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">(</span>device<span class="token punctuation">)</span>
recall <span class="token operator">=</span> recall_metrics<span class="token punctuation">(</span>output<span class="token punctuation">,</span> labels<span class="token punctuation">)</span>

<span class="token comment"># 计算F1</span>
f1_metrics <span class="token operator">=</span> BinaryF1Score<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">(</span>device<span class="token punctuation">)</span>
f1 <span class="token operator">=</span> f1_metrics<span class="token punctuation">(</span>output<span class="token punctuation">,</span> labels<span class="token punctuation">)</span>

<span class="token comment"># 计算AUC</span>
metric <span class="token operator">=</span> BinaryAUROC<span class="token punctuation">(</span>thresholds<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">(</span>device<span class="token punctuation">)</span>
auc <span class="token operator">=</span> metric<span class="token punctuation">(</span>output<span class="token punctuation">,</span> labels<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用api" tabindex="-1"><a class="header-anchor" href="#常用api" aria-hidden="true">#</a> 常用API</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">threshold_tensor</span><span class="token punctuation">(</span>input_tensor<span class="token punctuation">,</span> threshold<span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    将小数张量进行阈值处理，大于阈值的元素变成 1，小于等于阈值的元素变成 0。

    :param input_tensor: 输入的小数张量
    :type input_tensor: torch.Tensor
    :param threshold: 阈值，默认为0.5
    :type threshold: float
    :return: 处理后的二值张量
    :rtype: torch.Tensor
    &quot;&quot;&quot;</span>
    binary_tensor <span class="token operator">=</span> torch<span class="token punctuation">.</span>where<span class="token punctuation">(</span>input_tensor <span class="token operator">&gt;</span> threshold<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> binary_tensor


<span class="token keyword">def</span> <span class="token function">count_equal_elements</span><span class="token punctuation">(</span>tensor1<span class="token punctuation">,</span> tensor2<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    计算两个张量中相等元素的数量。

    :param tensor1: 第一个张量
    :type tensor1: torch.Tensor
    :param tensor2: 第二个张量
    :type tensor2: torch.Tensor
    :return: 相等元素的数量
    :rtype: int
    &quot;&quot;&quot;</span>
    equal_elements <span class="token operator">=</span> torch<span class="token punctuation">.</span>eq<span class="token punctuation">(</span>tensor1<span class="token punctuation">,</span> tensor2<span class="token punctuation">)</span>
    count <span class="token operator">=</span> torch<span class="token punctuation">.</span><span class="token builtin">sum</span><span class="token punctuation">(</span>equal_elements<span class="token punctuation">)</span><span class="token punctuation">.</span>item<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> count


<span class="token keyword">def</span> <span class="token function">count_elements_equal_to_value</span><span class="token punctuation">(</span>tensor1<span class="token punctuation">,</span> tensor2<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    计算两个张量中等于特定值的相等元素的数量。

    :param tensor1: 第一个张量
    :type tensor1: torch.Tensor
    :param tensor2: 第二个张量
    :type tensor2: torch.Tensor
    :param value: 特定的值
    :type value: float
    :return: 等于特定值的相等元素的数量
    :rtype: int
    &quot;&quot;&quot;</span>
    equal_to_value <span class="token operator">=</span> <span class="token punctuation">(</span>tensor1 <span class="token operator">==</span> value<span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span>tensor2 <span class="token operator">==</span> value<span class="token punctuation">)</span>
    count <span class="token operator">=</span> torch<span class="token punctuation">.</span><span class="token builtin">sum</span><span class="token punctuation">(</span>equal_to_value<span class="token punctuation">)</span><span class="token punctuation">.</span>item<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> count


<span class="token keyword">def</span> <span class="token function">count_values_equal_to</span><span class="token punctuation">(</span>tensor<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    统计张量中等于特定值的元素的数量。

    :param tensor: 输入的张量
    :type tensor: torch.Tensor
    :param value: 特定的值
    :type value: float
    :return: 等于特定值的元素的数量
    :rtype: int
    &quot;&quot;&quot;</span>
    equal_to_value <span class="token operator">=</span> torch<span class="token punctuation">.</span>eq<span class="token punctuation">(</span>tensor<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
    count <span class="token operator">=</span> torch<span class="token punctuation">.</span><span class="token builtin">sum</span><span class="token punctuation">(</span>equal_to_value<span class="token punctuation">)</span><span class="token punctuation">.</span>item<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> count
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function j(H,J){const a=p("ExternalLinkIcon");return c(),i("div",null,[u,n("blockquote",null,[n("p",null,[s("torch.nn.functional.cosine_similarity("),r,s(", "),d,s(", "),k,s(", "),m,s(") → "),n("a",v,[s("Tensor"),e(a)])])]),n("p",null,[s("Returns cosine similarity between "),b,s(" and "),h,s(", computed along dim. "),_,s(" and "),y,s(" must be broadcastable to a common shape. "),g,s(" refers to the dimension in this common shape. Dimension "),f,s(" of the output is squeezed (see "),n("a",x,[q,e(a)]),s("), resulting in the output tensor having 1 fewer dimension.")]),n("ul",null,[n("li",null,[w,n("p",null,[T,s(" ("),n("a",D,[P,e(a)]),s(") – First input.")]),n("p",null,[B,s(" ("),n("a",L,[N,e(a)]),s(") – Second input.")]),n("p",null,[z,s(" ("),n("a",E,[C,e(a)]),U,s(),F,s(") – Dimension along which cosine similarity is computed. Default: 1")]),n("p",null,[R,s(" ("),n("a",S,[A,e(a)]),V,s(),I,s(") – Small value to avoid division by zero. Default: 1e-8")])])]),M,n("p",null,[s("使用 "),n("a",G,[s("torchmetrics"),e(a)])]),O])}const Q=o(l,[["render",j],["__file","pytorch_usage.html.vue"]]);export{Q as default};
