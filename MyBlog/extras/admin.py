from django.contrib import admin
from .models import FriendLink, SiteMessage

# Register your models here.
admin.site.register(SiteMessage)

@admin.register(FriendLink)
class FriendLinkAdmin(admin.ModelAdmin):
    list_display = ['site_name', 'site_domain']
