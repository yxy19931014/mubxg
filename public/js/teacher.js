/**
 * Created by thinkpad on 2017/3/20.
 */
define(['jquery','template','bootstrap'],function ($,template) {
    $.ajax({
        type:'get',
        url:'/api/teacher',
        success:function (data) {
            if(data.code==200){
                var html=template('teacherList',{list:data.result});
                $('#teachers').html(html);
                // 查看讲师
                $(".teacherOper").find('a:eq(0)').click(function () {
                    var tc_id=$('.teacherOper').attr('data-tcid');
                    $.ajax({
                         type:'get',
                         url:'/api/teacher/view',
                         data:{
                             tc_id:tc_id
                         },
                        dataType:'json',
                        success:function (data) {
                            var html=template('teacherShow',data.result);
                            $('#teacherView').html(html);
                            $('#teacherModal').modal();
                        }
                     })
                });

                // 注销
                $('.teacherOper').find('a:eq(2)').click(function () {
                    var tc_id=$(this).closest('td').attr('data-tcid');
                    var tc_status=$(this).closest('td').attr('data-status');
                    var that=$(this);
                    $.ajax({
                        type:"post",
                        url:'/api/teacher/handle',
                        data:{
                            tc_id:tc_id,
                            tc_status:tc_status
                        },
                        success:function (data) {
                            that.closest('td').attr('data-status',data.result.tc_status);
                            if(data.result.tc_status==1){
                                that.html('注 销');
                            }else {
                                that.html('启 用');
                            }
                        }
                    })
                });

            }
        }
    });





});