<?php
/**
 * @Author: Marte
 * @Date:   2019-08-18 13:00:27
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-08-25 09:43:18
 */
namespace app\admin\controller;
use think\Controller;
use think\Db;
use think\Request;

class Weather extends Controller{
    /*
    获取所在城市天气
    */
    public function query(){
        $resData = [];
        $get =  $this->request->get();
        $citynum = $get['citynum'];
        if(!(is_numeric($citynum))){
            $resData = [
                'msg'=>'请输入有效的城市编号',
                'status'=>1
            ];
            return json($resData);
        }else{
            $ch=curl_init('http://t.weather.sojson.com/api/weather/city/'.$citynum);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
            curl_setopt($ch,CURLOPT_BINARYTRANSFER,true);
            $output=curl_exec($ch);
            $output = json_decode($output,true);
            if(!$ch){
                $resData = [
                    'msg'=>'查询天气失败！',
                    'status'=>1
                ];
            }else{
                $resData = [
                    'msg'=>'查询天气成功！',
                    'data'=>$output,
                    'status'=>0
                ];
            }
        }
        return json($resData);
    }
}