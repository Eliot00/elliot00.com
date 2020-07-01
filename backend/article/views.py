from rest_framework import viewsets, mixins
from rest_framework.response import Response
from .models import Article
from .serializers import ArticleSerializer
from .permissions import IsOwnerOrReadOnly


class ArticleViewSet(mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     viewsets.GenericViewSet):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.increase_views()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
