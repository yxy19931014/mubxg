define(['jquery','template','util','cookie','overlay'],function ($, template,util) {
    // 设置侧边栏的样式
    var path=location.pathname;
    util.setMenu(path);
    // 控制左侧导航菜单的显示和隐藏
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });
    // 没有登录的时候都跳到登录页面
    var filename=location.pathname;
    var flag=$.cookie('PHPSESSID');
    if(!flag && filename.indexOf('login')==-1){
        location.href='/index/login';
    }

    // 登录时将信息传到后台，
    $('#loginId').submit(function () {
        var formData=$(this).serialize();
        $.ajax({
            type:'post',
            url:'/api/login',
            data:formData,
            dataType:'json',
            success:function (data) {
                // 如果登录成功，将登录名存入cookie中
                var loginInfo=JSON.stringify(data.result);
                $.cookie('loginInfo',loginInfo,{path:'/'});
                location.href='/index/index';
            }
        })
        return false; 
    });
    
    // 将用户名和头像传到每个页面（公共的部分）
    var loginInfo=$.cookie('loginInfo');
    var loginObj=JSON.parse(loginInfo);
    var tpl='<div class="avatar img-circle">'+
        '<img src="{{tc_avatar}}">'+
        '</div>'+
        '<h4>{{tc_name}}</h4>';
    var render=template.compile(tpl);
    var html=render(loginObj);
    $('.aside .profile').html(html);

    // 退出登录
    $('#loginOut').click(function () {
        $.ajax({
            type:'post',
            url:'/api/logout',
            success:function (data) {
                if(data.code==200){
                    location.href='/index/login';
                }
            }
        })
    });
    
});
