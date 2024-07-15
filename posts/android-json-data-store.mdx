---
title: "Android开发拾遗：DataStore与JSON结合"
tags: ["Android", "Kotlin"]
series: "Android开发拾遗"
createdAt: "2024-07-15T11:01:50.135650+08:00"
publishedAt: "2024-07-15T13:05:42.559424+08:00"
summary: "本文探讨了如何在Android应用中使用JSON格式的DataStore存储配置数据，并提供了详细的代码示例和步骤来实现这一点。"
---

在本系列的[上一篇](https://elliot00.com/posts/android-proto-data-store)中我介绍了Android的`Proto DataStore`的用法，但是我对`protobuf`的schema定义并不熟悉，所以就想着有没有使用JSON格式结合DataStore存储数据，事实证明这是可能的。

首先注意到`DataStore`与`protobuf`相关类是解耦的，`dataStore`函数需要的参数是一个文件名——持久化数据存放位置，以及一个`serializer`对象。现在尝试改动serializer来实现用JSON存储配置数据。

先安装依赖：

```kts
plugins {
    // ...
    alias(libs.plugins.jetbrains.kotlin.serialization)
}

dependencies {
    // datastore还是必要的
    implementation(libs.androidx.datastore)

    // 用于序列化/反序列化
    implementation(libs.kotlinx.serialization.json)
}
```

```toml
# libs.versions.toml
[versions]
datastore = "1.1.1"
kotlin = "1.9.0"
kotlinxSerializationJson = "1.1.0"

[libraries]
kotlinx-serialization-json = { module = "org.jetbrains.kotlinx:kotlinx-serialization-json", version.ref = "kotlinxSerializationJson" }

[plugins]
jetbrains-kotlin-serialization = { id = "org.jetbrains.kotlin.plugin.serialization", version.ref = "kotlin" }
```

下一步是创建一个用于序列化/反序列化的数据类（之前Proto DataStore中这个类是自动生成的）：

```kotlin
import kotlinx.serialization.Serializable

@Serializable
data class Settings(
    val theme: Theme = Theme.SYSTEM,
    val isDebugMode: Boolean = false,
)

enum class Theme { SYSTEM, LIGHT, DARK }

```

接下来设置好`Serializer`对象：

```kotlin
object SettingsSerializer : Serializer<Settings> {
    override val defaultValue: Settings
        get() = Settings()

    override suspend fun readFrom(input: InputStream): Settings {
        return try {
            Json.decodeFromString(
                deserializer = Settings.serializer(),
                string = input.readBytes().decodeToString()
            )
        } catch (e: SerializationException) {
            e.printStackTrace()
            defaultValue
        }
    }

    override suspend fun writeTo(t: Settings, output: OutputStream) {
        withContext(Dispatchers.IO) {
            output.write(
                Json.encodeToString(
                    serializer = Settings.serializer(),
                    value = t
                ).encodeToByteArray()
            )
        }
    }
}
```

将其设置到`Context`上：

```kotlin
val Context.dataStore by dataStore("settings.json", SettingsSerializer)
```

简单写个UI试验下：

```kotlin
@Composable
fun MainScreen() {
    Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
        val context = LocalContext.current
        val settings by context.dataStore.data.collectAsState(initial = Settings())
        val scope = rememberCoroutineScope()

        Surface(modifier = Modifier.padding(innerPadding)) {
            Column {
                Text(if (settings.isDebugMode) "Debug" else "Release")
                Button(onClick = {
                    scope.launch {
                        context.dataStore.updateData {
                            it.copy(isDebugMode = !it.isDebugMode)
                        }
                    }
                }) {
                    Text(text = "Toggle")
                }
            }
        }
    }
}
```

![json-data-store](https://elliot-blog.oss-cn-shanghai.aliyuncs.com/kotlin/json-data-store.webp)

完成！
