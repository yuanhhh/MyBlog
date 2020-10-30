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
## 二维数组中的查找
::: warning 难度: 中等
在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
:::

```java
class Solution {
    /**
     * 二分法思路,双百; 个人觉得还可以优化, 使用缩小区间方法,使得重复计算更少
     */
    public boolean findNumberIn2DArray(int[][] matrix, int target) {
        int n=matrix.length;
        // 一定要注意n=0, 后续matrix[0] 就是越界, 数组都不存在元素,何来matrix[0];
        if(n==0) return false;
        int m=matrix[0].length;
        if(m==0) return false;
        // 排除极端情况, 使之不参与更复杂计算
        if(target<matrix[0][0]||target>matrix[n-1][m-1]) return false;
        // 常规二分法思路
        for(int i=0;i<n;i++){
            int l=0,r=m-1;
            while(l<=r){
                int mid=(r-l)/2+l;
                if(target>matrix[i][mid]){
                    l=mid+1;
                }else if(target<matrix[i][mid]){
                    r=mid-1;
                }else{
                    return true;
                }
            }
           
        }
        return false;
    }
}
```
 
 