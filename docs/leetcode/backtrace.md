# 回溯算法
## 二叉树的所有路径
::: tip 难度: 简单
给定一个二叉树，返回所有从根节点到叶子节点的路径。

说明: 叶子节点是指没有子节点的节点。
:::

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
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
## 组合总和
::: warning 难度: 中等
给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的数字可以无限制重复被选取。

说明：
- 所有数字（包括 target）都是正整数。
- 解集不能包含重复的组合。 
:::

```java
class Solution {
    /**
     * 本问题同时也是完全背包问题,可以用动态规划思路解决(第一想法就是完全背包问题,动态规划);
     */
    List<List<Integer>> res=new ArrayList<>();
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        if(candidates.length==0) return res;
        List<Integer> list=new ArrayList<>();
        Arrays.sort(candidates);
        help(candidates,target,0,0,list);
        return res;
    }

    public void help(int[] candidates,int target,int sum,int i,List<Integer> list){
        if(sum==target){
            res.add(new ArrayList<>(list));
            return;
        }
        // 剪枝,candidates已经按升序排列,如果当前元素无法满足sum<=target 那么后续更大元素也无法满足
        if(sum>target) return;
        // i从外部传入,在外部初始化,保证结果list中的元素递增,从而保证了list不会因为元素位置不同而重复
        for(;i<candidates.length;i++){
            // 这一步的目的是保证结果不重复
            int j=i;
            //进行选择
            sum+=candidates[j];
            list.add(candidates[j]);
            // 进行下一次决策
            help(candidates,target,sum,j,list);
            // 撤销选择
            sum-=candidates[j];
            list.remove(list.get(list.size()-1));
        }
    }
}
```