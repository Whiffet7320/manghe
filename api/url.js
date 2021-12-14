export default {
	baseUrl: 'http://192.168.50.142:8098', // http://192.168.50.142:8098  //https://ceshi.xingmangkeji.cn
	silence_auth: "/api/v2/wechat/silence_auth_login", //授权登录
	user: "/api/user", //用户信息
	user_update: "/api/v2/user/user_update", //更新用户信息
	updatePhone:"/api/user/updatePhone", //绑定手机号
	verifyCode:"/api/verify_code", //获取发送短信的key
	registerVerify:"/api/register/verify", //发送短信
	addressList: "/api/address/list", //收货地址
	editAddress: "/api/address/edit", //编辑收货地址
	delAddress: "/api/address/del", //删除收货地址
	city_list: "/api/city_list", //城市列表
	addressDetail: "/api/address/detail", //收货地址详情
	cartlist:"/api/cart/list", //购物车列表
	cartDel:"/api/cart/del", //购物车删除
	cartNum:"/api/cart/num", //购物车数量修改
	collectDoctor:"/api/collect/doctor", //关注医生
	collectDoctorlist:"/api/collect/doctor/list", //专家列表
	integralList:"/api/integral/list", //积分记录
	orderComment:"/api/order/comment",//商品评价
	orderDetail:"/api/order/detail",//商品详情
	collectAdd:"/api/collect/add",//商品收藏
	collectDel:"/api/collect/del",//商品取消收藏
	userCollect:"/api/collect/user",//商品收藏列表
	myCommentList:"/api/comment/my_comment_list",//我的评论
	myCommentDel:"/api/comment/my_comment_del", //评论删除
	myAppointmentlist:"/api/order/my_appointment_list", //我的预约
	orderWaitpay:"/api/order/order_wait_pay",
	// 
	loginWechat: '/api/login/wechat',
	category: '/api/category', //商品分类
	products: '/api/products', //商品列表
	detail: '/api/product/detail', //商品详情
	cartAdd: '/api/cart/add', //添加到购物车
	orderConfirm:'/api/order/confirm',//订单确认
	orderCreate:'/api/order/create',//订单创建
	orderList:'/api/order/list',//订单列表
	orderPay:'/api/order/pay',//订单支付
	orderCancel:"/api/order/cancel", //订单取消
	orderDel:"/api/order/del", //订单删除
	zhuanjia:'/api/zhuanjia',//专家列表
	xiufu:'/api/xiufu',//修复专区
	orderComputed:'/api/order/computed',//计算订单金额
	productHot:'/api/product/hot',//首页商品
	searchKeyword:'/api/search/keyword',//热搜词
	position:'/api/position',//首页城市列表
	banner:'/api/banner',//首页轮播图
	store_integralList:'/api/store_integral/list',//积分商品
	yanxuan_index:'/api/yanxuan_index',//严选商城首页-促销商品和团购商品
	combinationDetail:'/api/combination/detail',//拼团产品详情
	replyList:'/api/reply/list',//获取商品评论
	orderAgain:'/api/order/again',//再次购买
	orderTake:'/api/order/take',//订单收货
	spread_info:'/api/user/spread_info',//推广分销二维码海报生成
	combinationPink:'/api/combination/pink',//拼团 开团
	combinationRemove:"/api/combination/remove",//拼团取消
	store_integralDetail:'/api/store_integral/detail',//积分商品详情
	store_integralOrderConfirm:'/api/store_integral/order/confirm',//积分兑换确认页
	store_integralOrderCreate:'/api/store_integral/order/create',//积分兑换订单创建
	store_integralOrderList:'/api/store_integral/order/list',//积分订单
	store_integralOrderTake:'/api/store_integral/order/take',//积分商品订单收货
	store_integralOrderCount_num:'/api/store_integral/order/count_num',//
}
