from rest_flex_fields import FlexFieldsModelSerializer
from rest_framework import serializers
from .models import Article


class ArticleSerializer(FlexFieldsModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Article
        fields = ['id', 'author', 'column', 'tags', 'series', 'title', 'body',
                  'summary', 'views', 'created', 'updated']
