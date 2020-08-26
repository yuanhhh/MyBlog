---
# sidebar: auto
sidebarDepth: 1
---
# 滑动窗口
## 长度最小的子数组
::: warning 难度: 中等
给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。
:::

```java
class Solution {
    /**
     * 用到滑动窗口的技巧, 以及双指针
     */
    public int minSubArrayLen(int s, int[] nums) {
    int len =nums.length;
        int left=0;
        int right=0;
        int sum=0;
        int min=Integer.MAX_VALUE;
        while(right<len){
            // 右指针右移累加元素
            sum+=nums[right++];
            // 当满足题意, 做边界开始右移,压缩窗口
            while(sum>=s){
                min =Math.min(min, right-left);
                // 左边界右移过程中要删除左侧出窗口的元素
                sum=sum-nums[left];
                // 左指针右移
                left++;
            }
        }
        return min==Integer.MAX_VALUE?0:min;
    }
}
```