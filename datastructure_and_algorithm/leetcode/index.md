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

