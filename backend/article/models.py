from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager


class Article(models.Model):
    series_set = (
        (0, '普通文章'),
        (1, 'Django+React全栈开发'),
    )
    column_set = (
        ("编程", "编程"),
        ("网络安全", "网络安全"),
        ("杂谈", "杂谈"),
    )
    author = models.ForeignKey(User, related_name='articles', on_delete=models.CASCADE)
    column = models.CharField(default="编程", choices=column_set, max_length=10)
    tags = TaggableManager()
    series = models.IntegerField(default=0, choices=series_set)
    title = models.CharField(max_length=50)
    body = models.TextField()
    summary = models.CharField(max_length=200, blank=True)
    views = models.PositiveIntegerField(default=0, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def increase_views(self):
        self.views += 1
        self.save(update_fields=['views'])

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return self.title
