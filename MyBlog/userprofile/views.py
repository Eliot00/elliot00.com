from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .forms import UserProfileForm
from .models import UserProfile


# 显示用户信息
@login_required(login_url='/accounts/login/')
def userprofile(request, id):
    user = User.objects.get(id=id)
    profile = UserProfile.objects.get(user_id=id)
    return render(request, 'account/profile.html', {'profile': profile, 'user': user})

# 编辑用户信息
@login_required(login_url='/accounts/login/')
def change_userprofile(request, id):
    user = User.objects.get(id=id)
    # user_id 是 OneToOneField 自动生成的字段
    if UserProfile.objects.filter(user_id=id).exists():
        # user_id 是 OneToOneField 自动生成的字段
        profile = UserProfile.objects.get(user_id=id)
    else:
        profile = UserProfile.objects.create(user=user)

    if request.method == 'POST':
        # 验证修改数据者，是否为用户本人
        if request.user != user:
            return HttpResponse("你没有权限修改此用户信息。")

        profile_form = UserProfileForm(request.POST, request.FILES)
        if profile_form.is_valid():
            # 取得清洗后的合法数据
            profile_cd = profile_form.cleaned_data
            profile.phone = profile_cd['phone']
            profile.bio = profile_cd['bio']
            if 'avatar' in request.FILES:
                profile.avatar = profile_cd["avatar"]
            profile.save()
            # 带参数的 redirect()
            return redirect("userprofile:userprofile", id=id)
        else:
            return HttpResponse("注册表单输入有误。请重新输入~")

    elif request.method == 'GET':
        context = {'profile': profile, 'user': user}
        return render(request, 'account/change_profile.html', context)
    else:
        return HttpResponse("请使用GET或POST请求数据")
