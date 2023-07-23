# c++用法

## map

C++ 中 map 提供的是一种键值对容器，里面的数据都是成对出现的：每一对中的第一个值称之为关键字(key)，每个关键字只能在 map 中出现一次；第二个称之为该关键字的对应值。

### 创建

```c++
#include<map> // STL头文件没有扩展名.h

map<int, string> person;

// 键和值分别通过first和second访问
```

### 操作

```c++
// 插入
person.insert(pair<int,string> (1,"Jim"));
person.insert(map<int, string>::value_type (2, "Tom"));
mapPerson[3] = "Jerry";  // 直接以数组的方式，键就是3，类似于js的方式
// 注意重复插入不会进行替换,而是保留第一个的值

// 删除
iterator erase(iterator it); //通过一个条目对象删除
iterator erase(iterator first，iterator last)；	//删除一个范围
size_type erase(const Key&key);	//通过关键字删除
clear()；//就相当于enumMap.erase(enumMap.begin(),enumMap.end());
    
// 查找
// find() 函数返回一个迭代器指向键值为 key 的元素，如果没找到就返回指向 map 尾部的迭代器。  
map<int ,string > ::iterator l_it;
l_it = maplive.find(112);
if(l_it == maplive.end())
	cout<<"we do not find it"<<endl;
else cout<<"wo find it"<<endl;

// 迭代
// 前向迭代器
map<int, string> ::iterator it;
    map<int, string > ::iterator itEnd;
    it = mapPerson.begin();
    itEnd = mapPerson.end();
    while (it != itEnd) {
	cout<<it->first<<' '<<it->second<<endl;  
	it++;
}
// 反向迭代器
map <int, string> ::reverse_iterator iter;  
for(iter = mapPerson.rbegin(); iter != mapPerson.rend(); iter++) 
	cout<<iter->first<<" "<<iter->second<<endl;

// swap交换,这是两个容器的交换
map<int, int> m1, m2;
ma.swap(m2);

// 大小和空
ma.size();
bool isEmpty = ma.empty();

// Map 中的元素是自动按 key 升序排序,所以不能对 map 用 sort 函数,他也没有这个函数api
```

### 实例问题

给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。

```c++
// 使用map,从头开始遍历,每次查看map中是不是已经存在该元素,如果存在,就判断下标符不符合规范,符合则返回true,否则更新下标,继续往后遍历
bool containsNearbyDuplicate(vector<int>& nums, int k) {
	map<int, int> resMap;
	map<int, int> ::iterator it;
	for(int i=0; i < nums.size(); i++) {
		it = resMap.find(nums[i]);
		if(it == resMap.end()) {
			resMap.insert(pair<int, int>(nums[i], i));
		} else {
			if(abs(it->second - i) <= k) {
				return true;
			} else {
				resMap.erase(it);
				resMap.insert(pair<int, int>(nums[i], i));
			}
		}
	}
	return false;
}
```



## vector

C++ STL中的verctor好比是C语言中的数组，但是vector又具有数组没有的一些高级功能。与数组相比，vector就是一个可以不用在初始化指定大小的变长数组。

### 创建

```c++
#include<vector>

vector<int> v1;
vector<string> v3;
vector<vector<int> >;  //注意空格。这里相当于二维数组int a[n][n];
vector<int> v5 = { 1,2,3,4,5 }; //列表初始化,注意使用的是花括号
vector<string> v6 = { "hi","my","name","is","lee" };
vector<int> v7(5, -1); //初始化为-1,-1,-1,-1,-1。第一个参数是数目，第二个参数是要初始化的值
vector<string> v8(3, "hi");
vector<int> v9(10); //默认初始化为0
vector<int> v10(4); //默认初始化为空字符串
```



### 操作

