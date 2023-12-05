import{_ as n,o as a,c as s,a as e}from"./app-86b9e8e5.js";const p={},t=e(`<h1 id="python-usage" tabindex="-1"><a class="header-anchor" href="#python-usage" aria-hidden="true">#</a> Python Usage</h1><h2 id="zip" tabindex="-1"><a class="header-anchor" href="#zip" aria-hidden="true">#</a> zip</h2><p><code>zip(a, b)</code> 是一个内置函数，它将两个可迭代对象 <code>a</code> 和 <code>b</code> 中对应位置的元素打包成一个元组，并返回一个迭代器。这个迭代器生成的元组依次包含来自输入可迭代对象的对应位置的元素。</p><p>例如：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;c&#39;</span><span class="token punctuation">]</span>

<span class="token comment"># 使用 zip 将两个列表打包</span>
zipped <span class="token operator">=</span> <span class="token builtin">zip</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>

<span class="token comment"># 转换为列表查看结果</span>
result <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span>zipped<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[(1, &#39;a&#39;), (2, &#39;b&#39;), (3, &#39;c&#39;)]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的例子中，<code>zip(a, b)</code> 将列表 <code>a</code> 和 <code>b</code> 中对应位置的元素打包成了元组。在实际应用中，<code>zip</code> 可以用于同时迭代多个可迭代对象，这在构建例如键值对等数据结构时非常有用。</p><h3 id="map-list-zip-batch" tabindex="-1"><a class="header-anchor" href="#map-list-zip-batch" aria-hidden="true">#</a> map(list, zip(*batch))</h3><p><code>map(list, zip(*batch))</code> 是一种常见的 Python 代码，用于将一个包含元组的列表（<code>batch</code>）转置。这种转置操作通常用于处理数据的批处理，特别是在机器学习和深度学习中。</p><p>让我们来解释这段代码的每一部分：</p><ol><li><p><code>zip(*batch)</code>: <code>zip</code> 函数将多个可迭代对象逐个元素打包成元组，而 <code>*batch</code> 语法则将列表 <code>batch</code> 中的元素解压缩为单独的参数传递给 <code>zip</code> 函数。这样，<code>zip(*batch)</code> 将批处理中的元组的第一个元素（所有元组的第一个元素）组合成一个元组，第二个元素组合成一个元组，以此类推。</p></li><li><p><code>map(list, ...)</code>: <code>map</code> 函数将一个函数应用于一个或多个可迭代的参数。在这里，<code>list</code> 函数被应用于 <code>zip(*batch)</code> 的结果，将每个元组转换为列表。</p></li></ol><p>综合起来，<code>map(list, zip(*batch))</code> 的效果是将批处理中的元组转置为列表，其中原始批处理中的第 i 个元组的第 j 个元素变成了转置后列表的第 j 个元素。这通常用于重新组织数据的形状，以适应模型的输入或其他操作的需求。</p><p>下面是一个简单的示例，以更清晰地说明这个过程：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 假设有一个包含元组的列表</span>
batch <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">]</span>

<span class="token comment"># 使用 map(list, zip(*batch)) 进行转置</span>
transposed_batch <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token builtin">map</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">,</span> <span class="token builtin">zip</span><span class="token punctuation">(</span><span class="token operator">*</span>batch<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>transposed_batch<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<code>transposed_batch</code> 将是 <code>[(1, 4, 7), (2, 5, 8), (3, 6, 9)]</code>。这样的转置在某些情况下可能很有用，例如，当你希望将批处理中的不同元组的相应元素组合在一起时。</p><h2 id="dataframe" tabindex="-1"><a class="header-anchor" href="#dataframe" aria-hidden="true">#</a> DataFrame</h2><h4 id="统计数目" tabindex="-1"><a class="header-anchor" href="#统计数目" aria-hidden="true">#</a> 统计数目</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 统计 &#39;column_name&#39; 列中等于目标值的数量 </span>
count_target <span class="token operator">=</span> <span class="token punctuation">(</span>df<span class="token punctuation">[</span><span class="token string">&#39;column_name&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> target_value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token builtin">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="随机取样" tabindex="-1"><a class="header-anchor" href="#随机取样" aria-hidden="true">#</a> 随机取样</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pandas <span class="token keyword">as</span> pd
<span class="token comment"># 采样n个数据</span>
<span class="token comment"># 列 panda.series</span>
sampled_data <span class="token operator">=</span> df<span class="token punctuation">[</span><span class="token string">&#39;column_name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>sample<span class="token punctuation">(</span>n<span class="token punctuation">,</span> random_state<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token comment"># z</span>
<span class="token comment"># 全部数据 panda.DataFrame</span>
sampled_df <span class="token operator">=</span> df<span class="token punctuation">.</span>sample<span class="token punctuation">(</span>n<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="拼接" tabindex="-1"><a class="header-anchor" href="#拼接" aria-hidden="true">#</a> 拼接</h4><p>在 pandas 中，你可以使用 <code>concat</code> 函数来拼接两个 DataFrame。这个函数可以按行或按列进行拼接，具体取决于传递给 <code>axis</code> 参数的值。</p><p>以下是一个简单的例子，展示如何按行拼接两个 DataFrame：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pandas <span class="token keyword">as</span> pd

<span class="token comment"># 创建两个示例 DataFrame</span>
df1 <span class="token operator">=</span> pd<span class="token punctuation">.</span>DataFrame<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&#39;A&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&#39;B&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
df2 <span class="token operator">=</span> pd<span class="token punctuation">.</span>DataFrame<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&#39;A&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&#39;B&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment"># 按行拼接两个 DataFrame</span>
result <span class="token operator">=</span> pd<span class="token punctuation">.</span>concat<span class="token punctuation">(</span><span class="token punctuation">[</span>df1<span class="token punctuation">,</span> df2<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment"># 打印结果</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将输出:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>   A  B
0  1  3
1  2  4
0  5  7
1  6  8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<code>pd.concat([df1, df2])</code> 会将 <code>df2</code> 添加到 <code>df1</code> 的下面，形成一个新的 DataFrame。<code>axis</code> 参数默认为 0，表示按行拼接。</p><p>如果按列拼接，可以将 <code>axis</code> 参数设置为 1：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>result <span class="token operator">=</span> pd<span class="token punctuation">.</span>concat<span class="token punctuation">(</span><span class="token punctuation">[</span>df1<span class="token punctuation">,</span> df2<span class="token punctuation">]</span><span class="token punctuation">,</span> axis<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>   A  B  A  B
0  1  3  5  7
1  2  4  6  8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<code>axis=1</code> 表示按列拼接两个 DataFrame。</p><h4 id="重置索引" tabindex="-1"><a class="header-anchor" href="#重置索引" aria-hidden="true">#</a> 重置索引</h4><p>在 pandas 中，你可以使用 <code>reset_index</code> 方法来重置 DataFrame 的索引。这个方法会生成一个新的 DataFrame，其中包含原始数据框的数据，但索引被重新设置为默认的整数索引。以下是一个简单的例子：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pandas <span class="token keyword">as</span> pd

<span class="token comment"># 创建一个示例 DataFrame</span>
data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;A&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&#39;B&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
df <span class="token operator">=</span> pd<span class="token punctuation">.</span>DataFrame<span class="token punctuation">(</span>data<span class="token punctuation">)</span>

<span class="token comment"># 重置索引</span>
df_reset <span class="token operator">=</span> df<span class="token punctuation">.</span>reset_index<span class="token punctuation">(</span>drop<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

<span class="token comment"># 打印重置索引后的 DataFrame</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>df_reset<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<code>reset_index(drop=True)</code> 会生成一个新的 DataFrame <code>df_reset</code>，其中包含了原始数据框的数据，但索引被重新设置为默认的整数索引，并通过 <code>drop=True</code> 参数移除了原始索引列。</p><p>如果想在原始 DataFrame 上直接修改索引，而不生成一个新的 DataFrame，你可以使用 <code>inplace=True</code> 参数：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>df<span class="token punctuation">.</span>reset_index<span class="token punctuation">(</span>drop<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> inplace<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="深拷贝" tabindex="-1"><a class="header-anchor" href="#深拷贝" aria-hidden="true">#</a> 深拷贝</h4><p><code>df.copy()</code> 是 pandas 中用于复制 DataFrame 的方法。这个方法会创建 DataFrame 的一个深拷贝，即复制了原始数据和索引，而不与原始数据框共享任何内存。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 创建 DataFrame 的副本</span>
df_copy <span class="token operator">=</span> df<span class="token punctuation">.</span>copy<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,42),c=[t];function o(i,l){return a(),s("div",null,c)}const d=n(p,[["render",o],["__file","python_usage.html.vue"]]);export{d as default};
