---
title: "Android开发拾遗：如何使用Proto DataStore"
tags: ["Android", "Kotlin"]
series: "Android开发拾遗"
createdAt: "2024-07-09T10:38:30.748318+08:00"
publishedAt: "2024-07-09T11:51:43.663728+08:00"
summary: "本文介绍了如何在Android中使用Proto DataStore来持久化复杂的用户数据，包括schema定义、Gradle配置和代码实现。"
---

持久化一些用户数据是一个常见的需求，例如保存用户设置，Android提供了一个方便的机制，叫做[DataStore](https://developer.android.com/topic/libraries/architecture/datastore)。其中有两套API，一个是`Preferences DataStore`，可以存取简单的`key-value`数据；另一个是`Proto DataStore`，顾名思义，这需要开发者定义一个[protocol buffers](https://protobuf.dev/)的schema，可以存取自定义的数据类型，并提供类型安全保证。

最初我仅用到了简单的键值对API，因为业务上需要的配置项逐渐变多，并且在一些地方我需要使用枚举，所以萌生了从`Preferences DataStore`转到`Proto DataStore`的念头。但可惜的是，Android的文档关于`Proto DataStore`没有详细的描述，在参考了一些开源代码后，我找到了能适配`Kotlin`以及`Gradle Kotlin DSL`的使用方法，在此记录一下。

## Schema

首先要在`app/src/main/proto`目录下创建一个protobuf文件，如`settings.proto`：

```protobuf
syntax = "proto3";

// 这里替换成自己的包名
option java_package = "com.example.application";
option java_multiple_files = true;

message Settings {
  int32 example_counter = 1;
}
```

## Gradle配置

有了schema之后，还需要有对应的用来序列化/反序列化的数据结构，这个数据结构可以通过库来生成。修改Gradle配置：

```kts
import com.google.protobuf.gradle.id

plugins {
    // ...
    id("com.google.protobuf") version "0.9.1"
}

dependencies {
    // 添加这两个依赖
    implementation("androidx.datastore:datastore:1.1.1")
    implementation("com.google.protobuf:protobuf-javalite:3.17.3")
}

// 这里Android Studio可能有lint报错，直接忽略，sync gradle
protobuf {
    protoc {
        artifact = "com.google.protobuf:protoc:3.21.9"
    }

    generateProtoTasks {
        all().forEach { task ->
            task.builtins {
                id("java") {
                    option("lite")
                }
            }
        }
    }
}
```

## 在代码中使用

先创建一个`SettingsSerializer.kt`文件，定义序列化器：

```kotlin
// 这个Settings类是自动生成的
object SettingsSerializer : Serializer<Settings> {
  override val defaultValue: Settings = Settings.getDefaultInstance()

  override suspend fun readFrom(input: InputStream): Settings {
    try {
      return Settings.parseFrom(input)
    } catch (exception: InvalidProtocolBufferException) {
      throw CorruptionException("Cannot read proto.", exception)
    }
  }

  override suspend fun writeTo(
    t: Settings,
    output: OutputStream) = t.writeTo(output)
}

val Context.settingsDataStore: DataStore<Settings> by dataStore(
  fileName = "settings.pb",
  serializer = SettingsSerializer
)
```

读取时就可以使用冷流：

```kotlin
val settings = context.settingsDataStore.data.first()
```

如果要设置值，可以使用`updateData`方法：

```kotlin
suspend fun incrementCounter() {
  context.settingsDataStore.updateData { currentSettings ->
    currentSettings.toBuilder()
      .setExampleCounter(currentSettings.exampleCounter + 1)
      .build()
    }
}
```
