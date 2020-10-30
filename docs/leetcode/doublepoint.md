---
# sidebar: auto 单页面可用
sidebarDepth: 1
---
# 双指针
## 长按键入
::: tip 难度: 简单
你的朋友正在使用键盘输入他的名字 name。偶尔，在键入字符 c 时，按键可能会被长按，而字符可能被输入 1 次或多次。

你将会检查键盘输入的字符 typed。如果它对应的可能是你的朋友的名字（其中一些字符可能被长按），那么就返回 True。
:::
```java
class Solution {
    public boolean isLongPressedName(String name, String typed) {
        int m =name.length(),n=typed.length();
        if(m>n) return false;
        List<Character> list =new ArrayList<>();
        list.add(name.charAt(0));
        // 相邻去重
        for(int i=1;i<m;i++){
            if(name.charAt(i)!=name.charAt(i-1)){
                list.add(name.charAt(i));
            }
        }
        // sum 作用是统计typed字符串字符数
        int i=0,j=0,sum=0;  
        for(Character c: list){
            int a=0,b=0;
            while(i<m&&c==name.charAt(i)){
                a++;
                i++;
            }
             while(j<n&&c==typed.charAt(j)){
                b++;
                j++;
            }
            sum+=b;
            // 如果同样相对位置的同一字符数目在名字中的数目大于typed中的数目,那么就不合格
            if(a>b) return false;
        }
        // 最终typed字符串一定不能有多余字符
        if(sum<n) return false;
        return true;
    }
}
```

## 合并两个有序数组
::: tip 难度: 简单
给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

说明：
初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
:::
```java
class Solution {
    /**
     * 双指针法，时间复杂度O(m+n)
     */
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        // 定义中间变量数组
        int[] res =new int[m+n];
        // 定义2指针
        int a=0,b=0;
        int i=0;
        // 较小者右移
        while(a<m&&b<n){
            if(nums1[a]<=nums2[b]){
                res[i] =nums1[a];
                a++;
            }else{
                res[i]=nums2[b];
                b++;
            }
            i++;
        }
        // 拼接剩余的
        if(a<m){
            for(int j=a;j<m;j++){
                res[i++]=nums1[j];
            }
        }
        if(b<n){
            for(int j=b;j<n;j++){
                res[i++]=nums2[j];
            }
        }
        for(int k=0;k<res.length; k++){
            nums1[k]=res[k];
        }
    }
}
```

## 环形链表
::: tip 难度: 简单
给定一个链表，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 true 。 否则，返回 false 。
:::
```java
public class Solution {
    /*
     * 快慢指针
     */
    public boolean hasCycle(ListNode head) {
        if(head==null) return false;
        ListNode fast=head;
        ListNode slow=head;
        while(fast.next!=null&&fast.next.next!=null){
            // 快指针每次向右移动2个节点 慢指针移动一个,要有环就一定会相遇
            fast = fast.next.next;
            slow = slow.next;
            // 相遇后,寻找入环点
            if(fast==slow){
               return true;
            }
        }
        return false;
    }
}
```

## 盛最多水的容器
::: warning 难度: 中等
给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。
:::

<img :src="$withBase('/imgs/question_11.jpg')" alt="question_11">

```java
class Solution {
    /**
     * 双指针解法: 比较左右指针位置的高度, 取较小者, 指针向数组中心移动;
     */
    public int maxArea(int[] height) {
        int left = 0, right=height.length-1;
        int max =0;
        while(left<right){
            int h = Math.min(height[left], height[right]);
            max =Math.max(max, h*(right-left));
            // 面积大小取决于较小者, 对比两个最外侧值, 较小者可以忽略, 指针向中心移动
            if(height[left]<=height[right]){
                left++;
            }else{
                right--;
            }
        }
        return max;
    }
}
```


