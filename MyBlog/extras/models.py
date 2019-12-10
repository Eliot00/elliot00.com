from django.db import models
from model_utils.models import TimeStampedModel
from django.utils.translation import gettext_lazy as _

# Create your models here.
class FriendLink(TimeStampedModel):
    site_name = models.CharField(_('site_name'), max_length=100)
    site_domain = models.URLField(_('site_domain'))

    def __str__(self):
        return self.site_name
