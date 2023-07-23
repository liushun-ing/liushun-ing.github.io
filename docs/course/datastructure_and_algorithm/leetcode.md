# leetcode菜鸡啃题

## 1 只出现一次数字

给定一个**非空**整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

> 菜狗思路

搞个set，如果已经存在删掉，不存在就加进去，最后剩下的就是单独的那个

```java
public int singleNumber(int[] nums) {
    HashSet<Integer> set = new HashSet<>();
    for(int i = 0; i < nums.length; i++) {
        if (set.contains(nums[i])) {
            set.remove(nums[i]);
        } else {
            set.add(nums[i]);
        }
    }
    return set.iterator().next().intValue();
}
```

> 大佬思路

使用位运算的异或

自己与自己异或为0，任何数与0异或的自己，异或满足交换律和集合律，所以直接对整个数组进行异或，即可得到最终的结果

```java
public int singleNumber(int[] nums) {
    int single = 0;
    for (int num : nums) {
        single ^= num;
    }
    return single;
}
```



## 2 多数元素

给定一个大小为 `n` 的数组 `nums` ，返回其中的多数元素。多数元素是指在数组中出现次数 **大于** `⌊ n/2 ⌋` 的元素。

> 菜狗思路

仍然只能想到用hashMap，记录次数，然后找记录最多的那个数

> 大佬思路

1、直接排序，找下标大于等于`n/2`的数即可，众数的下标总大于等于`n/2`

2、分治算法，整个数组的众数一定是左右两边的众数中的一个，所以可以不断分支，知道子数组长度为一，一定是众数，之后回溯的时候，只需要判断左右两边的众数那个居多即可，时间O*(*n*logn)，空间O(logn)。

```java
class Solution {
    private int countInRange(int[] nums, int num, int lo, int hi) {
        int count = 0;
        for (int i = lo; i <= hi; i++) {
            if (nums[i] == num) {
                count++;
            }
        }
        return count;
    }

    private int majorityElementRec(int[] nums, int lo, int hi) {
        if (lo == hi) {
            return nums[lo];
        }
        int mid = (hi - lo) / 2 + lo;
        int left = majorityElementRec(nums, lo, mid);
        int right = majorityElementRec(nums, mid + 1, hi);
        if (left == right) {
            return left;
        }
        int leftCount = countInRange(nums, left, lo, hi);
        int rightCount = countInRange(nums, right, lo, hi);
        return leftCount > rightCount ? left : right;
    }

    public int majorityElement(int[] nums) {
        return majorityElementRec(nums, 0, nums.length - 1);
    }
}
```

3、Boyer-Moore 投票算法，只能说很牛逼，线性时间，常数空间

- 维护一个候选众数 candidate 和它出现的次数 count。初始时 candidate 可以为任意值，count 为 0；

- 我们遍历数组 nums 中的所有元素，对于每个元素 x，在判断 x 之前，如果 count 的值为 0，我们先将 x 的值赋予 candidate，随后我们判断 x：

  - 如果 x 与 candidate 相等，那么计数器 count 的值增加 1；

  - 如果 x 与 candidate 不等，那么计数器 count 的值减少 1。

- 在遍历完成后，candidate 即为整个数组的众数。


```java
public static int majorityElement(int[] nums) {
    int candidate = 0, count = 0;
    for (int num : nums) {
        if (count == 0) {
            candidate = num;
            count++;
        } else {
            if (num == candidate) {
                count++;
            } else {
                count--;
            }
        }
    }
    return candidate;
}
```



## 3 三数之和-梦破碎的地方

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

> 菜鸡做法：

先排序，然后用双重循环，其中使用hashMap和hashSet辅助查找和判断是否重复，老复杂了，需要处理的细节很多

> 大佬做法

使用双指针，再第二重循环的时候使用双指针，从两头往中间靠，防止重复

