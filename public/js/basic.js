/**
 * Created by thinkpad on 2017/3/23.
 */
define(['jquery','util','template','ckeditor','form','validate'],function ($,util,template,CKEDITOR) {
    var cs_id=util.qs('cs_id');
    // 设置菜单样式
    util.setMenu('/course/add');
    $.ajax({
        type:'get',
        url:'/api/course/basic',
        data:{
            cs_id:cs_id
        },
        dataType:'json',
        success:function (data) {
            console.log(data);
            var html=template('basicTpl',data.result);
            $('#basicInfo').html(html);
            // 子级分类处理
            $('#topCategory').change(function () {
                var cg_id=$(this).val();
                $.ajax({
                    type:'get',
                    url:'/api/category/child',
                    data:{
                        cg_id:cg_id
                    },
                    dataType:'json',
                    success:function (data) {
                        var tpl='{{each list as item}}<option value="{{item.cg_id}}">{{item.cg_name}}</option>{{/each}}';
                        var render=template.compile(tpl);
                        var html=render({list:data.result});
                        $('#childCategory').html(html);
                    }
                })
            });
            // 富文本处
            CKEDITOR.replace('ckeditor',{
                toolbarGroups: [{
                    name:'clipboard',groups:["clipboard","undo"]
                }]
            });
            // 更新基本资料
            $('#basicForm').validate({
                sendForm:false,
                valid:function () {
                    // 同步更新富文本的内容变化
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    $(this).ajaxSubmit({
                        type:'post',
                        url:'/api/course/update/basic',
                        data:{cs_id:cs_id},
                        dataType:'json',
                        success:function (data) {
                            console.log(data);
                            if(data.code==200){
                                location.href='/course/picture?cs_id='+data.result.cs_id;
                            }
                        }
                    })
                }
            })
        }
    })
});