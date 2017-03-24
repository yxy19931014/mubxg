/**
 * Created by thinkpad on 2017/3/23.
 */
define(['jquery','util'],function ($,util) {
    // 设置菜单样式
    util.setMenu('/course/add');
    $('#addBtn').click(function () {
        var cs_name=$('#addlesson').val();
        console.log(cs_name);
        $.ajax({
             type:'post',
             url:'/api/course/create',
             data:{
                 cs_name:cs_name
             },
             dataType:'json',
             success:function (data) {
                 if(data.code==200){
                     location.href='/course/basic?cs_id='+data.result.cs_id;
                 }
             }
         })
    });
});