# 设计模式学习
## 模板方法模式
* 概念: 它定义一个操作中的算法的框架，而将一些步骤延迟到了子类中。使得子类可以不改变一个算法的结构即可重定义该算法的某些步骤。

* 我的理解: 抽象类将确定的内容用final修饰, 将不确定的内容暴露出去, 让子类自己去具体灵活实现; 简言之, 定好框架模板, 同时开放具体的实现给子类; 一千个读者心中有一千个哈姆雷特, 但是这一千个人心中的哈姆雷特是同一个人!

* 例子:
```java
public abstract class Cook {

    // 放油
    public abstract void oil();

    //放鸡蛋
    public abstract void egg();

    // 放西红柿
    public abstract void tomato();

    // 用final修饰, 对外封闭, 无法被继承
    final public void cook() {
        this.oil();
        this.egg();
        this.tomato();
    }
}
```

```java
public class Mycook extends Cook {
    @Override
    public void oil() {
        System.out.println("我: 放多了油");
    }

    @Override
    public void egg() {
        System.out.println("我: 鸡蛋没有熟");
    }

    @Override
    public void tomato() {
        System.out.println("我: 西红柿没切好");
    }
}
```

```java
public class MumCook extends Cook {
    @Override
    public void oil() {
        System.out.println("老妈: 放油适量");
    }

    @Override
    public void egg() {
        System.out.println("老妈: 鸡蛋很香");
    }

    @Override
    public void tomato() {
        System.out.println("老妈: 西红柿好吃又有营养");
    }
}
```

```java
public class Test {

    public static void main(String[] args) {
        Cook mycook = new Mycook();
        mycook.cook();

        Cook mumcook = new MumCook();
        mumcook.cook();
    }
}
```
### 结果打印
我: 放多了油  
我: 鸡蛋没有熟  
我: 西红柿没切好  
老妈: 放油适量  
老妈: 鸡蛋很香  
老妈: 西红柿好吃又有营养 

* 优点:
    1. 把不可改变的封装起来，把能够改变的扩展开来
    2. 他把很多类的共同操作给封装了起来，利于维护
    3. 其实我们发现，我们在定义行为时候都是由父类去定义，然后子类去实现即可。
* 缺点: 缺点很简单，我们发现虽然我们把一些类的共同操作封装了起来，但是当这些类比较多时，效果就不好了，因为有一个拓展子类都需要继承它，子类多了就不好了。




