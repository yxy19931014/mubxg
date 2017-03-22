/**
 * Created by thinkpad on 2017/3/19.
 */
require.config({
    baseUrl:'/public',
    paths:{
        jquery:'assets/jquery/jquery',
        cookie:'assets/jquery-cookie/jquery.cookie',
        echarts:'assets/echarts/echarts.min',
        template:'assets/artTemplate/template',
        util:'js/util',
        bootstrap:'assets/bootstrap/js/bootstrap',
        overlay:'js/overlay',
        nprogress:'assets/nprogress/nprogress',
        datepicker :'assets/bootstrap-datepicker/js/bootstrap-datepicker',
        language : 'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        form:'assets/jquery-form/jquery.form',
        validate:'assets/validate/jquery-validate.min',
        uploadify:'assets/uploadify/jquery.uploadify',
        region:'assets/jquery-region/jquery.region',
        ckeditor:'assets/ckeditor/ckeditor'
    },
    shim:{
        bootstrap:{
            deps:['jquery']
        },
        language:{
            deps:['jquery','datepicker']
        },
        datepicker:{
            deps:['jquery']
        },
        validate:{
            deps:['jquery']
        },
        region:{
            deps:['jquery']
        },
        uploadify:{
            deps:['jquery']
        },
        ckeditor:{
            exports:'CKEDITOR',
            deps:['jquery']
        }

    }
});
