define(['jquery','template','util','datepicker','language','validate','form'],function ($, template, util) {
     util.setMenu('/teacher/teacher_list');
    var tc_id=util.qs('tc_id');
    if(tc_id){
        // 编辑
        $.ajax({
            type:'get',
            url:'/api/teacher/edit',
            data:{
                tc_id:tc_id
            },
            dataType:'json',
            success:function (data) {
                data.result.tcInfo='讲师编辑';
                data.result.tcBtn='保存';
                var html=template('teaedit',data.result);
                $('#teacherAdd').html(html);
                checkForm('/api/teacher/update');
            }
        });
    }else {
        // 添加
        var data={
            tcInfo:'讲师添加',
            tcBtn:'添加',
            tc_gender:1
        };
        var html=template('teaedit',data);
        $('#teacherAdd').html(html);
        checkForm('/api/teacher/add');
    }
    function checkForm(url) {
        $('#teacherForm').validate({
            sendForm:false,
            valid:function () {
                $(this).ajaxSubmit({
                    type:'post',
                    url:url,
                    dataType:'json',
                    success:function (data) {
                        if(data.code==200){
                            location.href='/teacher/teacher_list';
                        }
                    }
                });
            },
            description:{
                tcName: {
                    required:'用户名不能为空'
                },
                tcPass:{
                    required:'密码不能为空',
                    pattern:'只能是六位数字'
                },
                joinDate:{
                    required:'入职日期不能为空'
                }
            },
            eachValidField:function () {
                $(this).closest('div').removeClass('has-error').addClass('has-success');
            },
            eachInvalidField:function () {
                $(this).closest('div').removeClass('has-success').addClass('has-error');
            }
        })
    }
});