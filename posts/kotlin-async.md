---
title: "Android开发拾遗：异步与协程"
tags: ["Android", "Kotlin"]
series: "Android开发拾遗"
createdAt: "2024-04-27T10:16:14.667904+08:00"
publishedAt: "2024-05-06T07:14:27.195882+00:00"
summary: "这篇文章主要介绍了Kotlin协程的基本用法，包括语法、结构化并发、异步流、生命周期管理等方面。"
---

最近公司在做一个Android应用，用的[Kotlin](https://kotlinlang.org)。虽然之前为了我的输入法计划写过一点Android，不过基本上是仗着对其他语言的熟悉摸索着写，没有系统了解过这门语言以及Android开发的相关概念。趁着假期闲下来了，打算看看官方文档，总结一下不甚了解的Android开发相关知识，因此有了这篇文。预计会分成几篇做一个系列，本文主要是协程相关内容。

## 异步

为了便于展开后续内容，还是要简单聊聊老生常谈的话题：什么是异步？为什么要异步？

想象现在有一家小咖啡店，只有一个店员，一个咖啡机。有三个人先后来到店里买咖啡，店员依次为每个人点单（花费1分钟），开启机器制作（等待5分钟），打包咖啡（1分钟），按顺序完成所有工作一共花费了21分钟。

![sync](https://elliot-blog.oss-cn-shanghai.aliyuncs.com/kotlin/coffee1.png)

但是，咖啡机运转时（IO操作），店员（CPU）实际上是闲着的，如果店员不是按顺序完成一个人的全部任务，比如当第一位客人的咖啡开始制作后就转头给第二位客人点单，是不是能节省时间呢？

![async](https://elliot-blog.oss-cn-shanghai.aliyuncs.com/kotlin/coffee2.png)

这种情况下，将花费17分钟（忽略转身花费的时间），节省了四分钟。

异步解释起来很简单，就是**不按顺序步骤执行任务**。之所以要异步，根本上是为了**不浪费计算资源**，当遇到如文件读取之类的IO任务时，不要让CPU闲着等待而是转头去执行其它任务。换句话说，不是为了异步而异步，对于计算密集型任务，不按顺序执行，算上调度任务带来的额外开销反而会使整个任务执行时间更长。

很多时候，异步使人感到困惑是因为这一个术语被用来表达了多个有关联但不相同的概念。如有时异步这个词暗含了「并发」的意义；有时人们又用异步来指代编程语言提供的便于人们实现异步程序的机制。

## 协程

操作系统提供了虚拟CPU、虚拟内存、线程等一系列抽象给应用程序实现并发，而Kotlin则提供了一个相比线程更轻量化的机制来帮助开发者写出异步非阻塞程序，即「协程」。

看看如何使用协程：

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking { // this: CoroutineScope
    launch { // launch a new coroutine and continue
        delay(1000L) // non-blocking delay for 1 second (default time unit is ms)
        println("World!") // print after delay
    }
    println("Hello") // main coroutine continues while a previous one is delayed
}
```

要搞明白Kotlin的协程使用，先要了解一点相关语法。首先是`fun main() = ...`，如果你写过[Haskell](https://www.haskell.org/)对这种形式应该不会陌生了，在Kotliln中一个函数如果只包含一个表达式就可以简写成一个类似赋值语句的形式：

```kotlin
fun main() = println("hello")

// 等于
fun main() {
    println("hello")
}
```

那么`runBlock {...}`和`launch {...}`又是什么特殊的语句块吗？在Kotlin中，如果一个函数的最后一个参数是 *Lambda表达式*，调用时就可以写成一种语句块的形式：

```kotlin
fun foo(bar: () -> Unit) {
    bar()
}

fun main() {
    foo {
        println("Hello")
    }

    // 等价于 =>
    foo(bar = { println("Hello") })
}
```

看上去使用`launch`就可以启用一个新的协程，但是如果这样写代码：

```kotlin
import kotlinx.coroutines.*

fun main() {
    foo()
}

fun foo() {
    launch {
        println("Hello")
    }
}
```

将会得到一个错误：‘Unresolved reference: launch’，这是为何？来看一下`runBlocking`的函数签名：

```kotlin
expect fun <T> runBlocking(
    context: CoroutineContext = EmptyCoroutineContext,
    block: suspend CoroutineScope.() -> T
): T
```

忽略掉其他部分，只看`CoroutineScope.() -> T`，这在Kotlin中称为**扩展方法**，举个例子：

```kotlin
fun Int.addNine(): Int {
    return this + 9
}

fun main() {
    val result = 4.addNine()
    println("Result is $result")
}
```

Kotlin内置的Int类型是没有addNine方法的，但是我们可以用`fun Int.addNine()`这种形式去拓展它，并且就好像是在写这个类本身的方法一样，甚至可以引用`this`。这种语法可以帮我们为无法直接改动源代码的外部对象拓展接口。

所以实际上不能直接用`launch`的原因是，这是属于`CoroutineScope`类内的一个方法（其实launch也是用CoroutineScope.launch形式定义的扩展方法）。`runBlocking`声明了`block`参数应该是这个CoroutineScope类的扩展方法，调用时是在一个CoroutineScope对象上调用的，所以作为runBlocking的block参数的Lambda内可以使用launch以及其它来自CoroutineScope的属性、方法。

```kotlin
fun main() = runBlocking {
    // 和直接用launch一样，this指向一个CoroutineScope对象
    this.launch {
        delay(1000L)
    }
}
```

Kotlin中每一个协程都要在`CoroutineScope`内启动，`runBlocking`会构建一个`CoroutineScope`对象，从名字能看出来，它会阻塞当前线程，等待内部的协程完成，所以通常放在异步调用的「根部」使用，如前面的例子就是在`main()`函数上使用的。

## 挂起函数

Kotlin中协程相关内容大部分交给库实现，语法层面只有一个特别的，那就是「挂起函数」，使用`suspend`关键字定义。

```kotlin
fun main() = runBlocking {
    launch { doWorld() }
    println("Hello")
}

suspend fun doWorld() {
    delay(1000L)
    println("World!")
}
```

和其它语言中的异步函数相同点在于，挂起函数也具有传染性，即其内部可以调用其它普通函数，但调用挂起函数的函数也得是挂起函数。`runBlocking`就是普通函数到挂起函数之间的桥梁。

挂起函数内是同步语义的：

```kotlin
suspend fun foo() {
    bar()
}

suspend fun bar() {
}

suspend fun baz() {
}
```

相当于JavaScript中：

```javascript
async function foo() {
    await bar()
    await baz()
}

async function bar() {
}

async function baz() {
}
```

这种设计大概是为了让开发者在协程上下文内不去关注要使用的函数是否是挂起的，用与调用普通同步函数一致的方式去调用挂起函数，用下列代码看下顺序调用挂起函数的用时：

```kotlin
import kotlinx.coroutines.*
import kotlin.system.measureTimeMillis

fun main() = runBlocking {
    val time = measureTimeMillis {
        hello()
        hello()
        hello()
    }
    println("Completed in $time ms")
}

suspend fun hello() {
    // delay也是个挂起函数
    delay(1000)
    println("hello")
}

/* Result:
hello
hello
hello
Completed in 3019 ms
*/
```

## launch

通过`launch`和挂起函数结合，可以精细地控制代码中的并发与同步操作的。

```kotlin
fun main() = runBlocking {
    val time = measureTimeMillis {
        launch {
            hello(1)
        }
        launch {
            hello(2)
        }
        hello(3)
    }
    // 最后一个hello()阻塞了println
    println("Completed in $time ms")
}


suspend fun hello(count: Int) {
    delay(1000)
    println("hello #$count")
}

/* Result:
hello #3
Completed in 1023 ms
hello #1
hello #2
*/
```

launch会返回一个`Job`对象，有着类似线程的API：

```kotlin
fun log(msg: String) = println("[${Thread.currentThread().name}] $msg")

fun main() = runBlocking {
    val time = measureTimeMillis {
        val job = launch {
            launch {
                log("job1 start")
                delay(1000L)
                log("job1 end")
            }
            launch {
                log("job2 start")
                delay(2000L)
                log("job2 end")
            }
            launch {
                log("job3 start")
                delay(5000L)
                log("job3 end")
            }
        }
        delay(3000L)
        job.cancel()
        job.join()
        log("job end")
    }
    log("Completed in $time ms")
}

/* Result:
[main @coroutine#3] job1 start
[main @coroutine#4] job2 start
[main @coroutine#5] job3 start
[main @coroutine#3] job1 end
[main @coroutine#4] job2 end
[main @coroutine#1] job end
[main @coroutine#1] Completed in 3077 ms
*/
```

## async-await

在Kotlin中`async`和`await`不是关键字，和`launch`一样，`async`可以开启一个新协程，但不同的是它会返回一个`Deferred<T>`对象，类似JavaSciprt中的`Promise<T>`，可以通过对其调用`await()`方法得到结果。

```kotlin
fun main() = runBlocking {
    val time = measureTimeMillis {
        // 并行执行
        val res1 = async { foo() }
        val res2 = async { bar() }

        // 等待两个协程完成
        println("Result is ${res1.await() + res2.await()}")
    }
    println("Completed in $time ms")
}

suspend fun foo(): Int {
    delay(1000L)
    return 1
}

suspend fun bar(): Int {
    delay(1500L)
    return 2
}
```

## 协程上下文

先看一眼[launch](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/launch.html)的函数签名：

```kotlin
fun CoroutineScope.launch(
    context: CoroutineContext = EmptyCoroutineContext,
    start: CoroutineStart = CoroutineStart.DEFAULT,
    block: suspend CoroutineScope.() -> Unit
): Job
```

> The coroutine context is inherited from a CoroutineScope. Additional context elements can be specified with context argument. If the context does not have any dispatcher nor any other ContinuationInterceptor, then Dispatchers.Default is used. The parent job is inherited from a CoroutineScope as well, but it can also be overridden with a corresponding context element.

Kotlin的函数支持默认参数，从文档可知，前面使用launch的过程中没有给它指定第一个参数`context`，实际上它会默认使用`Dispatchers.Default`。这里的`CoroutineContext`是什么？`Dispatchers`又是什么呢？

`CoroutineContext`是一个接口，它是一个`Element`接口的`indexed set`（Element实际上又继承自Coroutine），可以用它来控制协程的行为。[CoroutineDispatcher](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-coroutine-dispatcher/)就是一个实现了Element接口的类，它可以用来指定协程在某个特定的线程上或线程池上运行。

不同于Python或JavaScript，Kotlin可以充分利用现代多核CPU来做并行计算，使用`Dispatchers.Default`可以让协程跑在CPU密集任务的线程池上，还有`Dispatchers.IO`适合在Android应用中执行文件读取、网络请求等IO任务而不会阻塞UI线程，`Dispatchers.Main`在主线程中运行，还可以用`newSingleThreadContext()`来启用一个单独的新线程。

来段代码看下：

```kotlin
import kotlinx.coroutines.*

fun showThread(tag: String) = println("$tag Running in ${Thread.currentThread().name}")

fun main() = runBlocking<Unit> {
    launch {
        showThread(tag = "#1")
        launch(newSingleThreadContext("MyOwnThread")) {
            delay(1000L)
            showThread(tag = "#2")
        }
    }

    launch(Dispatchers.Default) {
        showThread(tag = "#3")
        repeat(5) {
            launch {
                val foo = 10 * 10
                showThread(tag = "#4")
            }
        }
    }
}

/* Result:
#3 Running in DefaultDispatcher-worker-2 @coroutine#3
#1 Running in main @coroutine#2
#4 Running in DefaultDispatcher-worker-1 @coroutine#4
#4 Running in DefaultDispatcher-worker-2 @coroutine#8
#4 Running in DefaultDispatcher-worker-2 @coroutine#5
#4 Running in DefaultDispatcher-worker-1 @coroutine#7
#4 Running in DefaultDispatcher-worker-2 @coroutine#6
#2 Running in MyOwnThread @coroutine#9
*/
```

前面提到CoroutineContext是一个`indexed set`结构，也就是说可以用类似哈希表的API来获取当前的上下文信息：

```kotlin
fun main() = runBlocking<Unit> {
    launch {
        delay(1000L)
        // 回顾下扩展方法的语法，你应该不会对这个coroutineContext从哪来感到迷惑
        println("Context: ${coroutineContext[Job]}")
    }
}
```

CoroutineContext重载了加法运算符，可以用比较直观的代码来组合多个上下文Element：

```kotlin
import kotlinx.coroutines.*

fun showThread(tag: String) = println("$tag Running in ${Thread.currentThread().name}")

fun main() = runBlocking<Unit> {
    // 用+运算符来组合两个上下文元素
    launch(Dispatchers.Default + CoroutineName("MyCoroutine")) {
        showThread(tag = "#1")
        repeat(5) {
            launch {
                val foo = 10 * 10
                showThread(tag = "#2")
            }
        }
    }
}

/* Result:
#1 Running in DefaultDispatcher-worker-1 @MyCoroutine#2
#2 Running in DefaultDispatcher-worker-1 @MyCoroutine#7
#2 Running in DefaultDispatcher-worker-2 @MyCoroutine#3
#2 Running in DefaultDispatcher-worker-2 @MyCoroutine#5
#2 Running in DefaultDispatcher-worker-2 @MyCoroutine#6
#2 Running in DefaultDispatcher-worker-1 @MyCoroutine#4
*/
```

仔细观察输出，可以发现，内部的launch并没有指定上下文，但看上去是复用了上层的上下文，这是怎么做到的？

## 结构化并发

Kotlin采用了结构化并发的概念，这个概念可能源自结构化编程，[Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra)曾经提出过「Goto有害论」，并提出要用结构化编程来改善程序。简而言之，结构化编程希望限制**控制流**只有**单一入口**和**单一出口**。

> 很多并发/线程相关的术语都是Edsger Dijkstra创造的，他在1972年获得了图灵奖。

![goto](https://elliot-blog.oss-cn-shanghai.aliyuncs.com/kotlin/goto-statement.png)

不像顺序执行的语句，使用goto跳转执行的程序可以在任意时间跳转到任务意指令位置去执行，大量采用这种控制流的代码最终可读性会非常糟糕。

![control structures](https://elliot-blog.oss-cn-shanghai.aliyuncs.com/kotlin/control-flow2.png)

结构化的控制流通过块来控制层级，一块程序在执行中途经过条件、循环、函数调用等子层级的程序块，最终还是会从上层出口退出。结构化并发也是类似的思路，通过CoroutineScope来组织具有父子层级的协程，还是通过代码来说明：

```kotlin
import kotlinx.coroutines.*

fun log(msg: String) = println("${Thread.currentThread().name} $msg")

fun main() = runBlocking {
    val job = launch(CoroutineName("MyCoroutine")) {
        launch {
            delay(2000)
            log("Child1 done")
        }
        launch {
            delay(2000)
            log("Child2 done")
        }
    }

    // 挂起等待父级job结束
    job.join()
    log("Parent done")
}

/* Result:
main @MyCoroutine#3 Child1 done
main @MyCoroutine#4 Child2 done
main @coroutine#1 Parent done
*/
```

首先可以看到，外层的上下文被传递下去了，如果去看[launch的源码](https://github.com/Kotlin/kotlinx.coroutines/blob/master/kotlinx-coroutines-core/common/src/Builders.common.kt#L43)就会看到，launch内部将当前Scope的上下文和参数中的上下文（这里没有指定，用的是参数默认值EmptyCoroutineContext）做了合并操作。其次是，父层的协程在等待子层的协程结束后才结束，控制流最终回到了外层。

再看这段代码：

```kotlin
fun main() = runBlocking {
    val job = launch(CoroutineName("MyCoroutine")) {
        launch {
            log("Child1 start")
            delay(1000)
            log("Child1 done")
        }
        launch {
            log("Child2 start")
            delay(3000)
            log("Child2 done")
        }
    }
    delay(1500)
    job.cancelAndJoin()
    log("Parent done")
}

/* Result:
main @MyCoroutine#3 Child1 start
main @MyCoroutine#4 Child2 start
main @MyCoroutine#3 Child1 done
main @coroutine#1 Parent done
*/
```

第二个子协程在延时3秒后打印*Child2 donw*，但是父级在一秒半时取消了工作，可以看到，还没完成工作的Child2也被取消了。

如果子协程里有错误呢？

```kotlin
fun main() = runBlocking<Unit> {
    try {
        calc()
    } catch (e: ArithmeticException) {
        log("捕获到错误")
    }
}

suspend fun calc(): Int = coroutineScope {
    val foo = async<Int> {
        log("准备返回1")
        delay(3000)
        log("代码不会执行到这")
        1
    }
    val bar = async<Int> {
        log("准备抛错")
        throw ArithmeticException()
    }

    foo.await() + bar.await()
}

/* Result:
main @coroutine#2 准备返回1
main @coroutine#3 准备抛错
main @coroutine#1 捕获到错误
*/
```

可以看到，子协程的错误会向上传递，并且会导致同一层级其它没有完成的协程任务被取消。

但是Kotlin并没有在语法层面强制性要求结构化并发，所以其实可以绕过这一行为（但一般不推荐）：

```kotlin
fun main() = runBlocking {
    val job = launch(CoroutineName("MyCoroutine")) {
        GlobalScope.launch {
            log("Global start")
            delay(2000)
            log("Global done")
        }
        launch {
            log("Child2 start")
            delay(3000)
            log("Child2 done")
        }
    }
    delay(1500)
    job.cancelAndJoin()
    log("Parent done")

    delay(2000)
}

/* Result:
DefaultDispatcher-worker-1 @coroutine#3 Global start
main @MyCoroutine#4 Child2 start
main @coroutine#1 Parent done
DefaultDispatcher-worker-1 @coroutine#3 Global done
*/
```

## 取消协程

前面举的例子里已经有好几个和取消相关了，要取消协程似乎很简单了，果真如此吗？尝试这段代码：

```kotlin
fun main() = runBlocking {
    val startTime = System.currentTimeMillis()
    val job = launch(Dispatchers.Default) {
        var nextPrintTime = startTime
        var i = 0
        while (i < 5) { // computation loop, just wastes CPU
            // print a message twice a second
            if (System.currentTimeMillis() >= nextPrintTime) {
                println("job: I'm sleeping ${i++} ...")
                nextPrintTime += 500L
            }
        }
    }
    delay(1300L) // delay a bit
    println("main: I'm tired of waiting!")
    job.cancelAndJoin() // cancels the job and waits for its completion
    println("main: Now I can quit.")
}
```

即便已经调用了`cancelAndJoin`，协程仍然继续运行直到满足了退出`while`语句的条件，这是为什么？我们来把这段代码稍稍修改下：

```kotlin
fun main() = runBlocking {
    val startTime = System.currentTimeMillis()
    val job = launch(Dispatchers.Default) {
        var nextPrintTime = startTime
        var i = 0
        while (i < 5) {
            if (System.currentTimeMillis() >= nextPrintTime) {
                println("job: I'm sleeping ${i++} ...")

                // 为了清晰表示isActive的来源用了this，实际可以省略
                println("当前CoroutineScope ${this.isActive}")
                nextPrintTime += 500L
            }
        }
    }
    delay(1300L)
    println("main: I'm tired of waiting!")
    job.cancelAndJoin()
    println("main: Now I can quit.")
}

/* Result:
job: I'm sleeping 0 ...
当前CoroutineScope true
job: I'm sleeping 1 ...
当前CoroutineScope true
job: I'm sleeping 2 ...
当前CoroutineScope true
main: I'm tired of waiting!
job: I'm sleeping 3 ...
当前CoroutineScope false
job: I'm sleeping 4 ...
当前CoroutineScope false
main: Now I can quit.
*/
```

虽然调用取消方法没能实际取消协程工作，但是可以发现在调用cancelAndJoin后Scope上有一个`isActive`值被置为了**false**。在Kotlin中，协程的取消实际上「协作式」的！也就是说取消协程需要协程内部的配合，比如，在这个例子里，加一个如果isActive变false就`break`的判断，就可以实现取消功能了。

但是，为什么之前调用了`delay`的协程就可以直接取消？这里没有什么黑魔法，只是delay是来自官方`kotlinx.coroutines`的挂起函数，所有官方库提供的挂起函数都针对取消做了处理。当外部调用cancel时，delay会抛出一个[CancellationException](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-cancellation-exception/)异常，导致协程结束。

如果想在自己的代码里省去判断isActive的逻辑，可以调用[ensureActive](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/ensure-active.html)函数，相当于：

```kotlin
if (!isActive) {
    throw CancellationException()
}
```

## 生命周期与协程

Android中一些重要的类，如`Activity`，拥有由系统管理的生命周期，在不同的状态下系统会调用相关的生命周期方法，如初始化、暂停、销毁等，在Android中使用协程，需要注意生命周期问题，在适当的时机及时取消协程以避免内存泄漏。

建议在Activity、Fragment中使用[LifecycleScope](https://developer.android.com/topic/libraries/architecture/coroutines#lifecyclescope)，在ViewModel中使用[ViewModelScope](https://developer.android.com/topic/libraries/architecture/coroutines#viewmodelscope)，避免使用GlobalScope。

## 异步流

流最早源自函数式语言，Kotlin中的[flow](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/)在API上和其它语言的基本大同小异，所以这里只讲一下它和协程以及Android开发相关的地方。

### flowOn

通过`flowOn`可以控制流所在线程：

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun log(msg: String) = println("${Thread.currentThread().name} $msg")

fun main() = runBlocking {
    myFlow()
        .map { it * 3 }
        .collect {
            log("Collect $it")
        }

    myFlow()
        .map { it * 3 }
        .flowOn(Dispatchers.IO)
        .collect { // 注意collect不受flowOn影响
            log("Collect $it")
        }
}

fun myFlow() = flow {
    repeat(3) {
        // 模拟一个IO操作
        delay(1000)
        log("Emit $it")
        emit(it)
    }
}

/* Result:
main @coroutine#1 Emit 0
main @coroutine#1 Collect 0
main @coroutine#1 Emit 1
main @coroutine#1 Collect 3
main @coroutine#1 Emit 2
main @coroutine#1 Collect 6
DefaultDispatcher-worker-1 @coroutine#2 Emit 0
main @coroutine#1 Collect 0
DefaultDispatcher-worker-1 @coroutine#2 Emit 1
main @coroutine#1 Collect 3
DefaultDispatcher-worker-1 @coroutine#2 Emit 2
main @coroutine#1 Collect 6
*/
```

### 取消

`collect`是一个挂起函数，所有想取消一个流的收集工作和取消普通协程一样：

```kotlin

fun main() = runBlocking {
    val job = launch {
        try {
            myFlow().collect {
                log("Collect $it")
            }
        // 如果不知道为什么可以catch，回看前面关于协程取消部分
        } catch (e: CancellationException) {
            log("取消")
        } finally {
            // 还可以利用finally做些清理工作
            log("清理资源")
        }
    }
    delay(2200)
    job.cancelAndJoin()
    log("Job done")
}

/* Result:
main @coroutine#2 Emit 0
main @coroutine#2 Collect 0
main @coroutine#2 Emit 1
main @coroutine#2 Collect 1
main @coroutine#2 取消
main @coroutine#2 清理资源
main @coroutine#1 Job done
*/
```

### StateFlow和SharedFlow

在Android关于状态流的文档中提到，Flow是「冷流」，而StateFlow和SharedFlow是「热流」，区别体现在哪里？

冷流：

```kotlin
fun main() = runBlocking {
    val foo = myFlow()
        .map {
            println("Map $it")
            it * 3
        }
        .filter {
            println("Filter $it")
            it > 5
        }
    println("没有收集，流的中间过程都没有执行")
    println("收集")
    foo.collect { println(it) }

    delay(2000)

    // 整个流会再跑一遍
    println("再次收集")
    foo.collect { println(it) }
}

fun myFlow() = flow {
    repeat(3) {
        println("Emit $it")
        emit(it)
    }
}

/* Result:
没有收集，流的中间过程都没有执行
收集
Emit 0
Map 0
Filter 0
Emit 1
Map 1
Filter 3
Emit 2
Map 2
Filter 6
6
再次收集
Emit 0
Map 0
Filter 0
Emit 1
Map 1
Filter 3
Emit 2
Map 2
Filter 6
6
*/
```

热流：

```kotlin
fun main() = runBlocking {
    val sharedFlow = MutableSharedFlow<Int>()
    val job = launch {
        launch {
            var i = 0
            while(true) {
                println("Emit $i")
                sharedFlow.emit(i)
                i++
                delay(1000)
            }
        }

        launch {
            sharedFlow.collect { println("Collector#1 $it") }
        }

        delay(3000)
        launch {
            sharedFlow.collect { println("Collector#2 $it")}
        }
    }
    delay(5000)
    job.cancelAndJoin()
    println("Done")
}

/* Result:
Emit 0
Emit 1
Collector#1 1
Emit 2
Collector#1 2
Emit 3
Collector#1 3
Collector#2 3
Emit 4
Collector#1 4
Collector#2 4
Done
*/
```

对比输出可以发现，冷流每次收集都能得到相同的数据，只有在收集时流才会开始执行，每次收集都重头重新执行了一遍；而热流即使没有收集者/观察者也会直接推送数据，收集时不能保证一定得到全部数据，第二个收集者延迟了3秒后，就没能得到前几次emit的数据。

`StateFlow`是一个继承自`SharedFlow`的热流，不同的是，收集器总是得到它的最新值，发射数据时会和上一个数据做比较，只有数据不同时才会发射，在创建StateFlow时也必须提供一个初始值。

这两个热流在Android开发中具体要怎么用？

### Android与热流

以一个连接蓝牙设备的流程做例子，以下是一个极度简化版的代码：

```kotlin
class MyViewModel : ViewModel() {
    // StateFlow和SharedFlow有各自的可变版本MutableStateFlow和MutableSharedFlow
    private val _isConnected = MutableStateFlow(false)
    // 通过asStateFlow将其转为不可变版本并暴露出去
    val isConnected = _isConnected.asStateFlow()

    fun connect() {
        // 摸拟真实场景连接
        viewModelScope.launch {
            delay(1000)
            _isConnected.emit(true)
        }
    }
}

...

// 通过collectAsState将最新值收集为State，State.value变化将引起Compose重组
val isConnected by viewModel.isConnected.collectAsState()

Text(text = if (isConnected) "已连接" else "未连接")
Button(onClick = { viewModel.connect() }) {
    Text(text = "连接")
}

...
```

这里通过StateFlow表现了一个「是否连接」的状态，并通过状态变化更新了UI。如果需要表现一个开始连接和成功连接的事件，弹出提示要怎么做？


```kotlin
// 仅供说明，实际代码不应该这么写
enum class BluetoothState {
    UNCONNECTED, CONNECTING, CONNECTED
}

class MyViewModel : ViewModel() {
    private val _state = MutableStateFlow(BluetoothState.UNCONNECTED)
    val state = _state.asStateFlow()

    fun connect() {
        viewModelScope.launch {
            _state.emit(BluetoothState.CONNECTING)
            delay(2000)
            _state.emit(BluetoothState.CONNECTED)
        }
    }
}

val scope = rememberCoroutineScope()
val snackbarHostState = remember { SnackbarHostState() }
val state by viewModel.state.collectAsState()

LaunchedEffect(state) {
    when (state) {
        BluetoothState.CONNECTING -> scope.launch { snackbarHostState.showSnackbar("连接中") }
        BluetoothState.CONNECTED -> scope.launch { snackbarHostState.showSnackbar("已连接") }
        else -> {}
    }
}

Scaffold(snackbarHost = { SnackbarHost(hostState = snackbarHostState)}) {
    Column(modifier = Modifier.padding(it)) {
        Button(onClick = { viewModel.connect() }) {
            Text(text = "连接")
        }
    }
}

```

代码看上去没有大问题，但是如果启动应用，点击连接，等到两次snackbar提示结束后，旋转屏幕，将会看到snackbar再次弹出显示「已连接」。屏幕旋转会引起Compose重组，热流数据的消费者也重建了，StateFlow向消费者提供了最新的数据，如果需要表示一个UI的状态，这是期望行为；但对于数据只需要消费一次的场景，或者说表现事件的场景，这被叫做「粘性事件」，是需要避免的，StateFlow就不适用了。

StateFlow的构造函数需要一个初始值，看看SharedFlow的构造函数是什么样的：

```kotlin
public fun <T> MutableSharedFlow(
    // 重播数量，StateFlow是1，新的消费者收集数据时，StateFlow会重播一次最近emit的值
    replay: Int = 0,
    // 额外缓冲容量，缓存还没被消费的数据
    extraBufferCapacity: Int = 0,
    // 缓冲区溢出时的处理策略，默认挂起等待消费者订阅
    onBufferOverflow: BufferOverflow = BufferOverflow.SUSPEND
): MutableSharedFlow<T> {
```

可以看出，SharedFlow具有比StateFlow更高的可配置性，可以用它来避免「粘性事件」：

```kotlin
class MyViewModel : ViewModel() {
    private val _event = MutableSharedFlow<BluetoothState>()
    val event = _event.asSharedFlow()

    fun connect() {
        viewModelScope.launch {
            _event.emit(BluetoothState.CONNECTING)
            delay(2000)
            _event.emit(BluetoothState.CONNECTED)
        }
    }
}

LaunchedEffect(Unit) {
    viewModel.event.collect {
        when (it) {
            BluetoothState.CONNECTING -> scope.launch { snackbarHostState.showSnackbar("连接中") }
            BluetoothState.CONNECTED -> scope.launch { snackbarHostState.showSnackbar("已连接") }
            else -> {}
        }
    }
}
```

由于`replay`默认值是0，旋转屏幕重建订阅的消费者后，最近一次的事件值不会向这个新的订阅者重播了。

#### 冷流转热流

在Flow上调用[shareIn](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/share-in.html)可以将其转化为SharedFlow，[stateIn](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/state-in.html)可以将其转化为StateFlow：

```kotlin
fun <T> Flow<T>.shareIn(
    // Flow生产者所在的协程Scope，
    scope: CoroutineScope,
    // 开始生产数据的策略
    started: SharingStarted,
    replay: Int = 0
): SharedFlow<T>

fun <T> Flow<T>.stateIn(scope: CoroutineScope, started: SharingStarted, initialValue: T): StateFlow<T>
```
