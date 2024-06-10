---
title: "Android开发拾遗：MVVM与MVI"
tags: ["Android", "Kotlin"]
series: "Android开发拾遗"
createdAt: "2024-05-28T18:06:49.169129+08:00"
publishedAt: "2024-06-04T15:23:12.173877+08:00"
summary: "本文介绍了复杂项目中代码拆分的重要性，以 ASP.NET 的 MVC 模式为例，探讨如何解耦 UI 和业务逻辑。重点讨论了 Android 开发中的 MVVM 和 MVI 模式，通过对比说明它们在状态管理和 UI 交互上的不同，阐明了各自的优缺点及适用场景。"
---

如果想要写一个可运行的应用，将所有的代码都放在同一个文件里并不会影响其编译运行，但在实践中，当一个软件的功能越来越复杂，代码量不断增多，为了项目的可维护性，一般需要遵循一些模式将代码拆分开。像微软的[ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet/mvc)这类Web应用框架，就为开发者预设了一套模板，使用被称为「MVC」的架构模式，要求用户将代码分散到不同的目录，各自继承一些特定的类，致力于将UI表现层与业务逻辑解耦。

> 架构模式（architectural pattern）是软件架构中在给定环境下，針對常遇到的问题的、通用且可重用的解决方案。

近期在浏览Android开发相关内容时常看到「MVI」架构模式，但与*ASP.NET*不同，Android并没有一个很强的约束要求开发者必须以某种模式写代码，网上找到的一些对于MVI的介绍也没有把它讲得很清楚。所以这次就结合实践中的一些问题，讲讲我对MVI的理解。

