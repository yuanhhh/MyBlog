---
# sidebar: auto
sidebarDepth: 1
---
# 二分查找法
## 寻找重复数
::: warning 难度: 中等
给定一个包含 n + 1 个整数的数组 nums，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。假设只有一个重复的整数，找出这个重复的数。
:::
说明：
1. 不能更改原数组（假设数组是只读的）。 
2. 只能使用额外的 O(1) 的空间。
3. 时间复杂度小于 O(n2) 。
4. 数组中只有一个重复的数字，但它可能不止重复出现一次。

```java
class Solution {
    /**
     * 思路: 该数字介于1-n之间,利用二分查找法去寻找这个数字,
     * 统计中点左边的数字个数, 多余n+1/2个,那么在左边, 反之在右边(注意边界问题)
     * 再继续使用二分查找法寻找
     */
    public int findDuplicate(int[] nums) {
        int n=nums.length-1,left=1,right=n,mid=0;
        while(left<=right){
            int l=0;
            mid=(right-left)/2+left;
            for(int i=0;i<nums.length;i++){
                if(nums[i]<=mid) l++;
            }

            if(left==right&&l>mid) {
                return left;
            }
            if(l>mid){
                right=mid;
            }else{
                left=mid+1;
            }
        }
        return -1;
    }
}
``` 
 
 