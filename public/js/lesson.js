/**
 * Created by thinkpad on 2017/3/24.
 */
define(['jquery','template','util','form','validate','bootstrap'],function ($,template,util) {
    util.setMenu('/course/add');
    var cs_id=util.qs("cs_id");
    console.log(cs_id);
    $.ajax({
        type:'get',
        url:'/api/course/lesson',
        data:{cs_id:cs_id},
        dataType:'json',
        success:function (data) {
            if(data.code==200){
                var html=template('lessonTpl',data.result);
                $('#lessonInfo').html(html);
                // 添加课时
                $('#lessonAdd').click(function () {
                    $('#chapterModal').modal();
                    var str={};
                    str.title='添加课时';
                    var html=template('lessonOperTpl',str);
                    $('#lessonOperInfo').html(html);
                    $('#saveData').click(function () {
                        save('/api/course/chapter/add');
                    });
                });
                // 编辑课时
                $('#lessonEdit').click(function () {
                    var ct_id=$(this).attr('data-ctId');
                    $.ajax({
                        type:'get',
                        url:'/api/course/chapter/edit',
                        data:{
                            ct_id:ct_id
                        },
                        dataType:'json',
                        success:function (data) {
                            data.result.title='编辑课时';
                            console.log(data);
                            var html=template('lessonOperTpl',data.result);
                            $('#lessonOperInfo').html(html);
                            $('#chapterModal').modal();
                            $('#saveData').click(function () {
                                save('/api/course/chapter/modify');
                            });

                        }
                    })

                });
                function save(url) {
                    var free=$('#isFree').prop('checked')?1:0;
                        $('#lessonForm').validate({
                            sendForm:false,
                            valid:function () {
                                console.log(111);
                                $(this).ajaxSubmit({
                                    type:'post',
                                    url:url,
                                    data:{
                                        ct_cs_id:cs_id,
                                        ct_is_free:free
                                    },
                                    dataType:'json',
                                    success:function (data) {
                                        if(data.code==200){
                                            console.log(222);
                                            location.href='/course/lesson?cs_id='+cs_id;
                                        }
                                    }
                                })
                            }
                        })
                }
            }
        }
    });
});