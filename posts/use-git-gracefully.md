---
title: "优雅地使用Git"
tags: ["Git", "工具"]
series: "奇技淫巧"
createdAt: "2022-08-23T14:38:18.265542+00:00"
publishedAt: "2022-09-11T04:42:19.284144+00:00"
updatedAt: "2024-11-01T16:11:28.939416+08:00"
summary: "这篇文章内容与Git的使用相关，包括了提交信息的规范，如何保持清晰的提交历史和修复不规范的提交。文章还介绍了用于协助管理Git的工具和技术，如Git hooks、Git子命令、Git别名、EditorConfig等。最后，文章还提供了日志查询、跟踪空文件夹、处理大文件和克隆仓库等方面的技巧。"
---

## 保持清晰的提交记录

### 统一规范的提交信息

Git强制commit必须有一个summary信息，但是并没有要求开发者怎么写，看看以下几种提交历史：

- 随意版

```text
changed
bug
commit
```

- 较明确版（django-oscar）

```text
Use nodejs v14 for test builds.
Read sandbox cache settings from CACHE_URL
```

- 规范版（Vim）

```text
patch 9.0.0316: screen flickers when 'cmdheight' is zero

Problem:    Screen flickers when 'cmdheight' is zero.
Solution:   Redraw over existing text instead of clearing.


patch 9.0.0315: shell command is displayed in message window

Problem:    Shell command is displayed in message window.
Solution:   Do not echo the shell command in the message window.
```

- 规范版（React）

```text
docs(examples): react-router example
chore(publish): do not release without changed packages
```

我想大部分开发者应当认同，commit message至少应该描述下本次提交做了些什么，那么相比之下，其实第一种写了等于没写，至少得做到第二种的形式，才能算有用的提交记录。

在众多提交信息规范中，由前端框架`Angular`团队的提出的[规范](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format)应该是最受欢迎的，该规范将提交summary分成三个部分：`header`、`body`、`footer`，其中`header`为必填。

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

`header`包含三个部分：

- `type`：提交类型，`test`、`feat`、`fix`等
- `scope`：作用域
- `subject`：主题，对修改的简述，小写字母开头，现在时态，结尾无句号

`body`是对`subject`的补充，包括本次修改的动机，与之前行为的对比。

`footer`主要是关于*Breaking Changes*的描述或者是关闭某个相关issue

