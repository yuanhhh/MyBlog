---
# sidebar: auto
sidebarDepth: 1
---
# 位运算
## 位运算技巧一: 数字范围按位与
::: warning 难度: 中等
给定范围 [m, n]，其中 0 <= m <= n <= 2147483647，返回此范围内所有数字的按位与（包含 m, n 两端点）。
:::

```java
class Solution {
    /**
     * 本题使用暴力法, 会有部分用例超时
     * 位运算技巧: 多个数字按位与只要其二进制对应位置上一个为0那么结果该位置必为0, 因此右移过程中,找到他们公共相同位置, 并记录
     * 右移次数;
     */
    public int rangeBitwiseAnd(int m, int n) {
        int count = 0;
        while(m<n){
            m>>=1;
            n>>=1;
            count++;
        }
        return n<<count;
    }
}
```  

## 汉明距离
::: tip 难度: 简单
两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。
给出两个整数 x 和 y，计算它们之间的汉明距离。

注意：
0 ≤ x, y < 231.
:::

```java
class Solution {
    /**
     * x,y 同时右移, 直到完全相等; 在不等的时候, 当二者和位偶数,说明x,y 同为1 或0;
     * 利用了二进制特点: 最低位如果为1必为奇书,反则偶数, 奇数+奇数=偶数, 偶数+偶数=偶数
     */
    public int hammingDistance(int x, int y) {
        // 定义计数器
        int count=0;
        while(x!=y){
            // 符合则计数自增
            if((x+y)%2!=0){
                count++;
            }
            x>>=1;
            y>>=1;
        }
        return count;
    }
}
```

## 位运算技巧二: 只出现一次的数字
::: tip 难度: 简单
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：
你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
:::
#### 解法一: 排序(自己的做法)
```java
class Solution {
    /**
     * 思路: 将数组排序,遍历,步长为2,两两比较,不等则只出现一次的数字原形毕露
     */
    public int singleNumber(int[] nums) {
        if(nums.length==1) return nums[0];
        Arrays.sort(nums);
        for(int i=0;i<nums.length;i+=2){
            if(i==nums.length-1) return nums[i];
            if(nums[i]!=nums[i+1]) return nums[i];
        }
        return 0;
    }
}
```
*****

#### 解法二: 位运算技巧
**异或技巧**
- 相同为0,不同为1
- 任何数与0异或结果为本身
- 任何数与自身异或结果为0
- 异或满足交换律和结合律(类似乘法四则运算中的交换律和结合律)
```java
class Solution {
    public int singleNumber(int[] nums) {
        int single = 0;
        for (int num : nums) {
            single ^= num;
        }
        return single;
    }
}
```

