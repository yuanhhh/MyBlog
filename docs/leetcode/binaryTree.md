---
# sidebar: auto
sidebarDepth: 1
---
# 二叉树
## 把二叉搜索树转换为累加树
::: warning 难度: 中等
给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。

提醒一下，二叉搜索树满足下列约束条件：
- 节点的左子树仅包含键 小于 节点键的节点。
- 节点的右子树仅包含键 大于 节点键的节点。
- 左右子树也必须是二叉搜索树。
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
     * 中序遍历, 注意左子树中的右节点一定要加上, 右子树以及当前根节点值之和;
     */
    public TreeNode convertBST(TreeNode root) {
        // 第二个参数指的是当前节点父节点,以及当前节点父节点的右子树节点之和; 如果当前节点为父节点则取0;
        return help(root, 0);
    }

    /**
     * 求和方法
     */
    public int getSum(TreeNode node){
        if(node == null) return 0;
        return node.val+ getSum(node.left)+getSum(node.right);
    }

    /**
     * 中序遍历, 中-> 右-> 左
     */
    public TreeNode help(TreeNode root, int rightSum){
        if(root == null) return root;
        // 处理当前根节点, 加上当前根节点右子树节点值之和, 加上父节点右子树之和
        root.val=root.val+getSum(root.right)+rightSum;
        // 为何先算右节点, 因为左边节点需要累加右节点和当前根节点
        if(root.right!=null){
            help(root.right, rightSum);
        }
        if(root.left!=null){
            // root.val 已经累加过 rightSum;
            rightSum = root.val;
            help(root.left, rightSum);
        }
        return root;
    }
}
```