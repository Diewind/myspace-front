<?php
/**
 * @Author: Marte
 * @Date:   2019-08-27 22:24:24
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-10-03 11:23:15
 */
namespace app\admin\controller;
use think\Controller;
use think\Db;
use think\Request;
/**
* 分类
*/
class Category extends Controller
{

    public function add(){
        $resData = [];
        $post =  $this->request->post();
        $name = $post['categoryName'];
        $pid = $post['parentId'];//0表示顶级分类
        $queryRes = Db::name('category')->where('name',$name)->find();
        if($queryRes){
            $resData = [
                'msg'=>'分类名已存在！',
                'status'=>1
            ];
        }else{
            $res = Db::name('category')->insert(['name'=>$name,'pid'=>$pid]);
            if($res){
                $resData = [
                    'msg'=>'添加分类成功！',
                    'status'=>0
                ];
            }else{
                $resData = [
                    'msg'=>'添加分类失败！',
                    'status'=>1
                ];
            }
        }

        return json($resData);
    }
    public function catelist(){
        $resData = [];
        $get =  $this->request->get();
        $pid = $get['parentId'];
        $res = Db::name('category')->select();
        $resCate = $this->getTree($pid);
        if($res){
            $resData = [
                'msg'=>'查询分类成功！',
                'status'=>0,
                'data'=>$resCate
            ];
        }else{
            $resData = [
                'msg'=>'查询分类失败！',
                'status'=>1
            ];
        }
        return json($resData);
    }
    public function update(){
        $resData = [];
        $post =  $this->request->post();
        $id = $post['categoryId'];
        $name = $post['categoryName'];
        $res = Db::name('category')->update(['name'=>$name,'id'=>$id]);
        if($res){
            $resData = [
                'msg'=>'更新分类成功！',
                'status'=>0
            ];
        }else{
            $resData = [
                'msg'=>'查询分类失败！',
                'status'=>1
            ];
        }
        return json($resData);
    }
    public function delete(){
        $resData = [];
        $post =  $this->request->post();
        $id = $post['categoryId'];
        $res = Db::name('category')->where('id',$id)->delete();
        if($res){
            $resData = [
                'msg'=>'删除分类成功！',
                'status'=>0
            ];
        }else{
            $resData = [
                'msg'=>'删除分类失败！',
                'status'=>1
            ];
        }
        return json($resData);
    }
    // 处理无限级分类
    public function getTree($pid){
        $data=Db::name('category')->where('pid',$pid)->select();
        if(!empty($data)){
            foreach($data as &$cate){
                #通过该分类的主键id查询该分类的子类
                $cate['children']=$this->getTree($cate['id']);
            }
            return $data;
        }

    }
}