---
# sidebar: auto 单页面可用
sidebarDepth: 1
---
# 双指针
## 剑指OFFER 53题
::: tip 难度: 简单
一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。
:::

``` java
class Solution {
    /**
     * 用的二分查找法解决
     */
    public int missingNumber(int[] nums) {
        int len=nums.length;
        if(len==1&&nums[0]!=0) return 0;
        if(nums[len-1]<len) return len;
        int left=0,right=len-1,a=0;
        while(left<right){
            // 注意整型溢出问题, 因此不用(left+right)/2
            a=(right-left)/2+left;
            if(a==nums[a]){
                left=a+1;
            }else{
                right=a-1;
            }
            if(left!=nums[left]) return left;
            if((left+1)!=nums[left+1]) return left+1;
        }
        return left;
    }
}

```