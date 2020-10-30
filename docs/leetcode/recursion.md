---
# sidebar: auto
sidebarDepth: 1
---
# 递归问题
## 汉诺塔问题
::: tip 难度: 简单
在经典汉诺塔问题中，有 3 根柱子及 N 个不同大小的穿孔圆盘，盘子可以滑入任意一根柱子。一开始，所有盘子自上而下按升序依次套在第一根柱子上(即每一个盘子只能放在更大的盘子上面)。移动圆盘时受到以下限制:
(1) 每次只能移动一个盘子;
(2) 盘子只能从柱子顶端滑出移到下一根柱子;
(3) 盘子只能叠在比它大的盘子上。

请编写程序，用栈将所有盘子从第一根柱子移到最后一根柱子。
:::
```java
class Solution {
    /**
     * 递归思想: 汉诺塔问题, 抽象出一个局部问题, 不要陷入细节;
     */
    public void hanota(List<Integer> A, List<Integer> B, List<Integer> C) {
        /**
        * move 方法, 第一个参数指的是, 起始柱的盘子数目, A为起始柱, B中转柱 , C目标柱 ,三者在递归过程中
        * 有角色轮换;
        */ 
        move(A.size(), A, B, C);
    }

    public void move(int n,List<Integer> A, List<Integer> B, List<Integer> C){
        // 递归出口, 当起始柱最后一个被拿走
        if(n == 1){
            C.add(A.remove(A.size()-1));
            return;
        }

        // 首先将n-1 个盘子从A移到B
        move(n-1, A, C, B);
        // 最底下的最大盘移到C
        C.add(A.remove(A.size()-1));
        // 接下来问题就转化为从B到C移动n-1的盘子的问题了, 递归下去, 老千层饼!!!;
        move(n-1, B, A, C);
    }
}
```

## 二叉搜索树的最近公共祖先
::: tip 难度: 简单
给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
:::
```java
class Solution {
    /**
     * 递归思想处理该问题;
     */
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // p,q 互为父子节点的2种情形
        if(help(p,q)) return p;
        if(help(q,p)) return q;
        // 如果不是上述情形, 则需要讨论;
        if(help(root,q)&&help(root,p)){
            // 讨论左节点
            if(help(root.left,q)&&help(root.left,p)){
                return lowestCommonAncestor(root.left, p, q);
            }else{
                // 讨论右节点
                if(help(root.right, q)&&help(root.right, p)){
                    return lowestCommonAncestor(root.right, p, q);
                }else{
                    return root;
                }
            }
          
        }
        return null; 
    }

    // 当p是s 父节点,返回true, 否则返回false;
    public boolean help(TreeNode p, TreeNode s){
        if(p == null) return false;
        if(s.val == p.val) return true;
        return help(p.left, s)||help(p.right, s);
    }
}
```

## 左叶子之和
::: tip 难度: 简单
计算给定二叉树的所有左叶子之和。
:::
```java
class Solution {
    /**
     * 递归,或者说是中序遍历;
     */
    int sum = 0;
    public int sumOfLeftLeaves(TreeNode root) {
        if(root == null) return 0;
        if(root.left!=null){
            if(root.left.left==null&&root.left.right==null){
                sum+=root.left.val;
            }else{
                sumOfLeftLeaves(root.left);
            }
        }
        sumOfLeftLeaves(root.right);
        return sum;
    }
}
```

## 根据前序和后序遍历构造二叉树
::: warning 难度: 中等
返回与给定的前序和后序遍历匹配的任何二叉树。
pre 和 post 遍历中的值是不同的正整数。
:::
```java
class Solution {
    /**
     * 递归思想: 从根节点开始, 逐步构建
     */
    public TreeNode constructFromPrePost(int[] pre, int[] post) {
        // 处理特殊情况
        if(pre.length==0||post.length==0) return null;
        if(pre.length==1||post.length==1) return new TreeNode(pre[0]);
        // 找到左右子树的分割点
        int index=0;
        while(pre[1]!=post[index]){
            index++;
        }
        // 创建当前根节点
        TreeNode node =new TreeNode();
        node.val = pre[0];
        // 递归构建左右子树
        node.left =constructFromPrePost(Arrays.copyOfRange(pre, 1, index+2), Arrays.copyOfRange(post, 0, index+1));
        node.right =constructFromPrePost(Arrays.copyOfRange(pre, index+2,pre.length), Arrays.copyOfRange(post, index+1, post.length-1));
        return node;
    }
}
```