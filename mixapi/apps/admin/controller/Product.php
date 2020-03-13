<?php
/**
 * @Author: Marte
 * @Date:   2019-10-28 21:11:59
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-12-10 00:05:34
 */
namespace app\admin\controller;
use think\Controller;
use think\Db;
use think\Request;
/**
* 商品
*/
class Product extends Controller
{

    // 上传商品图片接口
    public function imgUpload(){
        $resData = [];
        // 获取表单上传文件 例如上传了001.jpg
        $file = request()->file('image');
        // 移动到框架应用根目录/public/uploads/ 目录下
        $info = $file->validate(['size'=>10240000,'ext'=>'jpg,jpeg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads/product');
        if($info){
            // 成功上传后 获取上传信息
            // 将路径中反斜杠转为斜杠
            $imgurl = str_replace("\\","/",$info->getSaveName());
            $imgurlall = '/public/uploads/product/'.$imgurl;
            // 获取图片名称
            $imgname = $info->getFilename();

            $res = Db::name('imgs')->insert(['name'=>$imgname,'imgurl'=>$imgurlall,'pid'=>0]);// pid为对应商品id，默认为0
            if($res){
                $resData = [
                    'msg'=>'上传图片成功！',
                    'data'=>['name'=>$imgname,'url'=>$imgurlall],
                    'status'=>0
                ];
            }else{
                $resData = [
                    'msg'=>'上传图片失败！',
                    'status'=>1
                ];
            }

        }else{
            // 上传失败获取错误信息
            $err = $file->getError();
            $resData = [
                'msg'=>$err,
                'status'=>1
            ];
        }
        return json($resData);
    }

    // 删除商品图片接口
    public function imgDelete(){
        $resData = [];
        $post =  $this->request->post();
        $name = $post['name'];
        $res = Db::name('imgs')->where('name',$name)->delete();
        if($res){
            $resData = [
                'msg'=>'删除图片成功！',
                'status'=>0
            ];
        }else{
            $resData = [
                'msg'=>'删除图片失败！',
                'status'=>1
            ];
        }
        return json($resData);
    }

    // 添加/修改商品接口
    public function add(){
        $resData = [];
        $post =  $this->request->post();
        $name = $post['name'];
        $id = $post['id'];
        $desc = $post['desc'];
        $price = $post['price'];
        $imgs = $post['imgs'];
        $detail = $post['detail'];
        $curCateId = $post['curCateId'];
        $pageflag = $post['pageflag'];
        $status = 1;// 商品默认已上架
        $queryRes = Db::name('product')->where('name',$name)->find();
        if($queryRes && ($pageflag==='add')){
            $resData = [
                'msg'=>'商品名称已存在！',
                'status'=>1
            ];
        }else{
            // 将商品的图片数组转为字符串json后存入库
            $imgs_json = json_encode($imgs);// JSON编码数组成字符串
            $res = null;
            if($pageflag==='add'){
                $res = Db::name('product')->insert([
                    'name'=>$name,
                    'desc'=>$desc,
                    'price'=>$price,
                    'imgs'=>$imgs_json,
                    'detail'=>$detail,
                    'categoryId'=>$curCateId,
                    'status'=>$status
                ]);
            }else{
                $res = Db::name('product')->where('id',$id)->update([
                    'name'=>$name,
                    'desc'=>$desc,
                    'price'=>$price,
                    'imgs'=>$imgs_json,
                    'detail'=>$detail,
                    'categoryId'=>$curCateId,
                    'status'=>$status
                ]);
            }

            if($res){
                $resData = [
                    'msg'=>'更新商品成功！',
                    'status'=>0
                ];
            }else{
                $resData = [
                    'msg'=>'更新商品失败！',
                    'status'=>1
                ];
            }
        }
        return json($resData);
    }

    // 删除商品接口
    public function delete(){
        $resData = [];
        $post =  $this->request->post();
        $id = $post['id'];
        $res = Db::name('product')->where('id',$id)->delete();
        if($res){
            $resData = [
                'msg'=>'删除商品成功！',
                'status'=>0
            ];
        }else{
            $resData = [
                'msg'=>'删除商品失败！',
                'status'=>1
            ];
        }
        return json($resData);
    }

    public function lst(){
        $resData = [];
        $get = $this->request->get();
        $pageNum = $get['pageNum'];
        $pageSize = $get['pageSize'];
        // 总记录数
        $total = Db::name('product')->count();
        // 计算总页数
        $pages = ceil($total/$pageSize);
        $list = Db::name('product')->limit($pageSize)->page($pageNum)->order('id desc')->select();
        // 将商品的图片数组JSON解码成数组
        $imgarr = [];
        $imgres = [];
        foreach ($list as $key => $value) {
            if(isset($value['imgs'])){
                $value['imgs'] = json_decode($value['imgs']);
                foreach ($value['imgs'] as $key => $value) {
                    $imgarr[$key] = $value;
                }
                $imgres = Db::name('imgs')->whereIn('name',$imgarr)->select();
                foreach ($imgres as $key1 => $value1) {
                    $list[$key]['imgurls'][$key1] = $value1['imgurl'];
                }
            }
        }
        if($list){
            $resData = [
                'msg'=>'查询分类成功！',
                'status'=>0,
                'data'=>[
                    'total' => $total,
                    'pageNum' => $pageNum,
                    'pageSize' => $pageSize,
                    'pages' => $pages,
                    'list' => $list
                ]
            ];
        }else{
            $resData = [
                'msg'=>'查询分类失败！',
                'status'=>1
            ];
        }
        return json($resData);
    }

    public function search(){
        $resData = [];
        $get = $this->request->get();
        $pageNum = $get['pageNum'];
        $pageSize = $get['pageSize'];
        // 搜索字段
        $searchField = '';
        // 搜索标题
        $searchTit = '';
        if($get['productName']){
            $searchTit = $get['productName'];
            $searchField = 'name';
        }elseif($get['productDesc']){
            $searchTit = $get['productDesc'];
            $searchField = 'desc';
        }else{
            $searchTit = '';
        }
        $searchTit = '%'.$searchTit.'%';
        // 总记录数
        $total = Db::name('product')->where($searchField,'like',$searchTit)->count();
        // 计算总页数
        $pages = ceil($total/$pageSize);
        $res = Db::name('product')->where($searchField,'like',$searchTit)->limit($pageSize)->page($pageNum)->select();
        if($res){
            $resData = [
                'msg'=>'查询成功！',
                'status'=>0,
                'data'=>[
                    'total' => $total,
                    'pageNum' => $pageNum,
                    'pageSize' => $pageSize,
                    'pages' => $pages,
                    'list' => $res
                ]
            ];
        }else{
            $resData = [
                'msg'=>'暂无数据！',
                'status'=>0,
                'data'=>[
                    'total' => $total,
                    'pageNum' => $pageNum,
                    'pageSize' => $pageSize,
                    'pages' => $pages,
                    'list' => $res
                ]
            ];
        }
        return json($resData);
    }

    // 更新商品状态接口
    public function updateStatus(){
        $resData = [];
        $post =  $this->request->post();
        $productId = $post['productId'];
        $status = $post['status'];
        $res = Db::name('product')->where('id',$productId)->setField('status',$status);
        if($res){
            $resData = [
                'msg'=>'更新状态成功！',
                'status'=>0
            ];
        }else{
            $resData = [
                'msg'=>'更新状态失败！',
                'status'=>1
            ];
        }
        return json($resData);
    }

    // 详情/修改页查询商品所在分类
    public function getProCate(){
        $resData = [];
        $post =  $this->request->post();
        $categoryId = $post['categoryId'];
        $pageflag = $post['pageflag'];// edit/detail
        if($categoryId){
            $catearr = $this->getTreeCate($categoryId);
            $res = null;
            if($pageflag === 'edit'){
                $res = [];// 当前商品所在的分类数组(可能有多级)
                foreach ($catearr as $key => $value) {
                    $res[$key] = $value['id'];
                }
                $res = array_reverse($res);
            }else{
                $catenames = [];// 当前商品所在的分类名称(可能有多级)
                foreach ($catearr as $key => $value) {
                    $catenames[$key] = $value['name'];
                }
                $res = implode('->',array_reverse($catenames));
            }
            $resData = [
                'msg'=>'查询分类成功！',
                'data'=>$res,
                'status'=>0
            ];
        }else{
            $resData = [
                'msg'=>'分类id不能为空！',
                'status'=>1
            ];
        }
        return json($resData);
    }

    // 递归查询父级分类
    public function getTreeCate($pid,&$catearr=array()){
        $data=Db::name('category')->where('id',$pid)->find();
        $catearr[] = [
            'name'=>$data['name'],
            'id'=>$data['id']
        ];
        if($data['pid'] !== 0){
            $this->getTreeCate($data['pid'],$catearr);
        }
        return $catearr;
    }
}