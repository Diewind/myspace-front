<?php
namespace app\admin\controller;
use think\Controller;
use think\Db;
use think\Request;
class User extends Controller
{
    /*
        添加用户接口
    */
    public function add()
    {
        $resData = [];
        $post =  $this->request->post();
        $username = $post['username'];
        $password = md5($post['password']);
        $email = $post['email'];
        $phone = $post['phone'];
        $roleId = $post['roleId'];
        $timestamp = time();
        $queryRes = Db::name('user')->where('username',$username)->find();
        if($queryRes){
            $resData = [
                'msg'=>'用户已存在！',
                'status'=>1
            ];
        }else{
            $res = Db::name('user')->insert(['username'=>$username,'password'=>$password,'email'=>$email,'phone'=>$phone,'roleId'=>$roleId,'createTime'=>$timestamp,'level'=>1]);
            if($res){
                $resData = [
                    'msg'=>'添加用户成功！',
                    'status'=>0
                ];
            }else{
                $resData = [
                    'msg'=>'添加用户失败！',
                    'status'=>1
                ];
            }
        }

        return json($resData);

    }
    /*
        用户登录接口
    */
    public function login(){
        $post =  $this->request->post();
        $user = $post['username'];
        $password = md5($post['password']);
        $res = Db::name('user')->where(['username'=>$user,'password'=>$password])->find();
        $resData = [];
        if($res){
            $userRes = Db::name('user')->select();
            $roleRes = Db::name('role')->where('id',$res['roleId'])->find();
            $roleRes['menus'] = json_decode($roleRes['menus']);
            $resData = [
                'msg'=>'登录成功！',
                'status'=>0,
                'data'=>[
                    'id'=>$res['id'],
                    'username'=>$res['username'],
                    'phone'=>$res['phone'],
                    'role'=>$roleRes,
                    'roleId'=>$res['roleId'],
                    'createTime'=>$res['createTime']
                ]
            ];
        }else{
            $resData = [
                'msg'=>'登录失败，用户不存在！',
                'status'=>1
            ];
        }
        return json($resData);

    }
    /*
    获取用户列表接口
     */
    public function userlist()
    {
        $resData = [];
        $userRes = Db::name('user')->order('id desc')->select();
        $roleRes = Db::name('role')->select();
        if($userRes){
            // 将时间戳转为时间
            foreach ($userRes as $key => $value) {
                $userRes[$key]['createTime'] && $userRes[$key]['createTime'] = date("Y-m-d H:i:s", $userRes[$key]['createTime']);
            }
            $resData = [
                'msg'=>'查询成功！',
                'status'=>0,
                'data'=>[
                    'users'=>$userRes,
                    'roles'=>$roleRes
                ]
            ];
        }else{
            $resData = [
                'msg'=>'查询失败！',
                'status'=>1
            ];
        }
        return json($resData);
    }
    public function update(){
        $resData = [];
        $post =  $this->request->post();
        $id = $post['id'];
        $username = $post['username'];
        $email = $post['email'];
        $phone = $post['phone'];
        $roleId = $post['roleId'];

        $res = Db::name('user')->update(['id'=>$id,'username'=>$username,'email'=>$email,'phone'=>$phone,'roleId'=>$roleId]);
        if($res){
            $resData = [
                'msg'=>'更新用户成功！',
                'status'=>0
            ];
        }else{
            $resData = [
                'msg'=>'更新用户失败！',
                'status'=>1
            ];
        }

        return json($resData);
    }
    public function delete(){
        $resData = [];
        $post =  $this->request->post();
        $id = $post['id'];
        if($id === 1){
            $resData = [
                'msg'=>'删除用户失败，admin不能删除！',
                'status'=>1
            ];
        }else{
            $res = Db::name('user')->where('id',$id)->delete();
            if($res){
                $resData = [
                    'msg'=>'删除用户成功！',
                    'status'=>0
                ];
            }else{
                $resData = [
                    'msg'=>'删除用户失败！',
                    'status'=>1
                ];
            }
        }

        return json($resData);
    }
    public function lst()
    {
        return '<h2>bbb</h2>';
    }
}
