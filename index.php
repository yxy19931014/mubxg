<?php
    $path='index';
    $filename='index';

//    var_dump($_SERVER);

    if(array_key_exists('PATH_INFO',$_SERVER)){
        $url=$_SERVER['PATH_INFO'];
        $arr=explode('/',substr($url,1));
        if(count($arr)==2){
            $path=$arr[0];
            $filename=$arr[1];
        }else {
            $filename='login';
        }
    }else {
        $filename='login';
    }

    include('/view/'.$path.'/'.$filename.'.html');


?>