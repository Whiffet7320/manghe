export default {
	baseUrl: 'http://192.168.50.142:8098', // http://192.168.50.142:8098  //https://ceshi.xingmangkeji.cn
	silence_auth: "/api/v2/wechat/silence_auth_login",
	user: "/api/user",
	user_update: "/api/v2/user/user_update",
	updatePhone:"/api/user/updatePhone",
	verifyCode:"/api/verify_code",
	registerVerify:"/api/register/verify",
	addressList: "/api/address/list",
	editAddress: "/api/address/edit",
	delAddress: "/api/address/del",
	city_list: "/api/city_list",
	addressDetail: "/api/address/detail",
	cartlist:"/api/cart/list",
	cartDel:"/api/cart/del",
	cartNum:"/api/cart/num",
	collectDoctor:"/api/collect/doctor",
	collectDoctorlist:"/api/collect/doctor/list",
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
	store_integralDetail:'/api/store_integral/detail',//积分商品详情
	store_integralOrderConfirm:'/api/store_integral/order/confirm',//积分兑换确认页
	store_integralOrderCreate:'/api/store_integral/order/create',//积分兑换订单创建
	store_integralOrderList:'/api/store_integral/order/list',//积分订单
	store_integralOrderTake:'/api/store_integral/order/take',//积分商品订单收货
	store_integralOrderCount_num:'/api/store_integral/order/count_num',//
}
