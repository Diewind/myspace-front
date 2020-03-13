<?php
/**
 * @Author: Marte
 * @Date:   2019-12-11 22:43:03
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-12-15 19:55:27
 */
namespace app\admin\controller;
use think\Controller;
use think\Db;
use think\Request;
/**
* 角色
*/
class Role extends Controller
{
    public function add(){
        $resData = [];
        $post =  $this->request->post();
        $roleName = $post['roleName'];
        $timestamp = time();
        $queryRes = Db::name('role')->where('name',$roleName)->find();
        if($queryRes){
            $resData = [
                'msg'=>'角色名已存在！',
                'status'=>1
            ];
        }else{
            $res = Db::name('role')->insert(['name'=>$roleName,'createTime'=>$timestamp]);
            if($res){
                $resData = [
                    'msg'=>'添加角色成功！',
                    'status'=>0
                ];
            }else{
                $resData = [
                    'msg'=>'添加角色失败！',
                    'status'=>1
                ];
            }
        }

        return json($resData);
    }
    public function rolelist(){
        $resData = [];
        $res = Db::name('role')->select();
        if($res){
            // 处理返回结果
            foreach ($res as $key => $value) {
                $res[$key]['createTime'] && $res[$key]['createTime'] = date("Y-m-d H:i:s", $res[$key]['createTime']);
                $res[$key]['authTime'] && $res[$key]['authTime'] = date("Y-m-d H:i:s", $res[$key]['authTime']);
                // 将json字符串转为数组
                $res[$key]['menus'] = json_decode($res[$key]['menus']);
            }
            $resData = [
                'msg'=>'查询角色成功！',
                'status'=>0,
                'data'=>$res
            ];
        }else{
            $resData = [
                'msg'=>'查询角色失败！',
                'status'=>1
            ];
        }
        return json($resData);
    }
    public function update(){
        $resData = [];
        $post =  $this->request->post();
        $id = $post['id'];
        $menus = $post['menus'];
        $authorizer = $post['authorizer'];
        $menusStr = json_encode($menus);
        $authTime = time();
        $res = Db::name('role')->update(['id'=>$id,'menus'=>$menusStr,'authTime'=>$authTime,'authorizer'=>$authorizer]);
        if($res){
            $resData = [
                'msg'=>'设置角色权限成功！',
                'status'=>0
            ];
        }else{
            $resData = [
                'msg'=>'设置角色权限失败！',
                'status'=>1
            ];
        }
        return json($resData);
    }
    public function delete(){
        $resData = [];
        $post =  $this->request->post();
        $id = $post['id'];
        $res = Db::name('role')->where('id',$id)->delete();
        if($res){
            $resData = [
                'msg'=>'删除角色成功！',
                'status'=>0
            ];
        }else{
            $resData = [
                'msg'=>'删除角色失败！',
                'status'=>1
            ];
        }
        return json($resData);
    }
}