```c++
// 追加元素
v1.push_back(i); // 在末尾追加


// 遍历
// 下标形式
for (int i = 0; i < v1.size(); i++)
{
	cout << v1[i] << endl;
}
// 正向迭代器
vector<string> v6 = { "hi","my","name","is","lee" };
for (vector<string>::iterator iter = v6.begin(); iter != v6.end(); iter++)
{
	cout << *iter << endl;
	//下面两种方法都可以检查迭代器是否为空
	cout << (*iter).empty() << endl;
	cout << iter->empty() << endl; 
}
// 反向迭代器
for (vector<string>::reverse_iterator iter = v6.rbegin(); iter != v6.rend(); iter++)
{
	cout << *iter << endl;
}


// 插入元素
vector<int> demo{1,2};
//第一种格式用法
demo.insert(demo.begin() + 1, 3);//{1,3,2}
//第二种格式用法
demo.insert(demo.end(), 2, 5);//{1,3,2,5,5}
//第四种格式用法
demo.insert(demo.end(), { 10,11 });//{1,3,2,5,5,7,8,9,10,11}


// 删除元素
demo.pop_back();  // 删除最后一个元素   容器大小不变
auto iter = demo.erase(demo.begin() + 1); //删除第二个元素  容器大小减一
```



## set

set 为集合，是一个**内部自动有序**且**不含重复元素**的容器。

### 创建

```c++
#include<set>

set<int> name;
set<double> name;
set<char> name;
set<vector<int> > name; //如果typename 是一个STL容器，那么定义时要记得在 >>之间要加空格
```



### 操作

```c++
// 插入
demo.insert(x) // 可将 x 插入 set 容器中，并自动递增排序和去重

// 查找
set<int>::iterator it = demo.find(x)

// 删除
st.erase(iterator);
st.erase(value);
st.erase(st.find(300), st.end());

// 遍历
// 正向遍历
for (set<int>::iterator it = st.begin(); it != st.end(); it++) {
    printf("%d ", *it);
}

// 大小和清除
demo.size();
demo.clear();
```



## queue

先进先出的队列

### 创建

```c++
#include<queue>

queue<int> q1;
queue<double> q2;  
queue<char> q3；
//默认为用deque容器实现的queue；
    
queue<char, list<char>>q1；
//用list容器实现的queue 
queue<int, deque<int>>q2；
//用deque容器实现的queue 
```



### 操作

- push() 在队尾插入一个元素
- pop() 删除队列第一个元素
- size() 返回队列中元素个数
- empty() 如果队列空则返回true
- front() 返回队列中的第一个元素
- back() 返回队列中最后一个元素

```c++
// 入队，队尾
queue <string> q;
q.push("first");
q.push("second");

// 出队，队首
q.pop();  // 没有返回值

int s = q.size()；
bool em = q.empty();

// 最后一个元素
int last = q.back();

// 第一个元素
int fisrt = q.front();
```



## stack

先进后出的栈

### 创建

stack 容器适配器的模板有两个参数。第一个参数是存储对象的类型，第二个参数是底层容器的类型。`stack<T>`的底层容器默认是 `deque<T>` 容器，过指定第二个模板类型参数，可以使用任意类型的底层容器，只要它们支持 back()、push_back()、pop_back()、empty()、size() 这些操作

```c++
#include<stack>

stack<string> words;
stack<string, list<string>> fruit;
```

### 操作

- `top()`：返回一个栈顶元素的引用，类型为 T&。如果栈为空，返回值未定义。
- `push(const T& obj)`：可以将对象副本压入栈顶。这是通过调用底层容器的 push_back() 函数完成的。
- `push(T&& obj)`：以移动对象的方式将对象压入栈顶。这是通过调用底层容器的有右值引用参数的 push_back() 函数完成的。
- `pop()`：弹出栈顶元素。
- `size()`：返回栈中元素的个数。
- `empty()`：在栈中没有元素的情况下返回 true。
- `emplace()`：用传入的参数调用构造函数，在栈顶生成对象。
- `swap(stack<T> & other_stack)`：将当前栈中的元素和参数中的元素交换。参数所包含元素的类型必须和当前栈的相同。对于 stack 对象有一个特例化的全局函数 swap() 可以使用。

```c++
stack<int>  q;
q.push(1);
q.push(2);

cout<<"q.size "<<q.size()<<endl;
cout<<"q.top "<<q.top()<<endl;   //输出栈顶元素 

q.pop();	//删除栈顶元素

cout<<"q.size "<<q.size()<<endl;  
cout<<"q.top "<<q.top()<<endl;  // 返回栈顶元素
```

