export default {
    baseUrl: 'http://192.168.1.5/shop/admin',
    login: '/login', //登录
    logincheck: '/logincheck', //后台登录状态检测
    wx_login:'/wx_login',//小程序端微信登录
	wx_userinfo:'/wx_userinfo',//小程序端用户信息
	wx_index:'/wx_index',//小程序端首页
	wx_goodsview:'/wx_goodsview',//小程序端商品详情
	wx_goodslist:'/wx_goodslist',//小程序端商品列表
	wx_search:'/wx_search',//小程序端商品分类筛选
	wx_cartlist:'/wx_cartlist',//小程序端购物车列表
	wx_editcartnum:'/wx_editcartnum',//小程序端购物车商品数量修改
	wx_addcart:'/wx_addcart',//小程序端添加购物车
	wx_cartdel:'/wx_cartdel',//小程序端购物车商品删除
	wx_goodslike:'/wx_goodslike',//小程序端购物车猜你喜欢
	billagreement_view:'/billagreement_view',//后台免单购物协议查看
	wx_userreceiver:'/wx_userreceiver',//小程序端收货人信息列表
	wx_adduserreceiver:'/wx_adduserreceiver',//小程序端收货人信息添加
	wx_edituserreceiver:'/wx_edituserreceiver',//小程序端收货人信息修改
	wx_deluserreceiver:'/wx_deluserreceiver',//小程序端删除收货人信息
	order_submission:'/order_submission',//小程序端结算页面展示
	wx_payment:'/wx_payment',//小程序端支付
	wx_userorder:'/wx_userorder',//小程序端订单列表
	wx_orderspay:'/wx_orderspay',//小程序端待支付中的支付
	wx_orderscancel:'/wx_orderscancel',//小程序端待支付中的取消订单
	wx_orderspostsaleview:'/wx_orderspostsaleview',//小程序端订单售后详情
	wx_orderspostsale:'/wx_orderspostsale',//小程序端订单售后提交
	wx_orderspostsalecancel:'/wx_orderspostsalecancel',//小程序端订单申请售后取消
	wx_orderspostsalesubview:'/wx_orderspostsalesubview',
	wx_orderscomment:'/wx_orderscomment',//小程序端订单评价
	wx_orderconfirmreceipt:'/wx_orderconfirmreceipt',//小程序端订单收货
	wx_goodscomment:'/wx_goodscomment',//小程序端商品评价列表
	guide_content:'/guide_content',//新手指南查看
	wx_freeordersubmit:'/wx_freeordersubmit',//小程序端免单是否达标
	wx_freeorder:'/wx_freeorder',//小程序端免单中奖页面
	wx_freeorderrecord:'/wx_freeorderrecord',//小程序端免单记录
	wx_shareqr:'/wx_shareqr',//小程序端商品详情分享
	wx_usercommission:'/wx_usercommission',//小程序端邀请好友记录
	wx_usercommissionmore:'/wx_usercommissionmore',//小程序端佣金记录
	wx_userconsume:'/wx_userconsume',//小程序端消费记录
	wx_addcollect:'/wx_addcollect',//小程序端我要收藏
	wx_mycollectdel:'/wx_mycollectdel',//小程序端取消收藏
	wx_withdrawal:'/wx_withdrawal',//小程序端提现提交
	wx_mywithdrawal:'/wx_mywithdrawal',//小程序端提现列表
	wx_mycollect:'/wx_mycollect',//小程序端我的收藏
}