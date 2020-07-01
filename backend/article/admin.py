from django.contrib import admin
from .models import Article, Tag, Column


admin.site.register(Article)
admin.site.register(Tag)
admin.site.register(Column)
