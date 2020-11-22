---
# sidebar: auto
sidebarDepth: 1
---
# 链表
## 排序链表
::: warning 难度: 中等
给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表。

示例：

输入：head = [4,2,1,3]
输出：[1,2,3,4]

提示：

链表中节点的数目在范围 [0, 5 * 104] 内
-105 <= Node.val <= 105
:::

```java
class Solution {
    // 插入排序做法, 时间复杂度O(n^2) 超出时间限制, 后考虑用归并排序 时间复杂度O(nlogn)
    public ListNode sortList(ListNode head) {
        // if(head == null) return head;
        // ListNode res = new ListNode(head.val);
        // ListNode newHead = head.next;
        // while(newHead != null){
        //     ListNode pre = null;
        //     ListNode temp = res;
        //     ListNode curr = new ListNode(newHead.val);
        //     if(curr.val <= temp.val){
        //         curr.next = temp;
        //         res = curr;
        //         newHead = newHead.next;
        //         continue;
        //     }
        //     while(curr!=null && temp!=null && curr.val > temp.val){
        //         pre = temp;
        //         temp = temp.next;
        //     }

        //     pre.next = curr;
        //     curr.next = temp;
        //     // 整个外循环的指针后移
        //     newHead = newHead.next;
        // }
        //  return res;

        // 找到中点
        // 使用快慢指针

        if(head == null||head.next==null) return head;
        // 注意快慢指针的初始化设置, 最好慢指针在前, 快指针在后
        ListNode slow = head,fast=head.next;
        while(fast!=null && fast.next!=null){
            slow =slow.next;
            fast =fast.next.next;
        }

        // slow是中点
        ListNode temp = slow.next;
        slow.next = null;

        ListNode left = sortList(head);
        ListNode right = sortList(temp);
        // 为了能让h 指先下一个节点;
        ListNode h =new ListNode(0);
        ListNode res = h;
        // 当左右节点都不为null时候, 细分到每个只有一个节点
        while(left !=null && right != null){
            if(left.val <=right.val){
                h.next = left;
                left = left.next;
            }else{
                h.next = right;
                right = right.next;
            }
            h = h.next;
        }
        h.next = left == null? right: left;
        return res.next;
    }
}
```


<!-- ## 双指针

## 动态规划

## 广度优先搜索BFS

## 深度优先搜索DFS

## 回溯算法 -->
    