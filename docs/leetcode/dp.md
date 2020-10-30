---
# sidebar: auto
sidebarDepth: 1
---
# 动态规划
## 连续数列
::: tip 难度: 简单
给定一个整数数组，找出总和最大的连续数列，并返回总和。

示例：

输入： [-2,1,-3,4,-1,2,1,-5,4]
输出： 6
解释： 连续子数组 [4,-1,2,1] 的和最大，为 6。
:::

```java
class Solution {
    public int maxSubArray(int[] nums) {
        if(nums.length == 0) return 0;
        int[] dp =new int[nums.length];
        // 初始化 
        dp[0] = nums[0];
        // 状态转移方程 dp[i] =Math.max(dp[i-1]+nums[i],nums[i]); dp[i]含义: 从0~i中,包含当前i元素的最大连续数列之和
        int max=dp[0];
        for(int i=1; i<nums.length; i++){
            dp[i] =Math.max(dp[i-1]+nums[i],nums[i]);
            max =Math.max(max, dp[i]);
        }
        return max;
    }
}
```


<!-- ## 双指针

## 动态规划

## 广度优先搜索BFS

## 深度优先搜索DFS

## 回溯算法 -->
    