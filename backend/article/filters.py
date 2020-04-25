from django_filters import rest_framework as filters
from .models import Article
import taggit


class TagFilter(filters.CharFilter):
    field_class = taggit.forms.TagField

    def __init__(self, *args, **kwargs):
        kwargs.setdefault('lookup_expr', 'in')
        super().__init__(*args, **kwargs)


class ClassifyFilter(filters.FilterSet):
    tags = TagFilter(field_name='tags__name')

    class Meta:
        model = Article
        fields = ['column', 'tags']