这个格式看上去有些复杂，不过可以通过工具辅助完成，例如我曾写的辅助脚本[commit-formatter](https://github.com/Eliot00/commit-formatter)。

### 清理无用的提交信息

#### amend

有时候完成了`git commit`操作，却突然发现有个拼写错误，这时候可以修改后再次提交，但是这样一个小改动没必要多创建一条提交记录（当然这可以通过lint、git-hook避免，但那是另一个问题），这时候可以先将改动的文件加入暂存区，再使用`git commit --amend`改写提交，将这次的小改动加入到上次的提交中。这个操作会打开默认编辑器让你编辑提交信息，如果不需要改动提交记录，还可以使用`git commit --amend --no-edit`。

#### squash

有时候我们需要压缩多个提交信息到一个，例如在开发某个功能时，对一个小范围改动产生了多次不必要提交，或者在参与开源项目时，我们需要基于自己的分支提交PR，而Reviewer对我们提出了一些改动意见。这时候可以使用`squash`。

例如有如下提交：

```text
* 65e76f2 - (HEAD -> test) type
* 3334086 - typo
* d834363 - feat: previewImage support zoom
```

这时使用命令`git rebase -i HEAD~3`，会在终端打开默认编辑器：

```text
pick d834363 feat: previewImage support zoom
pick 3334086 typo
pick 65e76f2 type

# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
```

每个提交信息前有个单词`pick`，在下面的注释中，解释了`pick`以前其他单词的意义，可以看到`s`或`squash`的意义为保留信息但合并进上一个提交，现在编辑后面两个`pick`，改成：

```text
pick d834363 feat: previewImage support zoom
s 3334086 typo
s 65e76f2 type
```

保存并确定后，再次使用`git log`查看提交历史，可以发现三次commit信息被合并了。

### 使用rebase同步

有时候，一些项目的提交历史混乱的原因可能是开发者使用了不恰当的操作，例如只知道对远端分支使用`pull`和`push`。

应该有很多人在使用`git pull`时见过这个警告：

```text
warning: Pulling without specifying how to reconcile divergent branches is
discouraged. You can squelch this message by running one of the following
commands sometime before your next pull:

  git config pull.rebase false  # merge (the default strategy)
  git config pull.rebase true   # rebase
  git config pull.ff only       # fast-forward only
```

现在假设A和B在同一个dev分支上开发，A修改了代码并创建提交commit1，通过`git push`推送到了服务器，这时B在本地也创建了commit2，他使用`git push`就会收到报错，因为B没有同步远端dev分支最新的更改。

![branch](https://wac-cdn.atlassian.com/dam/jcr:63e58c34-b273-4e48-a6b1-6e3ba4d4a0ea/01%20bubble%20diagram-01.svg?cdnVersion=518)

> 图片来自[Gitbucket](https://www.atlassian.com/git/tutorials/syncing/git-pull)

此时如果他pull远端分支，就会产生一个额外的合并commit。为什么呢？实际上，这里的pull操作就等价于`git fetch <remote> && git merge <remote>/branch`，将远端的分支修改下载到本地，然后合并到本地分支。

![pull](https://wac-cdn.atlassian.com/dam/jcr:0269bb2d-eb7f-43d8-80a2-8afa88d11eea/02%20bubble%20diagram-02.svg?cdnVersion=518)

怎么避免这个merge提交呢？可以使用`git pull --rebase`，

![pull --rebase](https://wac-cdn.atlassian.com/dam/jcr:d5633068-d448-4140-953e-2ab31553ce10/03%20bubble%20diagram-03-updated@2x%20kopiera.png?cdnVersion=518)

rebase看上去像是先将本地的提交先拿出来，再插到另一个分支的最顶端去，这样就得到了一条线性的提交历史。注意图中原本本地的E F G变成了E' F' G'，后面会提到。

回看前面的警告，通过`git config pull.rebase true`可以设置默认的pull操作为`git pull --rebase`。

同样的，对于同一个机器上的不同分支，其实也可以用`git rebase other-branch`操作来代替merge。


#### rebase的黄金法则

rebase操作有一个黄金法则：**不要在共享分支使用rebase！**

或许就因为这个法则，让一些程序员不敢使用rebase。那么，rebase在什么情况下危险呢？

正如前面提到的，本地的提交，经过rebase之后，实际上是生成了内容一样的新提交，E‘ F' G'的hash与原来的E F G是不一样的。假设现在分支情况如下：

```
A -> B -> C # remote/dev

A -> B -> C # 甲/dev
A -> B -> D -> E # 甲/feature

A -> B -> C -> F # 乙/dev
```

如果甲在本地的dev分支rebase了feature：

```
A -> B -> C # remote/dev

A -> B -> D -> C' # 甲/dev
A -> B -> D # 甲/feature

A -> B -> C -> F # 乙/dev
```

接着甲要push本地的dev到远端，麻烦来了，甲本地的dev和远端在B之后就对不上了，如果甲不管不顾，使用`git push --force`，这下乙要push他本地的改动将会遇到报错，乙使用`git pull`，Git会尝试合并分支：

```
A -> B -> D -> C'
    |         /
    |        /
    -> C -> F  ---> M
```

如果所有人都像甲一样操作，那这个共享的dev分支最后会变得非常混乱。

但是如果是像前面提到的，甲本地的dev是`A -> B -> C -> D`，远端原本是`A -> B -> C`，经过乙push后变成`A -> B -> C -> E`，甲使用`git pull --rebase`是没有问题的，这时本地变成了`A -> B -C -> E -> D'`，为什么这个操作是安全的呢？这里远端的dev分支是共享的，但是本地的dev可以视作私有的分支，`git pull --rebase`相当于rebase了远端的dev分支，最后push的结果其实是向远端push了一个新的提交，这时乙再使用`git pull`后的结果就是`A -> B -> C -> E -> D' `。

再比如，在Github上fork一个仓库，checkout一个`dev`分支做了一些更改后创建了一个PR，虽然这个`dev`分支在一个公开的代码托管平台上，所有人都可以看到，但是它只是为了最终合并进目标仓库的主线而建立的，仍然可以视为私有分支，在这个PR被合并前，可以通过rebase同步目标主分支的改动，用squash压缩提交信息，这些都是安全操作。

综上，安全使用amend、squash、rebase等操作的前提就是，**不要改动已经共享了的提交**，如果将共享的远端分支上的`A -> B -C`变成`A -> B -> D -> F`，那就会造成混乱了。

## 辅助工具

### Git hooks

Git提供了hook机制，可以在特定事件前后触发特定操作。例如，在代码提交前检查测试覆盖率，检查代码格式化等等。Python的开源工具[pre-commit](https://pre-commit.com/)就提供了很多好用的Hooks。

### Git子命令

如果你为Git写了一个扩展脚本，那么你可以用`git-foo`来命名你的可执行文件，Git允许你使用`git boo`的子命令形式调用自定义脚本。

### Git别名

可以为一些常用且比较长的命令配置一个短的别名，例如：

```shell
# 快速commit
git config --global alias.cm 'commit -m'

# 简洁美观的日志
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'"

# 搜索commit
git config --global alias.se '!git rev-list --all | xargs git grep -F'
```

### EditorConfig

不同的编辑器/IDE都会有自己的项目配置文件，如JetBrains系列的`.idea`，VSCode的`.vscode`，我个人认为这种文件不应该提交到公共仓库里，因为不应该强制所有开发者使用相同的工具（Android开发这类与IDE高度绑定的项目也许是例外）。

那这时候怎么保证不同开发者使用不同的编辑器，同时保持统一的代码风格呢？一个办法是使用前面提到的git hooks，在提交前做格式化；另一个办法就是使用[EditorConfig](https://editorconfig.org/)，在项目里放置一个`.editorconfig`文件，配置缩进、换行符等，基本上主流编辑器都会尊重这个配置。

```editorconfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
insert_final_newline = false
trim_trailing_whitespace = false
```

## 杂项

### 日志查询

Git命令行提供了一些选项去快速查找提交：

- 根据commit信息查找：`git log --all --grep='<pattern>'`
- 根据提交人查找：`git log --committer=<pattern>`
- 根据日期：`git log --since=<date>`、`git log --before=<date>`

更多查询条件，可以查看[官方文档](https://www.git-scm.com/docs/git-log)。

### 追踪空文件夹

Git本身是不能追踪空的目录的，但是有时候确实会有需要将一个空目录放到仓库的需求，这时可以在这个目录下放一个空的`.gitkeep`文件，这个文件名只是一个命名惯例，并没有特殊意义，接下来要去修改`.gitignore`文件：

```gitignore
# 应该忽略的目录
/foo

# 排除.gitkeep文件
!.gitkeep
```

这样就可以让Git忽略该目录下除了`.gitkeep`外所有文件，但是保留这个目录。

### 大文件

#### LFS

Git是为文本文件设计的，但是有时需要在仓库中放一些大的二进制文件，如图片、音频等设计资源，这会让仓库体积变得庞大，如果二进制文件变更，变更历史也会变得很大，要解决这个问题，就可以用LFS（Large File Storage）扩展，简单说就是它允许将大文件保存在另外的仓库，在本地保留一个指针。详情见[LFS](https://github.com/git-lfs/git-lfs)

#### gc

`git gc`命令可以帮助清理Git数据库中不需要的文件，减少磁盘占用，在[nixpkgs](https://github.com/NixOS/nixpkgs)这样有着巨量提交的大型仓库上工作时这个命令很有用。

#### 只需要最近的一次提交

有时我们暂时只需要一个仓库最新的代码，不需要所有的Git提交历史，那么可以使用`git clone --depth 1 repo-url`来克隆仓库，这可以节省下载时间和本地磁盘占用。

### 删除未追踪文件

> 2024/11/01添加

某次我在git仓库下执行了一个批量重命名文件的操作，发现不小心敲错了文件名，这时使用`git restore`可以快速恢复原文件，但是产生的错误文件并没有被清理掉，这时可以用`git clean`清理未被追踪的文件。

默认情况下直接`git clean`会被拒绝，需要用`git clean -i`交互式处理或`git clean -f`强制删除，也可以先用`git clean -n`查看哪些文件会被删除。

### 二分查找定位问题

> 2024/11/01添加

如果需要在git仓库里确认一个bug具体是什么时候引入的，可以使用`git bisect`命令，比如某个应用的新版本距离上个版本有100个commit，新版出现了一个bug，但不知道是从哪次commit开始有的，可以这样操作：

```shell
git bisect start <当前commit> <上一版确定没问题的commit>

# 这样仓库会跳到两次提交中间的一次提交上

# 编译运行应用，如果没问题
git bisect good

# 如果有问题
git bisect bad

# 看名字就知道，这个命令是一个二分查找的过程
# 重复上述标记good或bad的步骤，如果找到了
# git会提示 ‘xxx is the first bad commit’
# 此时可以退出
git bisect reset
```
