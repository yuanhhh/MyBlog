---
# sidebar: auto
sidebarDepth: 1
---
# 广度优先搜索
## 二叉树的右视图
::: warning 难度: 中等
给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
:::
```java
class Solution {
    /**
     * 层序遍历, 栈的运用
     */
    List<Integer> res =new ArrayList<>();
    public List<Integer> rightSideView(TreeNode root) {
        if(root == null) return res;
        Queue<TreeNode> q=new LinkedList<>();
        q.offer(root);
        while(!q.isEmpty()){
            int sz = q.size();
            for(int i=0; i<sz; i++){
                TreeNode a = q.poll();
                if(i==sz-1) res.add(a.val);
                if(a.left!=null) q.offer(a.left);
                if(a.right!=null) q.offer(a.right);
            }
        }
        return res;
    }
}
```

## 员工的重要性
::: tip 难度: 简单
给定一个保存员工信息的数据结构，它包含了员工唯一的id，重要度 和 直系下属的id。

比如，员工1是员工2的领导，员工2是员工3的领导。他们相应的重要度为15, 10, 5。那么员工1的数据结构是[1, 15, [2]]，员工2的数据结构是[2, 10, [3]]，员工3的数据结构是[3, 5, []]。注意虽然员工3也是员工1的一个下属，但是由于并不是直系下属，因此没有体现在员工1的数据结构中。

现在输入一个公司的所有员工信息，以及单个员工id，返回这个员工和他所有下属的重要度之和。
:::
```java
class Solution {
    /**
     * 广度优先搜索
     */
    public int getImportance(List<Employee> employees, int id) {
        Queue<Employee> q = new LinkedList<>();
        q.offer(findById(employees, id));
        int sum=0;
        while(!q.isEmpty()){
            int sz = q.size();
            for(int i=0; i<sz; i++){
                Employee emp = q.poll();
                sum+=emp.importance;
                if(emp.subordinates.size()>0){
                    for(Integer inx: emp.subordinates){
                        q.offer(findById(employees, inx));
                    }
                }
            }
        }
        return sum;
    }

    public Employee findById(List<Employee> employees,int id){
        for(Employee emp: employees){
            if(emp.id==id) return emp;
        }
        return null;
    }
}
```

## 找树左下角的值
::: warning 难度: 中等
给定一个二叉树，在树的最后一行找到最左边的值。
:::

```java
class Solution {
    public int findBottomLeftValue(TreeNode root) {
        // 空树,返回0
        if(root==null) return 0;
        Queue<TreeNode> q=new LinkedList<>();
        q.offer(root);
        int tar = 0;
        while(!q.isEmpty()){
            int sz = q.size();
            for(int i=0;i<sz;i++){
                TreeNode node = q.poll();
                // 每次取出队列中第一个,目标值
                if(i==0) tar = node.val;
                if(node.left!=null)  q.offer(node.left);
                if(node.right!=null)  q.offer(node.right);
            }
        }
        return tar;
    }
}
```

## 在每个树行中找最大值
::: warning 难度: 中等
您需要在二叉树的每一行中找到最大的值。
:::
```java
class Solution {
    public List<Integer> largestValues(TreeNode root) {
        List<Integer> ans =new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        if(root==null) return ans;
        q.offer(root);
        while(!q.isEmpty()){
            int sz = q.size();
            int max = Integer.MIN_VALUE;
            // 比较并取出最大值
            for(int i=0; i<sz; i++){
                TreeNode node = q.poll();
                max = Math.max(max, node.val);
                if(node.left!=null) q.offer(node.left);
                if(node.right!=null) q.offer(node.right);
            }
            ans.add(max);
        } 
        return ans;
    }
}
```