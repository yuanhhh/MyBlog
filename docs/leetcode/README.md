---
# sidebar: auto
sidebarDepth: 1
---
# 数组
## 0～n-1中缺失的数字
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

## 顺时针打印矩阵
::: tip 难度: 简单
输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
:::
``` java
class Solution {
    /**
     * 难点在于边界问题的处理;  
     */
    public int[] spiralOrder(int[][] matrix) {
        // 排除空数组
        if(matrix.length==0) return new int[0];
        // 定义好上下左右四个边界;
        int l=0,r=matrix[0].length-1,t=0,b=matrix.length-1,x=0;
        // 定义好结果数组
        int[] res=new int[(r+1)*(b+1)];
        // 循环打印每条方向
        while(true){
            // 完成每个方向就会向内收缩

            for(int i=l;i<=r;i++) res[x++]=matrix[t][i];  //left->right
            // left-> right 的终止条件
            if(++t>b) break;
            for(int i=t;i<=b;i++) res[x++]=matrix[i][r];  //top-> bottom
            // top-> bottom 的终止条件
            if(--r<l) break;
            for(int i=r;i>=l;i--) res[x++]=matrix[b][i];  //right->left
            // right-> left 的终止条件
            if(--b<t) break;
            for(int i=b;i>=t;i--) res[x++]=matrix[i][l];  //bottom->top
            // bottom-> top 的终止条件
            if(++l>r) break;
        }
        return res;
    }
}
```


## 二维数组中的查找
::: tip 难度: 简单
在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
:::
``` java
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

## 直方图的水量
::: danger 难度: 困难
给定一个直方图(也称柱状图)，假设有人从上面源源不断地倒水，最后直方图能存多少水量?直方图的宽度为 1。
:::
<img :src="$withBase('/imgs/rainwatertrap.png')" alt="rainwatertrap">

``` java
class Solution {
    public int trap(int[] height) {
        int sum=0;
        for(int i=0;i<height.length;i++){
            int l=0,r=i+1,l_max=0,r_max=0;
            // 计算下标为i的元素左边最大值
            while(l<i){
                l_max=Math.max(l_max,height[l]);
                l++;
            }
          
            // 计算下标为i的元素右边最大值
            while(r<height.length){
                r_max=Math.max(r_max,height[r]);
                r++;
            }
            // 取左右最大值中的较小值,用该值减去当前高低,得到水高度
            if(l_max>height[i]&&r_max>height[i]) sum+=Math.min(l_max,r_max)-height[i];
        }
        return sum;
    }
}
```  

## 有效三角形的个数
::: warning 难度: 中等
给定一个包含非负整数的数组，你的任务是统计其中可以组成三角形三条边的三元组个数。
:::

``` java
class Solution {
    /**
     * 暴力法,时间复杂度不理想 大于O(n^2)
     */
    public int triangleNumber(int[] nums) {
        // 排除不服题意的情形
        if(nums.length<3) return 0;
        int sum=0;
        // 排序, 当排完序后,只需要判断两个较小边之和大于较长边即可判定三角形是否构成
        Arrays.sort(nums);
        for(int i=0;i<nums.length-2;i++){
            for(int j=i+1;j<nums.length-1;j++){
                int k=j;
                while(k<(nums.length-1)&&(nums[i]+nums[j])>nums[k+1]){
                    k++;
                }
                sum+=k-j;
            }
        }
        return sum;
    }
}
```
