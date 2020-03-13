-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2020-03-13 14:25:40
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mixapi`
--

-- --------------------------------------------------------

--
-- 表的结构 `mix_category`
--

CREATE TABLE `mix_category` (
  `id` int(10) UNSIGNED NOT NULL COMMENT '分类id',
  `pid` int(10) UNSIGNED DEFAULT NULL COMMENT '父id',
  `name` varchar(255) DEFAULT NULL COMMENT '分类名'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `mix_category`
--

INSERT INTO `mix_category` (`id`, `pid`, `name`) VALUES
(1, 0, '电脑'),
(2, 0, '图书'),
(3, 1, 'Apple'),
(4, 0, '服装'),
(5, 0, '食品'),
(6, 0, '玩具'),
(14, 0, '数码3C'),
(8, 0, '汽车产品'),
(9, 0, '箱包'),
(10, 0, '手机'),
(11, 0, '家具'),
(12, 3, 'MacBook Pro'),
(15, 0, '机械'),
(16, 0, '灯具'),
(17, 0, '电器'),
(19, 0, '美妆'),
(20, 12, 'Pro2019'),
(21, 0, '手办');

-- --------------------------------------------------------

--
-- 表的结构 `mix_imgs`
--

CREATE TABLE `mix_imgs` (
  `id` int(11) UNSIGNED NOT NULL COMMENT '图片id',
  `name` varchar(255) DEFAULT NULL COMMENT '图片名称',
  `imgurl` varchar(255) DEFAULT NULL COMMENT '图片地址',
  `pid` int(11) DEFAULT NULL COMMENT '图片所属父级'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `mix_imgs`
--

INSERT INTO `mix_imgs` (`id`, `name`, `imgurl`, `pid`) VALUES
(1, '991a8036590d7d85d3f24202a19d3cea.jpg', '/public/uploads/product/20191201/991a8036590d7d85d3f24202a19d3cea.jpg', 0),
(2, 'f76cd9fac0ebb5bed66d5c9d51f41a86.jpg', '/public/uploads/product/20191201/f76cd9fac0ebb5bed66d5c9d51f41a86.jpg', 0),
(3, 'e3f76314d2a62cd18410220d88e1ad8d.png', '/public/uploads/product/20191201/e3f76314d2a62cd18410220d88e1ad8d.png', 0),
(5, '25741b5852e22980ff751ffa95eec09b.png', '/public/uploads/product/20191202/25741b5852e22980ff751ffa95eec09b.png', 0),
(6, 'f533a3ed79483e5e894132bfd27fb124.png', '/public/uploads/product/20191202/f533a3ed79483e5e894132bfd27fb124.png', 0),
(8, 'e6a299d057c6812d92e01c776af58113.png', '/public/uploads/product/20191204/e6a299d057c6812d92e01c776af58113.png', 0),
(9, 'ac47472d351a2e550b96d6bdc5186f5e.png', '/public/uploads/product/20191204/ac47472d351a2e550b96d6bdc5186f5e.png', 0),
(10, '0fe221fa78496ee83fa27e50734f54c0.png', '/public/uploads/product/20191204/0fe221fa78496ee83fa27e50734f54c0.png', 0),
(11, '6ba2b8752644a33ed6c6ffafb164d860.png', '/public/uploads/product/20191204/6ba2b8752644a33ed6c6ffafb164d860.png', 0),
(12, 'b27cf7a5ddedd443efb3ca25418e3b01.png', '/public/uploads/product/20191204/b27cf7a5ddedd443efb3ca25418e3b01.png', 0),
(13, '195650c4cb4b96bd30562889ca473006.png', '/public/uploads/product/20191204/195650c4cb4b96bd30562889ca473006.png', 0),
(14, '3ad5a139dee9c40dcae55bf2c0225049.png', '/public/uploads/product/20191204/3ad5a139dee9c40dcae55bf2c0225049.png', 0),
(15, '8e725705ebb4530cd0cdff6241b679aa.png', '/public/uploads/product/20191204/8e725705ebb4530cd0cdff6241b679aa.png', 0),
(16, 'd106ac0e82a90a45a324e2b8f894e98d.png', '/public/uploads/product/20200112/d106ac0e82a90a45a324e2b8f894e98d.png', 0),
(17, '2164bb2c6352d727e2429500dbbce9ca.jpg', '/public/uploads/product/20200112/2164bb2c6352d727e2429500dbbce9ca.jpg', 0),
(18, '1c2de5b4f086b699b685ad66c5d64a5b.jpg', '/public/uploads/product/20200112/1c2de5b4f086b699b685ad66c5d64a5b.jpg', 0),
(19, '99b5f18c32e187e46b09fab0cbe387a6.jpg', '/public/uploads/product/20200112/99b5f18c32e187e46b09fab0cbe387a6.jpg', 0);

-- --------------------------------------------------------

--
-- 表的结构 `mix_product`
--

CREATE TABLE `mix_product` (
  `id` int(10) UNSIGNED NOT NULL COMMENT '商品id',
  `name` varchar(255) DEFAULT '' COMMENT '商品名称',
  `desc` varchar(255) DEFAULT '' COMMENT '商品描述',
  `imgs` varchar(255) DEFAULT NULL COMMENT '商品图片',
  `price` decimal(20,2) DEFAULT NULL COMMENT '商品价格',
  `detail` varchar(255) DEFAULT NULL COMMENT '商品详情',
  `categoryId` smallint(6) DEFAULT '0',
  `status` tinyint(255) DEFAULT NULL COMMENT '商品状态：0-未上架，1-待上架，2-已上架，3-已下架'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `mix_product`
--

INSERT INTO `mix_product` (`id`, `name`, `desc`, `imgs`, `price`, `detail`, `categoryId`, `status`) VALUES
(2, '"2Apple 2019款 MacBook Pro 13.3【带触控栏】八代i5 8G 256G RP645显卡 深空灰 笔记本电脑 MUHP2CH/A"', '"2苹果电脑真的很好，确实清薄，漂亮，不管是在家办公还是出差都非常方便，外观很好看 设计很精致 功能很完善 尤其是上面的触控烂 本身设计感十足 加上有些操作都可以不用鼠标直接点击 简直太便捷 很值得拥有 也很流畅 分辨率不卡顿 发热也正常"', NULL, '9998.00', '"\n首先我想说，这款笔记本电脑的外观我非常非常的喜欢。时尚小巧，轻薄方便，适合我出差携带。其次我想说，这款笔记本的电脑性能也是非常不错的。屏幕的色彩非常清晰开机的时间只需要7.8秒。下载软件的时间只需要11秒到12秒。这些都非常符合我的要求。这款笔记本电脑的耐用性也是我非常期待的。最后为客服点赞，有问必答，服务周到。这次在京东的购物使我非常满意，我期待下一次的购物。"', 3, 2),
(3, '"3Apple 2019款 MacBook Pro 13.3【带触控栏】八代i5 8G 256G RP645显卡 深空灰 笔记本电脑 MUHP2CH/A"', '"3苹果电脑真的很好，确实清薄，漂亮，不管是在家办公还是出差都非常方便，外观很好看 设计很精致 功能很完善 尤其是上面的触控烂 本身设计感十足 加上有些操作都可以不用鼠标直接点击 简直太便捷 很值得拥有 也很流畅 分辨率不卡顿 发热也正常"', NULL, '6998.00', '"\n首先我想说，这款笔记本电脑的外观我非常非常的喜欢。时尚小巧，轻薄方便，适合我出差携带。其次我想说，这款笔记本的电脑性能也是非常不错的。屏幕的色彩非常清晰开机的时间只需要7.8秒。下载软件的时间只需要11秒到12秒。这些都非常符合我的要求。这款笔记本电脑的耐用性也是我非常期待的。最后为客服点赞，有问必答，服务周到。这次在京东的购物使我非常满意，我期待下一次的购物。"', 3, 2),
(4, '"4Apple 2019款 MacBook Pro 13.3【带触控栏】八代i5 8G 256G RP645显卡 深空灰 笔记本电脑 MUHP2CH/A"', '"4苹果电脑真的很好，确实清薄，漂亮，不管是在家办公还是出差都非常方便，外观很好看 设计很精致 功能很完善 尤其是上面的触控烂 本身设计感十足 加上有些操作都可以不用鼠标直接点击 简直太便捷 很值得拥有 也很流畅 分辨率不卡顿 发热也正常"', NULL, '5998.00', '"\n首先我想说，这款笔记本电脑的外观我非常非常的喜欢。时尚小巧，轻薄方便，适合我出差携带。其次我想说，这款笔记本的电脑性能也是非常不错的。屏幕的色彩非常清晰开机的时间只需要7.8秒。下载软件的时间只需要11秒到12秒。这些都非常符合我的要求。这款笔记本电脑的耐用性也是我非常期待的。最后为客服点赞，有问必答，服务周到。这次在京东的购物使我非常满意，我期待下一次的购物。"', 3, 2),
(5, '【支持win7专业版/旗舰版】联想昭阳 E52-80 15.6英寸商务办公轻薄便携笔记本电脑 定制：i7-6567U 8G 1T+128G 2G 系统', '联想昭阳 E52-80 15.6英寸商务办公轻薄便携笔记本电脑 ', '["2164bb2c6352d727e2429500dbbce9ca.jpg","1c2de5b4f086b699b685ad66c5d64a5b.jpg","99b5f18c32e187e46b09fab0cbe387a6.jpg"]', '5999.00', '<p>系统有特殊要求请联系在线客服进行咨询</p>\n', 3, 1),
(6, 'test1', '2', '["d106ac0e82a90a45a324e2b8f894e98d.png"]', '3.00', '<p>123</p>\n', 4, 1),
(7, 'test2', '2223', '[]', '2.00', '<p><span style="color: rgb(44,130,201);"><strong>2这是2</strong></span></p>\n', 20, 1);

-- --------------------------------------------------------

--
-- 表的结构 `mix_role`
--

CREATE TABLE `mix_role` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '角色名',
  `createTime` int(10) DEFAULT NULL COMMENT '创建时间',
  `authTime` int(10) DEFAULT NULL COMMENT '授权时间',
  `authorizer` varchar(255) DEFAULT NULL COMMENT '授权人',
  `menus` varchar(255) DEFAULT NULL COMMENT '权限数组'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `mix_role`
--

INSERT INTO `mix_role` (`id`, `name`, `createTime`, `authTime`, `authorizer`, `menus`) VALUES
(5, '商品上传员', 1576410621, NULL, NULL, NULL),
(2, '站长', NULL, NULL, NULL, NULL),
(3, 'admin', 1576165088, 1576408593, 'admin', '["\\/category","\\/products","\\/product","\\/user"]'),
(4, '编辑', 1576410606, 1577873802, 'admin', '["\\/product","\\/charts\\/line","\\/charts\\/pie","\\/home"]'),
(6, '测试', 1577875531, 1577875725, 'test', '["\\/home","\\/products","\\/category","\\/product","\\/user","\\/role","\\/charts\\/bar","\\/charts\\/line"]');

-- --------------------------------------------------------

--
-- 表的结构 `mix_user`
--

CREATE TABLE `mix_user` (
  `id` int(10) UNSIGNED NOT NULL COMMENT '用户id',
  `username` varchar(255) DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) DEFAULT NULL COMMENT '用户密码',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(255) DEFAULT NULL COMMENT '手机号',
  `createTime` int(10) DEFAULT NULL COMMENT '创建时间',
  `roleId` int(10) DEFAULT NULL COMMENT '所属角色Id',
  `level` tinyint(4) DEFAULT '5' COMMENT '用户等级(1:总管理,2:铂金用户,3:黄金用户,4:普通用户,5:游客)'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `mix_user`
--

INSERT INTO `mix_user` (`id`, `username`, `password`, `email`, `phone`, `createTime`, `roleId`, `level`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', NULL, NULL, NULL, NULL, 1),
(8, 'test', 'e10adc3949ba59abbe56e057f20f883e', 'testt@qq.com', '13522113322', 1577873781, 6, 1),
(6, '图图2', 'e10adc3949ba59abbe56e057f20f883e', '1234@qq.com', '13411423322', 1577859184, 2, 1),
(7, '薯条', 'e10adc3949ba59abbe56e057f20f883e', '123456@qq.com', '13322221111', 1577859281, 3, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mix_category`
--
ALTER TABLE `mix_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mix_imgs`
--
ALTER TABLE `mix_imgs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mix_product`
--
ALTER TABLE `mix_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mix_role`
--
ALTER TABLE `mix_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mix_user`
--
ALTER TABLE `mix_user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `mix_category`
--
ALTER TABLE `mix_category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类id', AUTO_INCREMENT=22;
--
-- 使用表AUTO_INCREMENT `mix_imgs`
--
ALTER TABLE `mix_imgs`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '图片id', AUTO_INCREMENT=20;
--
-- 使用表AUTO_INCREMENT `mix_product`
--
ALTER TABLE `mix_product`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品id', AUTO_INCREMENT=10;
--
-- 使用表AUTO_INCREMENT `mix_role`
--
ALTER TABLE `mix_role`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `mix_user`
--
ALTER TABLE `mix_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户id', AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