为了说明MVI，需要回顾一下过去的Android开发范式。在Android使用`XML`构建视图的时代，受推崇的架构模式是**MVVM**，这种模式在很多流行的GUI框架——如[Vue.js](https://vuejs.org/)——中被广泛使用。

## MVVM

MVVM是model-view-viewmodel的缩写，ViewModel层作为View层和Model层之间的桥梁，避免视图和模型之间的直接交互。

![MVVM](https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/MVVMPattern.png/660px-MVVMPattern.png)

以一个购物应用为例，ViewModel层可以继承官方库中的ViewModel类：

```kotlin
class CartViewModel : ViewModel() {
    private val _itemQuantity = MutableLiveData(0)
    val itemQuantity: LiveData<Int> = _itemQuantity

    private val _itemPrice = MutableLiveData(10.0)
    val itemPrice: LiveData<Double> = _itemPrice

    val totalPrice: LiveData<Double> = MediatorLiveData<Double>().apply {
        addSource(_itemQuantity) { quantity ->
            value = quantity * (_itemPrice.value ?: 0.0)
        }
    }


    fun addToCart() {
        _itemQuantity.value = (_itemQuantity.value ?: 0) + 1
    }

    fun checkout() {
        // ...
    }
}
```

在XML布局中绑定ViewModel的数据：

```xml
<layout xmlns:android="http://schemas.android.com/apk/res/android">
    <data>
        <variable
            name="viewModel"
            type="com.example.MainViewModel" />
    </data>

    <LinearLayout
        android:id="@+id/main"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        android:padding="16dp">

        <EditText
            android:inputType="number"
            android:text="@{String.valueOf(viewModel.itemQuantity)}" />

        <TextView
            android:text="@{String.valueOf(viewModel.totalPrice)}" />

        <Button
            android:onClick="@{() -> viewModel.addToCart()}" />
    </LinearLayout>
</layout>
```

ViewModel与XML View之间建立了数据的双向绑定，ViewModel中的LiveData变更会直接体现在UI上，不用手写数据变更监听的代码，实际应用中，ViewModel层可能会从Model层获取商品数据，不同商品有不同价格，ViewModel处理价格的计算逻辑，View只负责最终结果的呈现。

这样就实现了关注点分离，利于代码的维护，例如可以在不改变ViewModel的情况下使用Android新的UI库——Jetpack Compose，只需要在Compose中使用：

```kotlin
/**
* 需要安装几个依赖
* androidx.lifecycle:lifecycle-viewmodel-compose-android
* androidx.compose.runtime:runtime-livedata
*/

val totalPrice by viewModel.totalPrice.observeAsState()

...

Button(onClick = { viewModel.addToCart() })
```

就可以了。

那这么做有没有什么缺陷呢？MVI和这种模式的区别在哪？

## MVI

虽然一般来说在MVVM中，数据绑定是双向的，但为了数据安全，通常只向View暴露一个只读的LiveData，避免意外的数据修改：

```kotlin
private val _stateA = MutableLiveData(0)
val stateA = _stateA
private val _stateB = MutableLiveData(0)
val stateB = _stateB

// 使用StateFlow也是一样
private val _stateA = MutableStateFlow(0)
val stateA = _stateA.asStateFlow()
private val _stateB = MutableStateFlow(0)
val stateB = _stateB.asStateFlow()

// 再暴露一些封装的方法用于更新state
fun changeXX() {
}
```

这些state可能会散落在UI的各处，给每个state都重复一遍私有和公开的声明也让代码有点繁瑣。如果要做单元测试，测试代码也会不简洁。MVI模式的核心就在于：单向数据流、单一不可变的状态对象及事件驱动的状态管理。

MVI是model-view-intent的编写：

![MVI](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*g096nFb3zpzDDiZIJWAEUA.png)

在实际的代码中，通常会封装一个State数据类：

```kotlin
data class ShopingState(
    val isLoading: Boolean = false,
    val goods: Goods = emptyList(),
    val unpaid: Double = 0.0,
    val error: String? = null,
)
```

仍然可以使用ViewModel类，将业务逻辑放在ViewModel中，但这次只有一个state对象：

```kotlin
// 可能需要依赖注入封装了Data Layer的repository
class MyViewModel(private val repository: GoodsRepository) : ViewModel() {
    private val _state = MutableStateFlow(ShopingState())
    val state = _state.asStateFlow()
}
```

但这次ViewModel不直接暴露可以更新state的方法，而是使用一个自定义的Intent：

```kotlin
// 使用sealed便于安全地模式区配
sealed object ShopingIntent {
    data object LoadGoods : ShopingIntent
    data object Checkout : ShopingIntent
    data class AddToCart(val id: String) : ShopingIntent
}

class MyViewModel(private val repository: GoodsRepository) : ViewModel() {
    fun onIntent(intent: ShopingIntent) {
        when (intent) {
            is ShopingIntent.LoadGoods -> {
                //
            }
            is ShopingIntent.Checkout -> {
            }
        }
    }
}
```

将整个视图和ViewModel分开来：

```kotlin
val state by viewModel.state.collectAsState()

ShopingScreen(
    state = state,
    onIntent = viewModel::onIntent
)

@Composable
fun ShopingScreen(..) {
    // UI层只是向外抛出一个Intent，不再关心ViewModel如何处理数据
    Button(onClick = { onIntent(ShopingIntent.LoadGoods) })
}
```

在实际应用中，Intent不一定必须由ViewModel处理，例如我用的某个第三方SDK要求在Activity上调用某个方法：

```kotlin
MainScree(
    state = state,
    onIntent = { intent ->
        when (intent) {
            is MyIntent.Foo -> {
            }
            is MyIntent.Bar -> {
            }
            else -> viewModel.onIntent(intent)
        }
    }
)
```

所有的状态数据都集中在了一处，数据只能单向流入UI层，用户交互产生Intent，对Intent的处理决定是否需要更新状态。整个UI可以脱离ViewModel的业务逻辑代码，单独做测试、预览。

相比之下，MVI不像MVC或MVVM那样定义清晰，Android官方也没有强制开发者必须遵守这个模式。可以将其看作在MVVM架构上的助力View和ViewModel解耦的范式，解耦合通常是好的，但要注意没有银弹，单一状态对象也可能带来一些不简洁的代码，如每次状态变更都需要copy：

```kotlin
_state.update { it.copy(isLoading = true) }
```

还有由于Kotlin不是像Haskell一样天生不可变的纯函数式语言，頻繁的copy也可能会影响性能（得看JIT的优化）？
