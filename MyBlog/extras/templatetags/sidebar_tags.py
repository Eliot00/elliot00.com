from django import template
from ..models import FriendLink


register = template.Library()

@register.inclusion_tag('inclusions/_friend_link.html',
        takes_context=True)
def show_friend_links(context, num=5):
    friend_link_list = FriendLink.objects.all()[:num]
    return {
            'friend_link_list': friend_link_list
    }
