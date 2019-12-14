from django import template
from ..models import FriendLink, SiteMessage


register = template.Library()

@register.inclusion_tag('inclusions/_friend_link.html', takes_context=True)
def show_friend_links(context, num=5):
    friend_link_list = FriendLink.objects.all()[:num]
    return {
            'friend_link_list': friend_link_list
    }

@register.inclusion_tag('inclusions/_site_message.html', takes_context=True)
def show_site_message(context):
    try:
        message = SiteMessage.objects.last()
        data = {
                'content': message.content.replace("\r\n", "<br/>"),
                'created': message.created.strftime("%Y/%m/%d"),
        }
    except:
        data = {
                "content": "o(╥﹏╥)o服务器连接失败~"
        }
    return data
