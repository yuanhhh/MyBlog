---
# sidebar: auto
sidebarDepth: 1
---
# 面试经历
## 腾讯云视频会议面试记录

- 时间: 3.6
- 形式: 视频面试
- 岗位: 武汉研发中心的腾讯云视频会议

### **一面**
聊天 30min
主要问题: 多线程, 线程池, mysql索引底层

没啥深刻印象, 只记得一个没回答上问题: es的index索引碎片如何merge?
答:  不会!

后面反问环节,随便问了几个问题.

一面完面试官暖心提醒, 注意接电话,手机不要静音! 以为二面不会在今天, 面完之后上线lol, 看到同学也在, 邀请搞一把 , 选的是皮城女警,玩到一半, 深证腾讯总部的电话来了, 只能挂机, 二面!

### **二面**

笔试+聊天 80min
面试官一上来人丢过来3道题目
::: tip 第一题
1.給2个有序整数数组找出重复元素
:::

1.第一思路, 暴力法时间复杂度O(n^2), 面试官要求优化,  双指针吧, 从左右2边分别去遍历, 时间复杂度O(nlogn), 面试官要求再优化,并提示数组有序, 想了想,O(m+n)应该能解决;

面试官要求手撕代码
``` java
public static int[] solution(int[] a, int[] b) {
        int alength = a.length;
        int blength = b.length;
        int[] ans = new int[Math.max(alength, blength)];
        int i = 0, j = 0, k = 0;
        while (i < alength && j < blength) {
            if (a[i] == b[j]) {
                ans[k] = a[i];
                k++;
                i++;
                j++;
            } else if (a[i] > b[j]) {
                j++;
            } else {
                i++;
            }
        }

        int[] ints = Arrays.copyOf(ans, k);
        return ints;
    }

    public static void main(String[] args) {
        int[] solution = solution(new int[]{1, 3, 5,5,8}, new int[]{2, 3, 4,5,8,9,9});
        for (int i : solution) {
            System.out.println(i);
        }
    }

```

::: tip 第二题
2.10000个整数找出重复数 
:::

给出第一个思路, 哈希表.   然后第二个思路, 放到set中去重, 原集合在和set取差集.  对得到的差集去重得到答案.  
没要求手撕代码

::: tip 第三题
3.给出函数f(), 返回值是0或者1, 概率都是0.5, 要求根据f()得到0~7, 要求每个数字概率一样.
:::

刚拿到题,一头雾水, 如何搞出函数f()? 想了想,0,1是在暗示我用二进制, 位运算技巧吗. 思路有了!
奇偶数不是各占一半? 构造f(), 然后运用位运算技巧,拼凑出0~7
面试官要求手撕代码
``` java
 /**
     * 00000000
     * 00000001
     * 00000010
     * 00000011
     * 00000100
     * 00000101
     * 00000110
     * 00000111
     */
    public static int solution() {
        // 构造0,1,2,3,4,5,6,7
        // 每一位2种选择(0/1)
        int a = f(), b = f(), c = f();
        return (a << 2) + (b << 1) + c;
    }

    // 各自二分之一概率返回0,1,设计函数f()
    public static int f() {
        // 随机生成一个数字  奇数偶数的概率相同, 模拟函数f() 的返回结构
        // i&1 如果i为偶数 那么i&1==1 否则为0; 概率各为0.5
        Random random = new Random();
        int i = random.nextInt();
        return i & 1;
    }

    public static void main(String[] args) {
        int solution = solution();
        System.out.println(solution);
    }
```



3道题目相比于leetcode上 都算easy难度的题目. 但是没想到第三题在面试现场能想到思路. 这肯定要感谢自己过去一年死磕数据结构与算法了啊, 面试官还算比较友好,会引导,提醒! 
题目做完之后又是聊天. 大概问了下项目,技术: 项目架构, 锁, cas无锁算法实现机制, 分布式锁.其他问题忘记了.

面试结束之前, 面试官要求代码发给他, 不知道是否有后续! :flushed:



