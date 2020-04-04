from django.db import models
from model_utils.models import TimeStampedModel
from django.utils.translation import gettext_lazy as _

# Create your models here.
class FriendLink(TimeStampedModel):
    site_name = models.CharField(_('site_name'), max_length=100)
    site_domain = models.URLField(_('site_domain'))

    def __str__(self):
        return self.site_name


class SiteMessage(TimeStampedModel):
    content = models.TextField(verbose_name="正文")
    
    class Meta:
        verbose_name_plural = '通知'

    def __str__(self):
        return self.content[:20]
