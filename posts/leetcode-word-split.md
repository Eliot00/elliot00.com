---
title: "刷题笔记0x09：单词拆分"
tags: ["动态规划", "算法"]
series: "随笔"
createdAt: "2020-06-25T12:42:00.349+00:00"
publishedAt: "2020-12-19T05:36:32.519314+00:00"
summary: "这篇文章介绍了如何使用动态规划解决一个字符串分割问题，即判断一个给定的字符串能否被空格拆分为一个或多个在字典中出现的单词。文章从分析题意、设计状态转移方程到代码实现，最后还探讨了代码优化方案。文章思路清晰，代码简洁，是一篇优秀的算法题解。"
---

## 题目分析

> 给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。https://leetcode-cn.com/problems/word-break/

这个题目一开始被我误解成是判断列表中的字符串是否都是`s`的子串，最后看到官方示例才纠正回来～

![示例截图](https://imgkr.cn-bj.ufileos.com/adef2345-10cb-4c28-b48e-6e2afc14f62e.png)

可以发觉，这个题目我们是要找出**断点**打断字符串`s`，让打断后的各个单词都在单词列表中。

下面分析一下，如果我们有一个长度为`i`的字符串，那么假设`dp[j]`表示字符串到`j`位置的子字符串是否符合题目条件，可以得出，如果`dp[i]`也就是长度为`i`的原字符串`s`符合条件，那么一定有一个`0 < j < i`的情况下，`dp[j]`符合条件，并且，剩下的`j`到`i`的部分是在单词列表里面的。

通过分析我们发现这是一个可以用**动态规划**解决的问题，状态转移方程为：

```
// 伪代码
dp[i] = dp[j] and (s[j:i] in wordDict)
```

## 代码实现

在具体代码中，我们设`dp`数组**长度为s长度加一**，`dp[0]`设为**真**做初始条件，从`i=1`开始迭代。

```rust
impl Solution {
    pub fn word_break(s: String, word_dict: Vec<String>) -> bool {
        let length = s.chars().count();
        let mut dp: Vec<bool> = vec![false; length + 1];
        dp[0] = true;
        for i in 1..=length {
            for j in 0..i {
                let word = s.as_str()[j..i].to_string();
                if dp[j] && word_dict.contains(&word) {
                    dp[i] = true;
                    break;
                }
            }
        }
        dp[length]
    }
}
```

![示意图](https://imgkr.cn-bj.ufileos.com/4a85e3c0-8d04-498c-9344-dc6e3732c6f7.png)

最后成功超越100%，不过这和Leetcode上用`Rust`刷题的少也有关系。

![超100%](https://imgkr.cn-bj.ufileos.com/5054f6b5-2a70-4b6e-ab79-d6abcf94265b.png)

## 优化

我们的代码还有优化的空间，不过由于现在耗时四舍五入0ms了，为了展示差别，用`Python`演示下（这样感觉Python很没有排面啊：

先上个普通Python版：

```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        length = len(s)
        dp = [False] * (length + 1)
        dp[0] = True
        for i in range(1, length + 1):
            for j in range(i):
                if dp[j] and s[j:i] in wordDict:
                    dp[i] = True
                    break
        return dp[-1]

```

![Python版](https://imgkr.cn-bj.ufileos.com/7df16b0f-1d1b-4a1d-a425-7620825c8d76.png)

由于线性表查找时间复杂度为`O(N)`，而哈希表查找时间复杂度为`O(1)`，所有我们利用**字典生成式**将原本的单词列表转成哈希结构的字典：

```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        length = len(s)
        dp = [False] * (length + 1)
        dp[0] = True
        wordDict = {key: value for value, key in enumerate(wordDict)}
        for i in range(1, length + 1):
            for j in range(i):
                if dp[j] and s[j:i] in wordDict:
                    dp[i] = True
                    break
        return dp[-1]

```

![字典版](https://imgkr.cn-bj.ufileos.com/48559d7c-948f-448f-ac5c-f998eed526d6.png)

快了一丢丢～

评论区也有先求出`wordDict`中最长单词长度`maxWordLength`，仅遍历当前`i`位置向前`maxWordLength`的元素，以减少循环次数，不过我试了几次运行时间没有显著提升。
