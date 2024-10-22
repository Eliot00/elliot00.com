---
title: "刷题笔记0x06：双指针问题"
tags: ["算法", "Python"]
series: "刷题笔记"
createdAt: "2020-04-21T02:00:44.19+00:00"
publishedAt: "2020-12-19T05:52:03.210603+00:00"
summary: "文章讨论了leetcode上双指针问题的解决方法和思路。对于三数之和问题，它首先介绍了暴力穷举和用哈希表换时间的方法，然后介绍了利用排序和双指针降低时间复杂度的方法以及一些需要注意的细节。接着，文章介绍了删除链表倒数第N个节点问题的解决方法，它首先介绍了两个指针跑的过程，然后介绍了注意链表长度为n，要求删除倒数第n的情况。最后，文章还提到了两个相似的题目：最接近的三数之和与四数之和。"
---

最近在leetcode做了几题双指针题目，来做个总结。

## 三数之和

> 题目要求在有n个整数的列表中找出三个数相加刚好为0的所有解。详情见leetcode[三数之和](https://leetcode-cn.com/problems/3sum/)。

### 思路
首先这题暴力穷举是可以解决的，可以把所有组合都试一遍，但显然这样时间复杂度窜到O(n<sup>3</sup>)了。

试着优化，可以试试用空间换时间，建个哈希表，遍历列表，将直接凑三个数简化为确定一个数，寻找能和它相加为0的两个数。这下时间复杂度降到了O(n<sup>2</sup>)，空间复杂度O(n)。

别急，还可以想想办法节省空间。这里利用一下排序。先将整个列表按升序排序，对于这个排好序的列表而言：

- 某个元素`nums[i]`如果大于0，那么就可以直接返回了，因为是按升序排序的，后面的数只会更大，不可能相加等于0。
- 当前值`nums[i]`,使左指针`L`为`i+1`，右指针`R`为`len(nums) - 1`。三个数相加，等于0就保存结果，大于0，那么右边值太大，R减一，反过来，小于0，左边值太小，L加一。

思路有了，剩下的就是可能还有一些重复值要去掉，避免重复计算，以及列表长度过小的情况。

### 具体代码

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        n=len(nums)
        res=[]
        if not nums or n < 3:
            return []
        nums.sort()
        res=[]
        for i in range(n):
            if nums[i] > 0:
                return res
            if i > 0 and nums[i] == nums[i-1]:
                continue
            L=i+1
            R=n-1
            while L < R:
                if nums[i] + nums[L] + nums[R] == 0:
                    res.append([nums[i], nums[L], nums[R]])
                    while L < R and nums[L] == nums[L+1]:
                        L=L+1
                    while L < R and nums[R] == nums[R-1]:
                        R=R-1
                    L=L+1
                    R=R-1
                elif nums[i] + nums[L] + nums[R] > 0:
                    R=R-1
                else:
                    L=L+1
        return res
```
### 相似题目

leetcode上还有个最接近的三数之和与四数之和，思路都差不多，可以去尝试一下。

## 删除链表倒数第N个节点

> 题目要求给定链表与要n，删去倒数第n个元素并且返回链表头。详情见[删除链表的倒数第N个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

### 思路

这个问题首先想到双指针解决，建立`slow`和`fast`两个指针。

- 两个指针都指向链表头部，让`fast`先跑`n`步，然后两个指针再一起跑。
- `fast`到末尾时，`slow`刚好就是倒数第`n+1`个元素。让`slow.next`指向倒数第`n-1`，也就是`slow.next = slow.next.next`，即完成删除。
- 注意在让`fast`先走`n`步过程中，如果`fast.next`存在，则`fast`前进直到前进`n`步为止，否则`fast.next`不存在就返回`head.next`。这么做的原因是存在链表长度为`n`，要求删除倒数第`n`的情况。

### 具体代码

```python
class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        if not head or not head.next:
            return None
        fast, slow = head, head
        for i in range(n):
            if fast.next:
                fast = fast.next
            else:
                return head.next
        while fast.next:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return head
```