```java
public List<List<Integer>> threeSum(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    if (nums == null || nums.length < 3) return res;
    Arrays.sort(nums);
    int len = nums.length;
    // 确定一个然后双指针
    for (int i = 0; i < len - 2; i++) {
        // 剪枝
        if(nums[i] > 0) break;
        // 对nums[i]进行去重
        if(i > 0 && nums[i] == nums[i - 1]) continue;
        int l = i + 1, r = len - 1;
        while (l < r) {
            // 分为三类,每次根据sum与0关系移动l或者r一次
            int sum = nums[i] + nums[l] + nums[r];
            // sum太小:左指针右移使得变大
            if (sum < 0) l++;
            else if(sum > 0) r--;
            else {
                // 加入结果
                res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                // 去重:l与r均需移动到跟当前位不一样的数字上
                int tmpL = nums[l], tmpR = nums[r];
                while (l < r && nums[l] == tmpL) l++;
                while (l < r && nums[r] == tmpR) r--;
            }
        }
    }
    return res;
}
```



下面还是使用c++语言

## 4 第K大整数

给你一个字符串数组 nums 和一个整数 k 。nums 中的每个字符串都表示一个不含前导零的整数。

返回 nums 中表示第 k 大整数的字符串。

注意：重复的数字在统计时会视为不同元素考虑。例如，如果 nums 是 ["1","2","2"]，那么 "2" 是最大的整数，"2" 是第二大的整数，"1" 是第三大的整数。

> 这里考察自定义排序规则

```c++
string kthLargestNumber(vector<string>& nums, int k) {
    // 自定义比较函数，在 s1 对应的整数较大时返回 true，反之返回 false
    auto cmp = [](const string& s1, const string& s2) -> bool{
        // 首先比较字符串长度
        if (s1.size() > s2.size()){
            return true;
        }
        else if (s1.size() < s2.size()){
            return false;
        }
        else{
            // 长度相等时比较字符串字典序大小
            return s1 > s2;
        }
    };

    sort(nums.begin(), nums.end(), cmp);
    return nums[k-1];
}
```



但是我感觉这样直接排序时间复杂度是不是太大了，可以先进行一部分删选然后在排序

```c++
string kthLargestNumber(vector<string>& nums, int k) {
    // 先确定他在哪个长度区间，然后在进行排序
	int a[100] = {0};
	for(int i=0; i<nums.size(); i++) {
		a[nums[i].length() - 1]++;
	}
	int j=99;
	for(; j>=0; j--) {
		if(k > a[j])
			k = k - a[j];
		else
			break;
	}
	for(vector<string>::iterator iter=nums.begin(); iter != nums.end(); iter++) {
		if((*iter).length() != j+1) {
			nums.erase(iter);
			iter--;
		}
	}
	sort(nums.begin(), nums.end());
	return nums[nums.size() - k];	
}
```



## 5 1比特与2比特字符

有两种特殊字符：

第一种字符可以用一比特 0 表示
第二种字符可以用两比特（10 或 11）表示
给你一个以 0 结尾的二进制数组 bits ，如果最后一个字符必须是一个一比特字符，则返回 true 。

这个比较简单，只需要正向遍历数组（注意终止条件），如果是1开头就前进两位，否则前进一位，只需要注意一下最后停的位置是不是数组末端

```c++
bool isOneBitCharacter(vector<int>& bits) {
	int i = 0;
	for(; i<bits.size() - 1; i++) {
		if(bits[i] == 1) {
			i+=1;
		}
	}
	return i == bits.size() - 1;
}
```



## 6 二叉搜索树中的中序后继

给定一棵二叉搜索树和其中的一个节点p，找到该节点在树中的中序后继。如果节点没有中序后继，请返回null。

节点 p 的后继是值比 p.val 大的节点中键值最小的节点，即按中序遍历的顺序节点 p 的下一个节点。

> 做法一，就按照中序遍历方式，记录节点p出现的位置，找到该位置的下一个节点即可

