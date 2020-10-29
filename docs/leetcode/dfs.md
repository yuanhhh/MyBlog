---
# sidebar: auto
sidebarDepth: 1
---
# 深度优先搜索
## 求根到叶子节点数字之和
::: warning 难度: 中等
给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。
例如，从根到叶子节点路径 1->2->3 代表数字 123。
计算从根到叶子节点生成的所有数字之和。
说明: 叶子节点是指没有子节点的节点。
:::

```java
class Solution {
    /**
     * 深度优先搜索
     */
    List<StringBuffer> list =new ArrayList<>();
    public int sumNumbers(TreeNode root) {
        if(root == null) return 0;
        // new StringBuffer 的时候一定要传字符串参数, 如果传数字,那么就变成其长度, 因为他有这个构造方法
        help(root, new StringBuffer(String.valueOf(root.val)));
        int sum = 0;
        for(StringBuffer sb: list){
            sum += Integer.parseInt(sb.toString());
        }
        return sum;
    }

    public void help(TreeNode node, StringBuffer sb){
      if (node.left == null && node.right == null) {
            // 一定要创建新的StringBuffer 对象, 否则就会只在一个StringBuffer 对象上操作
            list.add(new StringBuffer(sb));
            return;
        }

        // 进入下一个决策树
        if (node.left != null) {
            // 做出下一个选择
            help(node.left, sb.append(node.left.val));
            // 撤销选择
            sb.deleteCharAt(sb.length() - 1);
        }

        if (node.right != null) {
            // 做出下一个选择
            help(node.right, sb.append(node.right.val));
            // 撤销选择
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}
```

## 二叉树的所有路径
::: tip 难度: 简单
给定一个二叉树，返回所有从根节点到叶子节点的路径。
说明: 叶子节点是指没有子节点的节点。
:::
```java
class Solution {
    /**
     * 思路 dfs: 1.做选择 2.进入下一颗决策树 3.撤销选择
     */
    List<String> ans =new ArrayList<>();
    List<LinkedList<String>> res =new ArrayList<>();
    public List<String> binaryTreePaths(TreeNode root) {
        if(root == null) return ans;
        LinkedList<String> list=new LinkedList<>();
        help(root, list);
        for (LinkedList<String> re : res) {
            String join = String.join("->", re);
            ans.add(join);
        }
        return ans;
    }

    public void help(TreeNode root, LinkedList<String> list){
        // 做出选择
        list.add(String.valueOf(root.val));
        // 满足左右子节点都为空才能加入到list
        if(root.left == null&&root.right==null){
            res.add(new LinkedList<>(list));
            return;
        }
            
        if(root.left !=null) {
            // 进入左节点决策树
            help(root.left, list);
            // 撤销选择左节点
            list.removeLast();
        }
        
        if(root.right !=null){
            // 进入右节点决策树
            help(root.right, list);
            // 撤销选择右节点
            list.removeLast();
        } 
        
        /**
         *  注意! 撤销选择要做两遍, 因为分别做了2次选择!!!
         */
    }
}
```

## 图像渲染
::: tip 难度: 简单
有一幅以二维整数数组表示的图画，每一个整数表示该图画的像素值大小，数值在 0 到 65535 之间。

给你一个坐标 (sr, sc) 表示图像渲染开始的像素值（行 ，列）和一个新的颜色值 newColor，让你重新上色这幅图像。

为了完成上色工作，从初始坐标开始，记录初始坐标的上下左右四个方向上像素值与初始坐标相同的相连像素点，接着再记录这四个方向上符合条件的像素点与他们对应四个方向上像素值与初始坐标相同的相连像素点，……，重复该过程。将所有有记录的像素点的颜色值改为新的颜色值。
最后返回经过上色渲染后的图像。
:::
```java
class Solution {
 public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {

        // 初始点像素值
        int init=image[sr][sc];
        int x=image.length-1;
        int y=image[0].length-1;
        // 标记已经访问过的节点,true为已访问过
        boolean[][] visited=new boolean[x+1][y+1];
        help(init,image,sr,sc,newColor,x,y,visited);
        return image;
    }

    public void help(int init,int[][] image,int sr,int sc, int newColor,int x,int y,boolean[][] visited){
        // 保证在矩阵内
        if(sr<0||sr>x||sc<0||sc>y||init!=image[sr][sc]||visited[sr][sc]) return;
        
        // 更改当前点的颜色
        image[sr][sc]=newColor;
        // 标记当前节点已经访问过
        visited[sr][sc]=true;
        // 更改上
        help(init,image,sr-1,sc,newColor,x,y,visited);
        // 更改下
        help(init,image,sr+1,sc,newColor,x,y,visited);
        // 更改左边
        help(init,image,sr,sc-1,newColor,x,y,visited);
        // 更改右边
        help(init,image,sr,sc+1,newColor,x,y,visited);
    }
}
```

## 打家劫舍 III
::: warning 难度: 中等
在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。

计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。
:::
```java
class Solution {
    /**
     * 别人的优秀解法记录： 状态转移方程, 关注子问题 , 从根节点开始分析：2种状态， 偷与不偷, 偷根节点那么儿子节点一定不能偷, 不偷根节点那么,
     * 儿子节点可以偷也可以不偷
     */
    public int rob(TreeNode root) {
        // 返回数组,下标0标识不偷,1标识偷
        int[] result = help(root);
        // 比较偷与不偷根节点
        return Math.max(result[0], result[1]);
    }

    public int[] help(TreeNode node){
        if(node==null) return new int[2];

        int[] result=new int[2];

        int[] left=help(node.left);
        int[] right=help(node.right);
        // 不偷则, 需分别求出左右子节点偷与不偷的较大值, 
        result[0]=Math.max(left[0],left[1])+Math.max(right[0],right[1]);
        // 偷，则需要计算出左右子节点一定不偷的和加上当前节点的值
        result[1]=left[0]+right[0]+node.val;
        return result;
    }
}
```

## 递增子序列
::: warning 难度: 中等
给定一个整型数组, 你的任务是找到所有该数组的递增子序列，递增子序列的长度至少是2。
:::
```java
class Solution {
    List<Integer> temp = new ArrayList<Integer>();
    List<List<Integer>> ans = new ArrayList<List<Integer>>();
    public List<List<Integer>> findSubsequences(int[] nums) {
        dfs(0, Integer.MIN_VALUE, nums);
        return ans;
    }

    public void dfs(int cur, int last, int[] nums) {
        if (cur == nums.length) {
            if (temp.size() >= 2) {
                ans.add(new ArrayList<Integer>(temp));
            }
            return;
        }
        if (nums[cur] >= last) {
            // 进入决策树
            temp.add(nums[cur]);
            // 做出选择
            dfs(cur + 1, nums[cur], nums);
            // 撤销选择
            temp.remove(temp.size() - 1);
        }
        // 不选当前元素,但是考虑到会有重复元素,所以加这个判断, 如果cur和last 相等, 
        if (nums[cur] != last) {
            dfs(cur + 1, last, nums);
        }
    }
}
```