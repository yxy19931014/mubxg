define(['jquery'],function ($) {
     return {
         setMenu:function (pathname) {
             $('.navs a').removeClass('active');
             $('.navs a[href="'+pathname+'"]').addClass('active').closest('ul').show();
         },
         qs:function (pname) {
             var pathname=location.search;
             pathname=pathname.substring(1);
             var arr=pathname.split('&');
             var obj={};
             for(var i=0;i<arr.length;i++){
                 var paramArr=arr[i].split('=');
                 obj[paramArr[0]]=paramArr[1];
             }
             return obj[pname];
         }
     }
});