```c++
TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
    stack<TreeNode*> tree;
    set<int> value;
    tree.push(root);
    value.insert(root->val); // 记录是否访问过
    TreeNode* temp;
    bool prev = false;
    while(!tree.empty()) {
    	temp = tree.top();
		if(temp->left != NULL && value.find(temp->val) == value.end()) {
			tree.push(temp->left);
		} else {
			if(prev) {
				return temp;
			}
            value.insert(temp->val);
			tree.pop();
			if(temp->val == p->val) {
				prev = true;
			}
			if(temp->right != NULL) {
				tree.push(temp->right);
			}
		}
	}
	return NULL;
}
// 自己写的代码，还需要有一个额外的set来记录是否访问，官方给的就用了一种方法，奇妙的解决了这种问题
TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
    stack<TreeNode*> st;
    TreeNode *prev = nullptr, *curr = root;
    while (!st.empty() || curr != nullptr) {
        while (curr != nullptr) {
            st.emplace(curr);
            curr = curr->left;
        }
        curr = st.top();
        st.pop();
        if (prev == p) {
            return curr;
        }
        prev = curr;
        curr = curr->right;  // 每次直接将当前节点赋值为右子节点，然后先循环，z取top
    }
    return nullptr;
}
// 人傻了，中序遍历不需要记录是否已访问，菜狗
void inOrder(BiTree T) {
    InitStack(S);
    BiTree p = T;
    while(p || !IsEmpty(S)) {
        if(p) {
            Push(S, p);
            p = p->lchild;
        } else {
            Pop(S, p);
            visit(p);
            p = p->rchild;
        }
    }
}
/*
1.沿着根的左孩子，依次入栈，直到左孩子为空，说明已找到可以输出的结点
2.栈顶元素出栈并访问:若其右孩子为空，继续执行2;若其右孩子不空，将右子树转执行1
*/
```

> 做法二，利用二叉搜索树的性质

如果他有右子树，就找右子树的最左孩子

如果没有右子树，就利用二叉搜索树的性质，后继节点一定是值比他大的节点，或者为NULL，

所以不断的二分比较就行了，知道比较到空节点，这里需要注意的是，只有节点大于的时候，才保存这个successor（这里好难理解，菜狗），其实就是记录大于他的节点中的最小的哪个，所以才需要只有大于的时候才更新节点。

```c++
TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
    TreeNode *successor = nullptr;
    if (p->right != nullptr) {
        successor = p->right;
        while (successor->left != nullptr) {
            successor = successor->left;
        }
        return successor;
    }
    TreeNode *node = root;
    while (node != nullptr) {
        if (node->val > p->val) {
            successor = node;
            node = node->left;
        } else {
            node = node->right;
        }
    }
    return successor;
}
```



## 7 第N位数字

给你一个整数 `n` ，请你在无限的整数序列 `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...]` 中找出并返回第 `n` 位上的数字。比如11，结果是0。

> 做法

先找到他是所属的位置是多少位的，然后再进一步细分它属于哪个数字，然后再提取出对应的位置的数字

一位数字1-9 共9个，二位数字10-99共99个，三位数字100-999共900个，于是可以找到规律，不断地进行减法，便可以确定他所属的位置是多少位的，也就是处于那一组。

然后再对位数作除法，便可以知道他是这一组中的第几个数字

最后就是简单的提取某一位的数字

```c++
int findNthDigit(int n) {
	// int型不够 
	long x = 1, curr = 9, pre = 0, pos = 9;
	if(n <= 9) {
		return n;
	}
    // 不断做减法，直到到达瓶颈
	while(n > curr) {
		x++;
		pre = curr;
		pos = pos * 10;
		curr = pos * x;
		n -= pre;
	}
    // 确定第几个数字
	int div, res, result;
	div = n / x - 1;
	res = n % x;
	div += res == 0 ? pow(10, x - 1) : 1 + pow(10, x - 1); 
	res = res == 0 ? res + 1 : x - res + 1;
    // 提取数字
	while(res >= 1) {
		result = div % 10;
		div /= 10;
		res--;
	}
	return result;
} 
```

